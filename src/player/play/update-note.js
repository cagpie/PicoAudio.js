import ArrayUtil from '../../util/array-util.js';
import ParseUtil from '../../util/parse-util.js';
import {Performance} from '../../util/ponyfill.js';

export default class UpdateNote {
    /**
     * 1ms毎処理用の変数を初期化
     */
    static init(picoAudio, currentTime) {
        this.updatePreTime = Performance.now();
        this.pPreTime = Performance.now();
        this.cPreTime = picoAudio.context.currentTime * 1000;
        this.pTimeSum = 0;
        this.cTimeSum = 0;
        this.cnt = 0;
        this.initCurrentTime = currentTime;
    }

    /**
     * 再生中、1ms毎に呼ばれるコールバック
     * （ブラウザの制限で実際は最短4ms毎に呼ばれる）
     * @returns {number} 現在の時間
     */
    static update(picoAudio) {
        const context = picoAudio.context;
        const settings = picoAudio.settings;
        const states = picoAudio.states;
        const baseLatency = picoAudio.baseLatency;
        const updateNowTime = Performance.now();
        const updatePreTime = this.updatePreTime;
        let pPreTime = this.pPreTime;
        let cPreTime = this.cPreTime;
        let pTimeSum = this.pTimeSum;
        let cTimeSum = this.cTimeSum;
        let cnt = this.cnt;

        // サウンドが重くないか監視（フリーズ対策） //
        //   performance.now()とAudioContext.currentTimeの時間差を計算し
        //   AudioContext.currentTimeが遅れていたら処理落ちしていると判断する
        let updateBufTime = updateNowTime - updatePreTime;
        const pTime = updateNowTime;
        const cTime = context.currentTime * 1000;
        pTimeSum += pTime - pPreTime;
        cTimeSum += cTime - cPreTime;
        pPreTime = pTime;
        cPreTime = cTime;
        const latencyTime = pTimeSum - cTimeSum;
        states.latencyTime = latencyTime;

        // サウンドが重い場合、負荷軽減処理を発動するリミットを上げていく //
        if (latencyTime >= 100) { // currentTimeが遅い（サウンドが重い）
            states.latencyLimitTime += latencyTime;
            cTimeSum += 100;
        } else if (latencyTime <= -100) { // currentTimeが速い（誤差）
            cTimeSum = pTimeSum;
        } else {
            if (states.latencyLimitTime > 0) { // currentTimeが丁度いい
                states.latencyLimitTime -= updateBufTime*0.003;
                if (states.latencyLimitTime < 0) states.latencyLimitTime = 0;
            }
        }

        // ノートを先読み度合いを自動調整（予約しすぎると重くなる） //
        states.updateIntervalTime = updateBufTime;
        if (states.updateBufTime < updateBufTime) { // 先読み遅れている場合
            states.updateBufTime = updateBufTime;
        } else { // 先読み量に余裕がある場合
            // 先読み量を少しずつ減らす //
            if (states.updateBufMaxTime > 350) {
                states.updateBufMaxTime -= states.updateBufMaxTime*0.002;
            }
            // 先読み量を少しずつ増やす //
            if (states.updateBufTime < 20) {
                states.updateBufTime += states.updateBufTime*0.0005;
            }
            if (states.updateBufMaxTime >= 10 && states.updateBufMaxTime < 340) {
                states.updateBufMaxTime += states.updateBufMaxTime*0.002;
            }
        }
        // 先読み量が足りなくなった場合
        if (states.updateBufTime > states.updateBufMaxTime) {
            if (updateBufTime >= 900 && states.latencyLimitTime <= 150) {
                // バックグラウンドっぽくて重くない場合、バックグラウンド再生
                states.updateBufMaxTime += updateBufTime;
            } else { // 通常
                const tempTime = updateBufTime - states.updateBufMaxTime;
                states.updateBufTime = states.updateBufMaxTime;
                
                // 先読み量が小さい場合大きくする
                if (states.updateBufMaxTime < 10) {
                    states.updateBufTime = states.updateBufMaxTime;
                    states.updateBufMaxTime *= 1.25;
                } else {
                    states.updateBufMaxTime += tempTime / 2;
                }
            }
            if (states.updateBufMaxTime > 1100) states.updateBufMaxTime = 1100;
        }

        // サウンドが重すぎる場合、先読み度合いを小さくして負荷軽減 //
        if (states.latencyLimitTime > 150) {
            cTimeSum = pTimeSum;
            states.latencyLimitTime -= 5;
            if (states.latencyLimitTime > 1000) states.latencyLimitTime = 1000;
            // ノート先読みをかなり小さくする（フリーズ対策）
            states.updateBufMaxTime = 1;
            states.updateBufTime = 1;
            updateBufTime = 1;
        }

        // 再生処理 //
        for (let ch=0; ch<16; ch++) {
            const notes = picoAudio.playData.channels[ch].notes;
            let idx = states.playIndices[ch];
            for (; idx<notes.length; idx++) {
                const note = notes[idx];
                const curTime = cnt == 0 ? this.initCurrentTime - states.startTime
                    : context.currentTime - states.startTime;
                // 終わったノートは演奏せずにスキップ
                if (curTime >= note.stopTime) continue;
                // （シークバーで途中から再生時）startTimeが過ぎたものは鳴らさない
                if (cnt == 0 && curTime > note.startTime + baseLatency) continue;
                // 演奏開始時間 - 先読み時間(ノート予約) になると演奏予約or演奏開始
                if (curTime < note.startTime - states.updateBufTime/1000) break;

                // PicoAudio音源の再生処理 //
                if (!settings.isWebMIDI) { 
                    // 予約ノート数が急激に増えそうな時、先読み量を小さくしておく //
                    if (states.stopFuncs.length >= 350 && states.updateBufTime < 1000) {
                        states.updateBufTime = 12;
                        states.updateBufMaxTime = states.updateBufTime;
                    }

                    // レトロモード（和音制限モード） //
                    if (settings.maxPoly != -1 || settings.maxPercPoly != -1) {
                        let polyCnt = 0;
                        let percCnt = 0;
                        states.stopFuncs.forEach((tar) => {
                            if (!tar.note) return;
                            if (tar.note.channel != 9) {
                                if (note.start >= tar.note.start && note.start < tar.note.stop) {
                                    polyCnt++;
                                }
                            } else {
                                if (note.start == tar.note.start) {
                                    percCnt++;
                                }
                            }
                        });
                        if ((note.channel != 9 && polyCnt >= settings.maxPoly)
                            || (note.channel == 9 && percCnt >= settings.maxPercPoly)) {
                            continue;
                        }
                    }

                    // １ノート分の再生処理（WebAudioで再生） //
                    const stopFunc =
                        note.channel != 9 ? picoAudio.createNote(note)
                        : picoAudio.createPercussionNote(note);
                    if (!stopFunc) continue; // 無音の場合、処理しない
                    picoAudio.pushFunc({
                        note: note,
                        stopFunc: stopFunc
                    });
                }
                states.noteOnAry.push(note);
            }
            // notesのどこまで再生したかを記憶して、次回コールバック時にそこから処理を始める
            states.playIndices[ch] = idx;
        }

        // noteOnの時間になったか監視 //
        this.checkNoteOn(picoAudio);

        // noteOffの時間になったか監視 //
        this.checkNoteOff(picoAudio);

        // WebMIDIの再生処理 //
        if (settings.isWebMIDI && settings.WebMIDIPortOutput != null) {
            const messages = picoAudio.playData.messages;
            const smfData = picoAudio.playData.smfData;
            let idx = states.playIndices[16]; // 17chはWebMIDI用
            for (; idx<messages.length; idx++) {
                const message = messages[idx];
                const curTime = context.currentTime - states.startTime;

                // 終わったノートは演奏せずにスキップ
                if (curTime > message.time + 1) continue;
                // 演奏開始時間 - 先読み時間(ノート予約) になると演奏予約or演奏開始
                if (curTime < message.time - 1) break;

                // WebMIDIでMIDIメッセージを送信する処理 //
                const pLen = message.smfPtrLen;
                const p = message.smfPtr;
                const time = message.time;
                const state = smfData[p];
                if (state!=0xff) {
                    try {
                        if (state==0xF0 || state==0xF7) {
                            // sysExのMIDIメッセージ
                            if (settings.WebMIDIPortSysEx) {
                                // 長さ情報を取り除いて純粋なSysExメッセージにする
                                const lengthAry = ParseUtil.variableLengthToInt(smfData, p+1, p+1+4);
                                const sysExStartP = p+1+lengthAry[1];
                                const sysExEndP = sysExStartP+lengthAry[0];
                                const webMIDIMes = new Uint8Array(1 + lengthAry[0]);
                                webMIDIMes[0] = state;
                                const size = sysExEndP - sysExStartP;
                                for (let i=0; i<size; i++)
                                    webMIDIMes[i+1] = smfData[sysExStartP + i];
                                settings.WebMIDIPortOutput.send(webMIDIMes,
                                    (time - context.currentTime + Performance.now()/1000 + states.startTime) * 1000);
                            }
                        } else {
                            // sysEx以外のMIDIメッセージ
                            const sendMes = [];
                            for (let i=0; i<pLen; i++) sendMes.push(smfData[p+i]);
                            settings.WebMIDIPortOutput.send(sendMes,
                                (time - context.currentTime + Performance.now()/1000 + states.startTime) * 1000);
                        }
                    } catch(e) {
                        console.log(e, p, pLen, time, state);
                    }
                }
            }
            // messagesのどこまで送信したかを記憶して、次回コールバック時にそこから処理を始める
            states.playIndices[16] = idx;
        }

        // 1msコールバックが呼ばれた回数をカウント
        cnt ++;

        // 変数を反映 //
        this.updatePreTime = updateNowTime;
        this.pPreTime = pPreTime;
        this.cPreTime = cPreTime;
        this.pTimeSum = pTimeSum;
        this.cTimeSum = cTimeSum;
        this.cnt = cnt;
    }

    /**
     * noteOnの時間になったか監視
     * @param {PicoAudio} picoAudio PicoAudioインスタンス
     */
    static checkNoteOn(picoAudio) {
        const context = picoAudio.context;
        const trigger = picoAudio.trigger;
        const states = picoAudio.states;
        const noteOnAry = picoAudio.states.noteOnAry;
        const noteOffAry = picoAudio.states.noteOffAry;

        for (let i=0; i<noteOnAry.length; i++) {
            const tempNote = noteOnAry[i];
            const nowTime = context.currentTime - states.startTime;
            if (tempNote.startTime - nowTime <= 0) {
                ArrayUtil.delete(noteOnAry, i); // noteOnAry.splice(i, 1); の高速化
                noteOffAry.push(tempNote);

                // イベント発火
                if (trigger.isNoteTrigger) trigger.noteOn(tempNote);
                picoAudio.fireEvent('noteOn', tempNote);

                i--;
            }
        }
    }

    /**
     * noteOffの時間になったか監視
     * @param {PicoAudio} picoAudio PicoAudioインスタンス
     */
    static checkNoteOff(picoAudio) {
        const context = picoAudio.context;
        const trigger = picoAudio.trigger;
        const states = picoAudio.states;
        const noteOffAry = picoAudio.states.noteOffAry;

        for (let i=0; i<noteOffAry.length; i++) {
            const tempNote = noteOffAry[i];
            const nowTime = context.currentTime - states.startTime;
            if ((tempNote.channel != 9 && tempNote.stopTime - nowTime <= 0)
                || (tempNote.channel == 9 && tempNote.drumStopTime - nowTime <= 0)) {
                ArrayUtil.delete(noteOffAry, i); // noteOffAry.splice(i, 1); の高速化
                picoAudio.clearFunc("note", tempNote);

                // イベント発火
                if (trigger.isNoteTrigger) trigger.noteOff(tempNote);
                picoAudio.fireEvent('noteOff', tempNote);

                i--;
            }
        }
    }
}