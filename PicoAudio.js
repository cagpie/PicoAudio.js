var PicoAudio = (function(){
	function PicoAudio(_audioContext, _picoAudio){
		this.debug = true;
		this.settings = {
			masterVolume: 1,
			generateVolume: 0.15,
			tempo: 120,
			basePitch: 440,
			resolution: 480,
			hashLength: this.isAndroid() ? 20 : 30,
			hashBuffer: 2,
			isWebMIDI: false,
			WebMIDIPortOutputs: null,
			WebMIDIPortOutput: null,
			WebMIDIPort: -1, // -1:auto
			WebMIDIPortSysEx: true, // MIDIデバイスのフルコントロールをするかどうか（SysExを使うかどうか）(httpsじゃないと使えない？)
			isReverb: this.isDefaultReverb(), // リバーブONにするか
			reverbVolume: 1.5,
			isChorus: true,
			chorusVolume: 0.5,
			isCC111: true,
			dramMaxPlayLength: 0.5, // ドラムで一番長い音の秒数
			loop: false,
			isSkipBeginning: false, // 冒頭の余白をスキップ
			isSkipEnding: true, // 末尾の空白をスキップ
			holdOnValue: 64,
			maxPoly: -1, // 同時発音数 -1:infinity
			maxPercPoly: -1, // 同時発音数(パーカッション) -1:infinity
			isOfflineRendering: false // 演奏データを作成してから演奏する
		};
		this.trigger = { isNoteTrigger: true, noteOn: function(){}, noteOff: function(){}, songEnd: function(){} };
		this.states = { isPlaying: false, startTime:0, stopTime:0, stopFuncs:[], webMIDIWaitState:null, webMIDIStopTime:0
			, playIndices:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], updateBufTime:0, updateBufMaxTime:20, updateIntervalTime:0
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
	}

	PicoAudio.prototype.init = function(_audioContext, _picoAudio){
		var AudioContext = window.AudioContext || window.webkitAudioContext;
		this.context = _audioContext ? _audioContext : new AudioContext();
		if(_picoAudio && _picoAudio.whitenoise){ // 使いまわし
			this.whitenoise = _picoAudio.whitenoise;
		} else {
			this.whitenoise = this.context.createBuffer(2, this.context.sampleRate, this.context.sampleRate);
			for (var ch=0; ch<2; ch++){
				for (var i=0; i<this.context.sampleRate; i++){
					this.whitenoise.getChannelData(ch)[i] = Math.random() * 2 - 1;
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
		this.convolver.normalize = false;
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
	}

	PicoAudio.prototype.createNote = function(option){
		var nonStop = false;
		if(option.channel){
			switch(this.channels[option.channel][1]/10 || option.instrument){
				// ピッチカート系減衰は後でstopさせる
				case 0.2:
				case 12: case 13: case 45: case 55:
				// 再生しない系は後でstopさせる
				case 119:
					nonStop = true;
					break;
			}
		}
		var note = this.createBaseNote(option, true, false, nonStop);
		if(note.isGainValueZero) return null;

		var oscillator = note.oscillator;
		var gainNode = note.gainNode;
		var panNode = note.panNode;
		var noiseCutGainNode = note.noiseCutGainNode;
		var isPizzicato = false;
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
				that.stopAudioNode(oscillator, note.start+0.2, gainNode);
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
				// gainNode.gain.linearRampToValueAtTime(gainNode.gain.value*0.5, note.start+0.1);
				// gainNode.gain.setValueAtTime(gainNode.gain.value*0.5, note.start+0.1);
				// gainNode.gain.linearRampToValueAtTime(0.0, note.start+4+note.velocity*3);
				break;
			}
			// ギター系
			case 0.4:
			case 24: case 25: case 26: case 27: case 28: case 29: case 30: case 31: case 34:
			{
				gainNode.gain.value *= 1.1;
				gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
				gainNode.gain.linearRampToValueAtTime(0.0, note.start+1.0+note.velocity*4);
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
				break;
			}
			// 再生しない系
			case 119:
			{
				gainNode.gain.value = 0;
				that.stopAudioNode(oscillator, 0, gainNode);
			}
			default:{
				// gainNode.gain.value *= 1.1;
				// gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
			}
		}

		if((oscillator.type == "sine" || oscillator.type == "triangle")
			&& !isPizzicato && note.stop - note.start > 0.01){
			// 終わり際に少し減衰しノイズ削減
			noiseCutGainNode.gain.setValueAtTime(1, note.stop-0.005);
			noiseCutGainNode.gain.linearRampToValueAtTime(0, note.stop);
		}
		return function(){
			that.stopAudioNode(oscillator, 0, gainNode);
		};
	};

	PicoAudio.prototype.createPercussionNote = function(option){
		var note = this.createBaseNote(option, false);
		if(note.isGainValueZero) return null;

		var source = note.oscillator;
		var gainNode = note.gainNode;
		var panNode = note.panNode;
		var start = note.start;
		var stop = note.stop;
		var velocity = 1;
		var note2 = this.createBaseNote(option, false, true);
		var oscillator = note2.oscillator;
		var gainNode2 = note2.gainNode;
		var panNode2 = note2.panNode;
		var that = this;

		switch(option.pitch){
			// Bass drum
			case 35:
			case 36:
				// w
				gainNode.gain.value = velocity*0.6;
				source.playbackRate.value = 0.02;
				that.stopAudioNode(source, start+0.07, gainNode);
				// s
				gainNode2.gain.value = velocity*1.1;
				oscillator.frequency.setValueAtTime(120, start);
				oscillator.frequency.linearRampToValueAtTime(50, start+0.07);
				that.stopAudioNode(oscillator, start+0.07, gainNode2);
				break;
			// Snare
			case 38:
			case 40:
				// w
				source.playbackRate.value = 0.7;
				that.stopAudioNode(source, start+0.05, gainNode);
				// s
				gainNode2.gain.setValueAtTime(velocity*0.8, start);
				gainNode2.gain.linearRampToValueAtTime(0.0, start+0.05);
				oscillator.frequency.setValueAtTime(300, start);
				oscillator.frequency.linearRampToValueAtTime(200, start+0.05);
				that.stopAudioNode(oscillator, start+0.05, gainNode2);
				break;
			// Toms
			case 41: case 43: case 45:
			case 47: case 48: case 50:
				// w
				source.playbackRate.value = 0.01;
				that.stopAudioNode(source, start+0.1, gainNode);
				// s
				oscillator.type = "square";
				gainNode2.gain.setValueAtTime(velocity, start);
				gainNode2.gain.linearRampToValueAtTime(0.01, start+0.1);
				oscillator.frequency.setValueAtTime(150+20*(option.pitch-40), start);
				oscillator.frequency.linearRampToValueAtTime(50+20*(option.pitch-40), start+0.1);
				that.stopAudioNode(oscillator, start+0.1, gainNode2);
				break;
			// Close Hihat
			case 42:
			case 44:
				source.playbackRate.value = 1.5;
				that.stopAudioNode(source, start+0.02, gainNode);
				that.stopAudioNode(oscillator, 0, gainNode2);
				break;
			// Open Hihat
			case 46:
				source.playbackRate.value = 1.5;
				that.stopAudioNode(source, start+0.3, gainNode);
				gainNode.gain.setValueAtTime(velocity*0.9, start);
				gainNode.gain.linearRampToValueAtTime(0.0, start+0.3);
				that.stopAudioNode(oscillator, 0, gainNode2);
				break;
			// Cymbal
			case 49: case 51: case 52:
			case 53: case 55: case 57:
				source.playbackRate.value = 1.2;
				that.stopAudioNode(source, start+0.5, gainNode);
				gainNode.gain.setValueAtTime(velocity*1, start);
				gainNode.gain.linearRampToValueAtTime(0.0, start+0.5);
				that.stopAudioNode(oscillator, 0, gainNode2);
				break;
			// Cymbal2
			case 51:
				source.playbackRate.value = 1.1;
				that.stopAudioNode(source, start+0.4, gainNode);
				gainNode.gain.setValueAtTime(velocity*0.8, start);
				gainNode.gain.linearRampToValueAtTime(0.0, start+0.4);
				that.stopAudioNode(oscillator, 0, gainNode2);
				break;
			// Cymbal3
			case 59:
				source.playbackRate.value = 1.8;
				that.stopAudioNode(source, start+0.3, gainNode);
				gainNode.gain.setValueAtTime(velocity*0.5, start);
				gainNode.gain.linearRampToValueAtTime(0.0, start+0.3);
				that.stopAudioNode(oscillator, 0, gainNode2);
				break;
			// Bongo
			case 60: case 61:
				// w
				source.playbackRate.value = 0.03;
				that.stopAudioNode(source, start+0.03, gainNode);
				// s
				gainNode2.gain.setValueAtTime(velocity*0.8, start);
				gainNode2.gain.linearRampToValueAtTime(0.0, start+0.1);
				oscillator.frequency.setValueAtTime(400-40*(option.pitch-60), start);
				oscillator.frequency.linearRampToValueAtTime(450-40*(option.pitch-60), start+0.1);
				that.stopAudioNode(oscillator, start+0.1, gainNode2);
				break;
			// mute Conga
			case 62:
				// w
				source.playbackRate.value = 0.03;
				that.stopAudioNode(source, start+0.03, gainNode);
				// s
				gainNode2.gain.setValueAtTime(velocity, start);
				gainNode2.gain.linearRampToValueAtTime(0.0, start+0.03);
				oscillator.frequency.setValueAtTime(200, start);
				oscillator.frequency.linearRampToValueAtTime(250, start+0.03);
				that.stopAudioNode(oscillator, start+0.03, gainNode2);
				break;
			// open Conga
			case 63: case 64:
				// w
				source.playbackRate.value = 0.03;
				that.stopAudioNode(source, start+0.03, gainNode);
				// s
				gainNode2.gain.setValueAtTime(velocity, start);
				gainNode2.gain.linearRampToValueAtTime(0.0, start+0.1);
				oscillator.frequency.setValueAtTime(200-30*(option.pitch-63), start);
				oscillator.frequency.linearRampToValueAtTime(250-30*(option.pitch-63), start+0.1);
				that.stopAudioNode(oscillator, start+0.1, gainNode2);
				break;
			// Cowbell, Claves
			case 56:
			case 75:
				// w
				source.playbackRate.value = 0.01;
				that.stopAudioNode(source, start+0.1, gainNode);
				// s
				gainNode2.gain.setValueAtTime(velocity, start);
				gainNode2.gain.linearRampToValueAtTime(0.0, start+0.1);
				oscillator.frequency.setValueAtTime(1000+48*(option.pitch-56), start);
				that.stopAudioNode(oscillator, start+0.1, gainNode2);
				break;
			// mute triangle
			case 80:
				// w
				source.playbackRate.value = 5;
				gainNode.gain.setValueAtTime(velocity*0.5, start);
				gainNode.gain.linearRampToValueAtTime(0.0, start+0.2);
				that.stopAudioNode(source, start+0.05, gainNode);
				// s
				oscillator.type = "triangle"
				gainNode2.gain.setValueAtTime(velocity*0.7, start);
				gainNode2.gain.linearRampToValueAtTime(0.0, start+0.2);
				oscillator.frequency.setValueAtTime(6000, start);
				that.stopAudioNode(oscillator, start+0.05, gainNode2);
				break;
			// open triangle
			case 81:
				// w
				source.playbackRate.value = 5;
				gainNode.gain.setValueAtTime(velocity*0.9, start);
				gainNode.gain.linearRampToValueAtTime(0.0, start+0.5);
				that.stopAudioNode(source, start+0.5, gainNode);
				// s
				oscillator.type = "triangle"
				gainNode2.gain.setValueAtTime(velocity*0.8, start);
				gainNode2.gain.linearRampToValueAtTime(0.0, start+0.3);
				oscillator.frequency.setValueAtTime(6000, start);
				that.stopAudioNode(oscillator, start+0.3, gainNode2);
				break;
			default:
				source.playbackRate.value = option.pitch/69*2;
				that.stopAudioNode(source, start+0.05, gainNode);
				that.stopAudioNode(oscillator, 0, gainNode2);
		}
		return function(){
			that.stopAudioNode(source, 0, gainNode);
			that.stopAudioNode(oscillator, 0, gainNode2);
		};
	};

	PicoAudio.prototype.createBaseNote = function(option, isExpression, nonChannel, nonStop){
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
		var oscillator = channel!=9 ? context.createOscillator() : context.createBufferSource();
		var panNode = context.createStereoPanner ? context.createStereoPanner() :
				context.createPanner ? context.createPanner() : { pan: { setValueAtTime: function(){} } };
		var gainNode = context.createGain();
		var noiseCutGainNode = context.createGain();

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

		if(channel!=9){
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
							that.clearFunc("pan", reservePan)
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
		gainNode.connect(noiseCutGainNode);
		noiseCutGainNode.connect(this.masterGainNode);
		this.masterGainNode.connect(context.destination);

		if(channel!=9 && option.modulation && (option.modulation.length >= 2 || option.modulation[0].value > 0)){
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
			gainNode.connect(convolverGainNode);
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
			gainNode.connect(chorusGainNode);
			chorusGainNode.connect(chorusDelayNode);
		}

		if(modulationOscillator){
			modulationOscillator.start(start);
			this.stopAudioNode(modulationOscillator, stop, modulationGainNode);
		}

		oscillator.start(start);
		if(channel!=9 && !nonChannel && !nonStop){
			this.stopAudioNode(oscillator, stop, gainNode);
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
			noiseCutGainNode: noiseCutGainNode,
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
			, playIndices:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], updateBufTime:this.states.updateBufTime
			, updateBufMaxTime:this.states.updateBufMaxTime, updateIntervalTime:this.states.updateIntervalTime
		 	, latencyLimitTime:this.states.latencyLimitTime };
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
		that.states.playIndices.forEach(function(n, i, ary){
			ary[i] = 0;
		});
		if(this.settings.isWebMIDI){
			if(isSongLooping)
				return;
			if(this.settings.WebMIDIPortOutput==null)
				return;
			states.webMIDIStopTime = this.context.currentTime;
			setTimeout(function(){
				for(var t=0; t<16; t++){
					that.settings.WebMIDIPortOutput.send([0xB0+t, 120, 0]);
					for(var i=0; i<128; i++){
						that.settings.WebMIDIPortOutput.send([0x80+t, i, 0]);
					}
				}
			}, 200);
		}
	};

	PicoAudio.prototype.play = function(isSongLooping){
		var preTime = performance.now();
		var preTimeC = this.context.currentTime;
		var context = this.context;
		var settings = this.settings;
		var trigger = this.trigger;
		var states = this.states;
		var hashedDataList = this.hashedDataList;
		var that = this;
		if(states.isPlaying==true) return;
		if(settings.isWebMIDI && !isSongLooping){
			// Web MIDI API使用時はstop()から800ms程待機すると音がバグりにくい
			if(states.webMIDIWaitState != "completed"){
				if(states.webMIDIWaitState != "waiting"){ // play()連打の対策
					// stop()から800ms後にplay()を実行
					states.webMIDIWaitState = "waiting";
					var waitTime = 800 - (context.currentTime - states.webMIDIStopTime)*1000;
					if(states.webMIDIStopTime==0) waitTime = 800; // MIDI Portをopenして最初に呼び出すときも少し待つ
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
			var finishTime = (that.settings.isCC111 && that.cc111Time != -1) ? that.lastNoteOffTime : that.getTime(that.getTiming(Number.MAX_SAFE_INTEGER));
			if (finishTime - context.currentTime + states.startTime <= 0) {
				// 予定の時間以降に曲終了
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
		var finishTime = (this.settings.isCC111 && this.cc111Time != -1) ? this.lastNoteOffTime : this.getTime(this.getTiming(Number.MAX_SAFE_INTEGER));
		var reserveSongEndTime = (finishTime - context.currentTime + states.startTime) * 1000;
		reserveSongEnd = setTimeout(reserveSongEndFunc, reserveSongEndTime);
		that.pushFunc({
			rootTimeout: reserveSongEnd,
			stopFunc: function(){ clearTimeout(reserveSongEnd); }
		});

		var updateNowTime = performance.now();
		var updatePreTime = updateNowTime - that.states.updateBufTime;
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
			if(latencyTime >= 30){ // currentTimeが遅い（サウンドが重い）
				that.states.latencyLimitTime += latencyTime;
				cTimeSum += 30;
			} else if(latencyTime <= -30){ // currentTimeが速い（誤差）
				cTimeSum = pTimeSum;
			} else {
				if(that.states.latencyLimitTime>0){ // currentTimeが丁度いい
					that.states.latencyLimitTime -= updateBufTime*0.01;
					if(that.states.latencyLimitTime < 0) that.states.latencyLimitTime = 0;
				}
			}

			// ノートを先読み度合いを自動調整（予約しすぎると重くなる）
			that.states.updateIntervalTime = updateBufTime;
			updateBufTime += 8 + (that.isFirefox() && !that.isAndroid() ? 10 : 0);
			if(that.states.updateBufTime < updateBufTime){
				that.states.updateBufTime = updateBufTime;
			} else { // 先読み量を少しずつ減らす
				that.states.updateBufTime -= that.states.updateBufTime*0.001;
				that.states.updateBufMaxTime -= that.states.updateBufMaxTime*0.00025;
				if(that.states.updateBufTime > 100){
					that.states.updateBufTime -= that.states.updateBufTime*0.01;
				}
				if(that.states.updateBufMaxTime > 100){
					that.states.updateBufMaxTime -= that.states.updateBufMaxTime*0.0025;
				}
			}
			if(that.states.updateBufTime > that.states.updateBufMaxTime){
				if(updateBufTime >= 900 && that.states.latencyLimitTime <= 30){
					// バックグラウンドっぽくて重くない場合、バックグラウンド再生
					that.states.updateBufMaxTime += updateBufTime;
				} else { // 通常
					var tempTime = updateBufTime - that.states.updateBufMaxTime;
					that.states.updateBufTime = that.states.updateBufMaxTime;
					if(that.states.updateBufMaxTime<10){
						that.states.updateBufMaxTime *= 1.25;
					} else {
						that.states.updateBufMaxTime += tempTime/3;
					}
				}
				if(that.states.updateBufMaxTime > 1200) that.states.updateBufMaxTime = 1200;
			}

			// サウンドが重すぎる
			if(that.states.latencyLimitTime > 200){ // サウンドが重すぎる
				cTimeSum = pTimeSum;
				that.states.latencyLimitTime -= 30;
				// ノート先読みをかなり小さくする（フリーズ対策）
				that.states.updateBufMaxTime = 1;
				that.states.updateBufTime = 1;
				updateBufTime = 1;
			}

			// 再生処理
			var setTimeoutAry = [];
			for(var ch=0; ch<16; ch++){
				var notes = that.playData.channels[ch].notes;
				var idx = that.states.playIndices[ch];
				for(; idx<notes.length; idx++){
					var note = notes[idx];
					var curTime = context.currentTime - states.startTime;
					// 終わったノートは演奏せずにスキップ
					if(curTime >= note.stopTime) continue;
					if(cnt == 0 && curTime > note.startTime) continue; // （シークバーで途中から再生時）startTimeが過ぎたものは鳴らさない
					// AudioParam.setValueAtTime()等でマイナスが入るとエラーになるので対策
					if(curTime + note.startTime < 0) continue;
					// 演奏開始時間 - 先読み時間(ノート予約) になると演奏予約or演奏開始
					if(curTime < note.startTime - that.states.updateBufTime/1000) break;
					if(!settings.isWebMIDI){
						// 予約ノート数が急激に増えそうな時、先読み量を小さくしておく
						if(that.states.stopFuncs.length>=350 && that.states.updateBufTime<1000){
							//that.states.updateBufTime = 8 + (that.isFirefox() && !that.isAndroid() ? 10 : 0);
							//that.states.updateBufMaxTime = that.states.updateBufTime;
						}
						//if(that.states.stopFuncs.length > 600) return;
						//console.log(settings.hashLength/1000 - (context.currentTime - preTimeC));
						// if(settings.hashLength/1000 - (context.currentTime - preTimeC) <= -0.01){
						// 	return;
						// }
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
						// note変数が置き換わってしまうので、即時関数にして変わらないようにする
						(function(note){
							// TODO 時間的に4ms以内に隣接するコールバックは１回のsetTimeoutにまとめて軽量化
							that.pushFunc({
								note: note,
								stopFunc: stopFunc
							});
							var noteOn = setTimeout(function(){
								that.clearFunc("timeout", noteOn);
								if(trigger.isNoteTrigger) trigger.noteOn(note);
							}, (note.startTime - (context.currentTime - states.startTime)) * 1000);
							var noteOff = setTimeout(function(){
								that.clearFunc("timeout", noteOff);
								that.clearFunc("note", note);
								if(trigger.isNoteTrigger) trigger.noteOff(note);
							}, note.channel!=9 ? (note.stopTime - (context.currentTime - states.startTime)) * 1000 : that.settings.dramMaxPlayLength * 1000);
							that.pushFunc({
								timeout: noteOn,
								stopFunc: function(){ clearTimeout(noteOn); }
							});
							that.pushFunc({
								timeout: noteOff,
								stopFunc: function(){ clearTimeout(noteOff); }
							});
						})(note);
					}
				}
				that.states.playIndices[ch] = idx;
			}
			// if(settings.isWebMIDI && that.hashedMessageList && that.hashedMessageList[idx]){
			// 	that.hashedMessageList[idx].forEach(function(message){
			// 		if(settings.WebMIDIPortOutput!=null){
			// 			if(message.message[0]!=0xff && (that.settings.WebMIDIPortSysEx || (message.message[0]!=0xf0 && message.message[0]!=0xf7))){
			// 				try{
			// 					settings.WebMIDIPortOutput.send(message.message,
			// 						(message.time - context.currentTime + window.performance.now()/1000 + states.startTime) * 1000);
			// 				}catch(e){
			// 					console.log(e, message.message);
			// 				}
			// 			}
			// 		}
			// 	});
			// }
			if(true){ // setInterval
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
			} else { // setTimeout
				if(cnt==0){
					var reserve = setTimeout(function(){
						updateNote(updateNowTime);
						that.clearFunc("rootTimeout", reserve);
					}, 1);
					(function(reserve){
						that.pushFunc({
							rootTimeout: reserve,
							stopFunc: function(){ clearTimeout(reserve); }
						});
					})(reserve);
				}
			}
			cnt++;
			// 	trigger.songEnd(); // TODO
			preTime = performance.now();
			preTimeC = context.currentTime;
			return updateNowTime;
		})(updateNowTime);
	};
	PicoAudio.prototype.setTimeoutEx = function(func, time){

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
		var that = this;
		var hashedDataList = [];
		// data.channels.forEach(function(channel){
		// 	channel.notes.forEach(function(note){
		// 		var option = note;
		// 		var time = note.startTime * (1000/that.settings.hashLength);
		// 		if(!hashedDataList[Math.floor(time)])
		// 			hashedDataList[Math.floor(time)] = [];
		// 		hashedDataList[Math.floor(time)].push(note);
		// 	});
		// });
		// if(this.settings.isWebMIDI){
		// 	var hashedMessageList = [];
		// 	data.messages.forEach(function(message){
		// 		message.time = that.getTime(message.timing);
		// 		var time = message.time * (1000/that.settings.hashLength);
		// 		if(!hashedMessageList[Math.floor(time)])
		// 			hashedMessageList[Math.floor(time)] = [];
		// 		hashedMessageList[Math.floor(time)].push(message);
		// 	});
		// 	this.hashedMessageList = hashedMessageList;
		// }
		this.hashedDataList = hashedDataList;
		this.initStatus();
		if (this.debug) {
			var syoriTimeE = performance.now();
			console.log("setData time", syoriTimeE - syoriTimeS)
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

	PicoAudio.prototype.isDefaultReverb = function(){
		if (this.isAndroid() || this.isArmv7l()) return false;
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
					if(time < tempTiming) imid--;
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
		for(var i=0; i<16; i++){
			var channel = new Object();
			channels.push(channel);
			// smfを読む順番を記録した索引配列を作る
			// 型付き配列をリスト構造のように使う（リスト構造にすることで挿入処理を高速化する）
			// [tick, smfPtr, nextIndicesPtr, tick, smfPtr, nextIndicesPtr, ...]
			channel.indices = new Int32Array(smf.length/8);
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
						this.chIndicesSplice(ch, tick, p); // デルタタイムの順番になるようにリスト配列に挿入
						p+=3;
						break;
					case 0xC: // Program Change - C[ch],
					case 0xD: // Channel Pre - D[ch],
						// チャンネル毎に仕分けた後に解析する
						lastState = smf[p];
						var ch = channels[lastState&0x0F];
						this.chIndicesSplice(ch, tick, p); // デルタタイムの順番になるようにリスト配列に挿入
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
										this.chIndicesSplice(ch, tick, p); // デルタタイムの順番になるように配列に挿入
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
											this.chIndicesSplice(ch, tick, p); // デルタタイムの順番になるように配列に挿入
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
						var state = smf[cashP];
						if(state==0xF0 || state==0xF7){
							if(this.settings.WebMIDIPortSysEx){
								// 長さ情報を取り除いて純粋なSysExメッセージにする
								var lengthAry = this.variableLengthToInt(smf, cashP+1, cashP+1+4);
								var sysExStartP = cashP+1+lengthAry[1];
								var sysExEndP = sysExStartP+lengthAry[0];
								var webMIDIMes = new Uint8Array(1 + lengthAry[0]);
								webMIDIMes[0] = state;
								var size = sysExEndP - sysExStartP;
								for (var i=0; i<size; i++)
									webMIDIMes[i+1] = smf[sysExStartP + i];
								messages.push({ message: webMIDIMes, timing: tick, time: time });
							}
						} else {
							messages.push({ message: smf.subarray(cashP, p), timing: tick, time: time });
						}
					}
				}
			}
			if(!this.settings.isSkipEnding && songLength<tick) songLength = tick;
			// リスト配列のポインタを初期化
			for(var i=0; i<16; i++){
				channels[i].indicesCur = channels[i].indicesHead;
				channels[i].indicesPre = channels[i].indicesHead;
			}
		}

		if (this.debug) {
			var syoriTimeS2 = performance.now();
		}
		// Midi Events (0x8n - 0xEn) parse
		for(var ch=0; ch<channels.length; ch++){
			var channel = channels[ch];
			var dataEntry = 2;
			var pitchBend = 0;
			var pan = 64;
			var expression = 127;
			var velocity = 100;
			var modulation = 0;
			var hold = 0;
			var reverb = 10;
			var chorus = 0;
			var nrpnLsb = 127;
			var nrpnMsb = 127;
			var rpnLsb = 127;
			var rpnMsb = 127;
			var instrument = null;
			var masterVolume = 127;
			var tempo = 120;
			var tempoCurTick = 0;
			var tempoCurTime = 0;
			var nowNoteOnIdxAry = [];
			var indIdx = channel.indicesHead;
			var indices = channel.indices;
			while(indIdx!=-1){
				var tick = indices[indIdx];
				var p = indices[indIdx+1];
				var nextIdx = indices[indIdx+2];
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
								channel: ch
							};
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
							if(tick > lastNoteOffTiming){
								lastNoteOffTiming = tick;
								lastNoteOffTime = time;
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
		for(var ch=0; ch<channels.length; ch++){
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
		if(this.settings.isWebMIDI) data.messages = messages;

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

	PicoAudio.prototype.chIndicesSplice = function(ch, time, p){
		var indices = ch.indices;
		// メモリー足りなくなったら拡張
		if(indices.length <= ch.indicesLength+6){
			if(this.debug){
				var ts1 = performance.now();
			}
			var temp = new Int32Array(indices.length*2);
			for(var i=indices.length-1; i>=0; i--){
				temp[i] = indices[i];
			}
			ch.indices = indices = temp;
			if(this.debug){
				console.log("malloc", performance.now() - ts1, temp.length);
			}
		}
		// デルタタイムの順番になるようにリスト配列に挿入
		if(ch.indicesLength>=3 && time<indices[ch.indicesFoot]){
			// Insert
			while(ch.indicesCur != -1){
				if(time<indices[ch.indicesCur]){
					if(ch.indicesCur==ch.indicesHead){
						ch.indicesHead = ch.indicesLength;
					} else {
						indices[ch.indicesPre+2] = ch.indicesLength;
					}
					indices[ch.indicesLength] = time;
					indices[ch.indicesLength+1] = p;
					indices[ch.indicesLength+2] = ch.indicesCur;
					ch.indicesPre = ch.indicesLength;
					ch.indicesLength += 3;
					break;
				}
				ch.indicesPre = ch.indicesCur;
				ch.indicesCur = indices[ch.indicesCur+2];
			}
		} else {
			// Push
			if(ch.indicesLength>=3){
				indices[ch.indicesFoot+2] = ch.indicesLength;
			} else {
				ch.indicesHead = 0;
			}
			ch.indicesFoot = ch.indicesLength;
			indices[ch.indicesLength] = time;
			indices[ch.indicesLength+1] = p;
			indices[ch.indicesLength+2] = -1;
			ch.indicesLength += 3;
		}
	};

	PicoAudio.prototype.stopAudioNode = function(tar, time, gainNode){
		try{
			if(time > 0) {
				tar.stop(time);
			} else {
				tar.stop(this.context.currentTime+0.005);
				gainNode.gain.cancelScheduledValues(this.context.currentTime);
				gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime+0.005);
			}
		} catch(e) {
			// iOS
			gainNode.gain.cancelScheduledValues(time);
			if(time <= 0) {
				gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime+0.005);
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
