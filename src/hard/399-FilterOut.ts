/*
  399 - Tuple Filter
  -------
  by Ryo Hanafusa (@softoika) #hard #tuple #infer
  
  ### Question
  
  Implement a type `FilterOut<T, F>` that filters out items of the given type `F` from the tuple `T`.
  
  For example,
  ```ts
  type Filtered = FilterOut<[1, 2, null, 3], null> // [1, 2, 3]
  ```
  
  > View on GitHub: https://tsch.js.org/399
*/

/* _____________ Your Code Here _____________ */

// 循环版，虽然这种实现是用了递归，但是本质只是使用递归达到循环目的
// type FilterOut<T extends any[], F, Arr extends any[] = []> = T extends [infer First, ...infer Rest]
//     ? [First] extends [F]
//         ? FilterOut<Rest, F, Arr>
//         : FilterOut<Rest, F, [...Arr, First]>
//     : Arr;

// 递归版
type FilterOut<T extends any[], F> = T extends [infer First, ...infer Rest]
    ? [First] extends [F]
        ? [...FilterOut<Rest, F>]
        : [First, ...FilterOut<Rest, F>]
    : [];

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<FilterOut<[], never>, []>>,
    Expect<Equal<FilterOut<[never], never>, []>>,
    Expect<Equal<FilterOut<['a', never], never>, ['a']>>,
    Expect<Equal<FilterOut<[1, never, 'a'], never>, [1, 'a']>>,
    Expect<
        Equal<
            FilterOut<[never, 1, 'a', undefined, false, null], never | null | undefined>,
            [1, 'a', false]
        >
    >,
    Expect<
        Equal<
            FilterOut<[number | null | undefined, never], never | null | undefined>,
            [number | null | undefined]
        >
    >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/399/answer
  > View solutions: https://tsch.js.org/399/solutions
  > More Challenges: https://tsch.js.org
*/
