import UpdateNote from './play/update-note.js';
import {Number_MAX_SAFE_INTEGER} from '../util/ponyfill.js';

export default function play(isSongLooping) {
    const context = this.context;
    const settings = this.settings;
    const trigger = this.trigger;
    const states = this.states;

    // Chrome Audio Policy 対策 //
    if (context.resume) context.resume();

    // 再生中の場合、処理しない //
    if (states.isPlaying) return;

    // WebMIDIの場合、少し待ってから再生する //
    if (settings.isWebMIDI && !isSongLooping) {
        // Web MIDI API使用時はstop()から800ms程待機すると音がバグりにくい
        if (states.webMIDIWaitState != "completed") {
            if (states.webMIDIWaitState != "waiting") { // play()連打の対策
                // stop()から1000ms後にplay()を実行
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
        const finishTime = (settings.isCC111 && this.cc111Time != -1) ? this.lastNoteOffTime : this.getTime(Number_MAX_SAFE_INTEGER);
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
        : this.getTime(Number_MAX_SAFE_INTEGER);
    const reserveSongEndTime = (finishTime - context.currentTime + states.startTime) * 1000;
    reserveSongEnd = setTimeout(reserveSongEndFunc, reserveSongEndTime);
    this.pushFunc({
        rootTimeout: reserveSongEnd,
        stopFunc: () => { clearTimeout(reserveSongEnd); }
    });

    // 再生開始をコールバックに通知 //
    trigger.play();
    this.fireEvent('play');

    // 1ms毎コールバックの準備 //
    UpdateNote.init(this, currentTime);

    // 1ms毎コールバックを開始 //
    const reserve = setInterval(() => {
        UpdateNote.update(this);
    }, 1);
    this.pushFunc({
        rootTimeout: reserve,
        stopFunc: () => { clearInterval(reserve); }
    });
}