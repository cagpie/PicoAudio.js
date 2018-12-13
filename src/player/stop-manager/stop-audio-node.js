export default function stopAudioNode(tar, time, stopGainNode, isNoiseCut) {
    var isImmed = time <= this.context.currentTime; // 即時ストップか？
    // 時間設定
    if(!isImmed){ // 予約ストップ
        var vol1Time = time-0.005;
        var stopTime = time;
    } else { // 即時ストップ
        if(!isNoiseCut){
            var stopTime = this.context.currentTime;
        } else {
            var vol1Time = this.context.currentTime;
            var stopTime = this.context.currentTime+0.005;
        }
    }
    // 音の停止
    try{
        if(!isNoiseCut){
            tar.stop(stopTime);
        } else {
            tar.stop(stopTime);
            stopGainNode.gain.cancelScheduledValues(0);
            stopGainNode.gain.setValueAtTime(1, vol1Time);
            stopGainNode.gain.linearRampToValueAtTime(0, stopTime);
        }
    } catch(e) { // iOS (stopが２回以上使えないので、代わりにstopGainNodeでミュートにする)
        stopGainNode.gain.cancelScheduledValues(0);
        if(!isNoiseCut){
            stopGainNode.gain.setValueAtTime(0, stopTime);
        } else {
            stopGainNode.gain.setValueAtTime(1, vol1Time);
            stopGainNode.gain.linearRampToValueAtTime(0, stopTime);
        }
    }
}