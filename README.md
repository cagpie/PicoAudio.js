# PicoAudio.js
MIDIをウェブ上で再生するためのものです。
再生する音源は Web Audio API のもの。
内容は、Picotune(http://pt.cagpie.net)の、MIDI再生部分のみのものになります。 

*つかいかた*
HTMLファイルからscriptタグでPicoAudio.jsを読み込んだ後、
var smf = Uint8Array(file); // fileはXMLHttpRequestなどから用意する
var pa = new PicoAudio();
var data = pa.parseSMF(smf);
pa.setData(data);
pa.play();
