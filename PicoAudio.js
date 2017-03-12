var PicoAudio = (function(){
	function PicoAudio(_audioContext){
		var AudioContext = window.AudioContext || window.webkitAudioContext;
		this.context = _audioContext ? _audioContext : new AudioContext();
		this.settings = {
			globalVolume: 0.2,
			tempo: 120,//
			basePitch: 440,
			resolution: 480,
			hashLength: 1000,
			hashBuffer: 1,
			isWebMIDI: false,
			WebMIDIPortOutputs: null,
			WebMIDIPort: 0,
			loop: false
		};
		this.trigger = { isNoteTrigger: true, noteOn: function(){}, noteOff: function(){}, songEnd: function(){ /*console.log("end")*/ } };
		this.states = { isPlaying: false, playIndex:0, startTime:0, stopTime:0, stopFuncs:[] };
		this.hashedDataList = [];
		this.channels = [];
		this.tempoTrack = [{ timing:0, value:120 },{ timing:0, value:120 }];
		for(var i=0; i<17; i++)
			this.channels.push([0,0,1]);
		this.whitenoise = this.context.createBuffer(2, this.context.sampleRate, this.context.sampleRate);
		for (var ch=0; ch<2; ch++){
			for (var i=0; i<this.context.sampleRate; i++){
				this.whitenoise.getChannelData(ch)[i] = Math.random() * 2 - 1;
			}
		}
	}

	PicoAudio.prototype.createNote = function(option){
		var note = this.createBaseNote(option, true);
		var oscillator = note.oscillator;
		var gainNode = note.gainNode;
		var panNode = note.panNode;
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
			// 
			case 0.2:
			case 12: case 13: case 45: case 55:
			{
				gainNode.gain.value *= 1.1;
				gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
				gainNode.gain.linearRampToValueAtTime(0.0, note.start+0.2);
				oscillator.stop(note.start+0.5);
				break;
			}
			// ピアノ程度に伸ばす系
			case 0.3:
			case  0: case  1: case  2: case  3: case  6: case  9: case 11: case 14: case 15:
			case 32: case 36: case 37: case 46: case 47:
			{
				gainNode.gain.value *= 1.1;
				gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
				gainNode.gain.linearRampToValueAtTime(gainNode.gain.value*0.95, note.start+0.1);
				gainNode.gain.setValueAtTime(gainNode.gain.value*0.95, note.start+0.1);
				gainNode.gain.linearRampToValueAtTime(0.0, note.start+1.5+note.velocity*3);
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
				stopAudioNode(oscillator, 0);//oscillator.stop(0);
			}
			default:{
				//gainNode.gain.setValueAtTime(note.velocity, note.start);
			}
		}

/*
		var real = new Float32Array(10);
		var imag = new Float32Array(10);
		for(var i = 0; i < 10; ++i)
			real[i] = imag[i] = 0;
		imag[1] = 1;
		imag[2] = 0.5;
		imag[3] = 0.3;
		imag[4] = 0.2;
		imag[5] = 0.1;
		imag[6] = 0.1;
		imag[7] = 0.1;
		imag[8] = 0.1;
		imag[9] = 0.1;
		var wavtable = this.context.createPeriodicWave(real, imag);
		oscillator.setPeriodicWave(wavtable);
*/
		function stopAudioNode(tar, time){
			try{
				tar.stop(time);
			} catch(e) {
				try {
					tar.disconnect();
					stopGainNode(gainNode);
				} catch(e) {}
			}
		}
		function stopGainNode(tar){
			tar.disconnect();
			tar.gain.cancelScheduledValues(0);
		}
		return function(){
			stopAudioNode(oscillator, 0);
			stopGainNode(gainNode);
		};
	};

	PicoAudio.prototype.createPercussionNote = function(option){
		var note = this.createBaseNote(option, false);
		var source = note.oscillator;
		var gainNode = note.gainNode;
		var panNode = note.panNode;
		var start = note.start;
		var stop = note.stop;
		var velocity = note.velocity * ((option.expression ? option.expression[0].value : 100) / 127);
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
				source.stop(start+0.07);
				// s
				gainNode2.gain.value = velocity*1.1;
				oscillator.frequency.setValueAtTime(120, start);
				oscillator.frequency.linearRampToValueAtTime(50, start+0.07);
				oscillator.stop(start+0.07);
				break;
			// Snare
			case 38:
			case 40:
				// w
				source.playbackRate.value = 0.7;
				source.stop(start+0.05);
				// s
				gainNode2.gain.setValueAtTime(velocity*0.8, start);
				gainNode2.gain.linearRampToValueAtTime(0.0, start+0.05);
				oscillator.frequency.setValueAtTime(300, start);
				oscillator.frequency.linearRampToValueAtTime(200, start+0.05);
				oscillator.stop(start+0.05);
				break;
			// Toms
			case 41: case 43: case 45:
			case 47: case 48: case 50:
				// w
				source.playbackRate.value = 0.01;
				source.stop(start+0.1);
				// s
				oscillator.type = "square";
				gainNode2.gain.setValueAtTime(velocity, start);
				gainNode2.gain.linearRampToValueAtTime(0.01, start+0.1);
				oscillator.frequency.setValueAtTime(150+20*(option.pitch-40), start);
				oscillator.frequency.linearRampToValueAtTime(50+20*(option.pitch-40), start+0.1);
				oscillator.stop(start+0.1);
				break;
			// Close Hihat
			case 42:
			case 44:
				source.playbackRate.value = 1.5;
				source.stop(start+0.02);
				oscillator.stop(0);
				break;
			// Open Hihat
			case 46:
				source.playbackRate.value = 1.5;
				source.stop(start+0.3);
				gainNode.gain.setValueAtTime(velocity*0.9, start);
				gainNode.gain.linearRampToValueAtTime(0.0, start+0.3);
				oscillator.stop(0);
				break;
			// Cymbal
			case 49: case 51: case 52:
			case 53: case 55: case 57:
				source.playbackRate.value = 1.2;
				source.stop(start+0.5);
				gainNode.gain.setValueAtTime(velocity*1, start);
				gainNode.gain.linearRampToValueAtTime(0.0, start+0.5);
				oscillator.stop(0);
				break;
			// Cymbal2
			case 51:
				source.playbackRate.value = 1.1;
				source.stop(start+0.4);
				gainNode.gain.setValueAtTime(velocity*0.8, start);
				gainNode.gain.linearRampToValueAtTime(0.0, start+0.4);
				oscillator.stop(0);
				break;
			// Cymbal3
			 case 59:
			 	source.playbackRate.value = 1.8;
				source.stop(start+0.3);
				gainNode.gain.setValueAtTime(velocity*0.5, start);
				gainNode.gain.linearRampToValueAtTime(0.0, start+0.3);
				oscillator.stop(0);
				break;
			// Bongo
			case 60: case 61:
				// w
				source.playbackRate.value = 0.03;
				source.stop(start+0.03);
				// s
				gainNode2.gain.setValueAtTime(velocity*0.8, start);
				gainNode2.gain.linearRampToValueAtTime(0.0, start+0.1);
				oscillator.frequency.setValueAtTime(400-40*(option.pitch-60), start);
				oscillator.frequency.linearRampToValueAtTime(450-40*(option.pitch-60), start+0.1);
				oscillator.stop(start+0.1);
				break;
			// mute Conga
			case 62:
				// w
				source.playbackRate.value = 0.03;
				source.stop(start+0.03);
				// s
				gainNode2.gain.setValueAtTime(velocity, start);
				gainNode2.gain.linearRampToValueAtTime(0.0, start+0.03);
				oscillator.frequency.setValueAtTime(200, start);
				oscillator.frequency.linearRampToValueAtTime(250, start+0.03);
				oscillator.stop(start+0.03);
				break;
			// open Conga
			case 63: case 64:
				// w
				source.playbackRate.value = 0.03;
				source.stop(start+0.03);
				// s
				gainNode2.gain.setValueAtTime(velocity, start);
				gainNode2.gain.linearRampToValueAtTime(0.0, start+0.1);
				oscillator.frequency.setValueAtTime(200-30*(option.pitch-63), start);
				oscillator.frequency.linearRampToValueAtTime(250-30*(option.pitch-63), start+0.1);
				oscillator.stop(start+0.1);
				break;
			// Cowbell, Claves
			case 56:
			case 75:
				// w
				source.playbackRate.value = 0.01;
				source.stop(start+0.1);
				// s
				gainNode2.gain.setValueAtTime(velocity, start);
				gainNode2.gain.linearRampToValueAtTime(0.0, start+0.1);
				oscillator.frequency.setValueAtTime(1000+48*(option.pitch-56), start);
				oscillator.stop(start+0.1);
				break;
			// mute triangle
			case 80:
				// w
				source.playbackRate.value = 5;
				gainNode.gain.setValueAtTime(velocity*0.5, start);
				gainNode.gain.linearRampToValueAtTime(0.0, start+0.2);
				source.stop(start+0.05);
				// s
				oscillator.type = "triangle"
				gainNode2.gain.setValueAtTime(velocity*0.7, start);
				gainNode2.gain.linearRampToValueAtTime(0.0, start+0.2);
				oscillator.frequency.setValueAtTime(6000, start);
				oscillator.stop(start+0.05);
				break;
			// open triangle
			case 81:
				// w
				source.playbackRate.value = 5;
				gainNode.gain.setValueAtTime(velocity*0.9, start);
				gainNode.gain.linearRampToValueAtTime(0.0, start+0.5);
				source.stop(start+0.5);
				// s
				oscillator.type = "triangle"
				gainNode2.gain.setValueAtTime(velocity*0.8, start);
				gainNode2.gain.linearRampToValueAtTime(0.0, start+0.3);
				oscillator.frequency.setValueAtTime(6000, start);
				oscillator.stop(start+0.3);
				break;
			default:
				source.playbackRate.value = option.pitch/69*2;
				source.stop(start+0.05);
				stopAudioNode(oscillator, 0);
		}
		function stopAudioNode(tar, time){
			try{
				tar.stop(time);
			} catch(e) {
				try {
					tar.disconnect();
				} catch(e) {}
			}
		}
		function stopGainNode(tar){
			tar.disconnect();
			tar.gain.cancelScheduledValues(0);
		}
		return function(){
			stopAudioNode(source, 0);
			stopAudioNode(oscillator, 0);
			stopGainNode(gainNode);
			stopGainNode(gainNode2);
		};
	};

	PicoAudio.prototype.createBaseNote = function(option, isExpression, nonChannel){
		var settings = this.settings;
		var context = this.context;
		var songStartTime = this.states.startTime;
		var start = this.getTime(option.start) + songStartTime;
		var stop = this.getTime(option.stop) + songStartTime;
		var pitch = settings.basePitch * Math.pow(Math.pow(2, 1/12), (option.pitch || 69) - 69);
		var channel = nonChannel ? 0 : (option.channel || 0);
		var velocity = (option.velocity || 0.1) * Number(nonChannel ? 1 : (this.channels[channel][2] || 1)) * settings.globalVolume;
		var oscillator = channel!=9 ? context.createOscillator() : context.createBufferSource();
		var panNode = context.createStereoPanner ? context.createStereoPanner() : 
				context.createPanner ? context.createPanner() : { pan: { setValueAtTime: function(){} } };
		var gainNode = context.createGain();
		var that = this;
		
		if(!context.createStereoPanner && context.createPanner) {
			var panValue = option.pan ? (option.pan[0].value / 127) * 2 - 1 : 0;
			var panAngle = panValue * 90;
			var panX = Math.sin(panAngle * (Math.PI / 180));
			var panZ = -Math.cos(panAngle * (Math.PI / 180));
			panNode.panningModel = "equalpower";
			panNode.setPosition(panX, 0, panZ);
		} else {
			panNode.pan.value = option.pan ? (option.pan[0].value / 127) * 2 - 1 : 0;
		}
		
		gainNode.gain.value = velocity * ((option.expression ? option.expression[0].value : 100) / 127);
		if(channel!=9){
			oscillator.type = option.type || "sine";
			oscillator.detune.value = 0;
			oscillator.frequency.value = pitch;
			option.pitchBend ? option.pitchBend.forEach(function(p){
				oscillator.frequency.setValueAtTime(
					settings.basePitch * Math.pow(Math.pow(2, 1/12), option.pitch - 69 + p.value),
					that.getTime(p.timing) + songStartTime
				);
			}) : false;
		} else {
			oscillator.loop = true;
			oscillator.buffer = this.whitenoise
		}
		if(isExpression){
			option.expression ? option.expression.forEach(function(p){
				gainNode.gain.setValueAtTime(
					velocity * (p.value / 127),
					that.getTime(p.timing) + songStartTime
				);
			}) : false;
		}
		if(context.createStereoPanner || context.createPanner){
			if(context.createStereoPanner) {
				option.pan ? option.pan.forEach(function(p){
					panNode.pan.setValueAtTime(
						(p.value / 127) * 2 - 1,
						that.getTime(p.timing) + songStartTime
					);
				}) : false;
			} else if(context.createPanner){
				if(panNode.positionX) {
					option.pan ? option.pan.forEach(function(p){
						var v = (p.value / 127) * 2 - 1;
						var a = v * 90;
						var x = Math.sin(a * (Math.PI / 180));
						var z = -Math.cos(a * (Math.PI / 180));
						panNode.positionX.setValueAtTime(x, that.getTime(p.timing) + songStartTime);
						panNode.positionY.setValueAtTime(0, that.getTime(p.timing) + songStartTime);
						panNode.positionZ.setValueAtTime(z, that.getTime(p.timing) + songStartTime);
						panNode.setPosition(panX, 0, panZ);
					}) : false;
				}
			}
			oscillator.connect(panNode);
			panNode.connect(gainNode);
			gainNode.connect(context.destination);
		} else {
			oscillator.connect(gainNode);
			gainNode.connect(context.destination);
		}
		oscillator.start(start);
		if(channel!=9 && !nonChannel)
			oscillator.stop(stop);
		return {
			start: start,
			stop: stop,
			pitch: pitch,
			channel: channel,
			velocity: velocity,
			oscillator: oscillator,
			panNode: panNode,
			gainNode: gainNode
		};
	};

	PicoAudio.prototype.startWebMIDI = function(){
		var outputs;
		navigator.requestMIDIAccess()
			.then(//midiAccess => { // 古いブラウザではエラーとなるためコメントアウト
				function(midiAccess){
					outputs = midiAccess.outputs;
					this.settings.WebMIDIPortOutputs = outputs;
					return outputs;
			})
			.catch(//err => { // 古いブラウザではエラーとなるためコメントアウト
				function(err){
					console.log(err);
			});
	};

	PicoAudio.prototype.initStatus = function(){
		this.stop();
		this.states = { isPlaying: false, playIndex:0, startTime:0, stopTime:0, stopFuncs:[] };
	};

	PicoAudio.prototype.stop = function(){
		var states = this.states;
		states.isPlaying = false;
		states.playIndex -= this.settings.hashBuffer;
		states.stopTime = this.context.currentTime;
		states.stopFuncs.forEach(function(n){
			n.stopFunc();
		});
		states.stopFuncs = [];
		if(this.settings.isWebMIDI){
			for(var t=0; t<16; t++){
				for(var i=0; i<128; i++){
					this.settings.WebMIDIPortOutputs.get(this.settings.WebMIDIPort).send([0x80+t, i, 0]);
				}
			}
		}
	};

	PicoAudio.prototype.play = function(){
		var context = this.context;
		var settings = this.settings;
		var trigger = this.trigger;
		var states = this.states;
		var hashedDataList = this.hashedDataList;
		var that = this;
		states.isPlaying = true;
		states.startTime = !states.startTime && !states.stopTime ? this.context.currentTime : (states.startTime + this.context.currentTime - states.stopTime);
		states.stopFuncs = [];
		// 曲終了コールバックを予約
		var reserveFunc = function(){
			if (that.getTime(that.getTiming(Number.MAX_SAFE_INTEGER)) - context.currentTime + states.startTime <= 0) {
				// 予定の時間以降に曲終了
				that.onSongEnd();
			} else {
				// 処理落ちしたりしてまだ演奏中の場合、1ms後に曲終了コールバックを呼び出すよう予約
				var reserveAgain = setTimeout(reserveFunc, 1);
				pushFunc({
					rootTimeout: reserveAgain,
					stopFunc: function(){ clearTimeout(reserveAgain); }
				});
			}
		};
		var reserveTime = (that.getTime(that.getTiming(Number.MAX_SAFE_INTEGER)) - context.currentTime + states.startTime) * 1000;
		var reserve = setTimeout(reserveFunc, reserveTime);
		pushFunc({
			rootTimeout: reserve,
			stopFunc: function(){ clearTimeout(reserve); }
		});
		(function playHash(idx){
			states.playIndex = idx;
			if(hashedDataList && hashedDataList[idx]){
				if(!settings.isWebMIDI){
					hashedDataList[idx].forEach(function(note){
						pushFunc({
							note: note,
							stopFunc: note.channel!=9 ? that.createNote(note) : that.createPercussionNote(note)
						});
						var noteOn = setTimeout(function(){
							clearFunc("timeout", noteOn);
							if(trigger.isNoteTrigger) trigger.noteOn(note);
							var noteOff = setTimeout(function(){
								clearFunc("timeout", noteOff);
								clearFunc("note", note);
								if(trigger.isNoteTrigger) trigger.noteOff(note);
							}, that.getTime(note.stop - note.start) * 1000);
							pushFunc({
								timeout: noteOff,
								stopFunc: function(){ clearTimeout(noteOff); }
							});
						}, (that.getTime(note.start) - context.currentTime + states.startTime) * 1000);
						pushFunc({
							timeout: noteOn,
							stopFunc: function(){ clearTimeout(noteOn); }
						});
					});
				} else {
					hashedDataList[idx].forEach(function(message){
						if(message.message[0]!=0xf0 && message.message[0]!=0xff)
						settings.WebMIDIPortOutputs.get(settings.WebMIDIPort).send(message.message, (that.getTime(message.timing) - context.currentTime +window.performance.now()/1000 + states.startTime) * 1000);
					});
				}
			}
			if(idx < hashedDataList.length){
				if(idx - Math.floor((context.currentTime - states.startTime) * 1000 / settings.hashLength) <= settings.hashBuffer){
					playHash(idx + 1);
				} else {
					var reserve = setTimeout(function(){
						playHash(idx + 1);
						clearFunc("rootTimeout", reserve);
					}, settings.hashLength);
					pushFunc({
						rootTimeout: reserve,
						stopFunc: function(){ clearTimeout(reserve); }
					});
				}
			} else {
				trigger.songEnd();
			}
		})(states.playIndex || 0);
		function pushFunc(tar){
			if(!tar.note && !tar.rootTimeout && !trigger.isNoteTrigger) return;
			states.stopFuncs.push(tar);
		}
		function clearFunc(tar1, tar2){
			if(tar1!="note" && tar1!="rootTimeout" && !trigger.isNoteTrigger) return;
			states.stopFuncs.some(function(n, i){
				if(n[tar1] == tar2){
					states.stopFuncs.splice(i, 1);
					return true;
				}
			});
		}
	};

	PicoAudio.prototype.setData = function(data){
		if(this.states.isPlaying) this.stop();
		this.settings.resolution = data.header.resolution;
		this.settings.tempo = data.tempo || 120; 
		this.tempoTrack = data.tempoTrack;
		var that = this;
		var hashedDataList = [];
		if(!this.settings.isWebMIDI){
			data.tracks.forEach(function(track){
				track.notes.forEach(function(note){
					var option = note;
					option.instrument = track.instrument;
					var time = that.getTime(note.start) * (1000/that.settings.hashLength);
					if(!hashedDataList[Math.floor(time)])
						hashedDataList[Math.floor(time)] = [];
					hashedDataList[Math.floor(time)].push(note);
				});
			});
		} else {
			data.messages.forEach(function(message){
				var time = that.getTime(message.timing) * (1000/that.settings.hashLength);
				if(!hashedDataList[Math.floor(time)])
					hashedDataList[Math.floor(time)] = [];
				hashedDataList[Math.floor(time)].push(message);
			});
		}
		this.hashedDataList = hashedDataList;
		this.states = { isPlaying: false, playIndex:0, startTime:0, stopTime:0, stopFuncs:[] };
		return this;
	};

	PicoAudio.prototype.getGlobalVolume = function(){
		return this.settings.globalVolume;
	};

	PicoAudio.prototype.setGlobalVolume = function(volume){
		this.settings.globalVolume = volume;
	};

	PicoAudio.prototype.isLoop = function(){
		return this.settings.loop;
	};

	PicoAudio.prototype.setLoop = function(loop){
		this.settings.loop = loop;
	};

	PicoAudio.prototype.setStartTime = function(offset){
		this.states.startTime -= offset;
		this.states.playIndex = Math.floor(offset * 1000 / this.settings.hashLength);
	};

	PicoAudio.prototype.onSongEnd = function(){
		if (this.settings.loop){
			this.initStatus();
			this.play();
		}
	};

	PicoAudio.prototype.getTime = function(timing){
		var time = 0;
		var tempo = 120;
		var currentTiming = 0;
		var that = this;
		this.tempoTrack.some(function(tempoObj){
			if(timing < tempoObj.timing)
				return true;
			time += (60 / tempo / that.settings.resolution) * (tempoObj.timing - currentTiming);
			currentTiming = tempoObj.timing;
			tempo = tempoObj.value;
		});
		time += (60 / tempo / that.settings.resolution) * (timing - currentTiming);
		return time;
	};

	PicoAudio.prototype.getTiming = function(time){
		var totalTime = 0;
		var tempo = 120;
		var currentTiming = 0;
		var that = this;
		this.tempoTrack.some(function(tempoObj){
			totalTime += (60 / tempo / that.settings.resolution) * (tempoObj.timing - currentTiming);
			if(totalTime > time){
				totalTime -= (60 / tempo / that.settings.resolution) * (tempoObj.timing - currentTiming);
				currentTiming += (time - totalTime) / (60 / tempo / that.settings.resolution);
				return true;
			}
			currentTiming = tempoObj.timing;
			tempo = tempoObj.value;
		});
		return currentTiming;
	};

	PicoAudio.prototype.parseSMF = function(smf){
		//if(smf.subarray(0, 4).join() != "77,84,104,100") // 古いブラウザではエラーとなるためコメントアウト
		if(smf[0] != 77 || smf[1] != 84 || smf[2] != 104 || smf[3] != 100)
			return "Not Sandard MIDI File.";
		var data = new Object;
		var p = 4;
		var header = new Object();
		header.size = getInt(smf.subarray(4, 8));
		header.format = smf[9];
		header.trackcount = getInt(smf.subarray(10, 12));
		header.timemanage = smf[12];
		header.resolution = getInt(smf.subarray(12, 14));
		p += 4+header.size;
		var tracks = new Array();
		var tempoTrack = new Array();
		var beatTrack = new Array();
		var songLength = 0;
		if(this.settings.isWebMIDI) var messages = [];
		for(var t=0; t<header.trackcount; t++){
			//if(smf.subarray(p, p+4).join() != "77,84,114,107") // 古いブラウザではエラーとなるためコメントアウト
			if(smf[p] != 77 || smf[p+1] != 84 || smf[p+2] != 114 || smf[p+3] != 107)
				return "Irregular SMF.";
			p += 4;
			var track = new Object();
			tracks.push(track);
			track.size = getInt(smf.subarray(p, p+4));
			p += 4;
			track.notes = [];
			track.instrument = null;
			var endPoint = p+track.size;
			var time = 0;
			var dataEntry = 2;
			var pitchBend = 0;
			var pan = 64;
			var expression = 127;
			var velocity = 100;
			var lastState = 1;
			var RpnLsb = -1;
			var RpnMsb = -1;
			while(p<endPoint){
				// DeltaTime
				if(lastState!=null){
					var dt = 0;
					while(smf[p]>=0x80){
						dt = (dt<<7) + (smf[p]-0x80);
						p++;
					}
					dt = (dt<<7) + smf[p];
					time += dt;
					p++;
				}
				// WebMIDIAPI
				if(this.settings.isWebMIDI) var cashP = p;
				// Events
				switch(Math.floor(smf[p]/0x10)){
					// Note OFF - 8[ch], Pitch, Velocity
					case 0x8:
						lastState = smf[p];
						track.notes.some(function(note){
							if(note.pitch==smf[p+1] && note.stop==null){
								note.stop = time;
								return true;
							}
						});
						p+=3;
						break;
					// Note ON - 9[ch], Pitch, Velocity
					case 0x9:
						lastState = smf[p];
						if(smf[p+2]!=0){
							track.notes.push({
								start: time,
								stop: null,
								pitch: smf[p+1],
								pitchBend: [{timing:time,value:pitchBend}],
								pan: [{timing:time,value:pan}],
								expression: [{timing:time,value:expression}],
								velocity: (smf[p+2]/127)*velocity/127,
								channel: smf[p]-0x90
							});
						} else {
							track.notes.some(function(note){
								if(note.pitch==smf[p+1] && note.stop==null){
									note.stop = time;
									return true;
								}
							});
						}
						p+=3;
						break;
					// Polyfonic Key Pressure - A[ch], Pitch?, Velocity?
					case 0xA:
						lastState = smf[p];
						p+=3;
						break;
					// Control Change - B[ch],,
					case 0xB:
						lastState = smf[p];
						switch(smf[p+1]){
							case 6:
								// RLSB=0 & RMSB=0 -> 6はピッチ
								if(RpnLsb==0 && RpnMsb==0){
									dataEntry = smf[p+2];
								}
								break;
							case 7:
								velocity = smf[p+2];
								break;
							case 10:
								//Pan
								track.notes.forEach(function(note){
									if(note.stop==null){
										note.pan.push({
											timing: time,
											value: smf[p+2]
										});
									}
								});
								pan = smf[p+2];
								break;
							case 11:
								//Expression
								track.notes.forEach(function(note){
									if(note.stop==null){
										note.expression.push({
											timing: time,
											value: smf[p+2]
										});
									}
								});
								expression = smf[p+2];
								break;
							case 100:
								RpnLsb = smf[p+2];
								break;
							case 101:
								RpnMsb = smf[p+2];
								break;
						}
						p+=3;
						break;
					// Program Change - C[ch],
					case 0xC:
						lastState = smf[p];
						track.instrument = smf[p+1];
						p+=2;
						break;
					// Channel Pre - D[ch],
					case 0xD:
						lastState = smf[p];
						p+=2;
						break;
					// PitchBend Change - E[ch],,
					case 0xE:
						lastState = smf[p];
						pitchBend = ((smf[p+2]*128+smf[p+1])-8192)/8192*dataEntry;
						track.notes.forEach(function(note){
							if(note.stop==null){
								note.pitchBend.push({
									timing: time,
									value: pitchBend
								});
							}
						});
						p+=3;
						break;
					// Meta Events - F[ch], ...
					case 0xF:{
						//lastState = smf[p]; <- ランニングナントカは無いらしい
						switch(smf[p]){
							case 0xF0:
								while(smf[p+1]!=0xF7){
									p++;
								}
								p+=2;
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
							case 0xF7:
							case 0xF8:
							case 0xFA:
							case 0xFB:
							case 0xFC:
							case 0xFE:
								p+=1;
								break;
							case 0xFF:{
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
										time += header.resolution - dt;
										break;
									// Tempo
									case 0x51:
										data.tempo = 60*1000000/(smf[p+3]*0xffff + smf[p+4]*0xff + smf[p+5]);
										tempoTrack.push({
											timing: time,
											value: 60*1000000/(smf[p+3]*0xffff + smf[p+4]*0xff + smf[p+5])
										});
										break;
									case 0x54:
										break;
									// Beat
									case 0x58:
										beatTrack.push({
											timing: time,
											value: [smf[p+3], Math.pow(2, smf[p+4])]
										});
										break;
									case 0x59:
									case 0x7F:
										break;
								}
								p+=smf[p+2]+3;
								break;
							}
						}
						break;
					}
					default: {
						p--;
						smf[p] = lastState;
						lastState = null;

					}
				}
				// WebMIDIAPI
				if(this.settings.isWebMIDI){
					messages.push({ message: smf.slice(cashP, p), timing: time });
				}
			}
			if(songLength<time) songLength = time;
		}
		tempoTrack.push({ timing:songLength, value:120 });
		data.header = header;
		data.tracks = tracks;
		data.tempoTrack = tempoTrack;
		data.beatTrack = beatTrack;
		data.songLength = songLength;
		if(this.settings.isWebMIDI) data.messages = messages;
		return data;
	};

	function getInt(arr){
		var value = 0;
		for (var  i=0;i<arr.length;i++){
			value = (value << 8) + arr[i];
		}
		return value;
	}

	return PicoAudio;
})();
