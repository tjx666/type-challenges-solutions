/*
  4518 - Fill
  -------
  by キリサメ qianxi (@qianxi0410) #medium #tuple
  
  ### Question
  
  `Fill`, a common JavaScript function, now let us implement it with types.
  `Fill<T, N, Start?, End?>`, as you can see,`Fill` accepts four types of parameters, of which `T` and `N` are required parameters, and `Start` and `End` are optional parameters.
  The requirements for these parameters are: `T` must be a `tuple`, `N` can be any type of value, `Start` and `End` must be integers greater than or equal to 0.
  
  ```ts
  type exp = Fill<[1, 2, 3], 0> // expected to be [0, 0, 0]
  ```
  In order to simulate the real function, the test may contain some boundary conditions, I hope you can enjoy it :)
  
  > View on GitHub: https://tsch.js.org/4518
*/

/* _____________ Your Code Here _____________ */

// 解法一：
// type Number2ZeroString<
//     N extends number,
//     S extends string = '',
//     L extends 0[] = [],
// > = L['length'] extends N ? S : Number2ZeroString<N, `${S}0`, [...L, 0]>;

// type GreaterThan<
//     T extends number,
//     U extends number,
// > = Number2ZeroString<T> extends `${Number2ZeroString<U>}${infer R}`
//     ? R extends ''
//         ? false
//         : true
//     : false;

// type GreaterEqualsThan<
//     T extends number,
//     U extends number,
// > = Number2ZeroString<T> extends `${Number2ZeroString<U>}${infer R}` ? true : false;

// type CheckRange<Len extends number, Start extends number, End extends number> = GreaterThan<
//     Len,
//     Start
// > extends true
//     ? GreaterEqualsThan<End, Start> extends true
//         ? true
//         : false
//     : false;

// type CheckFillRange<
//     Index extends number,
//     Start extends number,
//     End extends number,
// > = GreaterEqualsThan<Index, Start> extends true
//     ? GreaterThan<End, Index> extends true
//         ? true
//         : false
//     : false;

// type Fill<
//     T extends unknown[],
//     N,
//     Start extends number = 0,
//     End extends number = T['length'],
//     ResultArray extends ReadonlyArray<unknown> = [],
// > = CheckRange<T['length'], Start, End> extends false
//     ? T
//     : ResultArray['length'] extends T['length']
//     ? ResultArray
//     : CheckFillRange<ResultArray['length'], Start, End> extends true
//     ? Fill<T, N, Start, End, [...ResultArray, N]>
//     : Fill<T, N, Start, End, [...ResultArray, T[ResultArray['length']]]>;

type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  L extends any[] = [],
> = T extends [infer H, ...infer R]
  ? [...L, 0][Start] extends undefined
    ? Fill<R, N, Start, End, [...L, H]>
    : [...L, 0][End] extends undefined
      ? Fill<R, N, Start, End, [...L, N]>
      : Fill<R, N, Start, End, [...L, H]>
  : L

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<Fill<[], 0>, []>>,
    Expect<Equal<Fill<[], 0, 0, 3>, []>>,
    Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
    Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
    Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
    Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
    Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
    Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
    Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
    Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>,
];

// type R1 = Fill<[1, 2, 3], true, 1, 3>;
// type R2 = Fill<[1, 2, 3], true, 0, 10>;
// type R2 = Fill<[1, 2, 3], true, 10, 0>;
// type R3 = GreaterThan<1, 1>;
// type R4 = Fill<[1, 2, 3], 0, 0, 0>;

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4518/answer
  > View solutions: https://tsch.js.org/4518/solutions
  > More Challenges: https://tsch.js.org
*/
