export default class PerformanceUtil {
    /**
     * 0.5秒パフォーマンス計測して、リバーブONで良さそうか判断する
     * @returns {boolean} リバーブONで良さそう
     */
    static measureReverb() {
        let max = 500000; // 0.5秒以内にここまで計算できればリバーブON
        let startTime = performance.now();
    
        let i=0;
        for (; i<max; i++) {
            if (performance.now() - startTime >= 500) break;
        }
    
        if (this.debug) {
            console.log("measureReverb", i, performance.now() - startTime);
        }
    
        if (i < max) return false;
        return true;
    }
}