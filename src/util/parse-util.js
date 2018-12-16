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
}