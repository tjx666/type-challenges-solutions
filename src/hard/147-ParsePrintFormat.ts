/*
  147 - C-printf Parser
  -------
  by Pig Fang (@g-plane) #hard #template-literal
  
  ### Question
  
  There is a function in C language: `printf`. This function allows us to print something with formatting. Like this:
  
  ```c
  printf("The result is %d.", 42);
  ```
  
  This challenge requires you to parse the input string and extract the format placeholders like `%d` and `%f`. For example, if the input string is `"The result is %d."`, the parsed result is a tuple `['dec']`.
  
  Here is the mapping:
  
  ```typescript
  type ControlsMap = {
    c: 'char',
    s: 'string',
    d: 'dec',
    o: 'oct',
    h: 'hex',
    f: 'float',
    p: 'pointer',
  }
  ```
  
  > View on GitHub: https://tsch.js.org/147
*/

/* _____________ Your Code Here _____________ */

type ControlsMap = {
    c: 'char';
    s: 'string';
    d: 'dec';
    o: 'oct';
    h: 'hex';
    f: 'float';
    p: 'pointer';
};

type TrimBeforePercent<S extends string> = S extends `${infer First}${infer Rest}`
    ? S extends `%${Rest}`
        ? S
        : TrimBeforePercent<Rest>
    : '';

type GetSecondChar<S extends string> = S extends `${infer First}${infer Second}${infer Rest}`
    ? Second
    : S extends `${infer First}${infer Second}`
    ? Second
    : '';

type ParsePrintFormat<
    S extends string,
    R extends string[] = [],
    SS = TrimBeforePercent<S>,
> = SS extends `%${infer Second}${infer Rest}`
    ? GetSecondChar<SS> extends keyof ControlsMap
        ? ParsePrintFormat<Rest, [...R, ControlsMap[GetSecondChar<SS>]]>
        : ParsePrintFormat<Rest, R>
    : R;

type SS = TrimBeforePercent<'The result is %d.'>;
type R = ParsePrintFormat<'The result is %%d.'>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<ParsePrintFormat<''>, []>>,
    Expect<Equal<ParsePrintFormat<'Any string.'>, []>>,
    Expect<Equal<ParsePrintFormat<'The result is %d.'>, ['dec']>>,
    Expect<Equal<ParsePrintFormat<'The result is %%d.'>, []>>,
    Expect<Equal<ParsePrintFormat<'The result is %%%d.'>, ['dec']>>,
    Expect<Equal<ParsePrintFormat<'The result is %f.'>, ['float']>>,
    Expect<Equal<ParsePrintFormat<'The result is %h.'>, ['hex']>>,
    Expect<Equal<ParsePrintFormat<'The result is %q.'>, []>>,
    Expect<Equal<ParsePrintFormat<'Hello %s: score is %d.'>, ['string', 'dec']>>,
    Expect<Equal<ParsePrintFormat<'The result is %'>, []>>,
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/147/answer
    > View solutions: https://tsch.js.org/147/solutions
    > More Challenges: https://tsch.js.org
  */
