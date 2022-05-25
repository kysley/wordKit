import {words2} from './utils/words';
import {Seed} from './seed';

// function getLastCharacter(word: string) {
//   const length = word.length;
//   return word[length - 1];
// }

// function capitalize(word: string) {
//   return word[0].toUpperCase() + word.slice(1);
// }
const words2Length = words2.length;

export function getWords(amount: number, gen?: Seed): string;
export function getWords(
  amount: number,
  gen: Seed,
  withSeed: boolean,
): {words: string; seed: string};

export function getWords(
  amount: number,
  gen: Seed = new Seed(),
  withSeed: boolean = false,
) {
  const pool: string[] = [];
  for (let i = 0; i < amount; i++) {
    const idx = gen.between(0, words2Length);
    pool.push(words2[idx]);
  }
  if (withSeed) {
    return {
      words: pool.join(','),
      seed: gen.providedSeed,
    };
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
