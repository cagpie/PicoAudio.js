export default function init(_audioContext, _picoAudio) {
    if(this.isStarted) return;
    this.isStarted = true;
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = _audioContext ? _audioContext : new AudioContext();
    if(_picoAudio && _picoAudio.whitenoise){ // 使いまわし
        this.whitenoise = _picoAudio.whitenoise;
    } else {
        this.whitenoise = this.context.createBuffer(2, this.context.sampleRate, this.context.sampleRate);
        // 乱数パターンを固定にする（Math.random()を使わない）
        // Xorshiftアルゴリズム
        var x = 123456789;
        var y = 362436069;
        var z = 521288629;
        var w = 8867512;
        for (var ch=0; ch<2; ch++){
            for (var i=0; i<this.context.sampleRate; i++){
                var t = x ^ (x << 11);
                x = y; y = z; z = w;
                var r = w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
                r = Math.abs(r) / 2147483648 % 2;
                this.whitenoise.getChannelData(ch)[i] = r * 2 - 1;
            }
        }
    }
    // リアルタイムで音量変更するためにdestination前にgainNodeを一つ噛ませる
    this.masterGainNode = this.context.createGain();
    this.masterGainNode.gain.value = this.settings.masterVolume;
    // リバーブ用のインパルス応答音声データ作成（てきとう）
    if(_picoAudio && _picoAudio.impulseResponse){ // 使いまわし
        this.impulseResponse = _picoAudio.impulseResponse;
    } else {
        var sampleLength = this.context.sampleRate*3.5;
        this.impulseResponse = this.context.createBuffer(2, sampleLength, this.context.sampleRate);
        for(var ch = 0; ch<2; ch++){
            var buf = this.impulseResponse.getChannelData(ch);
            for (var i = 0; i<sampleLength; i++) {
                var v = ((sampleLength-i)/sampleLength);
                var s = i/this.context.sampleRate;
                var r = i/sampleLength;
                var d = (s < 0.030 ? 0 : v)
                *(s >= 0.030 && s < 0.031 ? v*2 : v)
                *(s >= 0.040 && s < 0.042 ? v*1.5 : v)
                *(s >= 0.050 && s < 0.054 ? v*1.25 : v)
                *Math.random()*0.2*Math.pow((v-0.030), 4);
                buf[i] = d;
            }
        }
    }
    // リバーブ用
    this.convolver = this.context.createConvolver();
    this.convolver.buffer = this.impulseResponse;
    this.convolver.normalize = true;
    this.convolverGainNode = this.context.createGain();
    this.convolverGainNode.gain.value = this.settings.reverbVolume;
    this.convolver.connect(this.convolverGainNode);
    this.convolverGainNode.connect(this.masterGainNode);
    this.masterGainNode.connect(this.context.destination);

    // コーラス用
    this.chorusDelayNode = this.context.createDelay();
    this.chorusGainNode = this.context.createGain();
    this.chorusOscillator = this.context.createOscillator();
    this.chorusLfoGainNode = this.context.createGain();
    this.chorusDelayNode.delayTime.value = 0.025;
    this.chorusLfoGainNode.gain.value = 0.010;
    this.chorusOscillator.frequency.value = 0.05;
    this.chorusGainNode.gain.value = this.settings.chorusVolume;
    this.chorusOscillator.connect(this.chorusLfoGainNode);
    this.chorusLfoGainNode.connect(this.chorusDelayNode.delayTime);
    this.chorusDelayNode.connect(this.chorusGainNode);
    this.chorusGainNode.connect(this.masterGainNode);
    this.masterGainNode.connect(this.context.destination);
    this.chorusOscillator.start(0);
    
    // リバーブON設定を引き継ぐ。未設定ならパフォーマンス計測する(Tonyu2用)
    if(this.isTonyu2){
        if(_picoAudio){
            this.settings.isReverb = _picoAudio.settings.isReverb;
        } else {
            this.settings.isReverb = this.measurePerformanceReverb();
        }
    }
}