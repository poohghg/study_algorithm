export default {};

/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/76502
 * 괄호 회전하기
 */
const solution1 = (str: string) => {
  const isValid = (start: number) => {
    const stack: string[] = [];
    const openBrackets = ['(', '{', '['];

    for (let i = 0; i < str.length; i++) {
      const targetIndex = (start + i) % str.length;
      const s = str[targetIndex];

      if (openBrackets.includes(s)) {
        stack.push(s);
        continue;
      }

      if (stack.length === 0) return false;

      const top = stack[stack.length - 1];
      if (
        (s === ')' && top === '(') ||
        (s === '}' && top === '{') ||
        (s === ']' && top === '[')
      ) {
        stack.pop();
      } else {
        return false;
      }
    }

    return stack.length === 0;
  };

  let result = 0;
  for (let i = 0; i < str.length; i++) {
    if (isValid(i)) result++;
  }

  return result;
};

// console.log(solution1('[](){}'));

/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/12973
 * 짝지어 제거하기
 */

const solution2 = (str: string) => {
  const stack: string[] = [];

  for (const s of str) {
    let top = stack[stack.length - 1];

    if (top === s) {
      stack.pop();
      continue;
    }

    stack.push(s);
  }

  return stack.length ? 1 : 0;
};

// console.log(solution2('baabaa'));

/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/42584
 */

const solution3 = (prices: number[]) => {
  const result: number[] = Array(prices.length).fill(0);
  const stack: number[] = [];

  for (const [index, price] of prices.entries()) {
    let topIndex: number | undefined = stack[stack.length - 1];

    while (topIndex !== undefined && price < prices[topIndex]) {
      result[topIndex] = index - topIndex;
      stack.pop();
      topIndex = stack[stack.length - 1];
    }

    stack.push(index);
  }

  const size = prices.length - 1;

  while (stack.length) {
    const targetIndex = stack.pop()!;
    result[targetIndex] = size - targetIndex;
  }

  return result;
};

// console.log(solution3([3, 3, 2, 1, 3]));
// console.log(solution3([1, 2, 3, 2, 3]));

interface BalanceInfo {
  cost: number;
  from: number;
}

const solution4 = (
  balances: number[],
  transactions: number[][],
  bans: number[],
) => {
  const n = balances.length;
  const balanceInfos = Array.from({ length: n }, (_, idx): BalanceInfo[] => [
    {
      cost: balances[idx],
      from: idx,
    },
  ]);

  for (const [from, to, cost] of transactions) {
    let outCost = cost;
    const outInfo = [];

    // 30,40
    while (outCost > 0 && balanceInfos[from].length) {
      const { cost: topCost, from: topFrom } = balanceInfos[from].pop()!;
      if (topCost > outCost) {
        const restCost = topCost - outCost;
        balanceInfos[from].push({ cost: restCost, from: topFrom });
        // 초기화
        outInfo.push({ cost: outCost, from: topFrom });
        outCost = 0;
      } else {
        outInfo.push({ cost: topCost, from: topFrom });
        outCost -= topCost;
      }
    }

    balanceInfos[to].push(...outInfo);
  }

  const result = new Array(n).fill(0);

  balanceInfos.forEach((balanceInfo, idx) => {
    if (bans.includes(idx)) {
      result[idx] = 0;
    } else {
      const balance = balanceInfo.reduce((prev, curr) => {
        const { cost, from } = curr;
        if (bans.includes(from)) return prev;
        return prev + cost;
      }, 0);

      result[idx] = 0 > balance ? 0 : balance;
    }
  });

  return result;
};

const balances = [10, 300, 10];
const transactions = [
  [1, 2, 30], // 사용자 1 → 사용자 2 (30)
  [2, 0, 10], // 사용자 2 → 사용자 0 (10)
  [1, 2, 5], // 사용자 1 → 사용자 2 (5)
];
const bans = [0];

// console.log(solution4(balances, transactions, bans));
// console.log(
//   solution4(
//     [100, 0, 0, 0],
//     [
//       [0, 1, 50],
//       [1, 2, 30],
//       [2, 3, 10],
//     ],
//     [1],
//   ),
// );

// https://www.hackerrank.com/challenges/equal-stacks/problem?isFullScreen=true
// function equalStacks(h1: number[], h2: number[], h3: number[]): number {
//   const sumOfArray = (arr: number[]) => {
//     return arr.reduce((a, b) => a + b, 0);
//   };
//   let h1Sum = sumOfArray(h1);
//   let h2Sum = sumOfArray(h2);
//   let h3Sum = sumOfArray(h3);
//   const arrays = [h1, h2, h3];
//   const sums = [h1Sum, h2Sum, h3Sum];
//   while (true) {
//     let min = Math.min(...sums);
//     if (min === 0 || sums.every((sum) => sum === min)) {
//       return min;
//     }
//     for (let i = 0; i < sums.length; i++) {
//       let currentSum = sums[i];
//       while (arrays[i].length && currentSum > min) {
//         currentSum -= arrays[i].shift() ?? 0;
//       }
//       sums[i] = currentSum;
//     }
//   }
//   return 0;
// }

function equalStacks(h1: number[], h2: number[], h3: number[]): number {
  // 각 스택의 누접합을 구한다?
  const sumOfArray = (arr: number[]) => {
    const result = [];
    let currentSum = 0;
    while (arr.length) {
      currentSum += arr.pop()!;
      result.push(currentSum);
    }
    return result;
  };

  const h1SumSet = new Set(sumOfArray(h1));
  const h2SumSet = new Set(sumOfArray(h2));
  const h3Sums = sumOfArray(h3);

  for (let i = h3Sums.length - 1; 0 <= i; i--) {
    const v = h3Sums[i];
    if (h1SumSet.has(v) && h2SumSet.has(v)) return v;
  }

  return 0;
}

// 3 2 1 1 1   h1 = [3, 2, 1, 1, 1]
// 4 3 2       h2 = [4, 3, 2]
// 1 1 4 1     h3 = [1, 1, 4, 1]

// console.log(equalStacks([3, 2, 1, 1, 1], [4, 3, 2], [1, 1, 4, 1]));

function twoStacks(maxSum: number, a: number[], b: number[]): number {
  // 모든 가능 조합을 줄지어 체크해보는 방식
  const prefixSums = (arr: number[]) => {
    const result = [];
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      if (sum + arr[i] > maxSum) return result;
      sum = sum + arr[i];
      result.push(sum);
    }
    return result;
  };

  const prefixSumOfA = prefixSums(a);

  let result = prefixSumOfA.length;
  let bSum = 0;

  for (let i = 0; i < b.length; i++) {
    bSum += b[i];
    if (bSum > maxSum) break;

    while (
      prefixSumOfA.length &&
      prefixSumOfA[prefixSumOfA.length - 1] + bSum > maxSum
    ) {
      prefixSumOfA.pop();
    }

    if (bSum + (prefixSumOfA[prefixSumOfA.length - 1] ?? 0) < maxSum) {
      result = Math.max(result, prefixSumOfA.length + i + 1);
    }
  }

  return result;
}

// console.log(twoStacks(10, [4, 2, 4, 6, 1], [2, 1, 8, 5]));
// 12
// 1 1 0 0 1 0 1 0 0 1 0 0 1 1 1 0 0
// 0 0 0 0 0 1 0 1 1 0 1 1 0 1 0 1 1 0 0 0 0 0 0 1 0 1

// 62
// 7 15 12 0 5 18 17 2 10 15 4 2 9 15 13 12 16
// 12 16 6 8 16 15 18 3 11 0 17 7 6 11 14 13 15 6 18 6 16 12 16 11 16 11

// console.log(
//   twoStacks(
//     19,
//     [7, 15, 12, 0, 5, 18, 17, 2, 10, 15, 4, 2, 9, 15, 13, 12, 16],
//     [
//       12, 16, 6, 8, 16, 15, 18, 3, 11, 0, 17, 7, 6, 11, 14, 13, 15, 6, 18, 6,
//       16, 12, 16, 11, 16, 11,
//     ],
//   ),
// ); // 6

// Queue using Two Stacks

class QueueUsingTwoStacks {
  private inStack: number[] = [];
  private outStack: number[] = [];

  constructor() {}

  enqueue(v: number) {
    this.inStack.push(v);
  }

  dequeue() {
    this.fillOutStack();
    return this.outStack.pop();
  }

  peek() {
    this.fillOutStack();
    return this.outStack[this.outStack.length - 1];
  }

  private fillOutStack() {
    if (this.outStack.length === 0) {
      while (this.inStack.length) {
        this.outStack.push(this.inStack.pop()!);
      }
    }
  }
}

function queueUsingTwoStacks(arr: [string, number?][]) {
  const q = new QueueUsingTwoStacks();

  for (const [impl, value] of arr) {
    if (impl === 'ENQUEUE') {
      q.enqueue(value!);
    } else if (impl === 'DEQUEUE') {
      q.dequeue();
    } else if (impl === 'PEEK') {
      console.log(q.peek());
    }
  }
}

// console.log(
//   queueUsingTwoStacks([
//     ['ENQUEUE', 42],
//     ['ENQUEUE', 14],
//     ['ENQUEUE', 28],
//     ['PEEK'],
//     ['DEQUEUE'],
//     ['PEEK'],
//     ['DEQUEUE'],
//     ['PEEK'],
//     ['DEQUEUE'],
//     ['ENQUEUE', 60],
//   ]),
// );

// stack 선입후출 lifo
class StackUsingTwoQueues {
  private inQueue: number[] = [];
  private outQueue: number[] = [];

  push(v: number) {
    this.inQueue.push(v);

    while (this.outQueue.length) {
      this.inQueue.push(this.outQueue.shift()!);
    }

    [this.outQueue, this.inQueue] = [this.inQueue, this.outQueue];
  }

  pop() {
    return this.outQueue.shift();
  }

  peek() {
    if (!this.outQueue.length) return undefined;
    return this.outQueue[0];
  }
}

function stackUsingTwoQueues(arr: [string, number?][]) {
  const stack = new StackUsingTwoQueues();
  stack.push(1);
  stack.push(2);
  stack.push(3);
  console.log(stack.pop());
  console.log(stack.pop());
  console.log(stack.pop());
  stack.push(5);
  console.log(stack.peek());
}

// console.log(
//   stackUsingTwoQueues([
//     ['ENQUEUE', 5],
//     ['ENQUEUE', 10],
//     ['PEEK'],
//     ['DEQUEUE'],
//     ['PEEK'],
//     ['DEQUEUE'],
//     ['PEEK'],
//     ['DEQUEUE'],
//     ['ENQUEUE', 42],
//   ]),
// );

// a -> b -> c -> a
function truckTour(petrolpumps: number[][]): number {
  let totalTank = 0;
  let currTank = 0;
  let startIndex = 0;

  for (let i = 0; i < petrolpumps.length; i++) {
    const [petrol, distance] = petrolpumps[i];
    const net = petrol - distance;

    currTank += net;
  }

  return 1;
}

// console.log(
//   truckTour([
//     [1, 5],
//     [10, 3],
//     [3, 4],
//   ]),
// );

//https://school.programmers.co.kr/learn/courses/30/lessons/176962
const assignmentProgress = (plans: [string, string, string][]) => {
  const toTimeM = (s: string) => {
    const [h, m] = s.split(':').map((v) => +v);
    return h * 60 + m;
  };

  const processedPlanes = plans
    .map<
      [string, number, number]
    >(([name, start, playtime]) => [name, toTimeM(start), +playtime])
    .sort((a, b) => a[1] - b[1]);

  const result = [];
  const stack = [processedPlanes[0]];

  for (let i = 1; i < processedPlanes.length; i++) {
    const current = processedPlanes[i];
    // 이전 타임에서 현재 타임까지의 시간 여유분
    let restTime = current[1] - stack[stack.length - 1][1];

    while (0 < restTime && stack.length) {
      const top = stack[stack.length - 1];
      const [tName, tStart, tPlaytime] = top;
      if (tPlaytime <= restTime) {
        stack.pop();
        result.push(tName);
      } else {
        stack[stack.length - 1][2] -= restTime;
      }
      restTime -= tPlaytime;
    }

    stack.push(current);
  }

  while (stack.length) {
    const top = stack.pop()!;
    result.push(top[0]);
  }

  return result;
};

console.log(
  assignmentProgress([
    ['music', '12:20', '40'],
    ['science', '12:40', '50'],
    ['computer', '12:30', '100'],
    ['history', '14:00', '30'],
  ]),
);

console.log(
  assignmentProgress([
    ['aaa', '12:00', '20'],
    ['bbb', '12:10', '30'],
    ['ccc', '12:40', '10'],
  ]),
);

//
