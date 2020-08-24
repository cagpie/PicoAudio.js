export default function createBaseNote(option, isDrum, isExpression, nonChannel, nonStop) {
    // 最低限の変数を準備（無音の場合は処理終了するため） //
    const settings = this.settings;
    const context = this.context;
    const songStartTime = this.states.startTime;
    const baseLatency = this.baseLatency;
    const channel = nonChannel ? 0 : (option.channel || 0);
    const velocity = (option.velocity) * Number(nonChannel ? 1 : (this.channels[channel][2] != null ? this.channels[channel][2] : 1)) * settings.generateVolume;
    let isGainValueZero = true;

    // 無音の場合は処理終了 //
    if (velocity <= 0) return {isGainValueZero: true};

    // 音量の変化を設定 //
    const expGainValue = velocity * ((option.expression ? option.expression[0].value : 100) / 127);
    const expGainNode = context.createGain();
    expGainNode.gain.value = expGainValue;
    if (isExpression) {
        option.expression ? option.expression.forEach((p) => {
            const v = velocity * (p.value / 127);
            if (v > 0) isGainValueZero = false;
            let t = p.time + songStartTime + baseLatency;
            if (t < 0) t = 0;
            expGainNode.gain.setValueAtTime(v, t);
        }) : false;
    } else {
        if (expGainValue > 0) {
            isGainValueZero = false;
        }
    }

    // 無音の場合は処理終了 //
    if (isGainValueZero) { // 音量が常に0なら音を鳴らさない
        return {isGainValueZero: true};
    }

    // 全ての変数を準備 //
    const start = option.startTime + songStartTime + baseLatency;
    const stop = option.stopTime + songStartTime + baseLatency;
    const pitch = settings.basePitch * Math.pow(Math.pow(2, 1/12), (option.pitch || 69) - 69);
    const oscillator = !isDrum ? context.createOscillator() : context.createBufferSource();
    const panNode = context.createStereoPanner ? context.createStereoPanner()
        : context.createPanner ? context.createPanner()
        : { pan: { setValueAtTime: ()=>{} } };
    const gainNode = context.createGain();
    const stopGainNode = context.createGain();

    // ドラムはホワイトノイズ、ドラム以外はoscillatorを設定 //
    // oscillatorはピッチ変動も設定 //
    if (!isDrum) {
        oscillator.type = option.type || "sine";
        oscillator.detune.value = 0;
        oscillator.frequency.value = pitch;
        option.pitchBend ? option.pitchBend.forEach((p) => {
            let t = p.time + songStartTime + baseLatency;
            if (t < 0) t = 0;
            oscillator.frequency.setValueAtTime(
                settings.basePitch * Math.pow(Math.pow(2, 1/12), option.pitch - 69 + p.value),
                t
            );
        }) : false;
    } else {
        oscillator.loop = true;
        oscillator.buffer = this.whitenoise;
    }

    // パンの初期値を設定 //
    const panValue = option.pan && option.pan[0].value != 64 ? (option.pan[0].value / 127) * 2 - 1 : 0;
    initPanValue(context, panNode, panValue);

    // パンの変動を設定 //
    if (context.createStereoPanner || context.createPanner) {
        // StereoPannerNode or PannerNode がどちらかでも使える
        let firstNode = true;
        if (context.createStereoPanner) {
            // StereoPannerNode が使える
            option.pan ? option.pan.forEach((p) => {
                if (firstNode) {
                    firstNode = false;
                    return;
                }
                let v = p.value == 64 ? 0 : (p.value / 127) * 2 - 1;
                if (v > 1.0) v = 1.0;
                let t = p.time + songStartTime + baseLatency;
                if (t < 0) t = 0;
                panNode.pan.setValueAtTime(v, t);
            }) : false;
        } else if (context.createPanner) {
            // StereoPannerNode が未サポート、PannerNode が使える
            if (panNode.positionX) {
                // setValueAtTimeが使える
                // Old Browser
                let firstPan = true;
                option.pan ? option.pan.forEach((p) => {
                    if (firstPan) {
                        firstPan = false;
                        return;
                    }
                    const v = p.value == 64 ? 0 : (p.value / 127) * 2 - 1;
                    const posObj = convPosition(v);
                    let t = p.time + songStartTime + baseLatency;
                    if (t < 0) t = 0;
                    panNode.positionX.setValueAtTime(posObj.x, t);
                    panNode.positionY.setValueAtTime(posObj.y, t);
                    panNode.positionZ.setValueAtTime(posObj.z, t);
                }) : false;
            } else {
                // iOS
                // setValueAtTimeが使えないためsetTimeoutでパンの動的変更
                option.pan ? option.pan.forEach((p) => {
                    if (firstNode) {
                        firstNode = false;
                        return;
                    }
                    const reservePan = setTimeout(() => {
                        this.clearFunc("pan", reservePan);
                        let v = p.value == 64 ? 0 : (p.value / 127) * 2 - 1;
                        if (v > 1.0) v = 1.0;
                        const posObj = convPosition(v);
                        panNode.setPosition(posObj.x, posObj.y, posObj.z);
                    }, (p.time + songStartTime + baseLatency - context.currentTime) * 1000);
                    this.pushFunc({
                        pan: reservePan,
                        stopFunc: () => { clearTimeout(reservePan); }
                    });
                }) : false;
            }
        }
        oscillator.connect(panNode);
        panNode.connect(expGainNode);
    } else {
        // StereoPannerNode、PannerNode が未サポート
        oscillator.connect(expGainNode);
    }

    // AudioNodeを接続 //
    expGainNode.connect(gainNode);
    gainNode.connect(stopGainNode);
    stopGainNode.connect(this.masterGainNode);
    this.masterGainNode.connect(context.destination);

    // モジュレーションの変動を設定 //
    let modulationOscillator;
    let modulationGainNode;
    if (!isDrum && option.modulation && (option.modulation.length >= 2 || option.modulation[0].value > 0)) {
        modulationOscillator = context.createOscillator();
        modulationGainNode = context.createGain();
        let firstNode = true;
        option.modulation ? option.modulation.forEach((p) => {
            if (firstNode) {
                firstNode = false;
                return;
            }
            let m = p.value / 127;
            if (m > 1.0) m = 1.0;
            let t = p.time + songStartTime + baseLatency;
            if (t < 0) t = 0;
            modulationGainNode.gain.setValueAtTime(
                pitch * 10 / 440 * m,
                t
            );
        }) : false;
        let m = option.modulation ? option.modulation[0].value / 127 : 0;
        if (m > 1.0) m = 1.0;
        modulationGainNode.gain.value = pitch * 10 / 440 * m;
        modulationOscillator.frequency.value = 6;
        modulationOscillator.connect(modulationGainNode);
        modulationGainNode.connect(oscillator.frequency);
    }

    // リバーブの変動を設定 //
    if (this.settings.isReverb && option.reverb && (option.reverb.length >= 2 || option.reverb[0].value > 0)) {
        const convolver = this.convolver;
        const convolverGainNode = context.createGain();
        let firstNode = true;
        option.reverb ? option.reverb.forEach((p) => {
            if (firstNode) {
                firstNode = false;
                return;
            }
            let r = p.value / 127;
            if (r > 1.0) r = 1.0;
            let t = p.time + songStartTime + baseLatency;
            if (t < 0) t = 0;
            convolverGainNode.gain.setValueAtTime(r, t);
        }) : false;
        let r = option.reverb ? option.reverb[0].value / 127 : 0;
        if (r > 1.0) r = 1.0;
        convolverGainNode.gain.value = r;
        gainNode.connect(stopGainNode);
        stopGainNode.connect(convolverGainNode);
        convolverGainNode.connect(convolver);
    }

    // コーラスの変動を設定 //
    if (this.settings.isChorus && option.chorus && (option.chorus.length >= 2 || option.chorus[0].value > 0)) {
        const chorusDelayNode = this.chorusDelayNode;
        const chorusGainNode = context.createGain();
        let firstNode = true;
        option.chorus ? option.chorus.forEach((p) => {
            if (firstNode) {
                firstNode = false;
                return;
            }
            let c = p.value / 127;
            if (c > 1.0) c = 1.0;
            let t = p.time + songStartTime + baseLatency;
            if (t < 0) t = 0;
            chorusGainNode.gain.setValueAtTime(c, t);
        }) : false;
        let c = option.chorus ? option.chorus[0].value / 127 : 0;
        if (c > 1.0) c = 1.0;
        chorusGainNode.gain.value = c;
        gainNode.connect(stopGainNode);
        stopGainNode.connect(chorusGainNode);
        chorusGainNode.connect(chorusDelayNode);
    }

    // モジュレーションをスタート //
    if (modulationOscillator) {
        modulationOscillator.start(start);
        this.stopAudioNode(modulationOscillator, stop, modulationGainNode);
    }

    // oscillator又はホワイトノイズをスタート //
    oscillator.start(start);
    if (!isDrum && !nonChannel && !nonStop) {
        this.stopAudioNode(oscillator, stop, stopGainNode);
    }

    // AudioNodeやパラメータを返す //
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

/**
 * パンの初期値を設定
 * @param {PannerNode | StereoPannerNode} panNode 
 * @param {number} panValue 
 */
function initPanValue(context, panNode, panValue) {
    if (context.createStereoPanner) {
        if(panValue > 1.0) panValue = 1.0;
        panNode.pan.value = panValue;
    } else if(context.createPanner) {
        // iOS, Old Browser
        const posObj = convPosition(panValue);
        panNode.panningModel = "equalpower";
        panNode.setPosition(posObj.x, posObj.y, posObj.z);
    }
}

/**
 * pan値を基に、PannerNode用の値を{x, y, z}で返す
 * @param {number} panValue panの値
 * @returns Object{x, y, z}
 */
function convPosition(panValue) {
    if (panValue > 1.0) panValue = 1.0;

    const obj = {};
    const panAngle = panValue * 90;
    obj.x = Math.sin(panAngle * (Math.PI / 180));
    obj.y = 0;
    obj.z = -Math.cos(panAngle * (Math.PI / 180));
    return obj;
}