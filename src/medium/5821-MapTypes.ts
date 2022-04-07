/*
  5821 - MapTypes
  -------
  by Krzysztof "Wokay" Łokaj (@wokayme) #medium #map #object #utils
  
  ### Question
  
  Implement `MapTypes<T, R>` which will transform types in object T to different types defined by type R which has the following structure
  
  ```ts
  type StringToNumber = {
    mapFrom: string; // value of key which value is string
    mapTo: number; // will be transformed for number
  }
  ```
  
  ## Examples:
  
  ```ts
  type StringToNumber = { mapFrom: string; mapTo: number;}
  MapTypes<{iWillBeANumberOneDay: string}, StringToNumber> // gives { iWillBeANumberOneDay: number; }
  ```
  
  Be aware that user can provide a union of types:
  ```ts
  type StringToNumber = { mapFrom: string; mapTo: number;}
  type StringToDate = { mapFrom: string; mapTo: Date;}
  MapTypes<{iWillBeNumberOrDate: string}, StringToDate | StringToNumber> // gives { iWillBeNumberOrDate: number | Date; }
  ```
  
  If the type doesn't exist in our map, leave it as it was:
  ```ts
  type StringToNumber = { mapFrom: string; mapTo: number;}
  MapTypes<{iWillBeANumberOneDay: string, iWillStayTheSame: Function}, StringToNumber> // // gives { iWillBeANumberOneDay: number, iWillStayTheSame: Function }
  ```
  
  > View on GitHub: https://tsch.js.org/5821
*/

/* _____________ Your Code Here _____________ */
type MapObject = {
    mapFrom: unknown;
    mapTo: unknown;
};

type Helper<T, A> = [T] extends [never] ? A : T;

type MapTypes<T, R extends MapObject> = {
    [K in keyof T]: Helper<
        R extends MapObject ? (R['mapFrom'] extends T[K] ? R['mapTo'] : never) : never,
        T[K]
    >;
};

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<
        Equal<
            MapTypes<{ stringToArray: string }, { mapFrom: string; mapTo: [] }>,
            { stringToArray: [] }
        >
    >,
    Expect<
        Equal<
            MapTypes<{ stringToNumber: string }, { mapFrom: string; mapTo: number }>,
            { stringToNumber: number }
        >
    >,
    Expect<
        Equal<
            MapTypes<
                { stringToNumber: string; skipParsingMe: boolean },
                { mapFrom: string; mapTo: number }
            >,
            { stringToNumber: number; skipParsingMe: boolean }
        >
    >,
    Expect<
        Equal<
            MapTypes<
                { date: string },
                { mapFrom: string; mapTo: Date } | { mapFrom: string; mapTo: null }
            >,
            { date: null | Date }
        >
    >,
    Expect<
        Equal<
            MapTypes<{ date: string }, { mapFrom: string; mapTo: Date | null }>,
            { date: null | Date }
        >
    >,
    Expect<
        Equal<
            MapTypes<
                { fields: Record<string, boolean> },
                { mapFrom: Record<string, boolean>; mapTo: string[] }
            >,
            { fields: string[] }
        >
    >,
    Expect<Equal<MapTypes<{ name: string }, { mapFrom: boolean; mapTo: never }>, { name: string }>>,
    Expect<
        Equal<
            MapTypes<
                { name: string; date: Date },
                { mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string }
            >,
            { name: boolean; date: string }
        >
    >,
];

type R = MapTypes<
    { name: string; date: Date },
    { mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string }
>;
type A = { mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string };
type R1 = A['mapFrom'];
/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5821/answer
  > View solutions: https://tsch.js.org/5821/solutions
  > More Challenges: https://tsch.js.org
*/