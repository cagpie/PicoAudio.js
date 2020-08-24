export default function startWebMIDI() {
    if (!navigator.requestMIDIAccess) return;
    // 1回目：ブラウザにMIDIデバイスのフルコントロールを要求する(SysExの使用を要求)
    // 2回目：MIDIデバイスのフルコントロールがブロックされたら、SysEx無しでMIDIアクセスを要求する
    let sysEx = this.settings.WebMIDIPortSysEx;
    const midiAccessSuccess = (midiAccess) => {
        const outputs = midiAccess.outputs;
        this.settings.WebMIDIPortOutputs = outputs;
        let output;
        if (this.settings.WebMIDIPort==-1) {
            this.settings.WebMIDIPortOutputs.forEach((o) => {
                if (!output) output = o;
            });
        } else {
            output = this.settings.WebMIDIPortOutputs.get(this.settings.WebMIDIPort);
        }
        this.settings.WebMIDIPortOutput = output;
        this.settings.WebMIDIPortSysEx = sysEx;
        if (output) {
            output.open();
            this.initStatus(); // リセットイベント（GMシステム・オン等）を送るため呼び出す
        }
        return outputs;
    };
    const midiAccessFailure = (err) => {
        console.log(err);
        if (sysEx) {
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
    window.addEventListener('unload', () => {
        for (let t=0; t<16; t++) {
            this.settings.WebMIDIPortOutput.send([0xB0+t, 120, 0]);
            for (let i=0; i<128; i++) {
                this.settings.WebMIDIPortOutput.send([0x80+t, i, 0]);
            }
        }
    });
}