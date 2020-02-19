## ビルド方法

Node.jsを予めインストールしておいて下さい。

```sh
npm run setup      # 必要パッケージのインストール
npm run all-build  # 全種類のビルドを行う
npm run build      # Picotune用のビルドを行う
```

## ファイルの種類
.js     ： 通常版。
.min.js ： minify版。ファイルサイズが小さい。
.dev.js ： debug版。開発用。consoleにlogが出力される。

## ファイル一覧
PicoAudio.js            : Picotune 用          (ES5 Babel使用)
PicoAudio.min.js        : Picotune 用 minify版 (ES5 Babel使用)
PicoAudio.dev.js        : Picotune 用 debug版  (ES5 Babel使用)
PicoAudio.es6.js        : ES6 Babel無し
PicoAudio.es6.min.js    : ES6 Babel無し minify版
PicoAudio.es6.dev.js    : ES6 Babel無し debug版
PicoAudio.tonyu2.js     : Tonyu System 2 用          (ES6 Babel無し)
PicoAudio.tonyu2.min.js : Tonyu System 2 用 minify版 (ES6 Babel無し)
PicoAudio.tonyu2.dev.js : Tonyu System 2 用 debug版  (ES6 Babel無し)
