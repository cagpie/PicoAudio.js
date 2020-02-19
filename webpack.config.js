/*global module,__dirname*/
/*
PicoAudio.es6.js:
webpack

PicoAudio.es6.min.js:
webpack --mode production

PicoAudio.es5.js:
webpack --babel 1

PicoAudio.es5.min.js:
webpack --mode production --babel 1
*/
module.exports = (env, argv) => {
  console.log("build mode: " + argv.mode);
  console.log("use babel: "+ !!argv.babel);
  const filename=`dist/PicoAudio${argv.babel?".es5":".es6"}${argv.mode==="production"?".min":""}`;
  return {
    mode: argv.mode === 'production' ? 'production' : 'none',
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
    }
  };
};
