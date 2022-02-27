/*
  3376 - InorderTraversal
  -------
  by jiangshan (@jiangshanmeta) #medium #object
  
  ### Question
  
  Implement the type version of binary tree inorder traversal.
  
  For example:
  
  ```typescript
  const tree1 = {
    val: 1,
    left: null,
    right: {
      val: 2,
      left: {
        val: 3,
        left: null,
        right: null,
      },
      right: null,
    },
  } as const
  
  type A = InorderTraversal<typeof tree1> // [1, 3, 2]
  ```
  
  > View on GitHub: https://tsch.js.org/3376
*/

/* _____________ Your Code Here _____________ */
interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}
// 中序遍历，指的是在遍历左子树，自身节点，右子树时，遍历自身节点的顺序
// 最简单的思路可能就是下面这样了，但是 TS 貌似有 bug，
// type InorderTraversal<T extends TreeNode | null> = T extends TreeNode
//     ? [...InorderTraversal<T['left']>, T['val'], ...InorderTraversal<T['right']>]
//     : []

type InorderTraversal<
    T extends TreeNode | null,
    NT extends TreeNode = NonNullable<T>,
> = T extends TreeNode
    ? [...InorderTraversal<NT['left']>, NT['val'], ...InorderTraversal<NT['right']>]
    : [];

// type InorderTraversal<T extends TreeNode | null> = T extends TreeNode
//     ? T['left'] extends TreeNode
//         ? [...InorderTraversal<T['left']>, T['val'], ...InorderTraversal<T['right']>]
//         : T['right'] extends TreeNode
//         ? [T['val'], ...InorderTraversal<T['right']>]
//         : [T['val']]
//     : [];

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from '@type-challenges/utils';

const tree1 = {
    val: 1,
    left: null,
    right: {
        val: 2,
        left: {
            val: 3,
            left: null,
            right: null,
        },
        right: null,
    },
} as const;

const tree2 = {
    val: 1,
    left: null,
    right: null,
} as const;

const tree3 = {
    val: 1,
    left: {
        val: 2,
        left: null,
        right: null,
    },
    right: null,
} as const;

const tree4 = {
    val: 1,
    left: null,
    right: {
        val: 2,
        left: null,
        right: null,
    },
} as const;

type cases = [
    Expect<Equal<InorderTraversal<null>, []>>,
    Expect<Equal<InorderTraversal<typeof tree1>, [1, 3, 2]>>,
    Expect<Equal<InorderTraversal<typeof tree2>, [1]>>,
    Expect<Equal<InorderTraversal<typeof tree3>, [2, 1]>>,
    Expect<Equal<InorderTraversal<typeof tree4>, [1, 2]>>,
];

type R = InorderTraversal<typeof tree3>;

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/3376/answer
    > View solutions: https://tsch.js.org/3376/solutions
    > More Challenges: https://tsch.js.org
  */
