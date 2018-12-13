export default function getTime(timing) {
    var imin = 0;
    var imax = this.tempoTrack.length - 1;
    var imid = -1;
    if(this.tempoTrack && this.tempoTrack.length >= 1){
        if(timing>=this.tempoTrack[this.tempoTrack.length-1].timing){
            return this.tempoTrack[this.tempoTrack.length-1].time;
        }
        while(true){
            imid = Math.floor(imin + (imax - imin) / 2);
            var tempTiming = this.tempoTrack[imid].timing;
            if(timing < tempTiming){
                imax = imid - 1;
            } else if(timing > tempTiming){
                imin = imid + 1;
            } else {
                break;
            }
            if(imin > imax){
                if(timing < tempTiming) imid--;
                break;
            }
        }
    }
    if(imid>=0){
        var tempoObj = this.tempoTrack[imid];
        var time = tempoObj.time;
        var baseTiming = tempoObj.timing;
        var tempo = tempoObj.value;
    } else {
        var time = 0;
        var baseTiming = 0;
        var tempo = 120;
    }
    time += (60 / tempo / this.settings.resolution) * (timing - baseTiming);
    return time;
};