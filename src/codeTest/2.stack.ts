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
console.log(solution3([1, 2, 3, 2, 3]));
