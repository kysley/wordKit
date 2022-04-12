import {isNil} from './utils/isNotNil';

function processSeed(seed: string | number) {
  return String(seed)
    .split('')
    .reduce((acc, char) => {
      acc += (char.charCodeAt(0) / 100) * (acc || 1);
      return acc;
    }, 0);
}

type SeedOptions = {
  seed?: string | number;
};

export class seeder {
  _mz: number;
  _mw: number;
  _seed?: number;
  upperBound?: number;
  lowerBound?: number;

  constructor(opts: SeedOptions) {
    this._mz = 987654321;
    this._mw = 123456789;
    this.setSeed(opts?.seed);
  }

  setSeed(seedToSet?: string | number) {
    const seed = !isNil(seedToSet)
      ? processSeed(seedToSet!)
      : this.randomSeed();
    this._mw = (123456789 + seed) & 0xffffffff;
    this._mz = (987654321 - seed) & 0xffffffff;
    this._seed = seed;
  }

  randomSeed() {
    return 1 + Math.floor(Math.random() * 0xffffffff);
  }

  private random() {
    let mz = (36969 * (this._mz & 65535) + (this._mz >> 16)) & 0xffffffff;
    let mw = (18000 * (this._mw & 65535) + (this._mw >> 16)) & 0xffffffff;

    this._mz = mz;
    this._mw = mw;

    let r = ((mz << 16) + (mw & 65535)) >>> 0;
    return (r /= 4294967296);
  }

  getState() {
    return `${this._mw}:${this._mz}:${this._seed}`;
  }

  between(min: number, max: number) {
    return Math.floor(this.random() * (max - min + 1)) + min;
  }

  next() {
    return this.random();
  }
}
