export default function stop(isSongLooping) {
    const states = this.states;

    // 再生していない場合、何もしない //
    if (states.isPlaying == false) return;

    // ステータスを停止状態にする・終了処理を呼ぶ //
    states.isPlaying = false;
    states.stopTime = this.context.currentTime;
    states.stopFuncs.forEach((n) => { // 再生中の音の停止関数を呼ぶ
        n.stopFunc();
    });
    states.stopFuncs = [];
    states.playIndices.forEach((n, i, ary) => {
        ary[i] = 0;
    });
    states.noteOnAry = [];
    states.noteOffAry = [];

    // WebMIDIで再生中の場合、停止メッセージを送信 //
    if (this.settings.isWebMIDI) {
        if (isSongLooping)
            return;
        if (this.settings.WebMIDIPortOutput == null)
            return;
        states.webMIDIStopTime = this.context.currentTime;
        setTimeout(() => {
            for (let t=0; t<16; t++) {
                this.settings.WebMIDIPortOutput.send([0xB0+t, 120, 0]);
            }
        }, 1000);
    }

    // 停止をコールバックに通知 //
    this.trigger.stop();
    this.fireEvent('pause');
    this.fireEvent('stop');
}