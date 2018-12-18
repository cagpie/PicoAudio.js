/**
 * time(秒)からtickを求める
 * @param {number} time
 * @returns {number} tick
 */
export default function getTiming(time) {
    let imid = -1;

    // tempo変更がある場合、timeを検索する //
    if (this.tempoTrack && this.tempoTrack.length >= 1) {
        // 最後のtimeを超える場合、最後のtickを返す
        if (time >= this.tempoTrack[this.tempoTrack.length-1].time) {
            return this.tempoTrack[this.tempoTrack.length-1].timing;
        }
        // 二分探索でtimeを探す
        let imin = 0;
        let imax = this.tempoTrack.length - 1;
        while (true) {
            imid = Math.floor(imin + (imax - imin) / 2);
            const tempTime = this.tempoTrack[imid].time;
            if (time < tempTime) {
                imax = imid - 1;
            } else if (time > tempTime) {
                imin = imid + 1;
            } else {
                break;
            }
            if (imin > imax) {
                if (time < tempTime) imid--;
                break;
            }
        }
    }

    let baseTime = 0;
    let tick = 0;
    let tempo = 120;
    if (imid >= 0) { // timeを探索して見つかった場合
        // 引数timeに一番近いtimeを取得
        const tempoObj = this.tempoTrack[imid];
        baseTime = tempoObj.time;
        tick = tempoObj.timing;
        tempo = tempoObj.value;
    }

    // timeからtickを算出する
    // 引数timeに一番近いtimeのtick ＋ 現在timeから残りのtickを算出 ＝ 現在のtick
    tick += (time - baseTime) / (60 / tempo / this.settings.resolution);
    return tick;
}