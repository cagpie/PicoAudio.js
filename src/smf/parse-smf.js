import parseHeader from './parse-smf/parse-header.js';
import parseTrack from './parse-smf/parse-track.js';
import parseEvent from './parse-smf/parse-event.js';
import {Performance} from '../util/ponyfill.js';

export default function parseSMF(_smf) {
    if (this.debug) {
        console.log(_smf);
        var syoriTimeS1 = Performance.now();
    }

    // smf配列はデータ上書きするので_smfをディープコピーする
    const smf = new Uint8Array(_smf);

    // SMFのフォーマットかどうかチェック //
    // "MThd"
    if (smf[0] != 77 || smf[1] != 84 || smf[2] != 104 || smf[3] != 100)
        return "Not Sandard MIDI File.";

    // 関数間でデータをやり取りするためのObject //
    const info = {};
    info.smf = smf;
    
    // ヘッダー解析 //
    parseHeader.call(this, info);
    if (this.debug) {
        var syoriTimeS2 = Performance.now();
    }

    // トラック解析 //
    parseTrack.call(this, info);
    if (this.debug) {
        var syoriTimeS3 = Performance.now();
    }

    // MIDIイベント解析 //
    parseEvent.call(this, info);

    // return用のオブジェクトに情報を代入 //
    const data = {};
    data.header = info.header;
    data.tempoTrack = info.tempoTrack;
    data.beatTrack = info.beatTrack;
    data.channels = info.channels;
    data.songLength = info.songLength;
    data.cc111Tick = info.cc111Tick;
    data.cc111Time = info.cc111Time;
    data.firstNoteOnTiming = info.firstNoteOnTiming;
    data.firstNoteOnTime = info.firstNoteOnTime;
    data.lastNoteOffTiming = info.lastNoteOffTiming;
    data.lastNoteOffTime = info.lastNoteOffTime;
    if (this.settings.isWebMIDI) {
        data.messages = info.messages;
        data.smfData = new Uint8Array(smf); // lastStateを上書きしたsmfをコピー
    }

    if (this.debug) {
        const syoriTimeE = Performance.now();
        console.log("parseSMF time", syoriTimeE - syoriTimeS1);
        console.log("parseSMF(0/2) time", syoriTimeS2 - syoriTimeS1);
        console.log("parseSMF(1/2) time", syoriTimeS3 - syoriTimeS2);
        console.log("parseSMF(2/2) time", syoriTimeE - syoriTimeS3);
        console.log(data);
    }
    return data;
}