/*
  1383 - Camelize
  -------
  by Denis (@denchiklut) #hard #union #recursion
  
  ### Question
  
  Implement Camelize which converts object from snake_case to to camelCase
  
  ```ts
  Camelize<{
    some_prop: string, 
    prop: { another_prop: string },
    array: [{ snake_case: string }]
  }>
  
  // expected to be
  // {
  //   someProp: string, 
  //   prop: { anotherProp: string },
  //   array: [{ snakeCase: string }]
  // }
  ```
  
  > View on GitHub: https://tsch.js.org/1383
*/

type LetterCaseMapping = {
    a: 'A';
    b: 'B';
    c: 'C';
    d: 'D';
    e: 'E';
    f: 'F';
    g: 'G';
    h: 'H';
    i: 'I';
    j: 'J';
    k: 'K';
    l: 'L';
    m: 'M';
    n: 'N';
    o: 'O';
    p: 'P';
    q: 'Q';
    r: 'R';
    s: 'S';
    t: 'T';
    u: 'U';
    v: 'V';
    w: 'W';
    x: 'X';
    y: 'Y';
    z: 'Z';
};

/* _____________ Your Code Here _____________ */

/**
 * 思路：
 * 1. 首先需要能够实现下划线单词转驼峰
 * 2. 将对象的 key 通过 as 或者再定义额外映射为驼峰
 * 3. 对于值需要递归 Camelize
 * 
 * 关键知识：
 * 1. 使用 as 可以映射 key 或者通过返回 never 过滤 key，并且声明值的 key 是映射前的
 * 2. 数组也可以使用 { [I in keyof T]} 来遍历 key
 * 3. 可以使用 extends object 判断是否是基本类型， object 表示非基本类型
 */


type Snake2Camel<S extends string> = S extends `${infer First}${infer Second}${infer Rest}`
    ? First extends '_'
        ? Snake2Camel<`${Uppercase<Second>}${Rest}`>
        : `${First}${Snake2Camel<`${Second}${Rest}`>}`
    : S;

type Camelize<T> = T extends object
    ? T extends any[]
        ? {
              [I in keyof T]: Camelize<T[I]>;
          }
        : {
              [P in keyof T as P extends string ? Snake2Camel<P> : never]: Camelize<T[P]>;
          }
    : T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<
        Equal<
            Camelize<{
                some_prop: string;
                prop: { another_prop: string };
                array: [{ snake_case: string }];
            }>,
            {
                someProp: string;
                prop: { anotherProp: string };
                array: [{ snakeCase: string }];
            }
        >
    >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1383/answer
  > View solutions: https://tsch.js.org/1383/solutions
  > More Challenges: https://tsch.js.org
*/
