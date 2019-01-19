export default class ArrayUtil extends Array {
    /**
     * 配列から要素１つを削除する
     * 
     *     Array.splice(index, 1); を高速化する
     *     特に配列末尾、又は配列先頭を削除するときに高速処理が期待できる
     * @param {Array} array 配列
     * @param {number} index 添え字
     */
    static delete(array, index) {
        if (index == array.length-1) array.pop(); // 配列末尾をArray.pop()で削除すると高速化する
        else if (index == 0) array.shift(); // 配列先頭をArray.shift()で削除すると高速化する（あまり変わらない環境もある）
        else array.splice(index, 1); // 配列先頭・末尾以外を削除する場合はArray.splice()で削除する
    }
}