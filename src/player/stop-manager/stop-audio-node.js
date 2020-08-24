export default function stopAudioNode(tar, time, stopGainNode, isNoiseCut) {
    const isImmed = time <= this.context.currentTime; // 即時ストップか？

    // 予約ストップ //
    let vol1Time = time-0.005;
    let stopTime = time;

    // 時間設定 //
    if (isImmed) { // 即時ストップ
        if (!isNoiseCut) {
            stopTime = this.context.currentTime;
        } else {  // ノイズカット
            vol1Time = this.context.currentTime;
            stopTime = this.context.currentTime+0.005;
        }
    }

    // 音の停止 //
    try { // 通常の音停止処理
        if (!isNoiseCut) {
            tar.stop(stopTime);
        } else { // ノイズカット（音の終わりに短いフェードアウトを入れる）
            tar.stop(stopTime);
            stopGainNode.gain.cancelScheduledValues(0);
            stopGainNode.gain.setValueAtTime(1, vol1Time);
            stopGainNode.gain.linearRampToValueAtTime(0, stopTime);
        }
    } catch(e) { // iOS用 (stopが２回以上使えないので、代わりにstopGainNodeでミュートにする)
        stopGainNode.gain.cancelScheduledValues(0);
        if (!isNoiseCut) {
            stopGainNode.gain.setValueAtTime(0, stopTime);
        } else { // ノイズカット（音の終わりに短いフェードアウトを入れる）
            stopGainNode.gain.setValueAtTime(1, vol1Time);
            stopGainNode.gain.linearRampToValueAtTime(0, stopTime);
        }
    }
}