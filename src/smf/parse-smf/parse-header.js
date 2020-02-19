import ParseUtil from '../../util/parse-util.js';

export default function parseHeader(info) {
    // 関数呼び出し元からデータをもらう //
    const smf = info.smf;

    // SMFのヘッダチャンクを解析 //
    let p = 4; 
    const header = {};
    header.size = ParseUtil.getInt(smf, 4, 8);
    header.format = smf[9];
    header.trackcount = ParseUtil.getInt(smf, 10, 12);
    header.timemanage = smf[12];
    header.resolution = ParseUtil.getInt(smf, 12, 14); // TODO 0除算防止。15bit目1のとき、https://sites.google.com/site/yyagisite/material/smfspec#ConductorTrack
    p += 4 + header.size;

    // 変数を用意 //
    const channels = [];
    const chSize = this.settings.isWebMIDI ? 17 : 16; // WebMIDI用に17chに全てのイベントを入れるため17ch分作る
    for (let i=0; i<chSize; i++) {
        const channel = {};
        channels.push(channel);
        // smfを読む順番を記録した索引配列を作る //
        // 型付き配列をリスト構造の配列のように使う（リスト構造にすることで挿入処理を高速化する）
        // [tick, smfMesLength, smfPtr, nextIndicesPtr, ...]
        channel.indices = [];
        channel.indicesLength = 0;
        channel.indicesHead = -1; // 先頭のポインタ
        channel.indicesFoot = 0; // 末尾のポインタ
        channel.indicesCur = 0; // 現在のinsert用ポインタ
        channel.indicesPre = 0; // 前回のinsert用ポインタ
        channel.notes = [];
    }

    // 関数呼び出し元にデータを返す //
    info.p = p;
    info.header = header;
    info.channels = channels;
    return info;
}