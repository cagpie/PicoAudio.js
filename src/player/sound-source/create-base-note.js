export default function createBaseNote(option, isDrum, isExpression, nonChannel, nonStop) {
    var settings = this.settings;
    var context = this.context;
    var songStartTime = this.states.startTime;
    var that = this;
    var channel = nonChannel ? 0 : (option.channel || 0);
    var velocity = (option.velocity) * Number(nonChannel ? 1 : (this.channels[channel][2] != null ? this.channels[channel][2] : 1)) * settings.generateVolume;
    var isGainValueZero = true;

    if(velocity<=0) return {isGainValueZero: true};
    var expGainValue = velocity * ((option.expression ? option.expression[0].value : 100) / 127);
    var expGainNode = context.createGain();
    expGainNode.gain.value = expGainValue;
    if(isExpression){
        option.expression ? option.expression.forEach(function(p){
            var v = velocity * (p.value / 127);
            if(v > 0) isGainValueZero = false;
            expGainNode.gain.setValueAtTime(
                v,
                p.time + songStartTime
            );
        }) : false;
    } else {
        if(expGainValue > 0){
            isGainValueZero = false;
        }
    }
    if(isGainValueZero){ // 音量が常に0なら音を鳴らさない
        return {isGainValueZero: true};
    }

    var start = option.startTime + songStartTime;
    var stop = option.stopTime + songStartTime;
    var pitch = settings.basePitch * Math.pow(Math.pow(2, 1/12), (option.pitch || 69) - 69);
    var oscillator = !isDrum ? context.createOscillator() : context.createBufferSource();
    var panNode = context.createStereoPanner ? context.createStereoPanner() :
            context.createPanner ? context.createPanner() : { pan: { setValueAtTime: function(){} } };
    var gainNode = context.createGain();
    var stopGainNode = context.createGain();

    if(!context.createStereoPanner && context.createPanner) {
        // iOS, Old Browser
        var panValue = option.pan && option.pan[0].value != 64 ? (option.pan[0].value / 127) * 2 - 1 : 0;
        if(panValue > 1.0) panValue = 1.0;
        var panAngle = panValue * 90;
        var panX = Math.sin(panAngle * (Math.PI / 180));
        var panZ = -Math.cos(panAngle * (Math.PI / 180));
        panNode.panningModel = "equalpower";
        panNode.setPosition(panX, 0, panZ);
    } else if(context.createStereoPanner){
        var panValue = option.pan && option.pan[0].value != 64 ? (option.pan[0].value / 127) * 2 - 1 : 0;
        if(panValue > 1.0) panValue = 1.0;
        panNode.pan.value = panValue;
    }

    if(!isDrum){
        oscillator.type = option.type || "sine";
        oscillator.detune.value = 0;
        oscillator.frequency.value = pitch;
        option.pitchBend ? option.pitchBend.forEach(function(p){
            oscillator.frequency.setValueAtTime(
                settings.basePitch * Math.pow(Math.pow(2, 1/12), option.pitch - 69 + p.value),
                p.time + songStartTime
            );
        }) : false;
    } else {
        oscillator.loop = true;
        oscillator.buffer = this.whitenoise;
    }

    if(context.createStereoPanner || context.createPanner){
        var firstPan = true;
        if(context.createStereoPanner) {
            option.pan ? option.pan.forEach(function(p){
                if(firstPan){
                    firstPan = false;
                    return;
                }
                var v = p.value == 64 ? 0 : (p.value / 127) * 2 - 1;
                if(v > 1.0) v = 1.0;
                panNode.pan.setValueAtTime(
                    v,
                    p.time + songStartTime
                );
            }) : false;
        } else if(context.createPanner){
            if(panNode.positionX) {
                // Old Browser
                option.pan ? option.pan.forEach(function(p){
                    if(firstPan){
                        firstPan = false;
                        return;
                    }
                    var v = p.value == 64 ? 0 : (p.value / 127) * 2 - 1;
                    if(v > 1.0) v = 1.0;
                    var a = v * 90;
                    var x = Math.sin(a * (Math.PI / 180));
                    var z = -Math.cos(a * (Math.PI / 180));
                    panNode.positionX.setValueAtTime(x, p.time + songStartTime);
                    panNode.positionY.setValueAtTime(0, p.time + songStartTime);
                    panNode.positionZ.setValueAtTime(z, p.time + songStartTime);
                }) : false;
            } else {
                // iOS
                // setValueAtTimeが使えないためsetTimeoutでパンの動的変更
                option.pan ? option.pan.forEach(function(p){
                    if(firstPan){
                        firstPan = false;
                        return;
                    }
                    var reservePan = setTimeout(function(){
                        that.clearFunc("pan", reservePan);
                        var v = p.value == 64 ? 0 : (p.value / 127) * 2 - 1;
                        if(v > 1.0) v = 1.0;
                        var a = v * 90;
                        var x = Math.sin(a * (Math.PI / 180));
                        var z = -Math.cos(a * (Math.PI / 180));
                        panNode.setPosition(x, 0, z);
                    }, (p.time + songStartTime - context.currentTime) * 1000);
                    that.pushFunc({
                        pan: reservePan,
                        stopFunc: function(){ clearTimeout(reservePan); }
                    });
                }) : false;
            }
        }
        oscillator.connect(panNode);
        panNode.connect(expGainNode);
    } else {
        oscillator.connect(expGainNode);
    }
    expGainNode.connect(gainNode);
    gainNode.connect(stopGainNode);
    stopGainNode.connect(this.masterGainNode);
    this.masterGainNode.connect(context.destination);

    if(!isDrum && option.modulation && (option.modulation.length >= 2 || option.modulation[0].value > 0)){
        var modulationOscillator = context.createOscillator();
        var modulationGainNode = context.createGain();
        firstPan = true;
        option.modulation ? option.modulation.forEach(function(p){
            if(firstPan){
                firstPan = false;
                return;
            }
            var m = p.value / 127;
            if(m > 1.0) m = 1.0;
            modulationGainNode.gain.setValueAtTime(
                pitch * 10 / 440 * m,
                p.time + songStartTime
            );
        }) : false;
        var m = option.modulation ? option.modulation[0].value / 127 : 0;
        if(m > 1.0) m = 1.0;
        modulationGainNode.gain.value = pitch * 10 / 440 * m;
        modulationOscillator.frequency.value = 6;
        modulationOscillator.connect(modulationGainNode);
        modulationGainNode.connect(oscillator.frequency);
    }

    if(this.settings.isReverb && option.reverb && (option.reverb.length >= 2 || option.reverb[0].value > 0)){
        var convolver = this.convolver;
        var convolverGainNode = context.createGain();
        firstPan = true;
        option.reverb ? option.reverb.forEach(function(p){
            if(firstPan){
                firstPan = false;
                return;
            }
            var r = p.value / 127;
            if(r > 1.0) r = 1.0;
            convolverGainNode.gain.setValueAtTime(
                r,
                p.time + songStartTime
            );
        }) : false;
        var r = option.reverb ? option.reverb[0].value / 127 : 0;
        if(r > 1.0) r = 1.0;
        convolverGainNode.gain.value = r;
        gainNode.connect(stopGainNode);
        stopGainNode.connect(convolverGainNode);
        convolverGainNode.connect(convolver);
    }

    if(this.settings.isChorus && option.chorus && (option.chorus.length >= 2 || option.chorus[0].value > 0)){
        var chorusDelayNode = this.chorusDelayNode;
        var chorusGainNode = context.createGain();
        firstPan = true;
        option.chorus ? option.chorus.forEach(function(p){
            if(firstPan){
                firstPan = false;
                return;
            }
            var c = p.value / 127;
            if(c > 1.0) c = 1.0;
            chorusGainNode.gain.setValueAtTime(
                c,
                p.time + songStartTime
            );
        }) : false;
        var c = option.chorus ? option.chorus[0].value / 127 : 0;
        if(c > 1.0) c = 1.0;
        chorusGainNode.gain.value = c;
        gainNode.connect(stopGainNode);
        stopGainNode.connect(chorusGainNode);
        chorusGainNode.connect(chorusDelayNode);
    }

    if(modulationOscillator){
        modulationOscillator.start(start);
        this.stopAudioNode(modulationOscillator, stop, modulationGainNode);
    }

    oscillator.start(start);
    if(!isDrum && !nonChannel && !nonStop){
        this.stopAudioNode(oscillator, stop, stopGainNode);
    }

    return {
        start: start,
        stop: stop,
        pitch: pitch,
        channel: channel,
        velocity: velocity,
        oscillator: oscillator,
        panNode: panNode,
        gainNode: gainNode,
        stopGainNode: stopGainNode,
        isGainValueZero: false
    };
}