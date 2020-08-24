# PicoAudio.js

## PicoAudio.jsとは

MIDIをブラウザで再生するためのJavaScriptライブラリです。

ウェブ上でMIDIファイルをパースし、WebAudioAPIで再生します。

[Picotune]( http://picotune.me/ )の、MIDI再生部分になります。 

[Sample]( https://cagpie.github.io/PicoAudio.js/sample/sample1.html )

## 使い方(ざっくり)
**インスタンスの生成と初期化**
```javascript
var picoAudio = new PicoAudio();
picoAudio.init();
```

**再生**
```javascript
var file = (FileReaderやXMLHttpRequest、Fetchなどで取得)
var smfData = new Uint8Array(file);
var parseData = picoAudio.parseSMF(smfData);
picoAudio.setData(parseData);
picoAudio.play();
```
※GoogleChromeの仕様変更により、play()メソッドを呼び出すタイミングはユーザのタッチ操作に制限される可能性があります。

**停止**
```javascript
picoAudio.stop();
```

