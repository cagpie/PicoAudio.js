module.exports = (env, argv) => {
  console.log("build mode: " + argv.mode);
  return {
    mode: argv.mode === 'production' ? 'production' : 'development', 
    context: __dirname + '/src',
    entry: argv.mode === 'production' ? {
      'dist/PicoAudio.min': './main.js'
    } : {
      'dist/PicoAudio': './main.js'
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
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                ]
              }
            }
          ]
        }
      ]
    }
  };
};
