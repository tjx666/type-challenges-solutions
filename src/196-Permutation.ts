/*
  296 - Permutation
  -------
  by Naoto Ikuno (@pandanoir) #medium #union
  
  ### Question
  
  Implement permutation type that transforms union types into the array that includes permutations of unions.
  
  ```typescript
  type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
  ```
  
  > View on GitHub: https://tsch.js.org/296
*/

/* _____________ Your Code Here _____________ */
// https://github.com/type-challenges/type-challenges/issues/614
type Permutation<T, U = T> = [T] extends [never]
    ? []
    : T extends U
    ? [T, ...Permutation<Exclude<U, T>>]
    : [];

type Union = ['a', 'b', 'c'] | ['d', 'e', 'f'];
type A = [...Union]; // => ["a", "b", "c"] | ["d", "e", "f"]

type N<T> = T extends never ? true : false;
// never 默认是空 Union 类型
type Result = N<never>; // 返回 never 而不是 true

// 可以使用 [T] 或 T[] 来明确将 never 当做一个独立的类型使用
type NN<T> = [T] extends [never] ? true : false;
type Result1 = NN<never>; // true

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<Permutation<'A'>, ['A']>>,
    Expect<
        Equal<
            Permutation<'A' | 'B' | 'C'>,
            | ['A', 'B', 'C']
            | ['A', 'C', 'B']
            | ['B', 'A', 'C']
            | ['B', 'C', 'A']
            | ['C', 'A', 'B']
            | ['C', 'B', 'A']
        >
    >,
    Expect<
        Equal<
            Permutation<'B' | 'A' | 'C'>,
            | ['A', 'B', 'C']
            | ['A', 'C', 'B']
            | ['B', 'A', 'C']
            | ['B', 'C', 'A']
            | ['C', 'A', 'B']
            | ['C', 'B', 'A']
        >
    >,
    Expect<Equal<Permutation<never>, []>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/296/answer
  > View solutions: https://tsch.js.org/296/solutions
  > More Challenges: https://tsch.js.org
*/
