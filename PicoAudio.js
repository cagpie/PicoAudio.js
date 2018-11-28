'use strict';
var PicoAudio = (function(){
	function PicoAudio(_audioContext, _picoAudio){
		this.debug = false;
		this.isStarted = false;
		this.isPlayed = false;
		this.isTonyu2 = false;
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
			WebMIDIPortSysEx: true, // MIDIデバイスのフルコントロールをするかどうか（SysExを使うかどうか）(httpsじゃないと使えない？)
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
		this.trigger = { isNoteTrigger: true, noteOn: function(){}, noteOff: function(){}, songEnd: function(){} };
		this.states = { isPlaying: false, startTime:0, stopTime:0, stopFuncs:[], webMIDIWaitState:null, webMIDIStopTime:0
			, playIndices:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], updateBufTime:50, updateBufMaxTime:150, updateIntervalTime:0
		 	, latencyLimitTime:0 };
		this.hashedDataList = [];
		this.hashedMessageList = [];
		this.playData = null;
		this.channels = [];
		this.tempoTrack = [{ timing:0, value:120 },{ timing:0, value:120 }];
		this.cc111Time = -1;
		this.onSongEndListener = null;

		for(var i=0; i<17; i++)
			this.channels.push([0,0,1]);
		// AudioContextがある場合はそのまま初期化、なければAudioContextを用いる初期化をinit()で
		if(_audioContext){
			this.init(_audioContext, _picoAudio);
		}

		// Fallback
		// Unsupport performance.now()
		if (typeof performance==="undefined") {
			window.performance = {};
		}
		if (!performance.now) {
			performance.now = function now() {
				return Date.now();
			};
		}
		// Unsupport Number.MAX_SAFE_INTEGER
		if (!Number.MAX_SAFE_INTEGER) {
			Number.MAX_SAFE_INTEGER = 9007199254740991;
		}
	}

	PicoAudio.prototype.init = function(_audioContext, _picoAudio){
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

	PicoAudio.prototype.createNote = function(option){
		var note = this.createBaseNote(option, false, true, false, true); // oscillatorのstopはこちらで実行するよう指定
		if(note.isGainValueZero) return null;

		var oscillator = note.oscillator;
		var gainNode = note.gainNode;
		var stopGainNode = note.stopGainNode;
		var isPizzicato = false;
		var isNoiseCut = false;
		var that = this;

		// 音色別の音色振り分け 書き方(ry
		switch(this.channels[note.channel][0]/10 || option.instrument){
			// Sine
			case 0.1:
			case  6: case 15: case 24: case 26: case 46: case 50: case 51:
			case 52: case 53: case 54: case 82: case 85: case 86:
			{
				oscillator.type = "sine";
				gainNode.gain.value *= 1.5;
				break;
			}
			// Square
			case 0.2:
			case  4: case 12: case 13: case 16: case 19: case 20: case 32: case 34: case 45: case 48: case 49:
			case 55: case 56: case 57: case 61: case 62: case 63: case 71: case 72: case 73: case 74: case 75:
			case 76: case 77: case 78: case 79: case 80: case 84:
			{
				oscillator.type = "square";
				gainNode.gain.value *= 0.8;
				break;
			}
			// Sawtooth
			case 0.3:
			case  0: case  1: case  2: case  3: case  6: case  7: case 17: case 18: case 21: case 22: case 23:
			case 27: case 28: case 29: case 30: case 36: case 37: case 38: case 39: case 40: case 41: case 42:
			case 43: case 44: case 47: case 59: case 64: case 65: case 66: case 67: case 68: case 69: case 70:
			case 71: case 82: case 87:
			{
				oscillator.type = "sawtooth";
				break;
			}
			// Triangle
			case 0.4:
			case  8: case  9: case 10: case 11: case 14: case 25: case 31: case 33: case 35: case 58: case 60:
			case 83: case 88: case 89: case 90: case 91: case 92: case 93: case 94: case 95:
			{
				oscillator.type = "triangle";
				gainNode.gain.value *= 1.5;
				break;
			}
			// Other - Square
			default:{
				oscillator.type = "square";
			}
		}

		// 音の終わりのプチプチノイズが気になるので、音の終わりに5ms減衰してノイズ軽減
		if((oscillator.type == "sine" || oscillator.type == "triangle")
			&& !isPizzicato && note.stop - note.start > 0.01){
			isNoiseCut = true;
		}

		// 音色別の減衰　書き方ミスったなあ
		switch(this.channels[note.channel][1]/10 || option.instrument){
			// ピッチカート系減衰
			case 0.2:
			case 12: case 13: case 45: case 55:
			{
				isPizzicato = true;
				gainNode.gain.value *= 1.1;
				gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
				gainNode.gain.linearRampToValueAtTime(0.0, note.start+0.2);
				that.stopAudioNode(oscillator, note.start+0.2, stopGainNode);
				break;
			}
			// ピアノ程度に伸ばす系
			case 0.3:
			case  0: case  1: case  2: case  3: case  6: case  9: case 11: case 14: case 15:
			case 32: case 36: case 37: case 46: case 47:
			{
				gainNode.gain.value *= 1.1;
				gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
				var decay = (128-option.pitch)/64;
				gainNode.gain.setTargetAtTime(0, note.start, 2.5*decay*decay);
				that.stopAudioNode(oscillator, note.stop, stopGainNode, isNoiseCut);
				break;
			}
			// ギター系
			case 0.4:
			case 24: case 25: case 26: case 27: case 28: case 29: case 30: case 31: case 34:
			{
				gainNode.gain.value *= 1.1;
				gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
				gainNode.gain.linearRampToValueAtTime(0.0, note.start+1.0+note.velocity*4);
				that.stopAudioNode(oscillator, note.stop, stopGainNode, isNoiseCut);
				break;
			}
			// 減衰していくけど終わらない系
			case 0.5:
			case 4: case 5: case 7: case 8: case 10: case 33: case 35:
			{
				gainNode.gain.value *= 1.0;
				gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
				gainNode.gain.linearRampToValueAtTime(gainNode.gain.value*0.95, note.start+0.1);
				gainNode.gain.setValueAtTime(gainNode.gain.value*0.95, note.start+0.1);
				gainNode.gain.linearRampToValueAtTime(0.0, note.start+2.0+note.velocity*10);
				that.stopAudioNode(oscillator, note.stop, stopGainNode, isNoiseCut);
				break;
			}
			case 119: // Reverse Cymbal
			{
				gainNode.gain.value = 0;
				that.stopAudioNode(oscillator, note.stop, stopGainNode, isNoiseCut);
				var note2 = this.createBaseNote(option, true, true);
				if(note2.isGainValueZero) break;
				note2.oscillator.playbackRate.setValueAtTime((option.pitch+1)/128, note.start);
				note2.gainNode.gain.setValueAtTime(0, note.start);
				note2.gainNode.gain.linearRampToValueAtTime(1.3, note.start+2);
				that.stopAudioNode(note2.oscillator, note.stop, note2.stopGainNode);
				break;
			}
			default:{
				gainNode.gain.value *= 1.1;
				gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
				that.stopAudioNode(oscillator, note.stop, stopGainNode, isNoiseCut);
			}
		}

		return function(){
			that.stopAudioNode(oscillator, 0, stopGainNode, true);
			if (note2 && note2.oscillator) that.stopAudioNode(note2.oscillator, 0, note2.stopGainNode, true);
		};
	};

	PicoAudio.prototype.createPercussionNote = function(option){
		var note = this.createBaseNote(option, true, false);
		if(note.isGainValueZero) return null;

		var source = note.oscillator;
		var gainNode = note.gainNode;
		var stopGainNode = note.stopGainNode;
		var start = note.start;
		var velocity = 1; // ドラム全体の音量調整用
		var note2 = this.createBaseNote(option, false, false, true);
		var oscillator = note2.oscillator;
		var gainNode2 = note2.gainNode;
		var stopGainNode2 = note2.stopGainNode;
		var nextSameNoteOnInterval = option.nextSameNoteOnInterval;
		var that = this;

		// oscillator.frequency.setValueAtTime()がcurrentTimeより遅れると周波数設定がされないので対策
		if (start < this.context.currentTime) start = this.context.currentTime;
		var stopAudioTime = 0;
		var stopAudioTime2 = 0;
		switch(option.pitch){
			// Bass Drum
			case 35: // Acoustic Bass Drum
			case 36: // Bass Drum
				// w
				source.playbackRate.value = 0.25;
				gainNode.gain.setValueAtTime(0, start);
				gainNode.gain.linearRampToValueAtTime(velocity*0.7, start+0.004);
				gainNode.gain.linearRampToValueAtTime(0, start+0.008);
				stopAudioTime = 0.008;
				// s
				oscillator.frequency.setValueAtTime(option.pitch==35 ? 90 : 160, start);
				oscillator.frequency.linearRampToValueAtTime(40, start+0.08);
				gainNode2.gain.setValueAtTime(0, start);
				gainNode2.gain.linearRampToValueAtTime(velocity*3, start+0.02);
				gainNode2.gain.linearRampToValueAtTime(0, start+0.08);
				stopAudioTime2 = 0.08;
				break;
			// Snare Drum
			case 37: // Side Stick
				// w
				source.playbackRate.value = 0.26;
				gainNode.gain.setValueAtTime(velocity*1.5, start);
				gainNode.gain.linearRampToValueAtTime(0, start+0.041);
				stopAudioTime = 0.041;
				// s
				oscillator.frequency.setValueAtTime(330, start);
				oscillator.frequency.linearRampToValueAtTime(120, start+0.02);
				gainNode2.gain.setValueAtTime(velocity, start);
				gainNode2.gain.linearRampToValueAtTime(0, start+0.02);
				stopAudioTime2 = 0.02;
				break;
			case 38: // Acoustic Snare
			case 40: // Electric Snare
				var len = option.pitch==38 ? 0.25 : 0.2;
				// w
				source.playbackRate.value = 0.7;
				gainNode.gain.setValueAtTime(velocity, start);
				gainNode.gain.linearRampToValueAtTime(0, start+len);
				stopAudioTime = len;
				// s
				oscillator.frequency.setValueAtTime(option.pitch==38 ? 140 : 200, start);
				oscillator.frequency.linearRampToValueAtTime(option.pitch==38 ? 100 : 160, start+0.1);
				gainNode2.gain.setValueAtTime(velocity*2, start);
				gainNode2.gain.linearRampToValueAtTime(0, start+0.1);
				stopAudioTime2 = 0.1;
				break;
			case 39: // Hand Clap
				// w
				source.playbackRate.value = 0.5;
				gainNode.gain.setValueAtTime(velocity*1.3, start);
				gainNode.gain.linearRampToValueAtTime(0, start+0.010);
				gainNode.gain.setValueAtTime(velocity*1.3, start+0.0101);
				gainNode.gain.linearRampToValueAtTime(0, start+0.020);
				gainNode.gain.setValueAtTime(velocity*1.3, start+0.0201);
				gainNode.gain.linearRampToValueAtTime(0, start+0.09);
				stopAudioTime = 0.09;
				// s
				oscillator.type = "triangle";
				oscillator.frequency.setValueAtTime(180, start);
				gainNode2.gain.setValueAtTime(velocity*0.8, start);
				gainNode2.gain.linearRampToValueAtTime(0, start+0.010);
				gainNode2.gain.setValueAtTime(velocity*0.8, start+0.0101);
				gainNode2.gain.linearRampToValueAtTime(0, start+0.020);
				gainNode2.gain.setValueAtTime(velocity*0.8, start+0.0201);
				gainNode2.gain.linearRampToValueAtTime(0, start+0.030);
				stopAudioTime2 = 0.11;
				break;
			// Toms
			case 41: // Low Floor Tom
			case 43: // High Floor Tom
			case 45: // Low Tom
			case 47: // Low-Mid Tom
			case 48: // High-Mid Tom
			case 50: // High Tom
				var len = (option.pitch-41+(option.pitch>=48 ? 1 : 0));
				// w
				source.playbackRate.value = 0.3+len/45;
				gainNode.gain.setValueAtTime(velocity*1.5, start);
				gainNode.gain.linearRampToValueAtTime(0, start+0.02);
				stopAudioTime = 0.02;
				// s
				oscillator.frequency.setValueAtTime(90+15*len, start);
				oscillator.frequency.linearRampToValueAtTime(30+7.5*len, start+0.5-len/35);
				gainNode2.gain.setValueAtTime(velocity*1.5, start);
				gainNode2.gain.linearRampToValueAtTime(0, start+0.5-len/35);
				stopAudioTime2 = 0.5-len/35;
				break;
			// Hi-hat
			case 42: // Closed High-Hat
			case 44: // Pedal High-Hat
				// w
				source.playbackRate.value = 1;
				if(option.pitch==42){
					gainNode.gain.setValueAtTime(velocity*0.8, start);
				}else{
					gainNode.gain.setValueAtTime(0, start);
					gainNode.gain.linearRampToValueAtTime(velocity*0.8, start+0.014);
				}
				gainNode.gain.linearRampToValueAtTime(0, start+0.08);
				stopAudioTime = 0.08;
				// s
				gainNode2.gain.value = 0;
				stopAudioTime2 = 0;
				break;
			case 46: // Open Hihat
				// w
				source.playbackRate.setValueAtTime(0.35, start);
				source.playbackRate.linearRampToValueAtTime(0.6, start+0.1);
				source.playbackRate.linearRampToValueAtTime(1, start+0.3);
				gainNode.gain.setValueAtTime(velocity*1.1, start);
				gainNode.gain.setTargetAtTime(0, start, 0.3);
				stopAudioTime = 1.5;
				// s
				gainNode2.gain.value = 0;
				stopAudioTime2 = 0;
				break;
			// Cymbal
			case 49: // Crash Cymbal 1
			case 57: // Crash Cymbal 2
				// w
				var r = option.pitch==49 ? 0.3 : 0.5;
				var r2 = option.pitch==49 ? 0.4 : 0.7;
				source.playbackRate.setValueAtTime(r, start);
				source.playbackRate.linearRampToValueAtTime(r2, start+0.15);
				source.playbackRate.linearRampToValueAtTime(0.9, start+0.4);
				gainNode.gain.setValueAtTime(velocity*1.3, start);
				gainNode.gain.setTargetAtTime(0, start, 0.35);
				stopAudioTime = 2;
				// s
				gainNode2.gain.value = 0;
				stopAudioTime2 = 0;
				break;
			case 51: // Ride Cymbal 1
			case 59: // Ride Cymbal 2
				// w
				source.playbackRate.value = 1;
				gainNode.gain.setValueAtTime(velocity*0.9, start);
				gainNode.gain.setTargetAtTime(0, start, 0.35);
				stopAudioTime = 2;
				// s
				oscillator.type = "triangle";
				var f = option.pitch==51 ? 372 : 400;
				oscillator.frequency.setValueAtTime(f, start);
				gainNode2.gain.setValueAtTime(velocity*0.4, start);
				gainNode2.gain.setTargetAtTime(0, start, 0.35);
				stopAudioTime2 = 2;
				break;
			case 52: // Chinese Cymbal
				// w
				source.playbackRate.setValueAtTime(0.17, start);
				source.playbackRate.linearRampToValueAtTime(0.25, start+0.1);
				source.playbackRate.linearRampToValueAtTime(0.5, start+0.6);
				gainNode.gain.setValueAtTime(velocity*1.3, start);
				gainNode.gain.setTargetAtTime(0, start, 0.35);
				stopAudioTime = 2;
				// s
				oscillator.type = "triangle";
				oscillator.frequency.setValueAtTime(382, start);
				gainNode2.gain.setValueAtTime(velocity*0.2, start);
				gainNode2.gain.setTargetAtTime(0, start, 0.35);
				stopAudioTime2 = 2;
				break;
			case 53: // Ride Bell
				// w
				source.playbackRate.setValueAtTime(0.6, start);
				gainNode.gain.setValueAtTime(velocity, start);
				gainNode.gain.setTargetAtTime(0, start, 0.3);
				stopAudioTime = 2;
				// s
				oscillator.type = "triangle";
				oscillator.frequency.setValueAtTime(377, start);
				gainNode2.gain.setValueAtTime(velocity*0.5, start);
				gainNode2.gain.setTargetAtTime(0, start, 0.35);
				stopAudioTime2 = 2;
				break;
			case 55: // Splash Cymbal
				// w
				source.playbackRate.setValueAtTime(0.5, start);
				source.playbackRate.linearRampToValueAtTime(0.8, start+0.1);
				source.playbackRate.linearRampToValueAtTime(1, start+0.6);
				gainNode.gain.setValueAtTime(velocity*1.5, start);
				gainNode.gain.setTargetAtTime(0, start, 0.3);
				stopAudioTime = 1.75;
				// s
				gainNode2.gain.value = 0;
				stopAudioTime2 = 0;
				break;
			// Bell
			case 54: // Tambourine
			case 56: // Cowbell
				// w
				source.playbackRate.setValueAtTime(1, start);
				var v = option.pitch==54 ? 1 : 0.4;
				var len = option.pitch==54 ? 0.01 : 0;
				gainNode.gain.setValueAtTime(velocity*v/2, start);
				gainNode.gain.linearRampToValueAtTime(velocity*v, start+len);
				gainNode.gain.setTargetAtTime(0, start+len, 0.05);
				stopAudioTime = 0.3;
				// s
				oscillator.frequency.setValueAtTime(option.pitch==54 ? 6000 : 495, start);
				var v = option.pitch==54 ? 1 : 2;
				gainNode2.gain.setValueAtTime(velocity*v/2, start);
				gainNode2.gain.linearRampToValueAtTime(velocity*v, start+len);
				gainNode2.gain.setTargetAtTime(0, start+len, 0.05);
				stopAudioTime2 = 0.3;
				break;
			case 58: // Vibraslap
				// w s
				source.playbackRate.setValueAtTime(0.6, start);
				source.playbackRate.linearRampToValueAtTime(1, start+0.8);
				var len = 40;
				gainNode.gain.setValueAtTime(velocity*1.5, start);
				gainNode2.gain.setValueAtTime(velocity*0.5, start);
				for(var i=0; i<len; i++){
					gainNode.gain.linearRampToValueAtTime(velocity*0.1*(len-i)/len, start+i/len*0.8);
					gainNode.gain.linearRampToValueAtTime(velocity*1.5*(len-(i+1))/len, start+(i+0.99)/len*0.8);
					gainNode2.gain.linearRampToValueAtTime(velocity*0.025*(len-i)/len, start+i/len*0.8);
					gainNode2.gain.linearRampToValueAtTime(velocity*0.25*(len-(i+1))/len, start+(i+0.99)/len*0.8);
				}
				gainNode.gain.linearRampToValueAtTime(0, start+0.8);
				gainNode2.gain.linearRampToValueAtTime(0, start+0.8);
				stopAudioTime = 0.8;
				// s
				oscillator.type = "triangle";
				oscillator.frequency.setValueAtTime(1000, start);
				stopAudioTime2 = 0.8;
				break;
			case 80: // Mute Triangle
				// w
				source.playbackRate.value = 1;
				gainNode.gain.setValueAtTime(velocity*0.5, start);
				gainNode.gain.setTargetAtTime(0, start, 0.015);
				stopAudioTime = 0.2;
				// s
				oscillator.type = "triangle";
				oscillator.frequency.setValueAtTime(6000, start);
				gainNode2.gain.setValueAtTime(velocity*2.5, start);
				gainNode2.gain.setTargetAtTime(0, start, 0.02);
				stopAudioTime2 = 0.3;
				break;
			case 81: // Open Triangle
				// w
				source.playbackRate.value = 5;
				gainNode.gain.setValueAtTime(velocity*0.5, start);
				gainNode.gain.setTargetAtTime(0, start, 0.08);
				stopAudioTime = 0.75;
				// s
				oscillator.type = "triangle";
				oscillator.frequency.setValueAtTime(6000, start);
				gainNode2.gain.setValueAtTime(velocity*2.5, start);
				gainNode2.gain.setTargetAtTime(0, start, 0.18);
				stopAudioTime2 = 1;
				break;
			// Other Percussion
			case 60: // High Bongo
			case 61: // Low Bongo
			case 62: // Mute High Conga
			case 63: // Open High Conga
			case 64: // Low Conga
				var p = option.pitch;
				var r = p==60 ? 700　: p==61 ? 282 : p==62 ? 385 : p==63 ? 295 : 210;
				var len = p==60 ? 0.08 : p==61 ? 0.1 : p==62 ? 0.03 : p==63 ? 0.12 : 0.15;
				// w
				source.playbackRate.value = 0.03;
				gainNode.gain.setValueAtTime(velocity*1.2, start);
				stopAudioTime = 0.03;
				// s
				oscillator.frequency.setValueAtTime(r*0.97, start);
				oscillator.frequency.linearRampToValueAtTime(r, start+len);
				gainNode2.gain.setValueAtTime(velocity*1.8, start);
				gainNode2.gain.linearRampToValueAtTime(0, start+len);
				stopAudioTime2 = len;
				break;
			case 65: // High Timbale
			case 66: // Low Timbale
				var len = option.pitch==65 ? 0.22 : 0.25;
				// w
				source.playbackRate.setValueAtTime(option.pitch==65 ? 0.25 : 0.22, start);
				source.playbackRate.linearRampToValueAtTime(option.pitch==65 ? 0.2 : 0.18, start+len);
				gainNode.gain.setValueAtTime(velocity*1.3, start);
				gainNode.gain.linearRampToValueAtTime(velocity*0.2, start+len/3.5);
				gainNode.gain.linearRampToValueAtTime(0, start+len);
				stopAudioTime = len;
				// s
				oscillator.type = "triangle";
				oscillator.frequency.setValueAtTime(option.pitch==65 ? 190*1.07 : 136*1.07, start);
				oscillator.frequency.linearRampToValueAtTime(option.pitch==65 ? 190 : 136, start+0.1);
				gainNode2.gain.setValueAtTime(velocity*3.2, start);
				gainNode2.gain.setTargetAtTime(0, start, 0.08);
				stopAudioTime2 = 1;
				break;
			case 67: // High Agogo
			case 68: // Low Agogo
				// w
				source.playbackRate.value = 1;
				gainNode.gain.setValueAtTime(velocity*0.5, start);
				gainNode.gain.linearRampToValueAtTime(velocity*0.1, start+0.02);
				gainNode.gain.linearRampToValueAtTime(0, start+0.08);
				stopAudioTime = 0.08;
				// s
				oscillator.type = "triangle";
				oscillator.frequency.setValueAtTime(option.pitch==67 ? 1430 : 1055, start);
				gainNode2.gain.setValueAtTime(velocity*2, start);
				gainNode2.gain.setTargetAtTime(0, start, 0.06);
				stopAudioTime2 = 0.75;
				break;
			case 69: // Cabasa
				// w
				source.playbackRate.value = 1;
				gainNode.gain.setValueAtTime(velocity*0.3, start);
				gainNode.gain.linearRampToValueAtTime(velocity*0.8, start+0.03);
				gainNode.gain.linearRampToValueAtTime(0, start+0.08);
				stopAudioTime = 0.08;
				// s
				gainNode2.gain.value = 0;
				stopAudioTime2 = 0;
				break;
			case 70: // Maracas
				// w
				source.playbackRate.value = 1;
				gainNode.gain.setValueAtTime(velocity*1.2, start);
				gainNode.gain.linearRampToValueAtTime(0, start+0.06);
				stopAudioTime = 0.06;
				// s
				gainNode2.gain.value = 0;
				stopAudioTime2 = 0;
				break;
			case 71: // Short Whistle
			case 72: // Long Whistle
				// w
				gainNode.gain.value = 0;
				stopAudioTime = 0;
				// s
				var len = option.pitch==71 ? 0.07 : 0.4;
				oscillator.type = "triangle";
				oscillator.frequency.setValueAtTime(option.pitch==71 ? 2408 : 2105, start);
				gainNode2.gain.setValueAtTime(0, start);
				for(var i=0; i<len*74; i++){
					gainNode2.gain.linearRampToValueAtTime(velocity*2.5, start+(i+0.2)/75);
					gainNode2.gain.linearRampToValueAtTime(velocity*0.5, start+(i+0.9)/75);
				}
				gainNode2.gain.linearRampToValueAtTime(0, start+len);
				stopAudioTime2 = len;
				break;
			case 73: // Short Guiro
			case 74: // Long Guiro
				// w
				var len = option.pitch==73 ? 0.05 : 0.35;
				source.playbackRate.setValueAtTime(option.pitch==73 ? 0.2 : 0.2, start);
				source.playbackRate.linearRampToValueAtTime(option.pitch==73 ? 0.7 : 0.5, start+len);
				gainNode.gain.value = velocity*0.2;
				for(var i=0; i<len*100; i++){
					gainNode.gain.setValueAtTime(velocity*0.4, start+i/100);
					gainNode.gain.setValueAtTime(velocity*0.9, start+(i+0.7)/100);
				}
				stopAudioTime = len;
				// s
				gainNode2.gain.value = 0;
				stopAudioTime2 = 0;
				break;
			case 75: // Claves
				// w
				gainNode.gain.value = 0;
				stopAudioTime = 0;
				// s
				oscillator.frequency.setValueAtTime(2181, start);
				gainNode2.gain.setValueAtTime(0, start);
				gainNode2.gain.setValueAtTime(velocity*2, start+0.005);
				gainNode2.gain.linearRampToValueAtTime(velocity*1, start+0.015);
				gainNode2.gain.linearRampToValueAtTime(velocity*1.5, start+0.025);
				gainNode2.gain.linearRampToValueAtTime(0, start+0.08);
				stopAudioTime2 = 0.1;
				break;
			case 76: // High Wood Block
			case 77: // Low Wood Block
				// w
				source.playbackRate.value = 0.1;
				gainNode.gain.setValueAtTime(velocity*1.2, start);
				gainNode.gain.linearRampToValueAtTime(0, start+0.015);
				stopAudioTime = 0.015;
				// s
				oscillator.frequency.setValueAtTime(option.pitch==76 ? 800 : 600, start);
				gainNode2.gain.setValueAtTime(0, start);
				gainNode2.gain.linearRampToValueAtTime(velocity*3, start+0.005);
				gainNode2.gain.setTargetAtTime(0, start+0.005, 0.02);
				stopAudioTime2 = 0.2;
				break;
			case 78: // Close Cuica
			case 79: // Open Cuica
				// w
				gainNode.gain.value = 0;
				stopAudioTime = 0;
				// s
				var len = 0.18;
				var f = option.pitch==78 ? 750 : 270;
				oscillator.frequency.setValueAtTime(f, start);
				oscillator.frequency.linearRampToValueAtTime(f, start+len/3);
				if (option.pitch==78) oscillator.frequency.linearRampToValueAtTime(f*0.9, start+len);
				gainNode2.gain.setValueAtTime(0, start);
				gainNode2.gain.linearRampToValueAtTime(velocity*1.5, start+0.005);
				gainNode2.gain.linearRampToValueAtTime(velocity*0.5, start+0.02);
				gainNode2.gain.linearRampToValueAtTime(velocity*3, start+0.04);
				gainNode2.gain.linearRampToValueAtTime(velocity*2, start+len/4*3);
				gainNode2.gain.linearRampToValueAtTime(0, start+len);
				stopAudioTime2 = len;
				break;
			// GS, GM2
			case 27: // High Q
				// w
				source.playbackRate.value = 1;
				gainNode.gain.setValueAtTime(velocity*1, start);
				gainNode.gain.linearRampToValueAtTime(0, start+0.002);
				stopAudioTime = 0.002;
				// s
				oscillator.frequency.setValueAtTime(1500, start);
				oscillator.frequency.linearRampToValueAtTime(280, start+0.015);
				oscillator.frequency.linearRampToValueAtTime(0, start+0.07);
				gainNode2.gain.setValueAtTime(velocity*1.9, start);
				gainNode2.gain.linearRampToValueAtTime(0, start+0.07);
				stopAudioTime2 = 0.07;
				break;
			case 28: // Slap
				// w
				source.playbackRate.value = 1;
				gainNode.gain.setValueAtTime(velocity*1.3, start);
				gainNode.gain.linearRampToValueAtTime(0, start+0.010);
				gainNode.gain.setValueAtTime(velocity*1.1, start+0.0101);
				gainNode.gain.linearRampToValueAtTime(0, start+0.020);
				gainNode.gain.setValueAtTime(velocity*0.9, start+0.0201);
				gainNode.gain.setTargetAtTime(0, start+0.0201, 0.03);
				stopAudioTime = 0.2;
				// s
				gainNode2.gain.value = 0;
				stopAudioTime2 = 0;
				break;
			case 29: // Scratch Push
			case 30: // Scratch Pull
				var t1 = option.pitch==29 ? 0.05 : 0.07;
				var t2 = option.pitch==29 ? 0.06 : 0.09;
				var t3 = option.pitch==29 ? 0.07 : 0.11;
				var t4 = option.pitch==29 ? 0.1 : 0.15;
				var t5 = option.pitch==29 ? 0.25 : 0.4;
				// w
				var r1 = option.pitch==29 ? 0.1 : 0.06;
				var r2 = option.pitch==29 ? 0.3 : 0.2;
				var r3 = option.pitch==29 ? 0.18 : 0.12;
				source.playbackRate.setValueAtTime(r1, start);
				source.playbackRate.linearRampToValueAtTime(r2, start+t1);
				source.playbackRate.linearRampToValueAtTime(0, start+t2);
				source.playbackRate.linearRampToValueAtTime(r2, start+t3);
				source.playbackRate.linearRampToValueAtTime(r3, start+t4);
				source.playbackRate.linearRampToValueAtTime(0, start+t5);
				gainNode.gain.setValueAtTime(0, start);
				gainNode.gain.linearRampToValueAtTime(velocity*0.4, start+t1);
				gainNode.gain.linearRampToValueAtTime(velocity*0.1, start+t3);
				gainNode.gain.linearRampToValueAtTime(velocity*0.3, start+t4);
				gainNode.gain.linearRampToValueAtTime(0, start+t5);
				stopAudioTime = t5;
				// s
				var r4 = option.pitch==29 ? 500 : 400;
				var r5 = option.pitch==29 ? 1950 : 1200;
				var r6 = option.pitch==29 ? 430 : 250;
				oscillator.frequency.setValueAtTime(r4, start);
				oscillator.frequency.linearRampToValueAtTime(r5, start+t1);
				oscillator.frequency.linearRampToValueAtTime(0, start+t2);
				oscillator.frequency.linearRampToValueAtTime(r5, start+t3);
				oscillator.frequency.linearRampToValueAtTime(r6, start+t4);
				oscillator.frequency.linearRampToValueAtTime(0, start+t5);
				gainNode2.gain.setValueAtTime(0, start);
				gainNode2.gain.linearRampToValueAtTime(velocity*0.7, start+t1);
				gainNode2.gain.linearRampToValueAtTime(velocity*0.2, start+t3);
				gainNode2.gain.linearRampToValueAtTime(velocity*0.6, start+t4);
				gainNode2.gain.linearRampToValueAtTime(0, start+t5);
				stopAudioTime2 = t5;
				break;
			case 31: // Sticks
				// w
				source.playbackRate.setValueAtTime(0.4, start);
				source.playbackRate.linearRampToValueAtTime(0.5, start+0.015);
				gainNode.gain.setValueAtTime(velocity*1.2, start);
				gainNode.gain.setTargetAtTime(0, start, 0.035);
				stopAudioTime = 0.3;
				// s
				oscillator.frequency.setValueAtTime(3140, start);
				gainNode2.gain.setValueAtTime(velocity*1.2, start);
				gainNode2.gain.setTargetAtTime(0, start, 0.012);
				stopAudioTime2 = 0.3;
				break;
			case 32: // Square Click
				// w
				gainNode.gain.value = 0;
				stopAudioTime = 0;
				// s
				oscillator.type = "square";
				oscillator.frequency.setValueAtTime(333, start);
				gainNode2.gain.setValueAtTime(0, start);
				gainNode2.gain.linearRampToValueAtTime(velocity*4, start+0.0016);
				gainNode2.gain.linearRampToValueAtTime(0, start+0.0032);
				stopAudioTime2 = 0.0032;
				break;
			case 33: // Metronome Click
			case 34: // Metronome Bell
				// w
				source.playbackRate.setValueAtTime(0.17, start);
				source.playbackRate.linearRampToValueAtTime(0.22, start+0.01);
				gainNode.gain.setValueAtTime(velocity*1.5, start);
				gainNode.gain.setTargetAtTime(0, start, 0.015);
				stopAudioTime = 0.3;
				// s
				if (option.pitch==34) {
					oscillator.frequency.setValueAtTime(2040, start);
					gainNode2.gain.setValueAtTime(velocity*1, start);
					gainNode2.gain.setTargetAtTime(0, start, 0.12);
					stopAudioTime2 = 1.1;
				} else {
					gainNode2.gain.value = 0;
					stopAudioTime2 = 0;
				}
				break;
			case 82: // Shaker
				// w
				source.playbackRate.value = 1;
				gainNode.gain.setValueAtTime(velocity*0.5, start);
				gainNode.gain.linearRampToValueAtTime(velocity, start+0.02);
				gainNode.gain.linearRampToValueAtTime(0, start+0.07);
				stopAudioTime = 0.07;
				// s
				gainNode2.gain.value = 0;
				stopAudioTime2 = 0;
				break;
			case 83: // Jingle Bell
				// w
				source.playbackRate.value = 1;
				gainNode.gain.setValueAtTime(0, start);
				gainNode.gain.linearRampToValueAtTime(velocity*1.2, start+0.015);
				gainNode.gain.setTargetAtTime(0, start+0.015, 0.06);
				stopAudioTime = 0.5;
				// s
				oscillator.type = "triangle";
				oscillator.frequency.setValueAtTime(2709, start);
				oscillator.frequency.linearRampToValueAtTime(2657, start+0.3);
				gainNode2.gain.setValueAtTime(0, start);
				gainNode2.gain.linearRampToValueAtTime(velocity*0.7, start+0.025);
				gainNode2.gain.setTargetAtTime(0, start+0.025, 0.07);
				stopAudioTime2 = 0.5;
				break;
			case 84: // Bell Tree
				// w s
				var invert = false;
				source.playbackRate.value = 1;
				for(var i=0; i<28; i++){
					gainNode.gain.setValueAtTime(velocity*0.1, start+i/24*0.45);
					gainNode.gain.setTargetAtTime(0, start+i/24*0.45, 0.01);
					oscillator.frequency.setValueAtTime(1380*(1+(invert ? (24-i)/24 : i/24)), start+i/24*0.45);
					gainNode2.gain.setValueAtTime(velocity*(0.2+i/24), start+i/24*0.45);
					gainNode2.gain.setTargetAtTime(0, start+i/24*0.45, i==27 ? 0.2 : 0.01);
				}
				stopAudioTime = 0.5;
				stopAudioTime2 = 1.5;
				break;
			case 85: // Castanets
				// w
				source.playbackRate.setValueAtTime(0.35, start);
				gainNode.gain.setValueAtTime(velocity*1.3, start);
				gainNode.gain.setTargetAtTime(0, start, 0.01);
				stopAudioTime = 0.1;
				// s
				oscillator.frequency.setValueAtTime(1730, start);
				gainNode2.gain.setValueAtTime(velocity*0.5, start);
				gainNode2.gain.setTargetAtTime(0, start, 0.01);
				stopAudioTime2 = 0.1;
				break;
			case 86: // Mute Surdo
			case 87: // Open Surdo
				// w
				source.playbackRate.setValueAtTime(0.020, start);
				source.playbackRate.linearRampToValueAtTime(0.015, start+0.5);
				gainNode.gain.setValueAtTime(0, start);
				gainNode.gain.linearRampToValueAtTime(velocity*2, start+0.005);
				gainNode.gain.setTargetAtTime(0, start+0.005, option.pitch==86 ? 0.03 : 0.06);
				stopAudioTime = 0.5;
				// s
				oscillator.frequency.setValueAtTime(88, start);
				oscillator.frequency.linearRampToValueAtTime(86, start+0.3);
				gainNode2.gain.setValueAtTime(velocity*2.5, start);
				gainNode2.gain.setTargetAtTime(0, start, option.pitch==86 ? 0.1 : 0.3);
				stopAudioTime2 = option.pitch==86 ? 0.5 : 1.5;
				break;
			default: 
				source.playbackRate.value = option.pitch/69*2;
				stopAudioTime = 0.05;
				stopAudioTime2 = 0;
				break;
		}
		// 同じドラムの音が重ならないようにする機能
		// 同じドラムが次すぐ鳴る場合、次が鳴る前に止めて音が重ならないようにする（同時発音数の増加を軽減する）
		if (!this.settings.isSameDrumSoundOverlap && nextSameNoteOnInterval != -1) {
			if (stopAudioTime > nextSameNoteOnInterval) {stopAudioTime = nextSameNoteOnInterval;}
			if (stopAudioTime2 > nextSameNoteOnInterval) {stopAudioTime2 = nextSameNoteOnInterval;}
		}
		// ドラム音停止時間を設定
		that.stopAudioNode(source, start+stopAudioTime, stopGainNode);
		that.stopAudioNode(oscillator, start+stopAudioTime2, stopGainNode2);
		// ドラム停止時間を設定
		option.drumStopTime = option.startTime + (stopAudioTime >= stopAudioTime2 ? stopAudioTime : stopAudioTime2);
		// 途中で曲停止する場合の処理を返す
		return function(){
			that.stopAudioNode(source, 0, stopGainNode, true);
			that.stopAudioNode(oscillator, 0, stopGainNode2, true);
		};
	};

	PicoAudio.prototype.createBaseNote = function(option, isDrum, isExpression, nonChannel, nonStop){
		var settings = this.settings;
		var context = this.context;
		var songStartTime = this.states.startTime;
		var that = this;
		var channel = nonChannel ? 0 : (option.channel || 0);
		var velocity = (option.velocity) * Number(nonChannel ? 1 : (this.channels[channel][2] != null ? this.channels[channel][2] : 1)) * settings.generateVolume;
		var isGainValueZero = true;

		if(velocity<=0) return {isGainValueZero: true};
		var expGainValue = velocity * ((option.expression ? option.expression[0].value : 100) / 127);
		var expGainNode = context.createGain();
		expGainNode.gain.value = expGainValue;
		if(isExpression){
			option.expression ? option.expression.forEach(function(p){
				var v = velocity * (p.value / 127);
				if(v > 0) isGainValueZero = false;
				expGainNode.gain.setValueAtTime(
					v,
					p.time + songStartTime
				);
			}) : false;
		} else {
			if(expGainValue > 0){
				isGainValueZero = false;
			}
		}
		if(isGainValueZero){ // 音量が常に0なら音を鳴らさない
			return {isGainValueZero: true};
		}

		var start = option.startTime + songStartTime;
		var stop = option.stopTime + songStartTime;
		var pitch = settings.basePitch * Math.pow(Math.pow(2, 1/12), (option.pitch || 69) - 69);
		var oscillator = !isDrum ? context.createOscillator() : context.createBufferSource();
		var panNode = context.createStereoPanner ? context.createStereoPanner() :
				context.createPanner ? context.createPanner() : { pan: { setValueAtTime: function(){} } };
		var gainNode = context.createGain();
		var stopGainNode = context.createGain();

		if(!context.createStereoPanner && context.createPanner) {
			// iOS, Old Browser
			var panValue = option.pan && option.pan[0].value != 64 ? (option.pan[0].value / 127) * 2 - 1 : 0;
			if(panValue > 1.0) panValue = 1.0;
			var panAngle = panValue * 90;
			var panX = Math.sin(panAngle * (Math.PI / 180));
			var panZ = -Math.cos(panAngle * (Math.PI / 180));
			panNode.panningModel = "equalpower";
			panNode.setPosition(panX, 0, panZ);
		} else if(context.createStereoPanner){
			var panValue = option.pan && option.pan[0].value != 64 ? (option.pan[0].value / 127) * 2 - 1 : 0;
			if(panValue > 1.0) panValue = 1.0;
			panNode.pan.value = panValue;
		}

		if(!isDrum){
			oscillator.type = option.type || "sine";
			oscillator.detune.value = 0;
			oscillator.frequency.value = pitch;
			option.pitchBend ? option.pitchBend.forEach(function(p){
				oscillator.frequency.setValueAtTime(
					settings.basePitch * Math.pow(Math.pow(2, 1/12), option.pitch - 69 + p.value),
					p.time + songStartTime
				);
			}) : false;
		} else {
			oscillator.loop = true;
			oscillator.buffer = this.whitenoise;
		}

		if(context.createStereoPanner || context.createPanner){
			var firstPan = true;
			if(context.createStereoPanner) {
				option.pan ? option.pan.forEach(function(p){
					if(firstPan){
						firstPan = false;
						return;
					}
					var v = p.value == 64 ? 0 : (p.value / 127) * 2 - 1;
					if(v > 1.0) v = 1.0;
					panNode.pan.setValueAtTime(
						v,
						p.time + songStartTime
					);
				}) : false;
			} else if(context.createPanner){
				if(panNode.positionX) {
					// Old Browser
					option.pan ? option.pan.forEach(function(p){
						if(firstPan){
							firstPan = false;
							return;
						}
						var v = p.value == 64 ? 0 : (p.value / 127) * 2 - 1;
						if(v > 1.0) v = 1.0;
						var a = v * 90;
						var x = Math.sin(a * (Math.PI / 180));
						var z = -Math.cos(a * (Math.PI / 180));
						panNode.positionX.setValueAtTime(x, p.time + songStartTime);
						panNode.positionY.setValueAtTime(0, p.time + songStartTime);
						panNode.positionZ.setValueAtTime(z, p.time + songStartTime);
					}) : false;
				} else {
					// iOS
					// setValueAtTimeが使えないためsetTimeoutでパンの動的変更
					option.pan ? option.pan.forEach(function(p){
						if(firstPan){
							firstPan = false;
							return;
						}
						var reservePan = setTimeout(function(){
							that.clearFunc("pan", reservePan);
							var v = p.value == 64 ? 0 : (p.value / 127) * 2 - 1;
							if(v > 1.0) v = 1.0;
							var a = v * 90;
							var x = Math.sin(a * (Math.PI / 180));
							var z = -Math.cos(a * (Math.PI / 180));
							panNode.setPosition(x, 0, z);
						}, (p.time + songStartTime - context.currentTime) * 1000);
						that.pushFunc({
							pan: reservePan,
							stopFunc: function(){ clearTimeout(reservePan); }
						});
					}) : false;
				}
			}
			oscillator.connect(panNode);
			panNode.connect(expGainNode);
		} else {
			oscillator.connect(expGainNode);
		}
		expGainNode.connect(gainNode);
		gainNode.connect(stopGainNode);
		stopGainNode.connect(this.masterGainNode);
		this.masterGainNode.connect(context.destination);

		if(!isDrum && option.modulation && (option.modulation.length >= 2 || option.modulation[0].value > 0)){
			var modulationOscillator = context.createOscillator();
			var modulationGainNode = context.createGain();
			firstPan = true;
			option.modulation ? option.modulation.forEach(function(p){
				if(firstPan){
					firstPan = false;
					return;
				}
				var m = p.value / 127;
				if(m > 1.0) m = 1.0;
				modulationGainNode.gain.setValueAtTime(
					pitch * 10 / 440 * m,
					p.time + songStartTime
				);
			}) : false;
			var m = option.modulation ? option.modulation[0].value / 127 : 0;
			if(m > 1.0) m = 1.0;
			modulationGainNode.gain.value = pitch * 10 / 440 * m;
			modulationOscillator.frequency.value = 6;
			modulationOscillator.connect(modulationGainNode);
			modulationGainNode.connect(oscillator.frequency);
		}

		if(this.settings.isReverb && option.reverb && (option.reverb.length >= 2 || option.reverb[0].value > 0)){
			var convolver = this.convolver;
			var convolverGainNode = context.createGain();
			firstPan = true;
			option.reverb ? option.reverb.forEach(function(p){
				if(firstPan){
					firstPan = false;
					return;
				}
				var r = p.value / 127;
				if(r > 1.0) r = 1.0;
				convolverGainNode.gain.setValueAtTime(
					r,
					p.time + songStartTime
				);
			}) : false;
			var r = option.reverb ? option.reverb[0].value / 127 : 0;
			if(r > 1.0) r = 1.0;
			convolverGainNode.gain.value = r;
			gainNode.connect(stopGainNode);
			stopGainNode.connect(convolverGainNode);
			convolverGainNode.connect(convolver);
		}

		if(this.settings.isChorus && option.chorus && (option.chorus.length >= 2 || option.chorus[0].value > 0)){
			var chorusDelayNode = this.chorusDelayNode;
			var chorusGainNode = context.createGain();
			firstPan = true;
			option.chorus ? option.chorus.forEach(function(p){
				if(firstPan){
					firstPan = false;
					return;
				}
				var c = p.value / 127;
				if(c > 1.0) c = 1.0;
				chorusGainNode.gain.setValueAtTime(
					c,
					p.time + songStartTime
				);
			}) : false;
			var c = option.chorus ? option.chorus[0].value / 127 : 0;
			if(c > 1.0) c = 1.0;
			chorusGainNode.gain.value = c;
			gainNode.connect(stopGainNode);
			stopGainNode.connect(chorusGainNode);
			chorusGainNode.connect(chorusDelayNode);
		}

		if(modulationOscillator){
			modulationOscillator.start(start);
			this.stopAudioNode(modulationOscillator, stop, modulationGainNode);
		}

		oscillator.start(start);
		if(!isDrum && !nonChannel && !nonStop){
			this.stopAudioNode(oscillator, stop, stopGainNode);
		}

		return {
			start: start,
			stop: stop,
			pitch: pitch,
			channel: channel,
			velocity: velocity,
			oscillator: oscillator,
			panNode: panNode,
			gainNode: gainNode,
			stopGainNode: stopGainNode,
			isGainValueZero: false
		};
	};

	PicoAudio.prototype.startWebMIDI = function(){
		var outputs;
		var that = this;
		if(!navigator.requestMIDIAccess) return;
		// 1回目：ブラウザにMIDIデバイスのフルコントロールを要求する(SysExの使用を要求)
		// 2回目：MIDIデバイスのフルコントロールがブロックされたら、SysEx無しでMIDIアクセスを要求する
		var sysEx = this.settings.WebMIDIPortSysEx;
		var midiAccessSuccess = function(midiAccess){
			outputs = midiAccess.outputs;
			that.settings.WebMIDIPortOutputs = outputs;
			var output;
			if(that.settings.WebMIDIPort==-1){
				that.settings.WebMIDIPortOutputs.forEach(function(o){
					if(!output) output = o;
				});
			} else {
				output = that.settings.WebMIDIPortOutputs.get(settings.WebMIDIPort);
			}
			that.settings.WebMIDIPortOutput = output;
			that.settings.WebMIDIPortSysEx = sysEx;
			if(output){
				output.open();
				that.initStatus(); // リセットイベント（GMシステム・オン等）を送るため呼び出す
			}
			return outputs;
		};
		var midiAccessFailure = function(err){
			console.log(err);
			if(sysEx){
				sysEx = false;
				navigator.requestMIDIAccess({sysex: sysEx})
					.then(midiAccessSuccess)
					.catch(midiAccessFailure);
			}
		};
		navigator.requestMIDIAccess({sysex: sysEx})
			.then(midiAccessSuccess)
			.catch(midiAccessFailure);
		// 終了時に鳴らしている音を切る
		window.addEventListener('unload', function(e) {
			for(var t=0; t<16; t++){
				that.settings.WebMIDIPortOutput.send([0xB0+t, 120, 0]);
				for(var i=0; i<128; i++){
					that.settings.WebMIDIPortOutput.send([0x80+t, i, 0]);
				}
			}
		});
	};

	PicoAudio.prototype.initStatus = function(isSongLooping, isLight){
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
	};

	PicoAudio.prototype.stop = function(isSongLooping){
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
	};

	PicoAudio.prototype.play = function(isSongLooping){
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
	};

	PicoAudio.prototype.setData = function(data){
		if (this.debug) {
			var syoriTimeS = performance.now();
		}
		if(this.states.isPlaying) this.stop();
		this.playData = data;
		this.settings.resolution = data.header.resolution;
		this.settings.tempo = data.tempo || 120;
		this.tempoTrack = data.tempoTrack;
		this.cc111Time = data.cc111Time;
		this.firstNoteOnTiming = data.firstNoteOnTiming;
		this.lastNoteOffTiming = data.lastNoteOffTiming;
		this.firstNoteOnTime = data.firstNoteOnTime;
		this.lastNoteOffTime = data.lastNoteOffTime;
		this.initStatus();
		if (this.debug) {
			var syoriTimeE = performance.now();
			console.log("setData time", syoriTimeE - syoriTimeS);
		}
		return this;
	};

	PicoAudio.prototype.getMasterVolume = function(){
		return this.settings.masterVolume;
	};

	PicoAudio.prototype.setMasterVolume = function(volume){
		this.settings.masterVolume = volume;
		this.masterGainNode.gain.value = this.settings.masterVolume;
	};

	PicoAudio.prototype.isLoop = function(){
		return this.settings.loop;
	};

	PicoAudio.prototype.setLoop = function(loop){
		this.settings.loop = loop;
	};

	PicoAudio.prototype.isWebMIDI = function(){
		return this.settings.isWebMIDI;
	};

	PicoAudio.prototype.setWebMIDI = function(enable){
		this.settings.isWebMIDI = enable;
	};

	PicoAudio.prototype.isCC111 = function(){
		return this.settings.isCC111;
	};

	PicoAudio.prototype.setCC111 = function(enable){
		this.settings.isCC111 = enable;
	};

	PicoAudio.prototype.setStartTime = function(offset){
		this.states.startTime -= offset;
	};

	PicoAudio.prototype.setOnSongEndListener = function(listener){
		this.onSongEndListener = listener;
	};

	PicoAudio.prototype.onSongEnd = function(){
		if(this.onSongEndListener){
			var isStopFunc = this.onSongEndListener();
			if(isStopFunc) return;
		}
		if(this.settings.loop){
			this.initStatus(true);
			if(this.settings.isCC111 && this.cc111Time != -1){
				this.setStartTime(this.cc111Time);
			}
			this.play(true);
		}
	};

	PicoAudio.prototype.isReverb = function(){
		return this.settings.isReverb;
	};

	PicoAudio.prototype.setReverb = function(enable){
		this.settings.isReverb = enable;
	};

	PicoAudio.prototype.getReverbVolume = function(){
		return this.settings.reverbVolume;
	};

	PicoAudio.prototype.setReverbVolume = function(volume){
		this.settings.reverbVolume = volume;
	};

	PicoAudio.prototype.isChorus = function(){
		return this.settings.isChorus;
	};

	PicoAudio.prototype.setChorus = function(enable){
		this.settings.isChorus = enable;
	};

	PicoAudio.prototype.getChorusVolume = function(){
		return this.settings.chorusVolume;
	};

	PicoAudio.prototype.setChorusVolume = function(volume){
		this.settings.chorusVolume = volume;
	};

	PicoAudio.prototype.isAndroid = function(){
		var u = navigator.userAgent.toLowerCase();
		return u.indexOf("android") != -1 && u.indexOf("windows") == -1;
	};

	PicoAudio.prototype.isFirefox = function(){
		var u = navigator.userAgent.toLowerCase();
		return u.indexOf("firefox") != -1;
	};

	PicoAudio.prototype.isArmv7l = function(){ // Raspberry Pi
		var u = navigator.userAgent.toLowerCase();
		return u.indexOf("armv7l") != -1;
	};

	PicoAudio.prototype.measurePerformanceReverb = function(){
		// 0.5秒パフォーマンス計測して、リバーブONにするか判断する
		var max = 500000; // 0.5秒以内にここまで計算できればリバーブON
		var startTime = performance.now();
		for (var i=0;i<max;i++) {
			if (performance.now()-startTime>=500) break;
		}
		if (this.debug) {
			console.log("measurePerformanceReverb", i, performance.now()-startTime);
		}
		if (i < max) return false;
		return true;
	};

	PicoAudio.prototype.getTime = function(timing){
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

	PicoAudio.prototype.getTiming = function(time){
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

	PicoAudio.prototype.parseSMF = function(_smf){
		if (this.debug) {
			console.log(_smf);
			var syoriTimeS = performance.now();
		}
		var that = this;
		var smf = new Uint8Array(_smf); // smf配列はデータ上書きするので_smfをディープコピーする
		if(smf[0] != 77 || smf[1] != 84 || smf[2] != 104 || smf[3] != 100)
			return "Not Sandard MIDI File.";
		var data = new Object;
		var p = 4;
		var header = new Object();
		header.size = this.getInt(smf, 4, 8);
		header.format = smf[9];
		header.trackcount = this.getInt(smf, 10, 12);
		header.timemanage = smf[12];
		header.resolution = this.getInt(smf, 12, 14); // TODO 0除算防止。15bit目1のとき、https://sites.google.com/site/yyagisite/material/smfspec#ConductorTrack
		p += 4+header.size;
		var tempoTrack = new Array();
		var beatTrack = new Array();
		var channels = new Array();
		var cc111Tick = -1;
		var cc111Time = -1;
		var firstNoteOnTiming = Number.MAX_SAFE_INTEGER; // 最初のノートオンのTick
		var firstNoteOnTime = Number.MAX_SAFE_INTEGER;
		var lastNoteOffTiming = 0; // 最後のノートオフのTick
		var lastNoteOffTime = 0;
		var chSize = this.settings.isWebMIDI ? 17 : 16;
		for(var i=0; i<chSize; i++){
			var channel = new Object();
			channels.push(channel);
			// smfを読む順番を記録した索引配列を作る
			// 型付き配列をリスト構造のように使う（リスト構造にすることで挿入処理を高速化する）
			// [tick, smfMesLength, smfPtr, nextIndicesPtr, ...]
			channel.indices = new Int32Array(Math.floor(smf.length/8));
			channel.indicesLength = 0;
			channel.indicesHead = -1; // 先頭のポインタ
			channel.indicesFoot = 0; // 末尾のポインタ
			channel.indicesCur = 0; // 現在のinsert用ポインタ
			channel.indicesPre = 0; // 前回のinsert用ポインタ
			channel.notes = [];
		}
		if (this.debug) {
			var syoriTimeS1_1 = performance.now();
		}
		var songLength = 0;
		if(this.settings.isWebMIDI) var messages = [];
		for(var t=0; t<header.trackcount; t++){
			if(smf[p] != 77 || smf[p+1] != 84 || smf[p+2] != 114 || smf[p+3] != 107)
				return "Irregular SMF.";
			p += 4;
			var endPoint = p+4 + this.getInt(smf, p, p+4);
			p += 4;
			var tick = 0;
			var tempo = 120;
			var tempoCurTick = 0;
			var tempoCurTime = 0;
			var lastState = 1;
			while(p<endPoint){
				// DeltaTime
				if(lastState!=null){
					var lengthAry = this.variableLengthToInt(smf, p, p+5);
					var dt = lengthAry[0];
					tick += dt;
					p += lengthAry[1];
				}
				// WebMIDIAPI
				if(this.settings.isWebMIDI){
					var cashP = p;
					var time = (60 / tempo / header.resolution) * (tick - tempoCurTick) + tempoCurTime;
				}
				// Events
				switch(Math.floor(smf[p]/0x10)){
					case 0x8: // Note OFF - 8[ch], Pitch, Velocity
					case 0x9: // Note ON - 9[ch], Pitch, Velocity
					case 0xA: // Polyfonic Key Pressure - A[ch], Pitch?, Velocity?
					case 0xB: // Control Change - B[ch],,
					case 0xE: // PitchBend Change - E[ch],,
						// チャンネル毎に仕分けた後に解析する
						lastState = smf[p];
						var ch = channels[lastState&0x0F];
						this.chIndicesSplice(ch, tick, p, 3); // デルタタイムの順番になるようにリスト配列に挿入
						p+=3;
						break;
					case 0xC: // Program Change - C[ch],
					case 0xD: // Channel Pre - D[ch],
						// チャンネル毎に仕分けた後に解析する
						lastState = smf[p];
						var ch = channels[lastState&0x0F];
						this.chIndicesSplice(ch, tick, p, 2); // デルタタイムの順番になるようにリスト配列に挿入
						p+=2;
						break;
					// SysEx Events or Meta Events - F[ch], ...
					case 0xF:{
						//lastState = smf[p]; <- ランニングナントカは無いらしい
						switch(smf[p]){
							case 0xF0:
							case 0xF7:
								// SysEx Events
								var lengthAry = this.variableLengthToInt(smf, p+1, p+1+4);

								// Master Volume
								// 0xF0, size, 0x7f, 0x7f, 0x04, 0x01, 0xNN, volume, 0xF7
								if(lengthAry[0]>=7 && smf[p+2]==0x7f && smf[p+3]==0x7f && smf[p+4]==0x04 && smf[p+5]==0x01){
									// 全チャンネルにMasterVolumeメッセージを挿入する
									for(var i=0; i<16; i++) {
										var ch = channels[i];
										this.chIndicesSplice(ch, tick, p, lengthAry[0]); // デルタタイムの順番になるように配列に挿入
									}
								}

								p+=1+lengthAry[1]+lengthAry[0];
								break;
							case 0xF1:
								p+=2;
								break;
							case 0xF2:
								p+=3;
								break;
							case 0xF3:
								p+=2;
								break;
							case 0xF6:
							case 0xF8:
							case 0xFA:
							case 0xFB:
							case 0xFC:
							case 0xFE:
								p+=1;
								break;
							case 0xFF:{
								// Meta Events
								switch(smf[p+1]){
									case 0x00:
									case 0x01:
									case 0x02:
									case 0x03:
									case 0x04:
									case 0x05:
									case 0x06:
									case 0x07:
									case 0x20:
										break;
									case 0x2F:
										tick += (this.settings.isSkipEnding ? 0 : header.resolution) - dt;
										break;
									// Tempo
									case 0x51:
										// 全チャンネルにTempoメッセージを挿入する
										for(var i=0; i<16; i++) {
											var ch = channels[i];
											this.chIndicesSplice(ch, tick, p, 6); // デルタタイムの順番になるように配列に挿入
										}
										tempoCurTime += (60 / tempo / header.resolution) * (tick - tempoCurTick);
										tempoCurTick = tick;
										tempo = 60000000/(smf[p+3]*0x10000 + smf[p+4]*0x100 + smf[p+5]);
										tempoTrack.push({
											timing: tick,
											time: tempoCurTime,
											value: tempo
										});
										break;
									case 0x54:
										break;
									// Beat
									case 0x58:
										beatTrack.push({
											timing: tick,
											value: [smf[p+3], Math.pow(2, smf[p+4])]
										});
										break;
									case 0x59:
									case 0x7F:
										break;
								}
								var lengthAry = this.variableLengthToInt(smf, p+2, p+2+4);
								p+=2+lengthAry[1]+lengthAry[0];
								break;
							}
						}
						break;
					}
					default: {
						if(lastState == null)
							return "Irregular SMF.";
						p--;
						smf[p] = lastState; // 上書き
						lastState = null;
					}
				}
				// WebMIDIAPI
				if(this.settings.isWebMIDI){
					if(lastState!=null){
						this.chIndicesSplice(channels[16], tick, cashP, p-cashP);
					}
				}
			}
			if(!this.settings.isSkipEnding && songLength<tick) songLength = tick;
			// リスト配列のポインタを初期化
			for(var i=0; i<channels.length; i++){
				channels[i].indicesCur = channels[i].indicesHead;
				channels[i].indicesPre = channels[i].indicesHead;
			}
		}

		if (this.debug) {
			var syoriTimeS2 = performance.now();
		}
		// Midi Events (0x8n - 0xEn) parse
		for(var ch=0; ch<16; ch++){
			var channel = channels[ch];
			var dataEntry = 2;
			var pitchBend = 0;
			var pan = 64;
			var expression = 127;
			var velocity = 100;
			var modulation = 0;
			var hold = 0;
			var reverb = this.isTonyu2 ? 0 : 10;
			var chorus = 0;
			var nrpnLsb = 127;
			var nrpnMsb = 127;
			var rpnLsb = 127;
			var rpnMsb = 127;
			var instrument = 0;
			var masterVolume = 127;
			var tempo = 120;
			var tempoCurTick = 0;
			var tempoCurTime = 0;
			var nowNoteOnIdxAry = [];
			var indIdx = channel.indicesHead;
			var indices = channel.indices;
			var nextNoteOnAry = new Array(128);
			while(indIdx!=-1){
				var tick = indices[indIdx];
				var p = indices[indIdx+2];
				var nextIdx = indices[indIdx+3];
				var time = (60 / tempo / header.resolution) * (tick - tempoCurTick) + tempoCurTime;
				// Events
				switch(Math.floor(smf[p]/0x10)){
					// Note OFF - 8[ch], Pitch, Velocity
					case 0x8:
						nowNoteOnIdxAry.some(function(idx,i){
							var note = channel.notes[idx];
							if(note.pitch==smf[p+1] && note.stop==null){
								if(hold>=that.settings.holdOnValue){
									if (note.holdBeforeStop==null){
										note.holdBeforeStop = [{
											timing: tick,
											time: time,
											value: hold
										}];
									}
								} else {
									note.stop = tick;
									note.stopTime = time;
									// nowNoteOnIdxAry.splice(i, 1); を軽量化
									if(i == nowNoteOnIdxAry.length-1) nowNoteOnIdxAry.pop();
									else if(i == 0) nowNoteOnIdxAry.shift();
									else nowNoteOnIdxAry.splice(i, 1);
								}
								if(tick > lastNoteOffTiming){
									lastNoteOffTiming = tick;
									lastNoteOffTime = time;
								}
								return true;
							}
						});
						break;
					// Note ON - 9[ch], Pitch, Velocity
					case 0x9:
						if(smf[p+2]!=0){that.settings.resolution = header.resolution;
							var note = {
								start: tick,
								stop: null,
								startTime: time,
								stopTime: null,
								pitch: smf[p+1],
								pitchBend: [{timing:tick,time:time,value:pitchBend}],
								pan: [{timing:tick,time:time,value:pan}],
								expression: [{timing:tick,time:time,value:expression*(masterVolume/127)}],
								velocity: (smf[p+2]/127)*(velocity/127),
								modulation: [{timing:tick,time:time,value:modulation}],
								holdBeforeStop: null,
								reverb: [{timing:tick,time:time,value:reverb}],
								chorus: [{timing:tick,time:time,value:chorus}],
								instrument: instrument,
								channel: ch,
								nextSameNoteOnInterval: -1,
								drumStopTime: 2 // 再生時に使う
							};
							// 前回鳴っていた同音ノートに次のノートオン時間を入れる
							var prevNote = nextNoteOnAry[smf[p+1]];
							if(prevNote){
								prevNote.nextSameNoteOnInterval = time - prevNote.startTime;
							}
							nextNoteOnAry[smf[p+1]] = note;
							// If this note is NoteOn, change to NoteOFF.
							nowNoteOnIdxAry.some(function(idx,i){
								var note = channel.notes[idx];
								if(note.pitch == smf[p+1] && note.stop==null){
									note.stop = tick;
									note.stopTime = time;
									// nowNoteOnIdxAry.splice(i, 1); を軽量化
									if(i == nowNoteOnIdxAry.length-1) nowNoteOnIdxAry.pop();
									else if(i == 0) nowNoteOnIdxAry.shift();
									else nowNoteOnIdxAry.splice(i, 1);
								}
							});
							nowNoteOnIdxAry.push(channel.notes.length);
							channel.notes.push(note);
							if(tick < firstNoteOnTiming){
								firstNoteOnTiming = tick;
								firstNoteOnTime = time;
							}
						} else {
							nowNoteOnIdxAry.some(function(idx,i){
								var note = channel.notes[idx];
								if(note.pitch==smf[p+1] && note.stop==null){
									if(hold>=that.settings.holdOnValue){
										if (note.holdBeforeStop==null){
											note.holdBeforeStop = [{
												timing: tick,
												time: time,
												value: hold
											}];
										}
									} else {
										note.stop = tick;
										note.stopTime = time;
										// nowNoteOnIdxAry.splice(i, 1); を軽量化
										if(i == nowNoteOnIdxAry.length-1) nowNoteOnIdxAry.pop();
										else if(i == 0) nowNoteOnIdxAry.shift();
										else nowNoteOnIdxAry.splice(i, 1);
									}
									if(tick > lastNoteOffTiming){
										lastNoteOffTiming = tick;
										lastNoteOffTime = time;
									}
									return true;
								}
							});
						}
						break;
					// Polyfonic Key Pressure - A[ch], Pitch?, Velocity?
					case 0xA:
						break;
					// Control Change - B[ch],,
					case 0xB:
						switch(smf[p+1]){
							case 1:
								modulation = smf[p+2];
								nowNoteOnIdxAry.forEach(function(idx){
									var note = channel.notes[idx];
									note.modulation.push({
										timing: tick,
										time: time,
										value: modulation
									});
								});
								break;
							case 6:
								if(rpnLsb==0 && rpnMsb==0){
									// RLSB=0 & RMSB=0 -> 6はピッチ
									dataEntry = smf[p+2];
									if(dataEntry > 24){
										dataEntry = 24;
									}
								}
								if(nrpnLsb==8 && nrpnMsb==1){
									// (保留)ビブラート・レイト(GM2/GS/XG)
									//console.log("CC  8 1 6 "+smf[p+2]+" tick:"+tick);
								} else if(nrpnLsb==9 && nrpnMsb==1){
									// (保留)ビブラート・デプス(GM2/GS/XG)
									//console.log("CC  9 1 6 "+smf[p+2]+" tick:"+tick);
								} else if(nrpnLsb==10 && nrpnMsb==1){
									// (保留)ビブラート・ディレイ(GM2/GS/XG)
									//console.log("CC 10 1 6 "+smf[p+2]+" tick:"+tick);
								}
								break;
							case 7:
								velocity = smf[p+2];
								break;
							case 10:
								//Pan
								pan = smf[p+2];
								nowNoteOnIdxAry.forEach(function(idx){
									var note = channel.notes[idx];
									note.pan.push({
										timing: tick,
										time: time,
										value: pan
									});
								});
								break;
							case 11:
								//Expression
								expression = smf[p+2];
								nowNoteOnIdxAry.forEach(function(idx){
									var note = channel.notes[idx];
									note.expression.push({
										timing: tick,
										time: time,
										value: expression*(masterVolume/127)
									});
								});
								break;
							case 64:
								//Hold1
								hold = smf[p+2];
								if(hold<this.settings.holdOnValue){
									for(var i=nowNoteOnIdxAry.length-1; i>=0; i--){
										var idx = nowNoteOnIdxAry[i];
										var note = channel.notes[idx];
										if(note.stop==null && note.holdBeforeStop!=null){
											note.stop = tick;
											note.stopTime = time;
											// nowNoteOnIdxAry.splice(i, 1); を軽量化
											if(i == nowNoteOnIdxAry.length-1) nowNoteOnIdxAry.pop();
											else if(i == 0) nowNoteOnIdxAry.shift();
											else nowNoteOnIdxAry.splice(i, 1);
										}
									}
								}
								break;
							case 91:
								reverb = smf[p+2];
								nowNoteOnIdxAry.forEach(function(idx){
									var note = channel.notes[idx];
									note.reverb.push({
										timing: tick,
										time: time,
										value: reverb
									});
								});
								break;
							case 93:
								chorus = smf[p+2];
								nowNoteOnIdxAry.forEach(function(idx){
									var note = channel.notes[idx];
									note.chorus.push({
										timing: tick,
										time: time,
										value: chorus
									});
								});
								break;
							case 98:
								nrpnLsb = smf[p+2];
								break;
							case 99:
								nrpnMsb = smf[p+2];
								break;
							case 100:
								rpnLsb = smf[p+2];
								break;
							case 101:
								rpnMsb = smf[p+2];
								break;
							case 111: // RPGツクール用ループ
								if(cc111Tick == -1){
									cc111Tick = tick;
									cc111Time = time;
								}
								break;
						}
						break;
					// Program Change - C[ch],
					case 0xC:
						instrument = smf[p+1];
						break;
					// Channel Pre - D[ch],
					case 0xD:
						break;
					// PitchBend Change - E[ch],,
					case 0xE:
						pitchBend = ((smf[p+2]*128+smf[p+1])-8192)/8192*dataEntry;
						nowNoteOnIdxAry.forEach(function(idx){
							var note = channel.notes[idx];
							note.pitchBend.push({
								timing: tick,
								time: time,
								value: pitchBend
							});
						});
						break;
					case 0xF:
						//lastState = smf[p]; <- ランニングナントカは無いらしい
						switch(smf[p]){
							case 0xF0:
							case 0xF7:
								// Master Volume
								if(smf[p+1]==0x7f && smf[p+2]==0x7f && smf[p+3]==0x04 && smf[p+4]==0x01){
									var vol = smf[p+6];
									if(vol > 127) vol = 127;
									masterVolume = vol;
									nowNoteOnIdxAry.forEach(function(idx){
										var note = channel.notes[idx];
										note.expression.push({
											timing: tick,
											time: time,
											value: expression*(masterVolume/127)
										});
									});
								}
								break;
							case 0xFF:
								// Meta Events
								switch(smf[p+1]){
									case 0x51:
										// Tempo
										tempoCurTime += (60 / tempo / header.resolution) * (tick - tempoCurTick);
										tempoCurTick = tick;
										tempo = 60000000/(smf[p+3]*0x10000 + smf[p+4]*0x100 + smf[p+5]);
										break;
								}
						}
						break;
					default: {
						return "Error parseSMF.";
					}
				}
				indIdx = nextIdx;
			}
			channel.nowNoteOnIdxAry = nowNoteOnIdxAry;
			if (!this.debug) {
				delete channel.indices;
			}
		}

		// hold note off
		for(var ch=0; ch<16; ch++){
			var channel = channels[ch];
			var nowNoteOnIdxAry = channels[ch].nowNoteOnIdxAry;
			for(var i=nowNoteOnIdxAry.length-1; i>=0; i--){
				var note = channel.notes[nowNoteOnIdxAry[i]];
				if(note.stop==null){
					note.stop = lastNoteOffTiming;
					note.stopTime = lastNoteOffTime;
					// If (note.cc[x].timing > lastNoteOffTiming), delete note.cc[x]
					var nameAry = ["pitchBend", "pan", "expression", "modulation", "reverb", "chorus"];
					nameAry.forEach(function(name){
						var ccAry = note[name]
						for(var i2=ccAry.length-1; i2>=1; i2--){
							var obj = ccAry[i2];
							if(obj.timing>lastNoteOffTiming){
								// ccAry.splice(i2, 1); を軽量化
								if(i2 == ccAry.length-1) ccAry.pop();
								else if(i2 == 0) ccAry.shift();
								else ccAry.splice(i2, 1);
							}
						}
					});
					// nowNoteOnIdxAry.splice(i, 1); を軽量化
					if(i == nowNoteOnIdxAry.length-1) nowNoteOnIdxAry.pop();
					else if(i == 0) nowNoteOnIdxAry.shift();
					else nowNoteOnIdxAry.splice(i, 1);
				}
			}
			delete channel.nowNoteOnIdxAry;
		}
		if(this.settings.isSkipEnding) songLength = lastNoteOffTiming;
		tempoTrack.push({ timing:songLength, time:(60 / tempo / header.resolution) * (songLength - tempoCurTick) + tempoCurTime, value:120 });

		if(this.settings.isWebMIDI){
			var channel = channels[16];
			var tempo = 120;
			var tempoCurTick = 0;
			var tempoCurTime = 0;
			var indIdx = channel.indicesHead;
			var indices = channel.indices;
			while(indIdx!=-1){
				var tick = indices[indIdx];
				var pLen = indices[indIdx+1];
				var p = indices[indIdx+2];
				var nextIdx = indices[indIdx+3];
				var time = (60 / tempo / header.resolution) * (tick - tempoCurTick) + tempoCurTime;
				// Events
				switch(smf[p]){
					case 0xFF:
					// Meta Events
					switch(smf[p+1]){
						case 0x51:
							// Tempo
							tempoCurTime += (60 / tempo / header.resolution) * (tick - tempoCurTick);
							tempoCurTick = tick;
							tempo = 60000000/(smf[p+3]*0x10000 + smf[p+4]*0x100 + smf[p+5]);
							break;
					}
				}
				messages.push({time:time, tick:tick, smfPtr:p, smfPtrLen:pLen});
				indIdx = nextIdx;
			}
		}

		data.header = header;
		data.tempoTrack = tempoTrack;
		data.beatTrack = beatTrack;
		data.channels = channels;
		data.songLength = songLength;
		data.cc111Tick = cc111Tick;
		data.cc111Time = cc111Time;
		data.firstNoteOnTiming = firstNoteOnTiming;
		data.firstNoteOnTime = firstNoteOnTime;
		data.lastNoteOffTiming = lastNoteOffTiming;
		data.lastNoteOffTime = lastNoteOffTime;
		if(this.settings.isWebMIDI){
			data.messages = messages;
			data.smfData = new Uint8Array(smf); // lastStateを上書きしたsmfをコピー
		}

		if (this.debug) {
			var syoriTimeE = performance.now();
			console.log("parseSMF time", syoriTimeE - syoriTimeS);
			console.log("parseSMF(0/2) time", syoriTimeS1_1 - syoriTimeS);
			console.log("parseSMF(1/2) time", syoriTimeS2 - syoriTimeS);
			console.log("parseSMF(2/2) time", syoriTimeE - syoriTimeS2);
			console.log(data);
		}
		return data;
	};

	PicoAudio.prototype.getInt = function(arr, s, e){
		var value = 0;
		for (var i=s; i<e; i++){
			value = (value << 8) + arr[i];
		}
		return value;
	};

	PicoAudio.prototype.variableLengthToInt = function(arr, s, e){
		var i = s;
		var value = 0;
		while(i<e-1 && arr[i]>=0x80){
			if (i < s+4) value = (value<<7) + (arr[i]-0x80);
			i++;
		}
		value = (value<<7) + arr[i];
		i++;
		return [value, i-s];
	};

	PicoAudio.prototype.chIndicesSplice = function(ch, time, p, len){
		var indices = ch.indices;
		// メモリー足りなくなったら拡張
		if(indices.length <= ch.indicesLength+4){
			if(this.debug){
				var ts1 = performance.now();
			}
			var temp = new Int32Array(Math.floor(indices.length*2));
			for(var i=indices.length-1; i>=0; i--){
				temp[i] = indices[i];
			}
			ch.indices = indices = temp;
			if(this.debug){
				console.log("malloc", performance.now() - ts1, temp.length);
			}
		}
		// デルタタイムの順番になるようにリスト配列に挿入
		if(ch.indicesLength>=4 && time<indices[ch.indicesFoot]){
			// Insert
			while(ch.indicesCur != -1){
				if(time<indices[ch.indicesCur]){
					if(ch.indicesCur==ch.indicesHead){
						ch.indicesHead = ch.indicesLength;
					} else {
						indices[ch.indicesPre+3] = ch.indicesLength;
					}
					indices[ch.indicesLength] = time;
					indices[ch.indicesLength+1] = len;
					indices[ch.indicesLength+2] = p;
					indices[ch.indicesLength+3] = ch.indicesCur;
					ch.indicesPre = ch.indicesLength;
					ch.indicesLength += 4;
					break;
				}
				ch.indicesPre = ch.indicesCur;
				ch.indicesCur = indices[ch.indicesCur+3];
			}
		} else {
			// Push
			if(ch.indicesLength>=4){
				indices[ch.indicesFoot+3] = ch.indicesLength;
			} else {
				ch.indicesHead = 0;
			}
			ch.indicesFoot = ch.indicesLength;
			indices[ch.indicesLength] = time;
			indices[ch.indicesLength+1] = len;
			indices[ch.indicesLength+2] = p;
			indices[ch.indicesLength+3] = -1;
			ch.indicesLength += 4;
		}
	};

	PicoAudio.prototype.stopAudioNode = function(tar, time, stopGainNode, isNoiseCut){
		var isImmed = time <= this.context.currentTime; // 即時ストップか？
		// 時間設定
		if(!isImmed){ // 予約ストップ
			var vol1Time = time-0.005;
			var stopTime = time;
		} else { // 即時ストップ
			if(!isNoiseCut){
				var stopTime = this.context.currentTime;
			} else {
				var vol1Time = this.context.currentTime;
				var stopTime = this.context.currentTime+0.005;
			}
		}
		// 音の停止
		try{
			if(!isNoiseCut){
				tar.stop(stopTime);
			} else {
				tar.stop(stopTime);
				stopGainNode.gain.cancelScheduledValues(0);
				stopGainNode.gain.setValueAtTime(1, vol1Time);
				stopGainNode.gain.linearRampToValueAtTime(0, stopTime);
			}
		} catch(e) { // iOS (stopが２回以上使えないので、代わりにstopGainNodeでミュートにする)
			stopGainNode.gain.cancelScheduledValues(0);
			if(!isNoiseCut){
				stopGainNode.gain.setValueAtTime(0, stopTime);
			} else {
				stopGainNode.gain.setValueAtTime(1, vol1Time);
				stopGainNode.gain.linearRampToValueAtTime(0, stopTime);
			}
		}
	};

	PicoAudio.prototype.pushFunc = function(tar){
		if(!tar.note && !tar.rootTimeout && !tar.pan && !this.trigger.isNoteTrigger) return;
		this.states.stopFuncs.push(tar);
	};

	PicoAudio.prototype.clearFunc = function(tar1, tar2){
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
	};

	return PicoAudio;
})();
