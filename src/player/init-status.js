export default function initStatus(isSongLooping, isLight) {
    if(this.settings.isWebMIDI){ // initStatus()連打の対策
        if(this.states.webMIDIWaitState!=null) return;
    }
    this.stop(isSongLooping);
    var tempwebMIDIStopTime = this.states.webMIDIStopTime;
    this.states = { isPlaying: false, startTime:0, stopTime:0, stopFuncs:[], webMIDIWaitState:null, webMIDIStopTime:0
        , playIndices:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], updateBufTime:this.states.updateBufTime
        , updateBufMaxTime:this.states.updateBufMaxTime, updateIntervalTime:this.states.updateIntervalTime
         , latencyLimitTime:this.states.latencyLimitTime, noteOnAry:[], noteOffAry:[] };
    this.states.webMIDIStopTime = tempwebMIDIStopTime; // 値を初期化しない
    if(this.settings.isWebMIDI && !isLight){
        if(isSongLooping)
            return;
        if(this.settings.WebMIDIPortOutput==null){
            this.startWebMIDI();
            return;
        }
        if(this.settings.WebMIDIPortSysEx){
            // GM1システム・オン
            this.settings.WebMIDIPortOutput.send([0xF0, 0x7E, 0x7F, 0x09, 0x01, 0xF7]);
        } else {
            // SysExの使用が拒否されているので、できる限り設定値を初期値に戻す
            for(var t=0; t<16; t++){
                this.settings.WebMIDIPortOutput.send([0xC0+t, 0]);
                this.settings.WebMIDIPortOutput.send([0xE0+t, 0, 64]);
                // ピッチあたりのずれがひどくなる場合がある　よくわからない
                this.settings.WebMIDIPortOutput.send([0xB0+t, 100, 0]);
                this.settings.WebMIDIPortOutput.send([0xB0+t, 101, 0]);
                this.settings.WebMIDIPortOutput.send([0xB0+t, 6, 2]); //pitchbend
                this.settings.WebMIDIPortOutput.send([0xB0+t, 100, 1]);
                this.settings.WebMIDIPortOutput.send([0xB0+t, 96, 0]);
                this.settings.WebMIDIPortOutput.send([0xB0+t, 97, 64]);　//tuning?
                this.settings.WebMIDIPortOutput.send([0xB0+t, 7, 100]); // volume
                this.settings.WebMIDIPortOutput.send([0xB0+t, 10, 64]); // pan
                this.settings.WebMIDIPortOutput.send([0xB0+t, 11, 127]); // expression
                //this.settings.WebMIDIPortOutput.send([0xB0+t, 91, 40]); // リバーブ以外のエフェクトに設定される場合がありそうなのでコメントアウト
                //this.settings.WebMIDIPortOutput.send([0xB0+t, 93, 0]); // コーラス以外のエフェクトに設定されるのか音が出なくなる場合があるのでコメントアウト
                this.settings.WebMIDIPortOutput.send([0xB0+t, 98, 0]);
                this.settings.WebMIDIPortOutput.send([0xB0+t, 99, 0]);
                //this.settings.WebMIDIPortOutput.send([0xB0+t, 121, 0]);
                this.settings.WebMIDIPortOutput.send([0xB0+t, 122, 0]);
            }
        }
    }
}