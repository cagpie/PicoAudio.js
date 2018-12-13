export default function clearFunc(tar1, tar2) {
    if(tar1!="note" && tar1!="rootTimeout" && tar1!="pan" && !this.trigger.isNoteTrigger) return;
    var that = this;
    that.states.stopFuncs.some(function(n, i, ary){
        if(n[tar1] == tar2){
            // ary.splice(i, 1); を軽量化
            if(i == 0) ary.shift();
            else if(i == ary.length-1) ary.pop();
            else ary.splice(i, 1);
            return true;
        }
    });
}