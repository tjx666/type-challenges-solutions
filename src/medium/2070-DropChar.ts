/*
  2070 - Drop Char
  -------
  by CaptainOfPhB (@CaptainOfPhB) #medium #template-literal #infer
  
  ### Question
  
  Drop a specified char from a string.
  
  For example:
  
  ```ts
  type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
  ```
  
  > View on GitHub: https://tsch.js.org/2070
*/

/* _____________ Your Code Here _____________ */
type DropChar<S extends string, C extends string> = S extends `${infer First}${infer Rest}`
    ? First extends C
        ? `${DropChar<Rest, C>}`
        : `${First}${DropChar<Rest, C>}`
    : S;

/*
思路：
考察知识点：
1. 模板字符串类型
2. 递归
3. 条件类型

核心思路还是递归去除去 C
*/

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type cases = [
    // @ts-expect-error
    Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
    Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
    Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
    Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
    Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
    Expect<Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
    Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
];

type Result1 = DropChar<'butter fly!', ' '>;
type Result2 = DropChar<' ', ' '>;

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2070/answer
  > View solutions: https://tsch.js.org/2070/solutions
  > More Challenges: https://tsch.js.org
*/
