import {grabWords} from '../src/grabWords';
import {seed} from '../src/seedNumbers';

describe('grabWords', () => {
  it('punctuates', () => {
    // const numArray = seedNumbers(40, 1000);
    const numArray = new seed({}).nRandom(40);
    console.log(grabWords(numArray, {punctuate: true}));
    // console.log(new seed({seed: 'poopy pants'}).getState());
    // grabWords(numArray);
  });

  // it('matches punctuation via a seed', () => {
  //   const numArray1 = seedNumbers(40, 1000, {seed: 'punctuation!'});
  //   const numArray2 = seedNumbers(40, 1000, {seed: 'punctuation!'});

  //   // console.log(grabWords(numArray1.list, {punctuate: true}));

  //   expect(grabWords(numArray1.list, {punctuate: true})).toEqual(
  //     grabWords(numArray2.list, {punctuate: true}),
  //   );
  // });

  // it('matches without punctuation', () => {
  //   const numArray1 = seedNumbers(40, 1000, {seed: 'no punctuation'});
  //   const numArray2 = seedNumbers(40, 1000, {seed: 'no punctuation'});

  //   expect(grabWords(numArray1.list)).toEqual(grabWords(numArray2.list));
  // });
});
