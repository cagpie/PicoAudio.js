# PicoAudio.js

## PicoAudio.jsについて

Web上でMIDI(Standard MIDI File=SMF)を再生するためのJavaScriptライブラリです。
SMF形式のバイナリのパースや、Web Audio API を用いた楽曲の再生ができます。

Web Audio API から提供される数種の音源を組み合わせて、8bitサウンドで演奏を行います。
また、別途音源の準備をする必要がなく、WebとSMFを組み合わせた開発がすぐに始められます！


## 主な機能
- MIDIファイル(SMF)のパース
- パースしたデータの再生
- 再生時のnoteOn/noteOffイベント発火 など


## 利用されているプロダクト

- [Picotune](http://picotune.me) by @cagpie
- [Tonyu System 2](https://www.tonyu.jp/Tonyu2.php) by @hoge1e3


## 導入方法
準備中

## はじめ方

### 初期化

```javascript
const picoAudio = new PicoAudio();
picoAudio.init();
```


### 再生

```javascript
// Standard MIDI Fileの準備
const file = /* FileReaderやFetchなどで取得 */
const smfData = new Uint8Array(file);

// SMF形式のバイナリのパースを行う
const parsedData = picoAudio.parseSMF(smfData);

// パースしたデータをセット
picoAudio.setData(parsedData);

// 再生
picoAudio.play();
```
※ `PicoAudio.play` メソッドは、ユーザのジェスチャーイベントから呼び出す必要がある場合があります ([参考](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio))

### 停止
```javascript
// 停止
picoAudio.stop();
```


## API

### Main Functions

#### PicoAudio.init
```typescript
// PicoAudioインスタンスの生成
new PicoAudio({
  debug: boolean, // デバッグON/OFF
  audioContext: AudioContext, // 生成済みのAudioContextを再利用
  picoAudio: PicoAudio, // 生成済みのPicoAudioインスタンスを再利用
}): PicoAudio
```
※ 細かいパラメータも設定可能 ([参考](https://github.com/cagpie/PicoAudio.js/blob/master/src/init/constructor.js))

#### PicoAudio.parseSMF
```typescript
// SMFファイルをパースし、PicoAudioで再生できる形式にする
// ピアノロールの描画を行いたい場合などに、ParsedSMFが利用できる
PicoAudio.parseSMF(smfFile: Uint8Array): ParsedSMF
```

#### PicoAudio.setData
```typescript
// パースされたデータをセットする
PicoAudio.setData(parsedSMF: ParsedSMF): void
```

#### PicoAudio.play
```typescript
// セットされているデータで再生する
PicoAudio.play(isLoop: boolean): void
```

#### PicoAudio.stop
```typescript
// 楽曲の停止
PicoAudio.stop(): void
```

#### PicoAudio.initStatus
```typescript
// 再生状態の初期化
PicoAudio.initStatus(): void
```

#### PicoAudio.setStartTime
```typescript
// 再生開始位置の設定
PicoAudio.setStartTime(offseTime: number) :void
```

#### ステータスのSetter/Getter
```typescript
// 全体音量の設定
PicoAudio.getMasterVolume(): number
PicoAudio.setMasterVolume(volume: number): void

// リバーブの設定
PicoAudio.isReverb(): boolean
PicoAudio.setReverb(enable: boolean): void
PicoAudio.getReverbVolume(): number
PicoAudio.setReverbVolume(volume: number): void

// コーラスの設定
PicoAudio.isChorus(): boolean
PicoAudio.setChorus(enable: boolean): void
PicoAudio.getChorusVolume(): number
PicoAudio.setChorusVolume(volume: number): void

// チャンネルの音色情報や音量の設定
PicoAudio.initChannels(): void
PicoAudio.getChannels(): Array
PicoAudio.setChannels(channels: Array): void

// ループの設定
PicoAudio.isLoop(): boolean
PicoAudio.setLoop(enable: boolean): void

// Web MIDI APIの設定
PicoAudio.isWebMIDI(): boolean
PicoAudio.setWebMIDI(enable: boolean): void

// Control Change 111 のループの設定
PicoAudio.isCC111(): boolean
PicoAudio.setCC111(enable: boolean): void
```


### Event周辺

#### PicoAudio.addEventListener
```typeScript
// イベントリスナを登録
PicoAudio.addEventListener(
  type: <'play' | 'stop' | 'noteOn' | 'noteOff' | 'songEnd'>,
  listener: Function
): void
```

##### PicoAudio.addEventListener (noteOn)
```typescript
// 音の開始イベントのリスナ登録ができる
// 発音される音のタイミングや高さ、強さなどが取得できる
PicoAudio.addEventListener(
  type: 'noteOn',
  listener: (event: NoteEvent) => void
): void

type NoteEvent = {
  channel: number, // チャンネル(1-16)
  instrument: number, // 楽器の種類(0-127)

  start: number, // 音の始まりのタイミング(tick=SMF時間)
  stop: number, // 音の終わりのタイミング(tick)
  startTime: number, // 音の始まりのタイミング(秒数)
  stopTime: number, // 音の終わりのタイミング(秒数)

  velocity: number, // ベロシティ(0-1)
  pitch: number, // 音の高さ(0-127)

  // CCパラメータ
  pan: CCEvent[],
  pitchBend: CCEvent[],
  expression: CCEvent[],
  modulation: CCEvent[],
  chorus: CCEvent[],
  reberb: CCEvent[],
}

type CCEvent = {
  timing: number, // タイミング(tick)
  time: number, // タイミング(秒数)
  value: number // 値(0-127)
}
```

##### PicoAudio.addEventListener (noteOff)
```typescript
// 音の終了イベントのリスナ登録ができる
PicoAudio.addEventListener(
  type: 'noteOff',
  listener: (event: NoteEvent) => void
): void
```

#### removeEventListener
```typescript
// 指定のイベントリスナを解除
PicoAudio.removeEventListener(
  type: <'play' | 'stop' | 'noteOn' | 'noteOff' | 'songEnd'>,
  listener: Function
): void
```

#### removeAllEventListener
```typescript
// 指定typeのイベントリスナをすべて解除
PicoAudio.removeAllEventListener(
  type: <'play' | 'stop' | 'noteOn' | 'noteOff' | 'songEnd'>
): void
```

### SMFパース周辺
#### parsed SMF
```typescript
// 準備中
```

##### 変換関数
##### PicoAudio.getTime
```typescript
// tick から 時間に変換 (テンポも考慮される)
PicoAudio.getTime(tick: number): number
```

##### PicoAudio.getTiming
```typescript
// 時間からtickに変換
PicoAudio.getTiming(time: number): number
```


## License
Code released under the MIT License


## Contributors
- [cagpie](https://github.com/cagpie)
- [makkii_bcr](https://github.com/makkii-bcr)
