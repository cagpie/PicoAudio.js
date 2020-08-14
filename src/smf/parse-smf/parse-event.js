import ArrayUtil from '../../util/array-util.js';
import {Number_MAX_SAFE_INTEGER} from '../../util/ponyfill.js';

export default function parseEvent(info) {
    // 関数呼び出し元からデータをもらう //
    const smf = info.smf;
    const header = info.header;
    const channels = info.channels;
    const tempoTrack = info.tempoTrack;
    let songLength = info.songLength;

    // SMFのMIDIイベント解析 //
    let tempo;
    let tempoCurTick;
    let tempoCurTime;
    let cc111Tick = -1;
    let cc111Time = -1;
    let firstNoteOnTiming = Number_MAX_SAFE_INTEGER; // 最初のノートオンのTick
    let firstNoteOnTime = Number_MAX_SAFE_INTEGER;
    let lastNoteOffTiming = 0; // 最後のノートオフのTick
    let lastNoteOffTime = 0;

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
        let reverb = this.settings.initReverb;
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
                                ArrayUtil.delete(nowNoteOnIdxAry, i); // nowNoteOnIdxAry.splice(i, 1); を軽量化
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
                                    ArrayUtil.delete(nowNoteOnIdxAry, i); // nowNoteOnIdxAry.splice(i, 1); を軽量化
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
                                        ArrayUtil.delete(nowNoteOnIdxAry, i); // nowNoteOnIdxAry.splice(i, 1); を軽量化
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
                    const ccAry = note[name];
                    for (let i2=ccAry.length-1; i2>=1; i2--) {
                        const obj = ccAry[i2];
                        if (obj.timing>lastNoteOffTiming) {
                            ArrayUtil.delete(ccAry, i2); // ccAry.splice(i2, 1); を軽量化
                        }
                    }
                });
                ArrayUtil.delete(nowNoteOnIdxAry, i); // nowNoteOnIdxAry.splice(i, 1); を軽量化
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

    // 関数呼び出し元にデータを返す //
    info.songLength = songLength;
    info.cc111Tick = cc111Tick;
    info.cc111Time = cc111Time;
    info.firstNoteOnTiming = firstNoteOnTiming;
    info.firstNoteOnTime = firstNoteOnTime;
    info.lastNoteOffTiming = lastNoteOffTiming;
    info.lastNoteOffTime = lastNoteOffTime;
    if (this.settings.isWebMIDI) {
        info.messages = messages;
        info.smfData = new Uint8Array(smf); // lastStateを上書きしたsmfをコピー
    }

    return info;
}