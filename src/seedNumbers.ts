import {isNil} from './utils/isNotNil';

type GenOptions = {
  seed?: string | number;
  asPercentage?: boolean;
  upperBound?: number;
  lowerBound?: number;
};

// const defaultOptions: GenOptions = {
//   seed: undefined,
//   asPercentage: false,
// };

// export function seedNumbers(
//   numberCount: number,
//   upperBound: number,
//   opts?: GenOptions,
// ) {
//   let _mz = 987654321;
//   let _mw = 123456789;
//   let _seed = undefined;

//   opts = opts ? {...defaultOptions, ...opts} : defaultOptions;

//   const processSeed = function(seed: GenOptions['seed']) {
//     return String(seed)
//       .split('')
//       .reduce((acc, char) => {
//         acc += (char.charCodeAt(0) / 100) * (acc || 1);
//         return acc;
//       }, 0);
//   };

//   const seed = function(i: number) {
//     _mw = (123456789 + i) & 0xffffffff;
//     _mz = (987654321 - i) & 0xffffffff;
//     _seed = i;
//   };

//   const randomSeed = function() {
//     return 1 + Math.floor(Math.random() * 0xffffffff);
//   };

//   const random = function() {
//     let mz = (36969 * (_mz & 65535) + (_mz >> 16)) & 0xffffffff;
//     let mw = (18000 * (_mw & 65535) + (_mw >> 16)) & 0xffffffff;

//     _mz = mz;
//     _mw = mw;

//     let r = ((mz << 16) + (mw & 65535)) >>> 0;

//     return (r /= 4294967296);
//   };

//   if (opts.seed) {
//     seed(processSeed(opts.seed));
//   } else {
//     seed(randomSeed());
//   }

//   const list: number[] = [];
//   for (let i = numberCount; i > 0; i--) {
//     const rr = random();

//     if (opts.asPercentage) {
//       list.push(rr * upperBound);
//     } else {
//       list.push(Math.floor(rr * upperBound));
//     }
//   }

//   return {
//     _seed,
//     list,
//   };
// }

function processSeed(seed: string | number) {
  return String(seed)
    .split('')
    .reduce((acc, char) => {
      acc += (char.charCodeAt(0) / 100) * (acc || 1);
      return acc;
    }, 0);
}

export class seed {
  _mz: number;
  _mw: number;
  _seed?: number;
  upperBound?: number;
  lowerBound?: number;

  constructor(opts: GenOptions) {
    this._mz = 987654321;
    this._mw = 123456789;
    this.setSeed(opts?.seed);
    this.upperBound = opts?.upperBound || 1000;
    this.lowerBound = opts?.lowerBound || 0;
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
    // const x = (((mz << 16) + mw) & 0xffffffff) / 0x100000000;
    // return 0.5 + x;
    return (r /= 4294967296);
  }

  getState() {
    return `${this._mw}:${this._mz}:${this._seed}`;
  }

  nRandom(count: number) {
    const list: number[] = [];
    for (let i = count; i >= 0; i--) {
      list.push(Math.floor(this.random() * this.upperBound!));
    }
    return list;
  }

  nRandomPercent(count: number) {
    const list: number[] = [];
    for (let i = count; i >= 0; i--) {
      list.push(this.random());
    }
    return list;
  }
}
