import babel from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const babelParam = {
  babelHelpers: 'bundled',
  presets: ["@babel/preset-env"]
};

function url() {
  return {
    name: 'localserver',
    generateBundle () {
      console.log("http://localhost:10001/sample/sample1.html");
      console.log("http://localhost:10001/sample/sample2.html");
    }
  }
}

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/browser/PicoAudio.js',
    format: 'iife',
    name: 'PicoAudio'
  },
  plugins: [
    babel(babelParam),
    // LiveReroad
    serve(''),
    livereload({watch: ['dist/browser/PicoAudio.js', 'sample']}),
    url()
  ]
};