import {Performance} from '../util/ponyfill.js';

export default function setData(data) {
    if (this.debug) {
        var syoriTimeS = Performance.now();
    }

    if (this.states.isPlaying) this.stop();

    this.playData = data;
    this.settings.resolution = data.header.resolution;
    this.settings.tempo = data.tempo || 120;
    this.tempoTrack = data.tempoTrack;
    this.cc111Time = data.cc111Time;
    this.firstNoteOnTiming = data.firstNoteOnTiming;
    this.lastNoteOffTiming = data.lastNoteOffTiming;
    this.firstNoteOnTime = data.firstNoteOnTime;
    this.lastNoteOffTime = data.lastNoteOffTime;
    this.initStatus();

    if (this.debug) {
        const syoriTimeE = Performance.now();
        console.log("setData time", syoriTimeE - syoriTimeS);
    }

    return this;
}