import {words2} from './utils/words';
import {seed} from './seed';

// function getLastCharacter(word: string) {
//   const length = word.length;
//   return word[length - 1];
// }

// function capitalize(word: string) {
//   return word[0].toUpperCase() + word.slice(1);
// }

export function words(count: number, s?: string | number) {
  const pool: string[] = [];
  const gen = new seed({seed: s});
  for (let i = 0; i < count; i++) {
    const idx = gen.intBetween(0, words2.length);
    pool.push(words2[idx]);
  }
  return pool.join(',');
}

// function punctuate(currentWord: string, previousWord: string, index: number) {
//   let word = currentWord;

//   const r = new seed({seed: currentWord + index});
//   const r1 = r.roll();
//   const r2 = r.roll();
//   console.log(r1, r2);
//   if (
//     index === 0 ||
//     getLastCharacter(previousWord) === '.' ||
//     getLastCharacter(previousWord) === '?' ||
//     getLastCharacter(previousWord) === '!'
//   ) {
//     word = capitalize(word);
//   } else if (r1 < 0.1 && getLastCharacter(previousWord) !== '.') {
//     // console.log(r.list[1], index);
//     // Less than 0.75
//     if (r2 < 0.75) {
//       word += '.';
//       // between 0.75 and 0.9
//     } else if (r2 > 0.75 && r2 < 0.9) {
//       word += '?';
//     } else {
//       word += '!';
//     }
//   } else if (r1 > 0.9 && getLastCharacter(previousWord) !== '.') {
//     // Greater than 0.75
//     if (r2 > 0.75) {
//       word += ',';
//       // Less than 0.15
//     } else if (r2 < 0.15) {
//       word += '?';
//     } else if (r2 > 0.2 && r2 < 0.4) {
//       word += ';';
//     }
//   }

//   return word;
// }
