export default function createPercussionNote(option) {
    const note = this.createBaseNote(option, true, false);
    if (note.isGainValueZero) return null;

    const source = note.oscillator;
    const gainNode = note.gainNode;
    const stopGainNode = note.stopGainNode;
    let start = note.start;
    const velocity = 1; // ドラム全体の音量調整用
    const note2 = this.createBaseNote(option, false, false, true);
    const oscillator = note2.oscillator;
    const gainNode2 = note2.gainNode;
    const stopGainNode2 = note2.stopGainNode;
    const nextSameNoteOnInterval = option.nextSameNoteOnInterval;

    // oscillator.frequency.setValueAtTime()がcurrentTimeより遅れると周波数設定がされないので対策
    if (start < this.context.currentTime) start = this.context.currentTime;
    let stopAudioTime = 0;
    let stopAudioTime2 = 0;
    switch (option.pitch) {
        // 元々のパーカッション音源 //
        // Bass drum
        case 35:
        case 36:
            // w
            gainNode.gain.value = velocity*0.6;
            source.playbackRate.value = 0.02;
            stopAudioTime = 0.07;
            // s
            gainNode2.gain.value = velocity*1.1;
            oscillator.frequency.setValueAtTime(120, start);
            oscillator.frequency.linearRampToValueAtTime(50, start+0.07);
            stopAudioTime2 = 0.07;
            break;
        // Snare
        case 38:
        case 40:
            // w
            source.playbackRate.value = 0.7;
            stopAudioTime = 0.05;
            // s
            gainNode2.gain.setValueAtTime(velocity*0.8, start);
            gainNode2.gain.linearRampToValueAtTime(0.0, start+0.05);
            oscillator.frequency.setValueAtTime(300, start);
            oscillator.frequency.linearRampToValueAtTime(200, start+0.05);
            stopAudioTime2 = 0.05;
            break;
        // Toms
        case 41: case 43: case 45:
        case 47: case 48: case 50:
            // w
            source.playbackRate.value = 0.01;
            stopAudioTime = 0.1;
            // s
            oscillator.type = "square";
            gainNode2.gain.setValueAtTime(velocity, start);
            gainNode2.gain.linearRampToValueAtTime(0.01, start+0.1);
            oscillator.frequency.setValueAtTime(150+20*(option.pitch-40), start);
            oscillator.frequency.linearRampToValueAtTime(50+20*(option.pitch-40), start+0.1);
            stopAudioTime2 = 0.1;
            break;
        // Close Hihat
        case 42:
        case 44:
            source.playbackRate.value = 1.5;
            stopAudioTime = 0.02;
            stopAudioTime2 = 0;
            break;
        // Open Hihat
        case 46:
            source.playbackRate.value = 1.5;
            stopAudioTime = 0.3;
            gainNode.gain.setValueAtTime(velocity*0.9, start);
            gainNode.gain.linearRampToValueAtTime(0.0, start+0.3);
            stopAudioTime2 = 0;
            break;
        // Cymbal
        case 49: case 52:
        case 53: case 55: case 57:
            source.playbackRate.value = 1.2;
            stopAudioTime = 0.5;
            gainNode.gain.setValueAtTime(velocity*1, start);
            gainNode.gain.linearRampToValueAtTime(0.0, start+0.5);
            stopAudioTime2 = 0;
            break;
        // Cymbal2
        case 51:
            source.playbackRate.value = 1.1;
            stopAudioTime = 0.4;
            gainNode.gain.setValueAtTime(velocity*0.8, start);
            gainNode.gain.linearRampToValueAtTime(0.0, start+0.4);
            stopAudioTime2 = 0;
            break;
        // Cymbal3
        case 59:
            source.playbackRate.value = 1.8;
            stopAudioTime = 0.3;
            gainNode.gain.setValueAtTime(velocity*0.5, start);
            gainNode.gain.linearRampToValueAtTime(0.0, start+0.3);
            stopAudioTime2 = 0;
            break;
        // Bongo
        case 60: case 61:
            // w
            source.playbackRate.value = 0.03;
            stopAudioTime = 0.03;
            // s
            gainNode2.gain.setValueAtTime(velocity*0.8, start);
            gainNode2.gain.linearRampToValueAtTime(0.0, start+0.1);
            oscillator.frequency.setValueAtTime(400-40*(option.pitch-60), start);
            oscillator.frequency.linearRampToValueAtTime(450-40*(option.pitch-60), start+0.1);
            stopAudioTime2 = 0.1;
            break;
        // mute Conga
        case 62:
            // w
            source.playbackRate.value = 0.03;
            stopAudioTime = 0.03;
            // s
            gainNode2.gain.setValueAtTime(velocity, start);
            gainNode2.gain.linearRampToValueAtTime(0.0, start+0.03);
            oscillator.frequency.setValueAtTime(200, start);
            oscillator.frequency.linearRampToValueAtTime(250, start+0.03);
            stopAudioTime2 = 0.03;
            break;
        // open Conga
        case 63: case 64:
            // w
            source.playbackRate.value = 0.03;
            stopAudioTime = 0.03;
            // s
            gainNode2.gain.setValueAtTime(velocity, start);
            gainNode2.gain.linearRampToValueAtTime(0.0, start+0.1);
            oscillator.frequency.setValueAtTime(200-30*(option.pitch-63), start);
            oscillator.frequency.linearRampToValueAtTime(250-30*(option.pitch-63), start+0.1);
            stopAudioTime2 = 0.1;
            break;
        // Cowbell, Claves
        case 56:
        case 75:
            // w
            source.playbackRate.value = 0.01;
            stopAudioTime = 0.1;
            // s
            gainNode2.gain.setValueAtTime(velocity, start);
            gainNode2.gain.linearRampToValueAtTime(0.0, start+0.1);
            oscillator.frequency.setValueAtTime(1000+48*(option.pitch-56), start);
            stopAudioTime2 = 0.1;
            break;
        // mute triangle
        case 80:
            // w
            source.playbackRate.value = 5;
            gainNode.gain.setValueAtTime(velocity*0.5, start);
            gainNode.gain.linearRampToValueAtTime(0.0, start+0.2);
            stopAudioTime = 0.05;
            // s
            oscillator.type = "triangle";
            gainNode2.gain.setValueAtTime(velocity*0.7, start);
            gainNode2.gain.linearRampToValueAtTime(0.0, start+0.2);
            oscillator.frequency.setValueAtTime(6000, start);
            stopAudioTime2 = 0.05;
            break;
        // open triangle
        case 81:
            // w
            source.playbackRate.value = 5;
            gainNode.gain.setValueAtTime(velocity*0.9, start);
            gainNode.gain.linearRampToValueAtTime(0.0, start+0.5);
            stopAudioTime = 0.5;
            // s
            oscillator.type = "triangle";
            gainNode2.gain.setValueAtTime(velocity*0.8, start);
            gainNode2.gain.linearRampToValueAtTime(0.0, start+0.3);
            oscillator.frequency.setValueAtTime(6000, start);
            stopAudioTime2 = 0.3;
            break;



        // 新しいパーカッション音源 //

        // Snare Drum
        case 37: // Side Stick
        {
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
        }
        case 39: // Hand Clap
        {
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
        }
        // Bell
        case 54: // Tambourine
        {
            // w
            source.playbackRate.setValueAtTime(1, start);
            let v = option.pitch==54 ? 1 : 0.4;
            const len = option.pitch==54 ? 0.01 : 0;
            gainNode.gain.setValueAtTime(velocity*v/2, start);
            gainNode.gain.linearRampToValueAtTime(velocity*v, start+len);
            gainNode.gain.setTargetAtTime(0, start+len, 0.05);
            stopAudioTime = 0.3;
            // s
            oscillator.frequency.setValueAtTime(option.pitch==54 ? 6000 : 495, start);
            v = option.pitch==54 ? 1 : 2;
            gainNode2.gain.setValueAtTime(velocity*v/2, start);
            gainNode2.gain.linearRampToValueAtTime(velocity*v, start+len);
            gainNode2.gain.setTargetAtTime(0, start+len, 0.05);
            stopAudioTime2 = 0.3;
            break;
        }
        case 58: // Vibraslap
        {
            // w s
            source.playbackRate.setValueAtTime(0.6, start);
            source.playbackRate.linearRampToValueAtTime(1, start+0.8);
            const len = 40;
            gainNode.gain.setValueAtTime(velocity*1.5, start);
            gainNode2.gain.setValueAtTime(velocity*0.5, start);
            for (let i=0; i<len; i++) {
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
        }
        case 65: // High Timbale
        case 66: // Low Timbale
        {
            const len = option.pitch==65 ? 0.22 : 0.25;
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
        }
        case 67: // High Agogo
        case 68: // Low Agogo
        {
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
        }
        case 69: // Cabasa
        {
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
        }
        case 70: // Maracas
        {
            // w
            source.playbackRate.value = 1;
            gainNode.gain.setValueAtTime(velocity*1.2, start);
            gainNode.gain.linearRampToValueAtTime(0, start+0.06);
            stopAudioTime = 0.06;
            // s
            gainNode2.gain.value = 0;
            stopAudioTime2 = 0;
            break;
        }
        case 71: // Short Whistle
        case 72: // Long Whistle
        {
            // w
            gainNode.gain.value = 0;
            stopAudioTime = 0;
            // s
            const len = option.pitch==71 ? 0.07 : 0.4;
            oscillator.type = "triangle";
            oscillator.frequency.setValueAtTime(option.pitch==71 ? 2408 : 2105, start);
            gainNode2.gain.setValueAtTime(0, start);
            for (let i=0; i<len*74; i++) {
                gainNode2.gain.linearRampToValueAtTime(velocity*2.5, start+(i+0.2)/75);
                gainNode2.gain.linearRampToValueAtTime(velocity*0.5, start+(i+0.9)/75);
            }
            gainNode2.gain.linearRampToValueAtTime(0, start+len);
            stopAudioTime2 = len;
            break;
        }
        case 73: // Short Guiro
        case 74: // Long Guiro
        {
            // w
            const len = option.pitch==73 ? 0.05 : 0.35;
            source.playbackRate.setValueAtTime(option.pitch==73 ? 0.2 : 0.2, start);
            source.playbackRate.linearRampToValueAtTime(option.pitch==73 ? 0.7 : 0.5, start+len);
            gainNode.gain.value = velocity*0.2;
            for (let i=0; i<len*100; i++) {
                gainNode.gain.setValueAtTime(velocity*0.4, start+i/100);
                gainNode.gain.setValueAtTime(velocity*0.9, start+(i+0.7)/100);
            }
            stopAudioTime = len;
            // s
            gainNode2.gain.value = 0;
            stopAudioTime2 = 0;
            break;
        }
        case 76: // High Wood Block
        case 77: // Low Wood Block
        {
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
        }
        case 78: // Close Cuica
        case 79: // Open Cuica
        {
            // w
            gainNode.gain.value = 0;
            stopAudioTime = 0;
            // s
            const len = 0.18;
            const f = option.pitch==78 ? 750 : 270;
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
        }
        // GS, GM2
        case 27: // High Q
        {
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
        }
        case 28: // Slap
        {
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
        }
        case 29: // Scratch Push
        case 30: // Scratch Pull
        {
            const t1 = option.pitch==29 ? 0.05 : 0.07;
            const t2 = option.pitch==29 ? 0.06 : 0.09;
            const t3 = option.pitch==29 ? 0.07 : 0.11;
            const t4 = option.pitch==29 ? 0.1 : 0.15;
            const t5 = option.pitch==29 ? 0.25 : 0.4;
            // w
            const r1 = option.pitch==29 ? 0.1 : 0.06;
            const r2 = option.pitch==29 ? 0.3 : 0.2;
            const r3 = option.pitch==29 ? 0.18 : 0.12;
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
            const r4 = option.pitch==29 ? 500 : 400;
            const r5 = option.pitch==29 ? 1950 : 1200;
            const r6 = option.pitch==29 ? 430 : 250;
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
        }
        case 31: // Sticks
        {
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
        }
        case 32: // Square Click
        {
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
        }
        case 33: // Metronome Click
        case 34: // Metronome Bell
        {
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
        }
        case 82: // Shaker
        {
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
        }
        case 83: // Jingle Bell
        {
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
        }
        case 84: // Bell Tree
        {
            // w s
            const invert = false;
            source.playbackRate.value = 1;
            for (let i=0; i<28; i++) {
                gainNode.gain.setValueAtTime(velocity*0.1, start+i/24*0.45);
                gainNode.gain.setTargetAtTime(0, start+i/24*0.45, 0.01);
                oscillator.frequency.setValueAtTime(1380*(1+(invert ? (24-i)/24 : i/24)), start+i/24*0.45);
                gainNode2.gain.setValueAtTime(velocity*(0.2+i/24), start+i/24*0.45);
                gainNode2.gain.setTargetAtTime(0, start+i/24*0.45, i==27 ? 0.2 : 0.01);
            }
            stopAudioTime = 0.5;
            stopAudioTime2 = 1.5;
            break;
        }
        case 85: // Castanets
        {
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
        }
        case 86: // Mute Surdo
        case 87: // Open Surdo
        {
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
        }



        // 新しいパーカッション音源（不採用） //
        //     旧音源と重複するソース //
        //     ESLintエラーが出るため、旧音源と重複するソースをコメントアウト //

        // // Bass Drum
        // case 35: // Acoustic Bass Drum
        // case 36: // Bass Drum
        // {
        //     // w
        //     source.playbackRate.value = 0.25;
        //     gainNode.gain.setValueAtTime(0, start);
        //     gainNode.gain.linearRampToValueAtTime(velocity*0.7, start+0.004);
        //     gainNode.gain.linearRampToValueAtTime(0, start+0.008);
        //     stopAudioTime = 0.008;
        //     // s
        //     oscillator.frequency.setValueAtTime(option.pitch==35 ? 90 : 160, start);
        //     oscillator.frequency.linearRampToValueAtTime(40, start+0.08);
        //     gainNode2.gain.setValueAtTime(0, start);
        //     gainNode2.gain.linearRampToValueAtTime(velocity*3, start+0.02);
        //     gainNode2.gain.linearRampToValueAtTime(0, start+0.08);
        //     stopAudioTime2 = 0.08;
        //     break;
        // }
        // case 38: // Acoustic Snare
        // case 40: // Electric Snare
        // {
        //     const len = option.pitch==38 ? 0.25 : 0.2;
        //     // w
        //     source.playbackRate.value = 0.7;
        //     gainNode.gain.setValueAtTime(velocity, start);
        //     gainNode.gain.linearRampToValueAtTime(0, start+len);
        //     stopAudioTime = len;
        //     // s
        //     oscillator.frequency.setValueAtTime(option.pitch==38 ? 140 : 200, start);
        //     oscillator.frequency.linearRampToValueAtTime(option.pitch==38 ? 100 : 160, start+0.1);
        //     gainNode2.gain.setValueAtTime(velocity*2, start);
        //     gainNode2.gain.linearRampToValueAtTime(0, start+0.1);
        //     stopAudioTime2 = 0.1;
        //     break;
        // }
        // // Toms
        // case 41: // Low Floor Tom
        // case 43: // High Floor Tom
        // case 45: // Low Tom
        // case 47: // Low-Mid Tom
        // case 48: // High-Mid Tom
        // case 50: // High Tom
        // {
        //     const len = option.pitch-41+(option.pitch>=48 ? 1 : 0);
        //     // w
        //     source.playbackRate.value = 0.3+len/45;
        //     gainNode.gain.setValueAtTime(velocity*1.5, start);
        //     gainNode.gain.linearRampToValueAtTime(0, start+0.02);
        //     stopAudioTime = 0.02;
        //     // s
        //     oscillator.frequency.setValueAtTime(90+15*len, start);
        //     oscillator.frequency.linearRampToValueAtTime(30+7.5*len, start+0.5-len/35);
        //     gainNode2.gain.setValueAtTime(velocity*1.5, start);
        //     gainNode2.gain.linearRampToValueAtTime(0, start+0.5-len/35);
        //     stopAudioTime2 = 0.5-len/35;
        //     break;
        // }
        // // Hi-hat
        // case 42: // Closed High-Hat
        // case 44: // Pedal High-Hat
        // {
        //     // w
        //     source.playbackRate.value = 1;
        //     if (option.pitch==42) {
        //         gainNode.gain.setValueAtTime(velocity*0.8, start);
        //     }else{
        //         gainNode.gain.setValueAtTime(0, start);
        //         gainNode.gain.linearRampToValueAtTime(velocity*0.8, start+0.014);
        //     }
        //     gainNode.gain.linearRampToValueAtTime(0, start+0.08);
        //     stopAudioTime = 0.08;
        //     // s
        //     gainNode2.gain.value = 0;
        //     stopAudioTime2 = 0;
        //     break;
        // }
        // case 46: // Open Hihat
        // {
        //     // w
        //     source.playbackRate.setValueAtTime(0.35, start);
        //     source.playbackRate.linearRampToValueAtTime(0.6, start+0.1);
        //     source.playbackRate.linearRampToValueAtTime(1, start+0.3);
        //     gainNode.gain.setValueAtTime(velocity*1.1, start);
        //     gainNode.gain.setTargetAtTime(0, start, 0.3);
        //     stopAudioTime = 1.5;
        //     // s
        //     gainNode2.gain.value = 0;
        //     stopAudioTime2 = 0;
        //     break;
        // }
        // // Cymbal
        // case 49: // Crash Cymbal 1
        // case 57: // Crash Cymbal 2
        // {
        //     // w
        //     const r = option.pitch==49 ? 0.3 : 0.5;
        //     const r2 = option.pitch==49 ? 0.4 : 0.7;
        //     source.playbackRate.setValueAtTime(r, start);
        //     source.playbackRate.linearRampToValueAtTime(r2, start+0.15);
        //     source.playbackRate.linearRampToValueAtTime(0.9, start+0.4);
        //     gainNode.gain.setValueAtTime(velocity*1.3, start);
        //     gainNode.gain.setTargetAtTime(0, start, 0.35);
        //     stopAudioTime = 2;
        //     // s
        //     gainNode2.gain.value = 0;
        //     stopAudioTime2 = 0;
        //     break;
        // }
        // case 51: // Ride Cymbal 1
        // case 59: // Ride Cymbal 2
        // {
        //     // w
        //     source.playbackRate.value = 1;
        //     gainNode.gain.setValueAtTime(velocity*0.9, start);
        //     gainNode.gain.setTargetAtTime(0, start, 0.35);
        //     stopAudioTime = 2;
        //     // s
        //     oscillator.type = "triangle";
        //     const f = option.pitch==51 ? 372 : 400;
        //     oscillator.frequency.setValueAtTime(f, start);
        //     gainNode2.gain.setValueAtTime(velocity*0.4, start);
        //     gainNode2.gain.setTargetAtTime(0, start, 0.35);
        //     stopAudioTime2 = 2;
        //     break;
        // }
        // case 52: // Chinese Cymbal
        // {
        //     // w
        //     source.playbackRate.setValueAtTime(0.17, start);
        //     source.playbackRate.linearRampToValueAtTime(0.25, start+0.1);
        //     source.playbackRate.linearRampToValueAtTime(0.5, start+0.6);
        //     gainNode.gain.setValueAtTime(velocity*1.3, start);
        //     gainNode.gain.setTargetAtTime(0, start, 0.35);
        //     stopAudioTime = 2;
        //     // s
        //     oscillator.type = "triangle";
        //     oscillator.frequency.setValueAtTime(382, start);
        //     gainNode2.gain.setValueAtTime(velocity*0.2, start);
        //     gainNode2.gain.setTargetAtTime(0, start, 0.35);
        //     stopAudioTime2 = 2;
        //     break;
        // }
        // case 53: // Ride Bell
        // {
        //     // w
        //     source.playbackRate.setValueAtTime(0.6, start);
        //     gainNode.gain.setValueAtTime(velocity, start);
        //     gainNode.gain.setTargetAtTime(0, start, 0.3);
        //     stopAudioTime = 2;
        //     // s
        //     oscillator.type = "triangle";
        //     oscillator.frequency.setValueAtTime(377, start);
        //     gainNode2.gain.setValueAtTime(velocity*0.5, start);
        //     gainNode2.gain.setTargetAtTime(0, start, 0.35);
        //     stopAudioTime2 = 2;
        //     break;
        // }
        // case 55: // Splash Cymbal
        // {
        //     // w
        //     source.playbackRate.setValueAtTime(0.5, start);
        //     source.playbackRate.linearRampToValueAtTime(0.8, start+0.1);
        //     source.playbackRate.linearRampToValueAtTime(1, start+0.6);
        //     gainNode.gain.setValueAtTime(velocity*1.5, start);
        //     gainNode.gain.setTargetAtTime(0, start, 0.3);
        //     stopAudioTime = 1.75;
        //     // s
        //     gainNode2.gain.value = 0;
        //     stopAudioTime2 = 0;
        //     break;
        // }
        // case 56: // Cowbell
        // {
        //     // w
        //     source.playbackRate.setValueAtTime(1, start);
        //     let v = option.pitch==54 ? 1 : 0.4;
        //     const len = option.pitch==54 ? 0.01 : 0;
        //     gainNode.gain.setValueAtTime(velocity*v/2, start);
        //     gainNode.gain.linearRampToValueAtTime(velocity*v, start+len);
        //     gainNode.gain.setTargetAtTime(0, start+len, 0.05);
        //     stopAudioTime = 0.3;
        //     // s
        //     oscillator.frequency.setValueAtTime(option.pitch==54 ? 6000 : 495, start);
        //     v = option.pitch==54 ? 1 : 2;
        //     gainNode2.gain.setValueAtTime(velocity*v/2, start);
        //     gainNode2.gain.linearRampToValueAtTime(velocity*v, start+len);
        //     gainNode2.gain.setTargetAtTime(0, start+len, 0.05);
        //     stopAudioTime2 = 0.3;
        //     break;
        // }
        // case 80: // Mute Triangle
        // {
        //     // w
        //     source.playbackRate.value = 1;
        //     gainNode.gain.setValueAtTime(velocity*0.5, start);
        //     gainNode.gain.setTargetAtTime(0, start, 0.015);
        //     stopAudioTime = 0.2;
        //     // s
        //     oscillator.type = "triangle";
        //     oscillator.frequency.setValueAtTime(6000, start);
        //     gainNode2.gain.setValueAtTime(velocity*2.5, start);
        //     gainNode2.gain.setTargetAtTime(0, start, 0.02);
        //     stopAudioTime2 = 0.3;
        //     break;
        // }
        // case 81: // Open Triangle
        // {
        //     // w
        //     source.playbackRate.value = 5;
        //     gainNode.gain.setValueAtTime(velocity*0.5, start);
        //     gainNode.gain.setTargetAtTime(0, start, 0.08);
        //     stopAudioTime = 0.75;
        //     // s
        //     oscillator.type = "triangle";
        //     oscillator.frequency.setValueAtTime(6000, start);
        //     gainNode2.gain.setValueAtTime(velocity*2.5, start);
        //     gainNode2.gain.setTargetAtTime(0, start, 0.18);
        //     stopAudioTime2 = 1;
        //     break;
        // }
        // // Other Percussion
        // case 60: // High Bongo
        // case 61: // Low Bongo
        // case 62: // Mute High Conga
        // case 63: // Open High Conga
        // case 64: // Low Conga
        // {
        //     const p = option.pitch;
        //     const r = p==60 ? 700 : p==61 ? 282 : p==62 ? 385 : p==63 ? 295 : 210;
        //     const len = p==60 ? 0.08 : p==61 ? 0.1 : p==62 ? 0.03 : p==63 ? 0.12 : 0.15;
        //     // w
        //     source.playbackRate.value = 0.03;
        //     gainNode.gain.setValueAtTime(velocity*1.2, start);
        //     stopAudioTime = 0.03;
        //     // s
        //     oscillator.frequency.setValueAtTime(r*0.97, start);
        //     oscillator.frequency.linearRampToValueAtTime(r, start+len);
        //     gainNode2.gain.setValueAtTime(velocity*1.8, start);
        //     gainNode2.gain.linearRampToValueAtTime(0, start+len);
        //     stopAudioTime2 = len;
        //     break;
        // }
        // case 75: // Claves
        // {
        //     // w
        //     gainNode.gain.value = 0;
        //     stopAudioTime = 0;
        //     // s
        //     oscillator.frequency.setValueAtTime(2181, start);
        //     gainNode2.gain.setValueAtTime(0, start);
        //     gainNode2.gain.setValueAtTime(velocity*2, start+0.005);
        //     gainNode2.gain.linearRampToValueAtTime(velocity*1, start+0.015);
        //     gainNode2.gain.linearRampToValueAtTime(velocity*1.5, start+0.025);
        //     gainNode2.gain.linearRampToValueAtTime(0, start+0.08);
        //     stopAudioTime2 = 0.1;
        //     break;
        // }

        default: {
            source.playbackRate.value = option.pitch/69*2;
            stopAudioTime = 0.05;
            stopAudioTime2 = 0;
            break;
        }
    }
    // 同じドラムの音が重ならないようにする機能
    // ドラム再生中に次の同じドラムがすぐ鳴る場合、次が鳴る前に止めて音が重ならないようにする（同時発音数の増加を軽減する）
    if (!this.settings.isSameDrumSoundOverlap && nextSameNoteOnInterval != -1) {
        if (stopAudioTime > nextSameNoteOnInterval) {
            stopAudioTime = nextSameNoteOnInterval;
        }
        if (stopAudioTime2 > nextSameNoteOnInterval) {
            stopAudioTime2 = nextSameNoteOnInterval;
        }
    }
    // ドラム音停止時間を設定
    this.stopAudioNode(source, start+stopAudioTime, stopGainNode);
    this.stopAudioNode(oscillator, start+stopAudioTime2, stopGainNode2);
    // ドラム停止時間を設定
    option.drumStopTime = option.startTime + (stopAudioTime >= stopAudioTime2 ? stopAudioTime : stopAudioTime2);

    // 音をストップさせる関数を返す //
    return () => {
        this.stopAudioNode(source, 0, stopGainNode, true);
        this.stopAudioNode(oscillator, 0, stopGainNode2, true);
    };
}