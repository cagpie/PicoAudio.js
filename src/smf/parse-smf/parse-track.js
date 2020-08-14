import ParseUtil from '../../util/parse-util.js';

export default function parseTrack(info) {
    // 関数呼び出し元からデータをもらう //
    const smf = info.smf;
    let p = info.p;
    const header = info.header;
    const channels = info.channels;

    // SMFのトラックチャンクの解析・"SMF読み込み順序配列"を作成 //
    //   全トラックを解析しながら、SMFを読む順番を記録した配列を作成する
    //   読み込む順番は、この解析でデルタタイム順になるようソートしておく
    //   SMFのMIDIイベント解析時は、上記配列から「次はMIDIファイルの何バイト目を見るか」を取得して解析する
    //   上記配列はリスト構造の配列のように使う（リスト構造にすることで配列のinsert処理を高速化する）
    // 
    // ■配列イメージ（json風）■
    // [
    //     {
    //         tick : このMIDIイベントのTick,
    //         smfMesLength : １つのMIDIイベントの長さ,
    //         smfPtr : このMIDIイベントはMIDIファイルの何バイト目にあるか,
    //         nextIndicesPtr : 次のオブジェクトはリスト配列の何番目にあるか
    //     },
    //     ...
    // ]
    // 
    // ■実際の配列イメージ■
    // [tick, smfMesLength, smfPtr, nextIndicesPtr, ...]

    const tempoTrack = [];
    const beatTrack = [];
    let songLength = 0;
    for (let t=0; t<header.trackcount; t++) {
        // "MTrk"
        if (smf[p] != 77 || smf[p+1] != 84 || smf[p+2] != 114 || smf[p+3] != 107)
            return "Irregular SMF.";
        p += 4;
        const endPoint = p + 4 + ParseUtil.getInt(smf, p, p+4);
        p += 4;
        let tick = 0;
        let tempo = 120;
        let tempoCurTick = 0;
        let tempoCurTime = 0;
        let lastState = 1;
        let dt;
        while (p<endPoint) {
            // DeltaTime
            if (lastState != null) {
                const lengthAry = ParseUtil.variableLengthToInt(smf, p, p+5);
                dt = lengthAry[0];
                tick += dt;
                p += lengthAry[1];
            }
            const cashP = p; // WebMIDI用
            // Events
            const mes0 = smf[p] >> 4; // Math.floor(smf[p] / 0x10)
            switch (mes0) {
                case 0x8: // Note OFF - 8[ch], Pitch, Velocity
                case 0x9: // Note ON - 9[ch], Pitch, Velocity
                case 0xA: // Polyfonic Key Pressure - A[ch], Pitch?, Velocity?
                case 0xB: // Control Change - B[ch],,
                case 0xE: // PitchBend Change - E[ch],,
                {
                    // チャンネル毎に仕分けた後に解析する
                    lastState = smf[p];
                    const ch = channels[lastState&0x0F];
                    ParseUtil.chIndicesInsert(this, ch, tick, p, 3);
                    p += 3;
                    break;
                }
                case 0xC: // Program Change - C[ch],
                case 0xD: // Channel Pre - D[ch],
                {
                    // チャンネル毎に仕分けた後に解析する
                    lastState = smf[p];
                    const ch = channels[lastState&0x0F];
                    ParseUtil.chIndicesInsert(this, ch, tick, p, 2);
                    p += 2;
                    break;
                }
                // SysEx Events or Meta Events - F[ch], ...
                case 0xF: {
                    //lastState = smf[p]; <- ランニングステートは無い
                    switch (smf[p]) {
                        case 0xF0:
                        case 0xF7: {
                            // SysEx Events
                            const lengthAry = ParseUtil.variableLengthToInt(smf, p+1, p+1+4);

                            // Master Volume
                            // 0xF0, size, 0x7f, 0x7f, 0x04, 0x01, 0xNN, volume, 0xF7
                            if (lengthAry[0] >= 7
                                && smf[p+2] == 0x7f
                                && smf[p+3] == 0x7f
                                && smf[p+4] == 0x04
                                && smf[p+5] == 0x01) {
                                // 全チャンネルにMasterVolumeイベントを挿入する
                                for (let i=0; i<16; i++) {
                                    const ch = channels[i];
                                    ParseUtil.chIndicesInsert(this, ch, tick, p, lengthAry[0]);
                                }
                            }

                            p += 1 + lengthAry[1] + lengthAry[0];
                            break;
                        }
                        case 0xF1:
                            p += 2;
                            break;
                        case 0xF2:
                            p += 3;
                            break;
                        case 0xF3:
                            p += 2;
                            break;
                        case 0xF6:
                        case 0xF8:
                        case 0xFA:
                        case 0xFB:
                        case 0xFC:
                        case 0xFE:
                            p += 1;
                            break;
                        case 0xFF: {
                            // Meta Events
                            switch (smf[p+1]) {
                                case 0x00:
                                case 0x01:
                                case 0x02:
                                case 0x03:
                                case 0x04:
                                case 0x05:
                                case 0x06:
                                case 0x07:
                                case 0x20:
                                    break;
                                case 0x2F:
                                    tick += (this.settings.isSkipEnding ? 0 : header.resolution) - dt;
                                    break;
                                case 0x51: // Tempo
                                    // 全チャンネルにTempoイベントを挿入する
                                    for (let i=0; i<16; i++) {
                                        const ch = channels[i];
                                        ParseUtil.chIndicesInsert(this, ch, tick, p, 6);
                                    }
                                    tempoCurTime += (60 / tempo / header.resolution) * (tick - tempoCurTick);
                                    tempoCurTick = tick;
                                    tempo = 60000000/(smf[p+3]*0x10000 + smf[p+4]*0x100 + smf[p+5]);
                                    tempoTrack.push({
                                        timing: tick,
                                        time: tempoCurTime,
                                        value: tempo
                                    });
                                    break;
                                case 0x54:
                                    break;
                                case 0x58: // Beat
                                    beatTrack.push({
                                        timing: tick,
                                        value: [smf[p+3], Math.pow(2, smf[p+4])]
                                    });
                                    break;
                                case 0x59:
                                case 0x7F:
                                    break;
                            }
                            const lengthAry = ParseUtil.variableLengthToInt(smf, p+2, p+2+4);
                            p += 2 + lengthAry[1] + lengthAry[0];
                            break;
                        }
                    }
                    break;
                }
                default: {
                    if (lastState == null)
                        return "Irregular SMF. (" + p + " byte addr)";
                    p--;
                    smf[p] = lastState; // 上書き
                    lastState = null;
                }
            }
            // WebMIDIAPI
            if (this.settings.isWebMIDI) {
                if (lastState != null) {
                    // WebMIDI用に17chに全てのMIDIイベントを入れる
                    ParseUtil.chIndicesInsert(this, channels[16], tick, cashP, p - cashP);
                }
            }
        }
        if (!this.settings.isSkipEnding && songLength < tick) songLength = tick;
        // リスト配列のポインタを初期化
        for (let i=0; i<channels.length; i++) {
            channels[i].indicesCur = channels[i].indicesHead;
            channels[i].indicesPre = channels[i].indicesHead;
        }
    }

    // 関数呼び出し元にデータを返す //
    info.p = p;
    info.tempoTrack = tempoTrack;
    info.beatTrack = beatTrack;
    info.songLength = songLength;
    return info;
}
