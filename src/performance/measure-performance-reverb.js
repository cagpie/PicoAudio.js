export default function measurePerformanceReverb() {
    // 0.5秒パフォーマンス計測して、リバーブONにするか判断する
    var max = 500000; // 0.5秒以内にここまで計算できればリバーブON
    var startTime = performance.now();
    for (var i=0;i<max;i++) {
        if (performance.now()-startTime>=500) break;
    }
    if (this.debug) {
        console.log("measurePerformanceReverb", i, performance.now()-startTime);
    }
    if (i < max) return false;
    return true;
}