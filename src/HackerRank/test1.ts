export default {};
//
// // function solution1(A: number[]): number {
// //   const set = new Set(A);
// //   let start = 1;
// //
// //   while (set.has(start)) {
// //     start++;
// //   }
// //   return start;
// //   // Implement your solution here
// // }
// //
// // console.log(solution1([1, 2, 3]));
//
function solution1(A: number[]): number {
  // Implement your solution here
  const sums = new Map<number, number[]>();

  for (let i = 0; i < A.length - 1; i++) {
    const sum = A[i] + A[i + 1];
    sums.has(sum) ? sums.get(sum)!?.push(i) : sums.set(sum, [i]);
  }

  let maxCount = 0;
  for (const value of sums.values()) {
    let count = 0;
    let prevIndex = -2;

    for (const index of value) {
      if (index - prevIndex > 1) {
        count++;
        prevIndex = index;
      }
    }

    maxCount = Math.max(maxCount, count);
  }

  return maxCount;
}

// console.log(solution1([10, 1, 3, 1, 2, 2, 1, 0, 4]));
//
// interface Tree {
//   x: number;
//   l: Tree | null;
//   r: Tree | null;
// }
//
// function solution(T: Tree): number {
//   const result = new Set<number>();
//
//   const dfs = (node: Tree | null, nums: number[]) => {
//     if (!node) return;
//
//     const newNums = nums.concat(node.x);
//
//     if (newNums.length === 3) {
//       const num = parseInt(newNums.map((n) => n.toString()).join(''), 10);
//       console.log('num', num);
//       result.add(num);
//       newNums.shift();
//     }
//
//     dfs(node.l, newNums);
//     dfs(node.r, newNums);
//   };
//
//   // dfs(T, []);
//
//   // const dfs = (node: Tree | null, nums: number[]) => {
//   //   if (!node) return;
//   //
//   //   nums.push(node.x);
//   //
//   //   if (nums.length === 3) {
//   //     const num = parseInt(nums.join(''), 10);
//   //     console.log(num);
//   //     result.add(num);
//   //     nums.shift();
//   //   }
//   //
//   //   dfs(node.l, nums);
//   //   dfs(node.r, nums);
//   // };
//
//   dfs(T, []);
//   return result.size;
// }
//
// // (1, (2, (5, (3, None, None), None), (9, None, None)), (7, (4, None, None), None))
//
// // Example usage
// // const tree: Tree = {
// //   x: 1,
// //   l: {
// //     x: 2,
// //     l: {
// //       x: 5,
// //       l: {
// //         x: 3,
// //         l: null,
// //         r: null,
// //       },
// //       r: null,
// //     },
// //     r: {
// //       x: 9,
// //       l: null,
// //       r: null,
// //     },
// //   },
// //   r: {
// //     x: 7,
// //     l: {
// //       x: 4,
// //       l: null,
// //       r: null,
// //     },
// //     r: null,
// //   },
// // };
//
// // (1, (2, (5, (3, None, None), None), (9, None, None)), (7, (4, None, None), None))
//
// const tree2: Tree = {
//   x: 1,
//   l: {
//     x: 2,
//     l: {
//       x: 5,
//       l: {
//         x: 3,
//         l: null,
//         r: null,
//       },
//       r: null,
//     },
//     r: {
//       x: 9,
//       l: null,
//       r: null,
//     },
//   },
//   r: {
//     x: 7,
//     l: {
//       x: 4,
//       l: null,
//       r: null,
//     },
//     r: null,
//   },
// };
//
// console.log(solution(tree2)); // Output: 5 (123, 125, 129, 127, 157)

// console.log(solution(9, [5, 3, 8, 1, 8, 7, 7, 6])); // Output: 5
// 7, [7, 6, 5, 2, 7, 4, 5, 4]
// 1 2 5 6 7
// 7 6 7 4 5
// 9, [5, 3, 8, 1, 8, 7, 7, 6]

function solution(U: number, weight: number[]): number {
  const n = weight.length;
  const dp: number[] = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    const currentWeight = weight[i];
    let maxIndex = 0;

    if (currentWeight <= U) maxIndex = 1;

    for (let j = 0; j < i; j++) {
      if (dp[j] > 0) {
        const prevCarWeight = weight[j];
        if (prevCarWeight + currentWeight <= U) {
          maxIndex = Math.max(maxIndex, dp[j] + 1);
        }
      }
    }

    dp[i] = maxIndex;
  }

  let maxLen = 0;

  for (let k = 0; k < n; k++) {
    maxLen = Math.max(maxLen, dp[k]);
  }

  return n - maxLen;
}

function solution2(U: number, weight: number[]): number {
  const n = weight.length;
  const dp = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    const currentW = weight[i];
    let maxCount = currentW <= U ? 1 : 0;

    for (let j = 0; j < i; j++) {
      // 다리를 건넌 유무
      if (dp[j] > 0) {
        const prevW = weight[j];
        if (currentW + prevW <= U) {
          maxCount = Math.max(maxCount, dp[j] + 1);
        }
      }
    }

    dp[i] = maxCount;
  }

  console.log(dp);

  return n - Math.max(...dp);
}

// 예제 테스트
// 예제 1: U = 9, weight = [5, 3, 8, 1, 8, 7, 7, 6], N = 8
console.log(solution2(9, [5, 3, 8, 1, 8, 7, 7, 6]));

// 예제 2: U = 7, weight = [7, 6, 5, 2, 7, 4, 5, 4], N = 8ㄴ
console.log(solution2(7, [7, 6, 5, 2, 7, 4, 5, 4]));

// 9, [5, 3, 8, 1, 8, 7, 7, 6]
// console.log(solution(9, [5, 3, 8, 1, 8, 7, 7, 6]));
// console.log(solution(7, [7, 6, 5, 2, 7, 4, 5, 4]));

console.log(11 % 3);
