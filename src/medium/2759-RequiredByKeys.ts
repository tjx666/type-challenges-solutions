/*
  2759 - RequiredByKeys
  -------
  by jiangshan (@jiangshanmeta) #medium #object
  
  ### Question
  
  Implement a generic `RequiredByKeys<T,  K>` which takes two type argument `T` and `K`.
  
  `K` specify the set of properties of `T` that should set to be required. When `K` is not provided, it should make all properties required just like the normal `Required<T>`.
  
  For example
  
  ```typescript
  interface User {
    name?: string
    age?: number
    address?: string
  }
  
  type UserPartialName = RequiredByKeys<User, 'name'> // { name: string; age?: number; address?: string }
  
  ```
  
  > View on GitHub: https://tsch.js.org/2759
*/

/* _____________ Your Code Here _____________ */
type RequiredByKeys<T, K extends keyof any = keyof T> = {
    [P in keyof T as P extends K ? never : P]: T[P];
} & {
    [P in K & keyof T]-?: Exclude<T[P], undefined>;
} extends infer A
    ? { [P in keyof A]: A[P] }
    : never;

/*
先做 2757 题
想比 2757 题，这道题还需要解决如何将一个类型去掉 undefined，可以利用 infer
 */

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from '@type-challenges/utils';

interface User {
    name?: string;
    age?: number;
    address?: string;
}

interface UserRequiredName {
    name: string;
    age?: number;
    address?: string;
}

interface UserRequiredNameAndAge {
    name: string;
    age: number;
    address?: string;
}

type cases = [
    Expect<Equal<RequiredByKeys<User, 'name'>, UserRequiredName>>,
    Expect<Equal<RequiredByKeys<User, 'name' | 'unknown'>, UserRequiredName>>,
    Expect<Equal<RequiredByKeys<User, 'name' | 'age'>, UserRequiredNameAndAge>>,
    Expect<Equal<RequiredByKeys<User>, Required<User>>>,
];

type Result = RequiredByKeys<User, 'name'>;

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2759/answer
  > View solutions: https://tsch.js.org/2759/solutions
  > More Challenges: https://tsch.js.org
*/
