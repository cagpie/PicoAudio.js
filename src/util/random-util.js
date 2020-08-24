/**
 * 固定パターンの乱数を提供するクラス
 */
export default class RandomUtil {
    /**
     * 乱数のシード値をリセットする
     */
    static resetSeed() {
        this.init = true;
        this.x = 123456789;
        this.y = 362436069;
        this.z = 521288629;
        this.w = 8867512;
    }

    /**
     * 乱数を返す
     * 
     *     Math.random() と違い、毎回固定パターンで乱数が返される
     * Xorshiftアルゴリズム
     * @returns {number} 乱数
     */
    static random() {
        if (!this.init) this.resetSeed();
        const t = this.x ^ (this.x << 11);
        this.x = this.y; this.y = this.z; this.z = this.w;
        let r = this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
        r = Math.abs(r) / 2147483648 % 2;
        return r;
    }
}