import arrayDelete from '../util/array-splice.js';
import ParseUtil from '../util/parse-util.js';

export default function play(isSongLooping) {
    const context = this.context;
    const settings = this.settings;
    const trigger = this.trigger;
    const states = this.states;

    // 再生中の場合、処理しない //
    if (states.isPlaying) return;

    // WebMIDIの場合、少し待ってから再生する //
    if (settings.isWebMIDI && !isSongLooping) {
        // Web MIDI API使用時はstop()から800ms程待機すると音がバグりにくい
        if (states.webMIDIWaitState != "completed") {
            if (states.webMIDIWaitState != "waiting") { // play()連打の対策
                // stop()から800ms後にplay()を実行
                states.webMIDIWaitState = "waiting";
                let waitTime = 1000 - (context.currentTime - states.webMIDIStopTime)*1000;
                if (states.webMIDIStopTime == 0) waitTime = 1000; // MIDI Portをopenして最初に呼び出すときも少し待つ
                setTimeout(() => {
                    states.webMIDIWaitState = "completed";
                    states.isPlaying = false;
                    this.play();
                }, waitTime);
            }
            return;
        } else {
            states.webMIDIWaitState = null;
        }
    }

    // 変数を用意 //
    const currentTime = context.currentTime;
    this.isPlayed = true;
    states.isPlaying = true;
    states.startTime = !states.startTime && !states.stopTime ? currentTime : (states.startTime + currentTime - states.stopTime);
    states.stopFuncs = [];

    // 冒頭の余白をスキップ //
    if (settings.isSkipBeginning) {
        const firstNoteOnTime = this.firstNoteOnTime;
        if (-states.startTime + currentTime < firstNoteOnTime) {
            this.setStartTime(firstNoteOnTime + states.startTime - currentTime);
        }
    }

    // 曲終了コールバックを予約 //
    let reserveSongEnd;
    const reserveSongEndFunc = () => {
        this.clearFunc("rootTimeout", reserveSongEnd);
        const finishTime = (settings.isCC111 && this.cc111Time != -1) ? this.lastNoteOffTime : this.getTime(Number.MAX_SAFE_INTEGER);
        if (finishTime - context.currentTime + states.startTime <= 0) {
            // 予定の時間以降に曲終了
            trigger.songEnd();
            this.onSongEnd();
            this.fireEvent('songEnd');
        } else {
            // 処理落ちしたりしてまだ演奏中の場合、1ms後に曲終了コールバックを呼び出すよう予約
            reserveSongEnd = setTimeout(reserveSongEndFunc, 1);
            this.pushFunc({
                rootTimeout: reserveSongEnd,
                stopFunc: () => { clearTimeout(reserveSongEnd); }
            });
        }
    };
    const finishTime = settings.isCC111 && this.cc111Time != -1
        ? this.lastNoteOffTime
        : this.getTime(Number.MAX_SAFE_INTEGER);
    const reserveSongEndTime = (finishTime - context.currentTime + states.startTime) * 1000;
    reserveSongEnd = setTimeout(reserveSongEndFunc, reserveSongEndTime);
    this.pushFunc({
        rootTimeout: reserveSongEnd,
        stopFunc: () => { clearTimeout(reserveSongEnd); }
    });

    // 再生開始をコールバックに通知 //
    trigger.play();
    this.fireEvent('play');

    // 1ms毎コールバックの変数を準備 //
    updateNowTime = performance.now();
    pPreTime = performance.now(); // previous performance.now()
    cPreTime = context.currentTime * 1000; // previous AudioContext.currentTime
    pTimeSum = 0;
    cTimeSum = 0;
    cnt = 0;

    // 1ms毎コールバックを開始 //
    const reserve = setInterval(() => {
        updateNowTime = updateNote.call(this, updateNowTime);
    }, 1);
    this.pushFunc({
        rootTimeout: reserve,
        stopFunc: () => { clearInterval(reserve); }
    });
}



// 1ms毎処理用の変数を用意 //
let updateNowTime;
let pPreTime;
let cPreTime;
let pTimeSum;
let cTimeSum;
let cnt;

/**
 * 再生中、1ms毎に呼ばれるコールバック
 * （ブラウザの制限で実際は最短4ms毎に呼ばれる）
 * @param {number} updatePreTime 前回の時間
 */
function updateNote(updatePreTime) {
    const context = this.context;
    const settings = this.settings;
    const states = this.states;

    let updateNowTime = performance.now();
    let updateBufTime = updateNowTime - updatePreTime;

    // サウンドが重くないか監視（フリーズ対策） //
    //   performance.now()とAudioContext.currentTimeの時間差を計算し
    //   AudioContext.currentTimeが遅れていたら処理落ちしていると判断する
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
        if (states.latencyLimitTime>0) { // currentTimeが丁度いい
            states.latencyLimitTime -= updateBufTime*0.04;
            if (states.latencyLimitTime < 0) states.latencyLimitTime = 0;
        }
    }

    // ノートを先読み度合いを自動調整（予約しすぎると重くなる） //
    states.updateIntervalTime = updateBufTime;
    if (states.updateBufTime < updateBufTime) {
        states.updateBufTime = updateBufTime;
    } else { // 先読み量を少しずつ減らす
        states.updateBufTime -= states.updateBufTime*0.001;
        if (states.updateBufTime > 100) {
            states.updateBufTime -= states.updateBufTime*0.01;
        }
        if (states.updateBufMaxTime > 150) {
            states.updateBufMaxTime -= states.updateBufMaxTime*0.002;
        }
        if (states.updateBufMaxTime > 10 && states.updateBufMaxTime < 140) {
            states.updateBufMaxTime += states.updateBufMaxTime*0.003;
        }
    }
    if (states.updateBufTime > states.updateBufMaxTime) {
        if (updateBufTime >= 900 && states.latencyLimitTime <= 150) {
            // バックグラウンドっぽくて重くない場合、バックグラウンド再生
            states.updateBufMaxTime += updateBufTime;
        } else { // 通常
            const tempTime = updateBufTime - states.updateBufMaxTime;
            states.updateBufTime = states.updateBufMaxTime;
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
    if (states.latencyLimitTime > 200) {
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
        const notes = this.playData.channels[ch].notes;
        let idx = states.playIndices[ch];
        for (; idx<notes.length; idx++) {
            const note = notes[idx];
            const curTime = context.currentTime - states.startTime;

            // 終わったノートは演奏せずにスキップ
            if (curTime >= note.stopTime) continue;
            // （シークバーで途中から再生時）startTimeが過ぎたものは鳴らさない
            if (cnt == 0 && curTime > note.startTime+0.05) continue;
            // AudioParam.setValueAtTime()等でマイナスが入るとエラーになるので対策
            if (curTime + note.startTime < 0) continue;
            // 演奏開始時間 - 先読み時間(ノート予約) になると演奏予約or演奏開始
            if (curTime < note.startTime - states.updateBufTime/1000) break;

            // PicoAudioの音源で再生中の場合 //
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
                    note.channel != 9 ? this.createNote(note)
                    : this.createPercussionNote(note);
                if (!stopFunc) continue; // 無音の場合、処理しない
                this.pushFunc({
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
    checkNoteOn(this);

    // noteOffの時間になったか監視 //
    checkNoteOff(this);

    // WebMIDIで再生中の場合 //
    if (settings.isWebMIDI && settings.WebMIDIPortOutput != null) {
        const messages = this.playData.messages;
        const smfData = this.playData.smfData;
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
                                (time - context.currentTime + window.performance.now()/1000 + states.startTime) * 1000);
                        }
                    } else {
                        // sysEx以外のMIDIメッセージ
                        const sendMes = [];
                        for (let i=0; i<pLen; i++) sendMes.push(smfData[p+i]);
                        settings.WebMIDIPortOutput.send(sendMes,
                            (time - context.currentTime + window.performance.now()/1000 + states.startTime) * 1000);
                    }
                } catch(e) {
                    console.log(e, p, pLen, time, state);
                }
            }
        }
        // messagesのどこまで送信したかを記憶して、次回コールバック時にそこから処理を始める
        states.playIndices[16] = idx;
    }

    // 次回コールバック時に、現在時間を前回の時間として使う（次回の引数updatePreTimeの値になる）
    return updateNowTime;
}

/**
 * noteOnの時間になったか監視
 * @param {PicoAudio} that PicoAudioインスタンス
 */
function checkNoteOn(that) {
    const context = that.context;
    const trigger = that.trigger;
    const states = that.states;
    const noteOnAry = that.states.noteOnAry;
    const noteOffAry = that.states.noteOffAry;

    // noteOnの時間になったか監視 //
    for (let i=0; i<noteOnAry.length; i++) {
        const tempNote = noteOnAry[i];
        const nowTime = context.currentTime - states.startTime;
        if (tempNote.startTime - nowTime <= 0) {
            arrayDelete(noteOnAry, i); // noteOnAry.splice(i, 1); の高速化
            noteOffAry.push(tempNote);
            // noteOnにコールバックを通知
            if (trigger.isNoteTrigger) trigger.noteOn(tempNote);
            i--;
        }
    }
}

/**
 * noteOffの時間になったか監視
 * @param {PicoAudio} that PicoAudioインスタンス
 */
function checkNoteOff(that) {
    const context = that.context;
    const trigger = that.trigger;
    const states = that.states;
    const noteOffAry = that.states.noteOffAry;

    for (let i=0; i<noteOffAry.length; i++) {
        const tempNote = noteOffAry[i];
        const nowTime = context.currentTime - states.startTime;
        if ((tempNote.channel != 9 && tempNote.stopTime - nowTime <= 0)
            || (tempNote.channel == 9 && tempNote.drumStopTime - nowTime <= 0)) {
            arrayDelete(noteOffAry, i); // noteOffAry.splice(i, 1); の高速化
            that.clearFunc("note", tempNote);
            // noteOffにコールバックを通知
            if (trigger.isNoteTrigger) trigger.noteOff(tempNote);
            i--;
        }
    }
}