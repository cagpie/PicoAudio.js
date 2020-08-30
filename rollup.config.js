import babel from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';

const babelParam = {
  babelHelpers: 'bundled',
  presets: ["@babel/preset-env"]
};

export default [
  {
    input: 'src/main.js',
    output: {
      file: 'dist/browser/PicoAudio.js',
      format: 'iife',
      name: 'PicoAudio'
    },
    plugins: [
      babel(babelParam)
    ]
  },
  {
    input: 'src/main.js',
    output: {
      file: 'dist/browser/PicoAudio.min.js',
      format: 'iife',
      name: 'PicoAudio'
    },
    plugins: [
      babel(babelParam),
      terser()
    ]
  },
  {
    input: 'src/main.js',
    output: [
      {
        file: 'dist/nodejs/pico-audio.js',
        format: 'cjs',
        name: 'PicoAudio',
        exports: 'default'
      },
      {
        file: 'dist/nodejs/pico-audio.mjs',
        format: 'esm'
      }
    ]
  }
];