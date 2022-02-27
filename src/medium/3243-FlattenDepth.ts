/*
  3243 - FlattenDepth
  -------
  by jiangshan (@jiangshanmeta) #medium #array
  
  ### Question
  
  Recursively flatten array up to depth times.
  
  For example:
  
  ```typescript
  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
  ```
  
  If the depth is provided, it's guaranteed to be positive integer.
  
  > View on GitHub: https://tsch.js.org/3243
*/

/* _____________ Your Code Here _____________ */

// 拍平一层
type FlatArray<T extends ReadonlyArray<unknown>> = T extends [infer First, ...infer Rest]
    ? First extends ReadonlyArray<unknown>
        ? [...First, ...FlatArray<Rest>]
        : [First, ...FlatArray<Rest>]
    : T;

type FlattenDepth<
    T extends ReadonlyArray<unknown>,
    Amount = 1,
    FlattedCount extends ReadonlyArray<unknown> = [],
    FlattedT extends ReadonlyArray<unknown> = FlatArray<T>,
> = FlattedCount['length'] extends Amount
    ? T
    : FlattedT extends T
    ? T
    : FlattenDepth<FlattedT, Amount, [...FlattedCount, unknown]>;

type R = FlattenDepth<[]>;
/*
这道题不要用 MinusOne 来递减循环，因为 MinusOne 最大 支持到 9999
整体思路就是对整个数组不断 flat 一层，两种情况下停止循环：
1. 到了最大循环次数
2. flat 后结果和没 flat 一样，说明已经全部打平了
 */

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from '@type-challenges/utils';

type cases = [
    Expect<Equal<FlattenDepth<[]>, []>>,
    Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
    Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
    Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
    Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
    Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
    Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3243/answer
  > View solutions: https://tsch.js.org/3243/solutions
  > More Challenges: https://tsch.js.org
*/
