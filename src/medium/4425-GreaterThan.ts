/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #medium #array
  
  ### Question
  
  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`
  
  Negative numbers do not need to be considered.
  
  For example
  
  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  ```
  
  Good Luck!
  
  > View on GitHub: https://tsch.js.org/4425
*/

/* _____________ Your Code Here _____________ */
type Number2ZeroString<
    N extends number,
    S extends string = '',
    L extends 0[] = [],
> = L['length'] extends N ? S : Number2ZeroString<N, `${S}0`, [...L, 0]>;

type GreaterThan<
    T extends number,
    U extends number,
> = Number2ZeroString<T> extends `${Number2ZeroString<U>}${infer R}`
    ? R extends ''
        ? false
        : true
    : false;
/*
将数字转换成对应数量的全为 0 的字符串，例如 5 转换成 ‘00000’
越大的数字 0 越多，并且短的是长的前缀
 */

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<GreaterThan<1, 0>, true>>,
    Expect<Equal<GreaterThan<5, 4>, true>>,
    Expect<Equal<GreaterThan<4, 5>, false>>,
    Expect<Equal<GreaterThan<0, 0>, false>>,
    Expect<Equal<GreaterThan<20, 20>, false>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4425/answer
  > View solutions: https://tsch.js.org/4425/solutions
  > More Challenges: https://tsch.js.org
*/
