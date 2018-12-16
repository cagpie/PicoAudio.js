import arrayDelete from '../util/array-splice.js';
import ParseUtil from '../util/parse-util.js';

export default function parseSMF(_smf) {
    if (this.debug) {
        console.log(_smf);
        var syoriTimeS = performance.now();
    }

    // smf配列はデータ上書きするので_smfをディープコピーする
    const smf = new Uint8Array(_smf);

    // SMFのフォーマットかどうかチェック //
    if (smf[0] != 77 || smf[1] != 84 || smf[2] != 104 || smf[3] != 100)
        return "Not Sandard MIDI File.";

    // SMFのヘッダチャンクを解析 //
    const data = {};
    let p = 4;
    const header = {};
    header.size = ParseUtil.getInt(smf, 4, 8);
    header.format = smf[9];
    header.trackcount = ParseUtil.getInt(smf, 10, 12);
    header.timemanage = smf[12];
    header.resolution = ParseUtil.getInt(smf, 12, 14); // TODO 0除算防止。15bit目1のとき、https://sites.google.com/site/yyagisite/material/smfspec#ConductorTrack
    p += 4 + header.size;

    // 変数を用意 //
    const tempoTrack = [];
    const beatTrack = [];
    const channels = [];
    let cc111Tick = -1;
    let cc111Time = -1;
    let firstNoteOnTiming = Number.MAX_SAFE_INTEGER; // 最初のノートオンのTick
    let firstNoteOnTime = Number.MAX_SAFE_INTEGER;
    let lastNoteOffTiming = 0; // 最後のノートオフのTick
    let lastNoteOffTime = 0;
    const chSize = this.settings.isWebMIDI ? 17 : 16; // WebMIDI用に17chに全てのメッセージを入れるため17ch分作る
    for (let i=0; i<chSize; i++) {
        const channel = {};
        channels.push(channel);
        // smfを読む順番を記録した索引配列を作る //
        // 型付き配列をリスト構造の配列のように使う（リスト構造にすることで挿入処理を高速化する）
        // [tick, smfMesLength, smfPtr, nextIndicesPtr, ...]
        channel.indices = new Int32Array(Math.floor(smf.length/8));
        channel.indicesLength = 0;
        channel.indicesHead = -1; // 先頭のポインタ
        channel.indicesFoot = 0; // 末尾のポインタ
        channel.indicesCur = 0; // 現在のinsert用ポインタ
        channel.indicesPre = 0; // 前回のinsert用ポインタ
        channel.notes = [];
    }

    if (this.debug) {
        var syoriTimeS1_1 = performance.now();
    }

    // トラックチャンクの解析 //
    //   解析しながら、一旦デルタタイム順にソートした配列を作成する
    //   そのあと、SMFの本解析をする
    //   配列ソートを高速化するため、配列をリスト構造のように使っている
    //   （リスト構造にすることで、配列要素のinsertのコストを小さくできる）
    let songLength = 0;
    for (let t=0; t<header.trackcount; t++) {
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
                let lengthAry = ParseUtil.variableLengthToInt(smf, p, p+5);
                dt = lengthAry[0];
                tick += dt;
                p += lengthAry[1];
            }
            let cashP = p; // WebMIDI用
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
                    chIndicesSplice(this, ch, tick, p, 3); // デルタタイムの順番になるようにリスト配列に挿入
                    p += 3;
                    break;
                }
                case 0xC: // Program Change - C[ch],
                case 0xD: // Channel Pre - D[ch],
                {
                    // チャンネル毎に仕分けた後に解析する
                    lastState = smf[p];
                    const ch = channels[lastState&0x0F];
                    chIndicesSplice(this, ch, tick, p, 2); // デルタタイムの順番になるようにリスト配列に挿入
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
                                // 全チャンネルにMasterVolumeメッセージを挿入する
                                for (let i=0; i<16; i++) {
                                    const ch = channels[i];
                                    chIndicesSplice(this, ch, tick, p, lengthAry[0]); // デルタタイムの順番になるように配列に挿入
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
                                    // 全チャンネルにTempoメッセージを挿入する
                                    for (let i=0; i<16; i++) {
                                        const ch = channels[i];
                                        chIndicesSplice(this, ch, tick, p, 6); // デルタタイムの順番になるように配列に挿入
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
                    // WebMIDI用に17chに全てのMIDIメッセージを入れる
                    chIndicesSplice(this, channels[16], tick, cashP, p - cashP);
                }
            }
        }
        if (!this.settings.isSkipEnding && songLength<tick) songLength = tick;
        // リスト配列のポインタを初期化
        for (let i=0; i<channels.length; i++) {
            channels[i].indicesCur = channels[i].indicesHead;
            channels[i].indicesPre = channels[i].indicesHead;
        }
    }

    if (this.debug) {
        var syoriTimeS2 = performance.now();
    }

    // SMFの本解析 //
    let tempo;
    let tempoCurTick;
    let tempoCurTime;
    // Midi Events (0x8n - 0xEn) parse
    for (let ch=0; ch<16; ch++) {
        const channel = channels[ch];
        let dataEntry = 2;
        let pitchBend = 0;
        let pan = 64;
        let expression = 127;
        let velocity = 100;
        let modulation = 0;
        let hold = 0;
        let reverb = this.isTonyu2 ? 0 : 10;
        let chorus = 0;
        let nrpnLsb = 127;
        let nrpnMsb = 127;
        let rpnLsb = 127;
        let rpnMsb = 127;
        let instrument = 0;
        let masterVolume = 127;
        tempo = 120;
        tempoCurTick = 0;
        tempoCurTime = 0;
        const nowNoteOnIdxAry = [];
        let indIdx = channel.indicesHead;
        const indices = channel.indices;
        const nextNoteOnAry = new Array(128);
        while (indIdx != -1) {
            const tick = indices[indIdx];
            const p = indices[indIdx+2];
            const nextIdx = indices[indIdx+3];
            const time = (60 / tempo / header.resolution) * (tick - tempoCurTick) + tempoCurTime;

            // Events
            const mes0 = smf[p] >> 4; // Math.floor(smf[p] / 0x10)
            switch (mes0) {
                case 0x8: // Note OFF - 8[ch], Pitch, Velocity
                case 0x9: // Note ON - 9[ch], Pitch, Velocity
                    if (mes0 == 0x9 && smf[p+2] != 0) { // ノートオン
                        // ノート情報が入ったオブジェクトを作成 //
                        const note = {
                            start: tick,
                            stop: null,
                            startTime: time,
                            stopTime: null,
                            pitch: smf[p+1],
                            pitchBend: [{timing:tick,time:time,value:pitchBend}],
                            pan: [{timing:tick,time:time,value:pan}],
                            expression: [{timing:tick,time:time,value:expression*(masterVolume/127)}],
                            velocity: (smf[p+2]/127)*(velocity/127),
                            modulation: [{timing:tick,time:time,value:modulation}],
                            holdBeforeStop: null,
                            reverb: [{timing:tick,time:time,value:reverb}],
                            chorus: [{timing:tick,time:time,value:chorus}],
                            instrument: instrument,
                            channel: ch,
                            nextSameNoteOnInterval: -1,
                            drumStopTime: 2 // 再生時に使う
                        };

                        // 前回鳴っていた同音ノートに次のノートオン時間を入れる //
                        // 同音ノートを二重再生したくない場合のために記録する //
                        const prevNote = nextNoteOnAry[smf[p+1]];
                        if (prevNote) {
                            prevNote.nextSameNoteOnInterval = time - prevNote.startTime;
                        }
                        nextNoteOnAry[smf[p+1]] = note;

                        // 同音ノートがノートオン中の場合、ノートオフにする //
                        nowNoteOnIdxAry.some((idx,i) => {
                            const note = channel.notes[idx];
                            if (note.pitch == smf[p+1] && note.stop==null) {
                                note.stop = tick;
                                note.stopTime = time;
                                arrayDelete(nowNoteOnIdxAry, i); // nowNoteOnIdxAry.splice(i, 1); を軽量化
                            }
                        });

                        // ノートオン中配列に入れる
                        nowNoteOnIdxAry.push(channel.notes.length);
                        // notes一覧にnoteオブジェクトを入れる
                        channel.notes.push(note);

                        // 最初のノートオン時間を記録 //
                        if (tick < firstNoteOnTiming) {
                            firstNoteOnTiming = tick;
                            firstNoteOnTime = time;
                        }
                    } else { // ノートオフ
                        // ノートオン中配列から該当ノートを探し、ノートオフ処理をする //
                        nowNoteOnIdxAry.some((idx, i) => {
                            const note = channel.notes[idx];
                            if (note.pitch == smf[p+1] && note.stop == null) {
                                if (hold >= this.settings.holdOnValue) { // ホールドが効いている場合
                                    if (note.holdBeforeStop == null) {
                                        note.holdBeforeStop = [{
                                            timing: tick,
                                            time: time,
                                            value: hold
                                        }];
                                    }
                                } else { // ホールドしていない場合
                                    note.stop = tick;
                                    note.stopTime = time;
                                    arrayDelete(nowNoteOnIdxAry, i); // nowNoteOnIdxAry.splice(i, 1); を軽量化
                                }

                                // 最後のノートオフ時間を記録 //
                                if (tick > lastNoteOffTiming) {
                                    lastNoteOffTiming = tick;
                                    lastNoteOffTime = time;
                                }
                                return true;
                            }
                        });
                    }
                    break;
                // Polyfonic Key Pressure - A[ch], Pitch?, Velocity?
                case 0xA:
                    break;
                // Control Change - B[ch],,
                case 0xB:
                    switch (smf[p+1]) {
                        case 1:
                            // modulation
                            modulation = smf[p+2];
                            nowNoteOnIdxAry.forEach((idx) => {
                                const note = channel.notes[idx];
                                note.modulation.push({
                                    timing: tick,
                                    time: time,
                                    value: modulation
                                });
                            });
                            break;
                        case 6:
                            if (rpnLsb==0 && rpnMsb==0) {
                                // RLSB=0 & RMSB=0 -> 6はピッチ
                                dataEntry = smf[p+2];
                                if (dataEntry > 24) {
                                    dataEntry = 24;
                                }
                            }
                            if (nrpnLsb==8 && nrpnMsb==1) {
                                // (保留)ビブラート・レイト(GM2/GS/XG)
                                //console.log("CC  8 1 6 "+smf[p+2]+" tick:"+tick);
                            } else if (nrpnLsb==9 && nrpnMsb==1) {
                                // (保留)ビブラート・デプス(GM2/GS/XG)
                                //console.log("CC  9 1 6 "+smf[p+2]+" tick:"+tick);
                            } else if (nrpnLsb==10 && nrpnMsb==1) {
                                // (保留)ビブラート・ディレイ(GM2/GS/XG)
                                //console.log("CC 10 1 6 "+smf[p+2]+" tick:"+tick);
                            }
                            break;
                        case 7: 
                            velocity = smf[p+2];
                            break;
                        case 10: // Pan
                            pan = smf[p+2];
                            nowNoteOnIdxAry.forEach((idx) => {
                                const note = channel.notes[idx];
                                note.pan.push({
                                    timing: tick,
                                    time: time,
                                    value: pan
                                });
                            });
                            break;
                        case 11: // Expression
                            expression = smf[p+2];
                            nowNoteOnIdxAry.forEach((idx) => {
                                const note = channel.notes[idx];
                                note.expression.push({
                                    timing: tick,
                                    time: time,
                                    value: expression*(masterVolume/127)
                                });
                            });
                            break;
                        case 64: // Hold1
                            hold = smf[p+2];
                            if (hold < this.settings.holdOnValue) {
                                for (let i=nowNoteOnIdxAry.length-1; i>=0; i--) {
                                    const idx = nowNoteOnIdxAry[i];
                                    const note = channel.notes[idx];
                                    if (note.stop == null && note.holdBeforeStop != null) {
                                        note.stop = tick;
                                        note.stopTime = time;
                                        arrayDelete(nowNoteOnIdxAry, i); // nowNoteOnIdxAry.splice(i, 1); を軽量化
                                    }
                                }
                            }
                            break;
                        case 91: // reverb
                            reverb = smf[p+2];
                            nowNoteOnIdxAry.forEach((idx) => {
                                const note = channel.notes[idx];
                                note.reverb.push({
                                    timing: tick,
                                    time: time,
                                    value: reverb
                                });
                            });
                            break;
                        case 93: // chorus
                            chorus = smf[p+2];
                            nowNoteOnIdxAry.forEach((idx) => {
                                const note = channel.notes[idx];
                                note.chorus.push({
                                    timing: tick,
                                    time: time,
                                    value: chorus
                                });
                            });
                            break;
                        case 98:
                            nrpnLsb = smf[p+2];
                            break;
                        case 99:
                            nrpnMsb = smf[p+2];
                            break;
                        case 100:
                            rpnLsb = smf[p+2];
                            break;
                        case 101:
                            rpnMsb = smf[p+2];
                            break;
                        case 111: // RPGツクール用ループ(CC111)
                            if (cc111Tick == -1) {
                                cc111Tick = tick;
                                cc111Time = time;
                            }
                            break;
                    }
                    break;
                // Program Change - C[ch],
                case 0xC:
                    instrument = smf[p+1];
                    break;
                // Channel Pre - D[ch],
                case 0xD:
                    break;
                // PitchBend Change - E[ch],,
                case 0xE:
                    pitchBend = ((smf[p+2]*128+smf[p+1])-8192)/8192*dataEntry;
                    nowNoteOnIdxAry.forEach((idx) => {
                        const note = channel.notes[idx];
                        note.pitchBend.push({
                            timing: tick,
                            time: time,
                            value: pitchBend
                        });
                    });
                    break;
                case 0xF:
                    //lastState = smf[p]; <- ランニングステートは無い
                    switch (smf[p]) {
                        case 0xF0:
                        case 0xF7:
                            // Master Volume
                            if (smf[p+1]==0x7f && smf[p+2]==0x7f && smf[p+3]==0x04 && smf[p+4]==0x01) {
                                let vol = smf[p+6];
                                if (vol > 127) vol = 127;
                                masterVolume = vol;
                                nowNoteOnIdxAry.forEach((idx) => {
                                    const note = channel.notes[idx];
                                    note.expression.push({
                                        timing: tick,
                                        time: time,
                                        value: expression*(masterVolume/127)
                                    });
                                });
                            }
                            break;
                        case 0xFF:
                            // Meta Events
                            switch (smf[p+1]) {
                                case 0x51:
                                    // Tempo
                                    tempoCurTime += (60 / tempo / header.resolution) * (tick - tempoCurTick);
                                    tempoCurTick = tick;
                                    tempo = 60000000/(smf[p+3]*0x10000 + smf[p+4]*0x100 + smf[p+5]);
                                    break;
                            }
                        break;
                    }
                    break;
                default: {
                    return "Error parseSMF. ";
                }
            }
            indIdx = nextIdx;
        }
        channel.nowNoteOnIdxAry = nowNoteOnIdxAry;
        if (!this.debug) {
            delete channel.indices;
        }
    }

    // ホールドが効いてノートオンのままになったノートをノートオフする //
    for (let ch=0; ch<16; ch++) {
        const channel = channels[ch];
        const nowNoteOnIdxAry = channel.nowNoteOnIdxAry;
        for (let i=nowNoteOnIdxAry.length-1; i>=0; i--) {
            const note = channel.notes[nowNoteOnIdxAry[i]];
            if (note.stop==null) {
                note.stop = lastNoteOffTiming;
                note.stopTime = lastNoteOffTime;
                // If (note.cc[x].timing > lastNoteOffTiming), delete note.cc[x]
                const nameAry = ["pitchBend", "pan", "expression", "modulation", "reverb", "chorus"];
                nameAry.forEach((name) => {
                    const ccAry = note[name]
                    for (let i2=ccAry.length-1; i2>=1; i2--) {
                        const obj = ccAry[i2];
                        if (obj.timing>lastNoteOffTiming) {
                            arrayDelete(ccAry, i2); // ccAry.splice(i2, 1); を軽量化
                        }
                    }
                });
                arrayDelete(nowNoteOnIdxAry, i); // nowNoteOnIdxAry.splice(i, 1); を軽量化
            }
        }
        delete channel.nowNoteOnIdxAry;
    }
    if (this.settings.isSkipEnding) songLength = lastNoteOffTiming;
    tempoTrack.push({ timing:songLength, time:(60 / tempo / header.resolution) * (songLength - tempoCurTick) + tempoCurTime, value:120 });

    // WebMIDI用のMIDIメッセージを作成 //
    const messages = [];
    if (this.settings.isWebMIDI) {
        const channel = channels[16];
        let tempo = 120;
        let tempoCurTick = 0;
        let tempoCurTime = 0;
        let indIdx = channel.indicesHead;
        const indices = channel.indices;
        while (indIdx != -1) {
            const tick = indices[indIdx];
            const pLen = indices[indIdx+1];
            const p = indices[indIdx+2];
            const nextIdx = indices[indIdx+3];
            const time = (60 / tempo / header.resolution) * (tick - tempoCurTick) + tempoCurTime;
            // Events
            switch (smf[p]) {
                case 0xFF:
                // Meta Events
                switch (smf[p+1]) {
                    case 0x51:
                        // Tempo
                        tempoCurTime += (60 / tempo / header.resolution) * (tick - tempoCurTick);
                        tempoCurTick = tick;
                        tempo = 60000000/(smf[p+3]*0x10000 + smf[p+4]*0x100 + smf[p+5]);
                        break;
                }
            }
            messages.push({time:time, tick:tick, smfPtr:p, smfPtrLen:pLen});
            indIdx = nextIdx;
        }
    }

    // return用のオブジェクトに情報を代入 //
    data.header = header;
    data.tempoTrack = tempoTrack;
    data.beatTrack = beatTrack;
    data.channels = channels;
    data.songLength = songLength;
    data.cc111Tick = cc111Tick;
    data.cc111Time = cc111Time;
    data.firstNoteOnTiming = firstNoteOnTiming;
    data.firstNoteOnTime = firstNoteOnTime;
    data.lastNoteOffTiming = lastNoteOffTiming;
    data.lastNoteOffTime = lastNoteOffTime;
    if (this.settings.isWebMIDI) {
        data.messages = messages;
        data.smfData = new Uint8Array(smf); // lastStateを上書きしたsmfをコピー
    }

    if (this.debug) {
        const syoriTimeE = performance.now();
        console.log("parseSMF time", syoriTimeE - syoriTimeS);
        console.log("parseSMF(0/2) time", syoriTimeS1_1 - syoriTimeS);
        console.log("parseSMF(1/2) time", syoriTimeS2 - syoriTimeS);
        console.log("parseSMF(2/2) time", syoriTimeE - syoriTimeS2);
        console.log(data);
    }
    return data;
};



/**
 * デルタタイムの順番になるように配列に挿入
 * @param {PicoAudio} that PicoAudioインスタンス
 * @param {number} ch チャンネル番号
 * @param {number} time デルタタイム
 * @param {number} p 対象のMIDIメッセージの場所(SMFデータ内の位置)
 * @param {number} len MIDIメッセージの長さ
 */
function chIndicesSplice(that, ch, time, p, len) {
    let indices = ch.indices;
    // メモリー足りなくなったら拡張
    if (indices.length <= ch.indicesLength+4) {
        if (that.debug) {
            var ts1 = performance.now();
        }
        let temp = new Int32Array(Math.floor(indices.length*2));
        for (let i=indices.length-1; i>=0; i--) {
            temp[i] = indices[i];
        }
        ch.indices = indices = temp;
        if (that.debug) {
            console.log("malloc", performance.now() - ts1, temp.length);
        }
    }
    // デルタタイムの順番になるようにリスト配列に挿入
    if (ch.indicesLength >= 4 && time < indices[ch.indicesFoot]) {
        // Insert
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
        // Push
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
