/*
  1367 - Remove Index Signature
  -------
  by hiroya iizuka (@hiroyaiizuka) #medium 
  
  ### Question
  
  Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.
  
  For example:
  
  ```
  
  type Foo = {
    [key: string]: any;
    foo(): void;
  }
  
  type A = RemoveIndexSignature<Foo>  // expected { foo(): void }
  
  ```
  
  > View on GitHub: https://tsch.js.org/1367
*/

/* _____________ Your Code Here _____________ */

type FilteredKeys<K> = string extends K
    ? never
    : number extends K
    ? never
    : symbol extends K
    ? never
    : K;

type RemoveIndexSignature<T> = {
    [K in keyof T as FilteredKeys<K>]: T[K];
};
/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type Foo = {
    [key: string]: any;
    foo(): void;
};

type Bar = {
    [key: number]: any;
    bar(): void;
};

type Baz = {
    bar(): void;
    baz: string;
};

type cases = [
    Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
    Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void }>>,
    Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
];

type Result = RemoveIndexSignature<Foo>;

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1367/answer
  > View solutions: https://tsch.js.org/1367/solutions
  > More Challenges: https://tsch.js.org
*/
