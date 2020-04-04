const NoteNumber = {
  C:  0,
  Db: 1,
  D:  2,
  Eb: 3,
  E:  4,
  F:  5,
  Gb: 6,
  G:  7,
  Ab: 8,
  A:  9,
  Bb: 10,
  B:  11
}

function parseNoteNameToNumber (noteName) {
  const name = noteName.match(/^([A-Gb]+)/)[1];
  const height = parseInt(noteName.match(/([0-9]+)$/)[1]);

  return 12 + (height * 12) + NoteNumber[name];
}

function decodeAudioData (context, data) {
  return new Promise((res, rej) => {
      context.decodeAudioData(
          data,
          (buffer) => {
              res(buffer);
          },
          (err) => {
              rej(err);
          }
      );
  });
}

export default async function loadSoundfont (context, soundfont) {
  console.log(soundfont);
  const soundfontBuffers = [];

  for(let key in soundfont) {
      const binary = atob(soundfont[key].split(',')[1]);
      const len = binary.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
          bytes[i] = binary.charCodeAt(i);
      }

      const buffer = await decodeAudioData(context, bytes.buffer);
      soundfontBuffers[parseNoteNameToNumber(key)] = buffer;
  };

  return soundfontBuffers;
}
