import {getWords} from '../src/kit';
import {Seed} from '../src/seed';

describe('getWords', () => {
  it('generates the correct length', () => {
    expect(getWords(30).split(',').length).toBe(30);
  });

  it('will generate the word list with respect to a seed', () => {
    const seed = 'MY AWESOME SEED';

    const gen1 = new Seed({seed});
    const words1 = getWords(30, gen1);

    const gen2 = new Seed({seed});
    const words2 = getWords(30, gen2);

    expect(words1).toEqual(words2);
  });

  it('will generate different lists with different provided seeds', () => {
    const gen1 = new Seed({seed: 'seed one'});
    const words1 = getWords(30, gen1);

    const gen2 = new Seed({seed: 'this is the second seed'});
    const words2 = getWords(30, gen2);

    expect(words1).not.toEqual(words2);
  });

  it('will generate different lists without a provided seed', () => {
    const gen1 = new Seed();
    const words1 = getWords(30, gen1);

    const gen2 = new Seed();
    const words2 = getWords(30, gen2);

    expect(words1).not.toEqual(words2);
  });
});
