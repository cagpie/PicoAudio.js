export default function getTiming(time) {
    var imin = 0;
    var imax = this.tempoTrack.length - 1;
    var imid = -1;
    if(this.tempoTrack && this.tempoTrack.length >= 1){
        if(time>=this.tempoTrack[this.tempoTrack.length-1].time){
            return this.tempoTrack[this.tempoTrack.length-1].timing;
        }
        while(true){
            imid = Math.floor(imin + (imax - imin) / 2);
            var tempTime = this.tempoTrack[imid].time;
            if(time < tempTime){
                imax = imid - 1;
            } else if(time > tempTime){
                imin = imid + 1;
            } else {
                break;
            }
            if(imin > imax){
                if(time < tempTime) imid--;
                break;
            }
        }
    }
    if(imid>=0){
        var tempoObj = this.tempoTrack[imid];
        var baseTime = tempoObj.time;
        var timing = tempoObj.timing;
        var tempo = tempoObj.value;
    } else {
        var baseTime = 0;
        var timing = 0;
        var tempo = 120;
    }
    timing += (time - baseTime) / (60 / tempo / this.settings.resolution);
    return timing;
};