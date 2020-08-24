export default class ParseUtil {
    /**
     * バイト配列内に含まれる"データ長"を数値に変換する
     * @param {Uint8Array} arr バイト配列
     * @param {number} startIdx データ長の始点の場所(index)
     * @param {number} endIdx データ長の終点の場所(index) - 1
     * @returns {number} データ長
     */
    static getInt(arr, startIdx, endIdx) {
        let value = 0;
        for (let i=startIdx; i<endIdx; i++) {
            value = (value << 8) + arr[i];
        }
        return value;
    }

    /**
     * バイト配列内に含まれる"可変長のデータ長"を数値に変換する
     * @param {Uint8Array} arr バイト配列
     * @param {number} startIdx データ長の始点の場所(index)
     * @param {number} endIdx データ長の終点の場所(index) - 1 (終点の場所は多くてもかまわない)
     * @returns {Array} [データ長, "可変長のデータ長"のバイト数]
     */
    static variableLengthToInt(arr, startIdx, endIdx) {
        let i = startIdx;
        let value = 0;
        while (i < endIdx-1 && arr[i] >= 0x80) {
            if (i < startIdx+4) value = (value<<7) + (arr[i]-0x80);
            i++;
        }
        value = (value<<7) + arr[i];
        i++;
        return [value, i-startIdx];
    }

    /**
     * デルタタイムの順番になるように配列に挿入
     * @param {PicoAudio} that PicoAudioインスタンス
     * @param {number} ch チャンネル番号
     * @param {number} time デルタタイム
     * @param {number} p 対象のMIDIイベントの場所(SMFデータ内の位置)
     * @param {number} len MIDIイベントの長さ
     */
    static chIndicesInsert(that, ch, time, p, len) {
        const indices = ch.indices;

        // デルタタイムの順番になるようにリスト配列に挿入 //
        if (ch.indicesLength >= 4 && time < indices[ch.indicesFoot]) {
            // Insert //
            while (ch.indicesCur != -1) {
                if (time<indices[ch.indicesCur]) {
                    if (ch.indicesCur == ch.indicesHead) {
                        ch.indicesHead = ch.indicesLength;
                    } else {
                        indices[ch.indicesPre+3] = ch.indicesLength;
                    }
                    indices[ch.indicesLength] = time;
                    indices[ch.indicesLength+1] = len;
                    indices[ch.indicesLength+2] = p;
                    indices[ch.indicesLength+3] = ch.indicesCur;
                    ch.indicesPre = ch.indicesLength;
                    ch.indicesLength += 4;
                    break;
                }
                ch.indicesPre = ch.indicesCur;
                ch.indicesCur = indices[ch.indicesCur+3];
            }
        } else {
            // Push //
            if (ch.indicesLength >= 4) {
                indices[ch.indicesFoot+3] = ch.indicesLength;
            } else {
                ch.indicesHead = 0;
            }
            ch.indicesFoot = ch.indicesLength;
            indices[ch.indicesLength] = time;
            indices[ch.indicesLength+1] = len;
            indices[ch.indicesLength+2] = p;
            indices[ch.indicesLength+3] = -1;
            ch.indicesLength += 4;
        }
    }
}