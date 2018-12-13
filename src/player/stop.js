export default function stop(isSongLooping) {
    var states = this.states;
    var that = this;
    if(states.isPlaying==false) return;
    states.isPlaying = false;
    states.stopTime = this.context.currentTime;
    states.stopFuncs.forEach(function(n){
        n.stopFunc();
    });
    states.stopFuncs = [];
    states.playIndices.forEach(function(n, i, ary){
        ary[i] = 0;
    });
    states.noteOnAry = [];
    states.noteOffAry = [];
    if(this.settings.isWebMIDI){
        if(isSongLooping)
            return;
        if(this.settings.WebMIDIPortOutput==null)
            return;
        states.webMIDIStopTime = this.context.currentTime;
        setTimeout(function(){
            for(var t=0; t<16; t++){
                that.settings.WebMIDIPortOutput.send([0xB0+t, 120, 0]);
            }
        }, 1000);
    }
    this.trigger.stop();
    this.fireEvent('stop');
}