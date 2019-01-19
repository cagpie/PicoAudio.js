export default function pushFunc(tar) {
    if (!tar.note
        && !tar.rootTimeout
        && !tar.pan
        && !this.trigger.isNoteTrigger)
    {
        return;
    }

    this.states.stopFuncs.push(tar);
}