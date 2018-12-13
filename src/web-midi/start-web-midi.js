export default function startWebMIDI() {
    var outputs;
    var that = this;
    if(!navigator.requestMIDIAccess) return;
    // 1回目：ブラウザにMIDIデバイスのフルコントロールを要求する(SysExの使用を要求)
    // 2回目：MIDIデバイスのフルコントロールがブロックされたら、SysEx無しでMIDIアクセスを要求する
    var sysEx = this.settings.WebMIDIPortSysEx;
    var midiAccessSuccess = function(midiAccess){
        outputs = midiAccess.outputs;
        that.settings.WebMIDIPortOutputs = outputs;
        var output;
        if(that.settings.WebMIDIPort==-1){
            that.settings.WebMIDIPortOutputs.forEach(function(o){
                if(!output) output = o;
            });
        } else {
            output = that.settings.WebMIDIPortOutputs.get(settings.WebMIDIPort);
        }
        that.settings.WebMIDIPortOutput = output;
        that.settings.WebMIDIPortSysEx = sysEx;
        if(output){
            output.open();
            that.initStatus(); // リセットイベント（GMシステム・オン等）を送るため呼び出す
        }
        return outputs;
    };
    var midiAccessFailure = function(err){
        console.log(err);
        if(sysEx){
            sysEx = false;
            navigator.requestMIDIAccess({sysex: sysEx})
                .then(midiAccessSuccess)
                .catch(midiAccessFailure);
        }
    };
    navigator.requestMIDIAccess({sysex: sysEx})
        .then(midiAccessSuccess)
        .catch(midiAccessFailure);
    // 終了時に鳴らしている音を切る
    window.addEventListener('unload', function(e) {
        for(var t=0; t<16; t++){
            that.settings.WebMIDIPortOutput.send([0xB0+t, 120, 0]);
            for(var i=0; i<128; i++){
                that.settings.WebMIDIPortOutput.send([0x80+t, i, 0]);
            }
        }
    });
}