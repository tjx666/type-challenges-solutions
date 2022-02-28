/*
  4182 - Fibonacci Sequence
  -------
  by windliang (@wind-liang) #medium 
  
  ### Question
  
  Implement a generic Fibonacci\<T\> takes an number T and returns it's corresponding [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).
  
  The sequence starts:
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...
  
  For example
  ```ts
  type Result1 = Fibonacci<3> // 2
  type Result2 = Fibonacci<8> // 21
  ```
  
  > View on GitHub: https://tsch.js.org/4182
*/

/* _____________ Your Code Here _____________ */
// 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144
// 思路：自底向上
type Fibonacci<
    T extends number,
    // 表示循环下标
    TArray extends ReadonlyArray<unknown> = [unknown, unknown, unknown],
    // 表示前一个的前一个的值
    PrePre extends ReadonlyArray<unknown> = [unknown],
    // 表示前一个的值
    Pre extends ReadonlyArray<unknown> = [unknown],
> = T extends 1
    ? 1
    : T extends 2
    ? 1
    : T extends TArray['length']
    ? [...Pre, ...PrePre]['length']
    : Fibonacci<T, [...TArray, unknown], Pre, [...Pre, ...PrePre]>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<Fibonacci<1>, 1>>, 
    Expect<Equal<Fibonacci<2>, 1>>, 
    Expect<Equal<Fibonacci<3>, 2>>, 
    Expect<Equal<Fibonacci<8>, 21>>,
    Expect<Equal<Fibonacci<9>, 34>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4182/answer
  > View solutions: https://tsch.js.org/4182/solutions
  > More Challenges: https://tsch.js.org
*/
