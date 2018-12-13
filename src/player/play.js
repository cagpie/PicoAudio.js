export default function play(isSongLooping) {
    var context = this.context;
    var settings = this.settings;
    var trigger = this.trigger;
    var states = this.states;
    var that = this;
    if(states.isPlaying==true) return;
    if(settings.isWebMIDI && !isSongLooping){
        // Web MIDI API使用時はstop()から800ms程待機すると音がバグりにくい
        if(states.webMIDIWaitState != "completed"){
            if(states.webMIDIWaitState != "waiting"){ // play()連打の対策
                // stop()から800ms後にplay()を実行
                states.webMIDIWaitState = "waiting";
                var waitTime = 1000 - (context.currentTime - states.webMIDIStopTime)*1000;
                if(states.webMIDIStopTime==0) waitTime = 1000; // MIDI Portをopenして最初に呼び出すときも少し待つ
                setTimeout(function(){
                    that.states.webMIDIWaitState = "completed";
                    that.states.isPlaying = false;
                    that.play();
                }, waitTime);
            }
            return;
        } else {
            states.webMIDIWaitState = null;
        }
    }
    var currentTime = this.context.currentTime;
    this.isPlayed = true;
    states.isPlaying = true;
    states.startTime = !states.startTime && !states.stopTime ? currentTime : (states.startTime + currentTime - states.stopTime);
    states.stopFuncs = [];
    // 冒頭の余白をスキップ
    if (this.settings.isSkipBeginning) {
        var firstNoteOnTime = this.firstNoteOnTime;
        if (-states.startTime + currentTime < firstNoteOnTime) {
            this.setStartTime(firstNoteOnTime + states.startTime - currentTime);
        }
    }
    // 曲終了コールバックを予約
    var reserveSongEnd;
    var reserveSongEndFunc = function(){
        that.clearFunc("rootTimeout", reserveSongEnd);
        var finishTime = (that.settings.isCC111 && that.cc111Time != -1) ? that.lastNoteOffTime : that.getTime(Number.MAX_SAFE_INTEGER);
        if (finishTime - context.currentTime + states.startTime <= 0) {
            // 予定の時間以降に曲終了
            trigger.songEnd();
            that.onSongEnd();
            that.fireEvent('songEnd');
        } else {
            // 処理落ちしたりしてまだ演奏中の場合、1ms後に曲終了コールバックを呼び出すよう予約
            reserveSongEnd = setTimeout(reserveSongEndFunc, 1);
            that.pushFunc({
                rootTimeout: reserveSongEnd,
                stopFunc: function(){ clearTimeout(reserveSongEnd); }
            });
        }
    };
    var finishTime = (this.settings.isCC111 && this.cc111Time != -1) ? this.lastNoteOffTime : this.getTime(Number.MAX_SAFE_INTEGER);
    var reserveSongEndTime = (finishTime - context.currentTime + states.startTime) * 1000;
    reserveSongEnd = setTimeout(reserveSongEndFunc, reserveSongEndTime);
    that.pushFunc({
        rootTimeout: reserveSongEnd,
        stopFunc: function(){ clearTimeout(reserveSongEnd); }
    });

    var updateNowTime = performance.now();
    var pPreTime = performance.now(); // previous performance.now()
    var cPreTime = context.currentTime * 1000; // previous AudioContext.currentTime
    var pTimeSum = 0;
    var cTimeSum = 0;
    var cnt=0;

    trigger.play();
    this.fireEvent('play');

    (function updateNote(updatePreTime){
        var updateNowTime = performance.now();
        var updateBufTime = updateNowTime - updatePreTime;

        // サウンドが重くないか監視（フリーズ対策）
        var pTime = updateNowTime;
        var cTime = context.currentTime * 1000;
        pTimeSum += pTime - pPreTime;
        cTimeSum += cTime - cPreTime;
        pPreTime = pTime;
        cPreTime = cTime;
        var latencyTime = pTimeSum - cTimeSum;
        that.states.latencyTime = latencyTime;
        if(latencyTime >= 100){ // currentTimeが遅い（サウンドが重い）
            that.states.latencyLimitTime += latencyTime;
            cTimeSum += 100;
        } else if(latencyTime <= -100){ // currentTimeが速い（誤差）
            cTimeSum = pTimeSum;
        } else {
            if(that.states.latencyLimitTime>0){ // currentTimeが丁度いい
                that.states.latencyLimitTime -= updateBufTime*0.04;
                if(that.states.latencyLimitTime < 0) that.states.latencyLimitTime = 0;
            }
        }

        // ノートを先読み度合いを自動調整（予約しすぎると重くなる）
        that.states.updateIntervalTime = updateBufTime;
        updateBufTime += (that.isFirefox() && !that.isAndroid() ? 12 : 8);
        if(that.states.updateBufTime < updateBufTime){
            that.states.updateBufTime = updateBufTime;
        } else { // 先読み量を少しずつ減らす
            that.states.updateBufTime -= that.states.updateBufTime*0.001;
            if(that.states.updateBufTime > 100){
                that.states.updateBufTime -= that.states.updateBufTime*0.01;
            }
            if(that.states.updateBufMaxTime > 150){
                that.states.updateBufMaxTime -= that.states.updateBufMaxTime*0.002;
            }
            if(that.states.updateBufMaxTime > 10 && that.states.updateBufMaxTime < 140){
                that.states.updateBufMaxTime += that.states.updateBufMaxTime*0.003;
            }
        }
        if(that.states.updateBufTime > that.states.updateBufMaxTime){
            if(updateBufTime >= 900 && that.states.latencyLimitTime <= 150){
                // バックグラウンドっぽくて重くない場合、バックグラウンド再生
                that.states.updateBufMaxTime += updateBufTime;
            } else { // 通常
                var tempTime = updateBufTime - that.states.updateBufMaxTime;
                that.states.updateBufTime = that.states.updateBufMaxTime;
                if(that.states.updateBufMaxTime<10){
                    that.states.updateBufTime = that.states.updateBufMaxTime;
                    that.states.updateBufMaxTime *= 1.25;
                } else {
                    that.states.updateBufMaxTime += tempTime / 2;
                }
            }
            if(that.states.updateBufMaxTime > 1100) that.states.updateBufMaxTime = 1100;
        }

        // サウンドが重すぎる
        if(that.states.latencyLimitTime > 200){
            cTimeSum = pTimeSum;
            that.states.latencyLimitTime -= 5;
            if(that.states.latencyLimitTime > 1000) that.states.latencyLimitTime = 1000;
            // ノート先読みをかなり小さくする（フリーズ対策）
            that.states.updateBufMaxTime = 1;
            that.states.updateBufTime = 1;
            updateBufTime = 1;
        }

        // 再生処理
        for(var ch=0; ch<16; ch++){
            var notes = that.playData.channels[ch].notes;
            var idx = that.states.playIndices[ch];
            for(; idx<notes.length; idx++){
                var note = notes[idx];
                var curTime = context.currentTime - states.startTime;
                // 終わったノートは演奏せずにスキップ
                if(curTime >= note.stopTime) continue;
                if(cnt == 0 && curTime > note.startTime+0.05) continue; // （シークバーで途中から再生時）startTimeが過ぎたものは鳴らさない
                // AudioParam.setValueAtTime()等でマイナスが入るとエラーになるので対策
                if(curTime + note.startTime < 0) continue;
                // 演奏開始時間 - 先読み時間(ノート予約) になると演奏予約or演奏開始
                if(curTime < note.startTime - that.states.updateBufTime/1000) break;
                if(!settings.isWebMIDI){ 
                    // 予約ノート数が急激に増えそうな時、先読み量を小さくしておく
                    if(that.states.stopFuncs.length>=350 && that.states.updateBufTime<1000){
                        that.states.updateBufTime = (that.isFirefox() && !that.isAndroid() ? 12 : 8);
                        that.states.updateBufMaxTime = that.states.updateBufTime;
                    }
                    // Retro Mode
                    if(that.settings.maxPoly!=-1||that.settings.maxPercPoly!=-1){
                        var polyCnt=0, percCnt=0;
                        that.states.stopFuncs.forEach(function(tar){
                            if(!tar.note) return;
                            if(tar.note.channel!=9){
                                if(note.start>=tar.note.start&&note.start<tar.note.stop){
                                    polyCnt++;
                                }
                            } else {
                                if(note.start==tar.note.start){
                                    percCnt++;
                                }
                            }
                        });
                        if((note.channel!=9&&polyCnt>=that.settings.maxPoly)
                            ||(note.channel==9&&percCnt>=that.settings.maxPercPoly)){
                            continue;
                        }
                    }
                    // Create Note
                    var stopFunc = note.channel!=9 ? that.createNote(note) : that.createPercussionNote(note);
                    if(!stopFunc) continue; // 無音などの場合
                    that.pushFunc({
                        note: note,
                        stopFunc: stopFunc
                    });
                }
                that.states.noteOnAry.push(note);
            }
            that.states.playIndices[ch] = idx;
        }
        var noteOnAry = that.states.noteOnAry;
        var noteOffAry = that.states.noteOffAry;
        // noteOnの時間になったか監視
        for(var i=0; i<noteOnAry.length; i++){
            var tempNote = noteOnAry[i];
            var nowTime = context.currentTime - states.startTime;
            if(tempNote.startTime - nowTime <= 0){
                // noteOnAry.splice(i, 1); の高速化
                if(i == 0) noteOnAry.shift();
                else if(i == noteOnAry.length-1) noteOnAry.pop();
                else noteOnAry.splice(i, 1);
                noteOffAry.push(tempNote);
                // noteOn
                if(trigger.isNoteTrigger) trigger.noteOn(tempNote);
                i--;
            }
        }
        // noteOffの時間になったか監視
        for(var i=0; i<noteOffAry.length; i++){
            var tempNote = noteOffAry[i];
            var nowTime = context.currentTime - states.startTime;
            if((tempNote.channel!=9 && tempNote.stopTime - nowTime <= 0)
                || (tempNote.channel==9 && tempNote.drumStopTime - nowTime <= 0)){
                // noteOffAry.splice(i, 1); の高速化
                if(i == 0) noteOffAry.shift();
                else if(i == noteOffAry.length-1) noteOffAry.pop();
                else noteOffAry.splice(i, 1);
                that.clearFunc("note", tempNote);
                // noteOff
                if(trigger.isNoteTrigger) trigger.noteOff(tempNote);
                i--;
            }
        }

        if(settings.isWebMIDI && settings.WebMIDIPortOutput!=null){
            var messages = that.playData.messages;
            var smfData = that.playData.smfData;
            var idx = that.states.playIndices[16];
            for(; idx<messages.length; idx++){
                var message = messages[idx];
                var curTime = context.currentTime - states.startTime;
                // 終わったノートは演奏せずにスキップ
                if(curTime > message.time + 1) continue;
                // 演奏開始時間 - 先読み時間(ノート予約) になると演奏予約or演奏開始
                if(curTime < message.time - 1) break;

                var pLen = message.smfPtrLen;
                var p = message.smfPtr;
                var time = message.time;
                var state = smfData[p];
                if(state!=0xff){
                    try{
                        if(state==0xF0 || state==0xF7){
                            if(settings.WebMIDIPortSysEx){
                                // 長さ情報を取り除いて純粋なSysExメッセージにする
                                var lengthAry = that.variableLengthToInt(smfData, p+1, p+1+4);
                                var sysExStartP = p+1+lengthAry[1];
                                var sysExEndP = sysExStartP+lengthAry[0];
                                var webMIDIMes = new Uint8Array(1 + lengthAry[0]);
                                webMIDIMes[0] = state;
                                var size = sysExEndP - sysExStartP;
                                for (var i=0; i<size; i++)
                                    webMIDIMes[i+1] = smfData[sysExStartP + i];
                                settings.WebMIDIPortOutput.send(webMIDIMes,
                                    (time - context.currentTime + window.performance.now()/1000 + states.startTime) * 1000);
                            }
                        } else {
                            var sendMes = [];
                            for(var i=0; i<pLen; i++) sendMes.push(smfData[p+i]);
                            settings.WebMIDIPortOutput.send(sendMes,
                                (time - context.currentTime + window.performance.now()/1000 + states.startTime) * 1000);
                        }
                    }catch(e){
                        console.log(e, p, pLen, time, state);
                    }
                }
            }
            that.states.playIndices[16] = idx;
        }

        if(cnt==0){
            var reserve = setInterval(function(){
                updateNowTime = updateNote(updateNowTime);
            }, 1);
            (function(reserve){
                that.pushFunc({
                    rootTimeout: reserve,
                    stopFunc: function(){ clearInterval(reserve); }
                });
            })(reserve);
        }
        cnt++;
        return updateNowTime;
    })(updateNowTime);
}