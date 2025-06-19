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

console.log(solution4(balances, transactions, bans));
console.log(
  solution4(
    [100, 0, 0, 0],
    [
      [0, 1, 50],
      [1, 2, 30],
      [2, 3, 10],
    ],
    [1],
  ),
);
