/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math
  
  ### Question
  
  Given a number (always positive) as a type. Your type should return the number decreased by one.
  
  For example:
  
  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```
  
  > View on GitHub: https://tsch.js.org/2257
*/

/* _____________ Your Code Here _____________ */

// your answers
type DigitToArray = {
    '0': [];
    '1': [unknown];
    '2': [unknown, unknown];
    '3': [unknown, unknown, unknown];
    '4': [unknown, unknown, unknown, unknown];
    '5': [unknown, unknown, unknown, unknown, unknown];
    '6': [unknown, unknown, unknown, unknown, unknown, unknown];
    '7': [unknown, unknown, unknown, unknown, unknown, unknown, unknown];
    '8': [unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown];
    '9': [unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown];
};
type CreateArrayByLength<
    N extends string,
    R extends unknown[] = [],
> = N extends `${infer First}${infer Rest}`
    ? First extends keyof DigitToArray
        ? CreateArrayByLength<
              Rest,
              [...R, ...R, ...R, ...R, ...R, ...R, ...R, ...R, ...R, ...R, ...DigitToArray[First]]
          >
        : never
    : R;
type MinusOne<T extends number> = CreateArrayByLength<`${T}`> extends [infer First, ...infer Rest]
    ? Rest['length']
    : never;

/*
抄自：https://github.com/type-challenges/type-challenges/issues/5547

思路：例如 MinusOne<120>

最开始的想法应该就是想 TS 里有没有啥方法可以直接得到 120 - 1 的结果
暂时没想到，但是我们却可以想办法得到长度为 120 - 1 的数组，再取它的 length

1. 先构造长度为 120 的数组
2. 使用数组解构，来获取长度 120 - 1 的数组
3. 步骤 2 数组的 length 就是要求的结果

如果根据一个给定的数字字符串，返回对应大小的数组
核心思路还是进位 x10 + 当前位，也就下面这段：
[...R, ...R, ...R, ...R, ...R, ...R, ...R, ...R, ...R, ...R, ...DigitToArray[First]]
直接解构了 10 次 R 来表示 x10
 */

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<MinusOne<1>, 0>>,
    Expect<Equal<MinusOne<55>, 54>>,
    Expect<Equal<MinusOne<3>, 2>>,
    Expect<Equal<MinusOne<100>, 99>>,
    Expect<Equal<MinusOne<1101>, 1100>>,
];

type Result = CreateArrayByLength<'2'>;

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2257/answer
  > View solutions: https://tsch.js.org/2257/solutions
  > More Challenges: https://tsch.js.org
*/
