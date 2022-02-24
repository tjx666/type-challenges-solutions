/*
  2757 - PartialByKeys
  -------
  by jiangshan (@jiangshanmeta) #medium #object
  
  ### Question
  
  Implement a generic `PartialByKeys<T, K>` which takes two type argument `T` and `K`.
  
  `K` specify the set of properties of `T` that should set to be optional. When `K` is not provided, it should make all properties optional just like the normal `Partial<T>`.
  
  For example
  
  ```typescript
  interface User {
    name: string
    age: number
    address: string
  }
  
  type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }
  ```
  
  > View on GitHub: https://tsch.js.org/2757
*/

/* _____________ Your Code Here _____________ */
type Copy<T> = {
    [Key in keyof T]: T[Key];
};

type PartialByKeys<T, K extends keyof any = keyof T> = Copy<
    Omit<T, K> & {
        [Key in K & keyof T]?: T[Key];
    }
>;
/*
 这道题的需要注意几个点：
 1. 泛型 K 是可以传不是 T 的 key 的，所以这里要 extends any
 2. 
    交叉类型和 merge keys 后的类型不等，需要调 Copy 去变成 merge keys 后的形式
    换句话就是 { a: string } & { b: string } 和 { a: string, b: string } 不等，需要将后者转成前者形式
    这是 Equal 方法的实现： https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
 */

// type PartialByKeys<T, K = keyof T> = {
//     [P in keyof T as P extends K ? never : P]: T[P]
//   } & {
//     [P in keyof T as P extends K ? P : never]?: T[P]
//   } extends infer A
//   ? { [P in keyof A]: A[P] }
//   : never;

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from '@type-challenges/utils';

interface User {
    name: string;
    age: number;
    address: string;
}

interface UserPartialName {
    name?: string;
    age: number;
    address: string;
}

interface UserPartialNameAndAge {
    name?: string;
    age?: number;
    address: string;
}

type cases = [
    Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
    Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>,
    Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
    Expect<Equal<PartialByKeys<User>, Partial<User>>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2757/answer
  > View solutions: https://tsch.js.org/2757/solutions
  > More Challenges: https://tsch.js.org
*/
