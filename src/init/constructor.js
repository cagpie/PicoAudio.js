export default function picoAudioConstructor(_audioContext, _picoAudio) {
    this.debug = process.env.BUILD_MODE;
    this.isStarted = false;
    this.isPlayed = false;
    this.isTonyu2 = process.env.TONYU2;
    this.settings = {
        masterVolume: 1,
        generateVolume: 0.15,
        tempo: 120,
        basePitch: 440,
        resolution: 480,
        isWebMIDI: false,
        WebMIDIPortOutputs: null,
        WebMIDIPortOutput: null,
        WebMIDIPort: -1, // -1:auto
        WebMIDIPortSysEx: true, // MIDIデバイスのフルコントロールをするかどうか（SysExを使うかどうか）(httpsじゃないと使えない)
        isReverb: true, // リバーブONにするか
        reverbVolume: 1.5,
        isChorus: true,
        chorusVolume: 0.5,
        isCC111: true,
        loop: false,
        isSkipBeginning: this.isTonyu2, // 冒頭の余白をスキップ(Tonyu2はtrue)
        isSkipEnding: true, // 末尾の空白をスキップ
        holdOnValue: 64,
        maxPoly: -1, // 同時発音数 -1:infinity
        maxPercPoly: -1, // 同時発音数(パーカッション) -1:infinity
        isOfflineRendering: false, // TODO 演奏データを作成してから演奏する
        isSameDrumSoundOverlap: false // 同じドラムの音が重なることを許容するか
    };
    this.events = [];
    this.trigger = {
        isNoteTrigger: true,
        play: ()=>{},
        stop: ()=>{},
        noteOn: ()=>{},
        noteOff: ()=>{},
        songEnd: ()=>{}
    };
    this.states = {
        isPlaying: false,
        startTime: 0,
        stopTime: 0,
        stopFuncs: [],
        webMIDIWaitState: null,
        webMIDIStopTime: 0,
        playIndices: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        updateBufTime: 100,
        updateBufMaxTime: 350,
        updateIntervalTime: 0,
        latencyLimitTime: 0
    };
    this.hashedDataList = [];
    this.hashedMessageList = [];
    this.playData = null;
    this.channels = [];
    this.tempoTrack = [
        { timing: 0, value: 120 },
        { timing: 0, value: 120 }
    ];
    this.cc111Time = -1;
    this.onSongEndListener = null;

    // チャンネルの設定値（音色, 減衰, 音量） //
    for (let i=0; i<17; i++) {
        this.channels.push([0, 0, 1]);
    }

    // AudioContextがある場合はそのまま初期化、なければAudioContextを用いる初期化をinit()で
    if (_audioContext) {
        this.init(_audioContext, _picoAudio);
    }

    // Fallback
    // Unsupport performance.now()
    if (typeof performance === "undefined") {
        window.performance = {};
    }
    if (!performance.now) {
        performance.now = () => {
            return Date.now();
        };
    }
    // Unsupport Number.MAX_SAFE_INTEGER
    if (!Number.MAX_SAFE_INTEGER) {
        Number.MAX_SAFE_INTEGER = 9007199254740991;
    }
}