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
var webpack = require("webpack");
module.exports = (env, argv) => {
  argv.tonyu2 = !!argv.tonyu2;
  argv.babel = argv.babel === undefined ? true : !!argv.babel;
  if (argv.tonyu2) argv.babel = false;
  const filename=`dist/PicoAudio${argv.tonyu2?".tonyu2":argv.babel?"":".es6"}${argv.mode==="production"?".min":argv.mode==="development"?".dev":""}`;
  console.log("build mode: " + argv.mode);
  console.log("use babel: "+ argv.babel);
  console.log("use tonyu2: "+ argv.tonyu2);
  console.log("filename: "+ filename);
  return {
    mode: argv.mode === 'production' ? 'production' : argv.mode === 'development' ? 'development' : 'none',
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
        minimize: argv.mode==="production"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: (argv.babel?[{
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
        'process.env.BUILD_MODE': JSON.stringify(argv.mode),
        'process.env.TONYU2': JSON.stringify(argv.tonyu2)
      })
    ]
  };
};
