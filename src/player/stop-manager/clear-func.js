import ArrayUtil from '../../util/array-util.js';

export default function clearFunc(tar1, tar2) {
    if (tar1 != "note"
        && tar1 != "rootTimeout"
        && tar1 != "pan"
        && !this.trigger.isNoteTrigger)
    {
        return;
    }

    this.states.stopFuncs.some((n, i, ary) => {
        if (n[tar1] == tar2) {
            ArrayUtil.delete(ary, i); // ary.splice(i, 1); を高速化
            return true;
        }
    });
}