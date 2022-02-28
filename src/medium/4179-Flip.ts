/*
  4179 - Flip
  -------
  by Farhan Kathawala (@kathawala) #medium #object
  
  ### Question
  
  Implement the type of `just-flip-object`. Examples:
  
  ```typescript
  Flip<{ a: "x", b: "y", c: "z" }>; // {x: 'a', y: 'b', z: 'c'}
  Flip<{ a: 1, b: 2, c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
  flip<{ a: false, b: true }>; // {false: 'a', true: 'b'}
  ```
  
  No need to support nested objects and values which cannot be object keys such as arrays
  
  > View on GitHub: https://tsch.js.org/4179
*/

/* _____________ Your Code Here _____________ */

// type TransformToValidKey<T, K extends keyof T> =
//     T[K] extends string
//         ? T[K] extends boolean ?
//         : never;

type Flip<T> = {
    [K in keyof T as T[K] extends string
        ? T[K]
        : T[K] extends boolean | number
        ? `${T[K]}`
        : never]: K;
};
// 思路：善用 as 过滤 K 或者转换成其它类型

/* _____________ Test Cases _____________ */
import { Equal, Expect, NotEqual } from '@type-challenges/utils';

type cases = [
    Expect<Equal<{ a: 'pi' }, Flip<{ pi: 'a' }>>>,
    Expect<NotEqual<{ b: 'pi' }, Flip<{ pi: 'a' }>>>,
    Expect<Equal<{ 3.14: 'pi'; true: 'bool' }, Flip<{ pi: 3.14; bool: true }>>>,
    Expect<Equal<{ val2: 'prop2'; val: 'prop' }, Flip<{ prop: 'val'; prop2: 'val2' }>>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4179/answer
  > View solutions: https://tsch.js.org/4179/solutions
  > More Challenges: https://tsch.js.org
*/
