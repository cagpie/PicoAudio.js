/**
 * tickからtime(秒)を求める
 * @param {number} tick
 * @returns {number} time(秒)
 */
export default function getTime(tick) {
    let imid = -1;

    // tempo変更がある場合、tickを検索する //
    if (this.tempoTrack && this.tempoTrack.length >= 1) {
        // 最後のtickを超える場合、最後のtimeを返す //
        if (tick >= this.tempoTrack[this.tempoTrack.length-1].timing) {
            return this.tempoTrack[this.tempoTrack.length-1].time;
        }
        // 二分探索でtickを探す //
        let imin = 0;
        let imax = this.tempoTrack.length - 1;
        while (true) {
            imid = Math.floor(imin + (imax - imin) / 2);
            const tempTiming = this.tempoTrack[imid].timing;
            if (tick < tempTiming) {
                imax = imid - 1;
            } else if (tick > tempTiming) {
                imin = imid + 1;
            } else {
                break;
            }
            if (imin > imax) {
                if (tick < tempTiming) imid--;
                break;
            }
        }
    }

    let time = 0;
    let baseTiming = 0;
    let tempo = 120;
    if (imid >= 0) { // tickを探索して見つかった場合
        // 引数tickに一番近いtickを取得
        const tempoObj = this.tempoTrack[imid];
        time = tempoObj.time;
        baseTiming = tempoObj.timing;
        tempo = tempoObj.value;
    }

    // tickからtimeを算出する
    // 引数tickに一番近いtickのtime ＋ 引数tickから残りのtimeを算出 ＝ 現在のtime
    time += (60 / tempo / this.settings.resolution) * (tick - baseTiming);
    return time;
}