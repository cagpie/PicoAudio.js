/*global module,__dirname*/
/*

PicoAudio.js:
webpack

PicoAudio.min.js:
webpack --mode production

PicoAudio.dev.js:
webpack --mode development

PicoAudio.es6.js:
webpack --babel 0

PicoAudio.es6.min.js:
webpack --mode production --babel 0

PicoAudio.es6.dev.js:
webpack --mode development --babel 0

PicoAudio.tonyu2.js:
webpack --tonyu2

PicoAudio.tonyu2.min.js:
webpack --mode production --tonyu2

PicoAudio.tonyu2.dev.js:
webpack --mode development --tonyu2
*/
const webpack = require("webpack");
module.exports = (env, argv) => {
  let buildMode = argv.mode;
  let isBabel = (argv.babel === undefined ? true : !!argv.babel);
  const isTonyu2 = !!argv.tonyu2;

  if (isTonyu2) {
    isBabel = false;
  }
  if (buildMode !== "production" && buildMode !== "development") {
    buildMode = "none";
  }

  const fn1 = (isTonyu2 ? ".tonyu2" : (isBabel ? "" : ".es6"));
  const fn2 = (buildMode === "production" ? ".min" : (buildMode === "development" ? ".dev" : ""));
  const filename = `dist/PicoAudio${fn1}${fn2}`;

  console.log("build mode: " + buildMode);
  console.log("use babel: "+ isBabel);
  console.log("Tonyu2: "+ isTonyu2);
  console.log("filename: "+ filename);

  return {
    mode: buildMode,
    context: __dirname + '/src',
    entry: {
      [filename]: './main.js'
    },
    output: {
      path: __dirname,
      filename: './[name].js',
      // library: 'PicoAudio',
      // libraryTarget: 'var'
    },
    devServer: {
      contentBase: 'dist',
      open: true
    },
    optimization: {
      minimize: buildMode === "production"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: (isBabel?[{
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                ]
              }
          }]:[])
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.DEBUG': JSON.stringify(buildMode === "development"),
        'process.env.TONYU2': JSON.stringify(isTonyu2)
      })
    ]
  };
};
