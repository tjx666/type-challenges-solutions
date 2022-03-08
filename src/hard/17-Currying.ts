/*
  17 - Currying 1
  -------
  by Anthony Fu (@antfu) #hard #array
  
  ### Question
  
  > TypeScript 4.0 is recommended in this challenge
  
  [Currying](https://en.wikipedia.org/wiki/Currying) is the technique of converting a function that takes multiple arguments into a sequence of functions that each take a single argument. 
  
  For example:
  
  ```ts
  const add = (a: number, b: number) => a + b
  const three = add(1, 2)
  
  const curriedAdd = Currying(add)
  const five = curriedAdd(2)(3)
  ```
  
  The function passed to `Currying` may have multiple arguments, you need to correctly type it.
  
  In this challenge, the curried function only accept one argument at a time. Once all the argument is assigned, it should return its result.
  
  > View on GitHub: https://tsch.js.org/17
*/

/* _____________ Your Code Here _____________ */
// 这种方式有个问题就是参数个数不能大于等于 10000，不过递归能递归 10000 层 ?
// type Curried<F, I extends ReadonlyArray<unknown>> = F extends (...args: infer Args) => infer R
//     ? I['length'] extends Args['length']
//         ? R
//         : (firstArg: Args[I['length']]) => Curried<F, [...I, unknown]>
//     : never;

// 这道题有一个坑就是 Curried 的泛型参数不能加泛型约束，这样写返回值如果是 true 会被推断成 boolean
// 例如写成 F extends (...args: any[]) => any
type Curried<F> = F extends (...args: infer A) => infer R
    ? A extends [infer First, ...infer Rest]
        ? (arg: First) => Curried<(...args: Rest) => R>
        : ReturnType<F>
    : never;
declare function Currying<F>(fn: F): Curried<F>;

// type Curry<P, R> = P extends [infer K, ...infer O] ? (a: K) => Curry<O, R> : R;
// declare function Currying<P extends any[], R>(fn: (...args: P) => R): Curry<P, R>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

const curried1 = Currying((a: string, b: number, c: boolean) => true);
const curried2 = Currying(
    (a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true,
);
type cases = [
    Expect<Equal<typeof curried1, (a: string) => (b: number) => (c: boolean) => true>>,
    Expect<
        Equal<
            typeof curried2,
            (
                a: string,
            ) => (
                b: number,
            ) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
        >
    >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/17/answer
  > View solutions: https://tsch.js.org/17/solutions
  > More Challenges: https://tsch.js.org
*/
