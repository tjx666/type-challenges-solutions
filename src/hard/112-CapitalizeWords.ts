/*
  112 - Capitalize Words
  -------
  by Anthony Fu (@antfu) #hard #template-literal
  
  ### Question
  
  Implement `CapitalizeWords<T>` which converts the first letter of **each word of a string** to uppercase and leaves the rest as-is.
  
  For example
  
  ```ts
  type capitalized = CapitalizeWords<'hello world, my friends'> // expected to be 'Hello World, My Friends'
  ```
  
  > View on GitHub: https://tsch.js.org/112
*/

/* _____________ Your Code Here _____________ */
type Separators = ' ' | ',' | '.';
type FirstSeparator<S> = S extends `${infer First}${infer Left}`
    ? First extends Separators
        ? First
        : FirstSeparator<Left>
    : never;

type CapitalizeWords<S extends string, Sep extends Separators = FirstSeparator<S>> = [Sep] extends [
    never,
]
    ? Capitalize<S>
    : S extends `${infer Left}${Sep}${infer Right}`
    ? `${Capitalize<Left>}${Sep}${CapitalizeWords<Right>}`
    : never;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
    Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
    Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
    Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
    Expect<Equal<CapitalizeWords<'foo bar.hello,world'>, 'Foo Bar.Hello,World'>>,
    Expect<Equal<CapitalizeWords<''>, ''>>,
];

type R = FirstSeparator<'foo bar.hello,world'>;

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/112/answer
  > View solutions: https://tsch.js.org/112/solutions
  > More Challenges: https://tsch.js.org
*/
