/*
  300 - String to Number
  -------
  by Pig Fang (@g-plane) #hard #template-literal
  
  ### Question
  
  Convert a string literal to a number, which behaves like `Number.parseInt`.
  
  > View on GitHub: https://tsch.js.org/300
*/

/* _____________ Your Code Here _____________ */

type Table = {
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

type ToNumber<
    S extends string,
    Arr extends unknown[] = [],
> = S extends `${infer First}${infer Rest}`
    ? First extends keyof Table
        ? ToNumber<
              Rest,
              [
                  ...Arr,
                  ...Arr,
                  ...Arr,
                  ...Arr,
                  ...Arr,
                  ...Arr,
                  ...Arr,
                  ...Arr,
                  ...Arr,
                  ...Arr,
                  ...Table[First],
              ]
          >
        : never
    : Arr['length'];

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<ToNumber<'0'>, 0>>,
    Expect<Equal<ToNumber<'5'>, 5>>,
    Expect<Equal<ToNumber<'12'>, 12>>,
    Expect<Equal<ToNumber<'27'>, 27>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/300/answer
  > View solutions: https://tsch.js.org/300/solutions
  > More Challenges: https://tsch.js.org
*/
