function processSeed(seed: string) {
  const decimalSeed = seed.split('').reduce((acc, char) => {
    acc += (char.charCodeAt(0) / 100) * (acc || 1);
    return acc;
  }, 0);

  return Number(
    decimalSeed
      .toString()
      .replace('.', '')
      .slice(0, 10),
  );
}

type SeedOptions = {
  seed?: string;
};

export class Seed {
  _mz: number;
  _mw: number;
  _seed: number;
  providedSeed?: string;

  constructor(opts: SeedOptions = {}) {
    this._mz = 987654321;
    this._mw = 123456789;

    const seed = opts?.seed ? processSeed(opts.seed) : this.randomSeed;

    this.providedSeed = opts.seed;

    this._mw = (123456789 + seed) & 0xffffffff;
    this._mz = (987654321 - seed) & 0xffffffff;
    this._seed = seed;
  }

  get randomSeed() {
    return 1 + Math.floor(Math.random() * 0xffffffff);
  }

  random() {
    let mz = (36969 * (this._mz & 65535) + (this._mz >> 16)) & 0xffffffff;
    let mw = (18000 * (this._mw & 65535) + (this._mw >> 16)) & 0xffffffff;

    this._mz = mz;
    this._mw = mw;

    let r = ((mz << 16) + (mw & 65535)) >>> 0;
    return (r /= 4294967296);
  }

  get state() {
    return {
      _mw: this._mw,
      _mz: this._mz,
      _seed: this._seed,
    };
  }

  between(min: number, max: number) {
    return Math.floor(this.random() * (max - min + 1)) + min;
  }

  next() {
    return this.random();
  }
}
