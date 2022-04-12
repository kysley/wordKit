import {getWords} from '../src/kit';

describe('kit.words', () => {
  it('generates the correct length', () => {
    expect(getWords(30).split(',').length).toBe(30);
  });

  it('will seed the output', () => {
    const seed = 'MY AWESOME SEED';
    const words1 = getWords(30, seed);
    const words2 = getWords(30, seed);
    expect(words1).toEqual(words2);
  });

  it('will seed the output but reverse', () => {
    const words1 = getWords(30, 'my seed one');
    const words2 = getWords(30, 'never gonna give you up');
    expect(words1).not.toEqual(words2);
  });
});
