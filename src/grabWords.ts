import {words2} from './utils/words';
import {seed} from './seedNumbers';

// const length = words2.length;

type Options = {
  join?: string;
  punctuate: boolean;
};

const defaultOpts: Options = {
  join: '|',
  punctuate: false,
};

function getLastCharacter(word: string) {
  const length = word.length;
  return word[length - 1];
}

function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1);
}

export function grabWords(indices: number[], opts?: Options): string {
  const options = {...defaultOpts, ...opts};

  const pool: string[] = [];
  for (let i = 0; i < indices.length; i++) {
    if (opts?.punctuate) {
      pool.push(punctuate(words2[indices[i]], pool[i - 1], i));
    } else {
      pool.push(words2[indices[i]]);
    }
  }

  return pool.join(options.join);
}

function punctuate(currentWord: string, previousWord: string, index: number) {
  // const currentWord = pool[index];
  let word = currentWord;
  // const previousWord = pool[index - 1];

  // const r = seedNumbers(2, 1, {
  //   seed: currentWord + index,
  //   asPercentage: true,
  // });

  const r = new seed({asPercentage: true, seed: currentWord + index});
  const list = r.nRandomPercent(1);
  console.log(list, r.getState());
  if (
    index === 0 ||
    getLastCharacter(previousWord) === '.' ||
    getLastCharacter(previousWord) === '?' ||
    getLastCharacter(previousWord) === '!'
  ) {
    word = capitalize(word);
  } else if (list[0] < 0.1 && getLastCharacter(previousWord) !== '.') {
    // console.log(r.list[1], index);
    // Less than 0.75
    if (list[1] < 0.75) {
      word += '.';
      // between 0.75 and 0.9
    } else if (list[1] > 0.75 && list[1] < 0.9) {
      word += '?';
    } else {
      word += '!';
    }
  } else if (list[0] > 0.9 && getLastCharacter(previousWord) !== '.') {
    // Greater than 0.75
    if (list[1] > 0.75) {
      word += ',';
      // Less than 0.15
    } else if (list[1] < 0.15) {
      word += '?';
    } else if (list[1] > 0.2 && list[1] < 0.4) {
      word += ';';
    }
  }

  return word;
}
