/*
  545 - printf
  -------
  by null (@BestMaster-YS) #hard #template-literal
  
  ### Question
  
  Implement `Format<T extends string>` generic.
  
  For example,
  
  ```ts
  type FormatCase1 = Format<"%sabc"> // FormatCase1 : string => string
  type FormatCase2 = Format<"%s%dabc"> // FormatCase2 : string => number => string
  type FormatCase3 = Format<"sdabc"> // FormatCase3 :  string
  type FormatCase4 = Format<"sd%abc"> // FormatCase4 :  string
  ```
  
  > View on GitHub: https://tsch.js.org/545
*/

/* _____________ Your Code Here _____________ */

type ControlsMap = {
    s: string;
    d: number;
};

type ArrToFunc<Arr extends any[], Func extends any = string> = Arr extends [
    infer First,
    ...infer Rest,
]
    ? ArrToFunc<Rest, (arg: First) => Func>
    : Func;

type Format<
    S extends string,
    Arr extends any[] = [],
> = S extends `${string}%${infer F}${infer Rest}`
    ? F extends keyof ControlsMap
        // 需要逆序，因为最后生成的格式化函数是先进后出
        ? Format<Rest, [ControlsMap[F], ...Arr]>
        : Format<Rest, Arr>
    : ArrToFunc<Arr>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<Format<'abc'>, string>>,
    Expect<Equal<Format<'a%sbc'>, (s1: string) => string>>,
    Expect<Equal<Format<'a%dbc'>, (d1: number) => string>>,
    Expect<Equal<Format<'a%dbc%s'>, (d1: number) => (s1: string) => string>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/545/answer
  > View solutions: https://tsch.js.org/545/solutions
  > More Challenges: https://tsch.js.org
*/
