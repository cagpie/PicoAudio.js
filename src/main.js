//import '@babel/polyfill';

import picoAudioConstructor from './init/constructor.js';
import init from './init/init.js';

import setData from './player/set-data.js';
import initStatus from './player/init-status.js';
import play from './player/play.js';
import stop from './player/stop.js';

import createBaseNote from './player/sound-source/create-base-note.js';
import createNote from './player/sound-source/create-note.js';
import createPercussionNote from './player/sound-source/create-percussion-note.js';

import stopAudioNode from './player/stop-manager/stop-audio-node.js';
import pushFunc from './player/stop-manager/push-func.js';
import clearFunc from './player/stop-manager/clear-func.js';

import getTime from './player/time/get-time.js';
import getTiming from './player/time/get-timing.js';

import measurePerformanceReverb from './util/measure-performance-reverb.js';

import parseSMF from './smf/parse-smf.js';

import startWebMIDI from './web-midi/start-web-midi.js'

class PicoAudio {
    constructor(_audioContext, _picoAudio) {
        picoAudioConstructor.call(this, _audioContext, _picoAudio);
    }
    // 初期化
    init(_audioContext, _picoAudio) {
        return init.call(this, _audioContext, _picoAudio);
    }
    // SMF解析
    parseSMF(_smf) {
        return parseSMF.call(this, _smf);
    }
    // 再生データをセット
    setData(data) {
        return setData.call(this, data);
    }
    // 再生
    play(isSongLooping) {
        return play.call(this, isSongLooping);
    }
    // 停止
    stop(isSongLooping) {
        return stop.call(this, isSongLooping);
    }
    // リセット
    initStatus(isSongLooping, isLight) {
        return initStatus.call(this, isSongLooping, isLight);
    }

    // 時関関係 //
    // tickからtime(秒)を求める
    getTime(tick) {
        return getTime.call(this, tick);
    }
    // time(秒)からtickを求める
    getTiming(time) {
        return getTiming.call(this, time);
    }

    // 再生・音源関係 //
    // 再生処理(Web Audio API の oscillator等で音を鳴らす)
    createBaseNote(option, isDrum, isExpression, nonChannel, nonStop) {
        return createBaseNote.call(this, option, isDrum, isExpression, nonChannel, nonStop);
    }
    // 音源(パーカッション以外)
    createNote(option) {
        return createNote.call(this, option);
    }
    // パーカッション音源
    createPercussionNote(option) {
        return createPercussionNote.call(this, option);
    }

    // 停止管理関係 //
    // 各々のNoteの音停止処理
    stopAudioNode(tar, time, stopGainNode, isNoiseCut) {
        return stopAudioNode.call(this, tar, time, stopGainNode, isNoiseCut);
    }
    // stop()するときに実行するコールバック等を登録
    pushFunc(tar) {
        return pushFunc.call(this, tar);
    }
    // pushFunc()で予約したコールバック等を削除する
    clearFunc(tar1, tar2) {
        return clearFunc.call(this, tar1, tar2);
    }

    // Web MIDI API
    startWebMIDI() {
        return startWebMIDI.call(this);
    }

    // パフォーマンス計測
    measurePerformanceReverb() {
        return measurePerformanceReverb.call(this);
    }

    // インターフェース関係 //
    addEventListener(type, func) {
        // type = EventName (play, stop, noteOn...)
        this.events.push({type: type, func: func});
    }
    fireEvent(type, option) {
        this.events.forEach((event) => {
            if (event.type == type) {
                try {
                    event.func(option);
                } catch(e) {
                    console.log(e);
                }
            }
        });
    }
    getChannels() {
        return this.channels;
    }
    setChannels(channels) {
        channels.forEach((channel, idx) => {
            this.channels[idx] = channel;
        });
    }
    initChannels() {
        for (let i=0; i<16; i++) {
            this.channels[i] = [0,0,1];
        }
    }
    getMasterVolume() {
        return this.settings.masterVolume;
    }
    setMasterVolume(volume) {
        this.settings.masterVolume = volume;
        this.masterGainNode.gain.value = this.settings.masterVolume;
    }
    isLoop() {
        return this.settings.loop;
    }
    setLoop(loop) {
        this.settings.loop = loop;
    }
    isWebMIDI() {
        return this.settings.isWebMIDI;
    }
    setWebMIDI(enable) {
        this.settings.isWebMIDI = enable;
    }
    isCC111() {
        return this.settings.isCC111;
    }
    setCC111(enable) {
        this.settings.isCC111 = enable;
    }
    setStartTime(offset) {
        this.states.startTime -= offset;
    }
    setOnSongEndListener(listener) {
        this.onSongEndListener = listener;
    }
    onSongEnd() {
        if (this.onSongEndListener) {
            const isStopFunc = this.onSongEndListener();
            if (isStopFunc) return;
        }
        if (this.settings.loop) {
            this.initStatus(true);
            if (this.settings.isCC111 && this.cc111Time != -1) {
                this.setStartTime(this.cc111Time);
            }
            this.play(true);
        }
    }
    isReverb() {
        return this.settings.isReverb;
    }
    setReverb(enable) {
        this.settings.isReverb = enable;
    }
    getReverbVolume() {
        return this.settings.reverbVolume;
    }
    setReverbVolume(volume) {
        this.settings.reverbVolume = volume;
    }
    isChorus() {
        return this.settings.isChorus;
    }
    setChorus(enable) {
        this.settings.isChorus = enable;
    }
    getChorusVolume() {
        return this.settings.chorusVolume;
    }
    setChorusVolume(volume) {
        this.settings.chorusVolume = volume;
    }
}

// PicoAudioをグローバル変数に登録
window.PicoAudio = PicoAudio;
