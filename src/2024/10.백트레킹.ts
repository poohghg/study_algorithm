const solution1 = (n: number) => {
  const queues: [number, number][] = [];

  const isPossiblePosition = (x: number, y: number) => {
    for (const [a, b] of queues) {
      if (a === x || b === y) return false;
      if (Math.abs(a - x) === Math.abs(b - y)) return false;
    }
    return true;
  };

  let answer = 0;

  const dfs = (row: number) => {
    if (row === n) return (answer += 1);

    for (let i = 0; i < n; i++) {
      if (!isPossiblePosition(row, i)) continue;
      queues.push([row, i]);
      dfs(row + 1);
      queues.pop();
    }
  };

  dfs(0);
  return answer;
};

// console.log(solution1(3));

/**
 * 순열
 * https://www.acmicpc.net/problem/15649
 * 자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.
 * 1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열
 */
const solution2 = (n: number, m: number) => {
  const array = Array.from({ length: n }).map((_, index) => index + 1);
  const visited = (array.slice() as unknown as boolean[]).fill(false);
  const selected: number[] = [];
  const result: number[][] = [];

  const dfs = (level: number) => {
    if (level === m) {
      result.push([...selected]);
      return;
    }

    for (let i = 0; i < array.length; i++) {
      if (visited[i]) continue;

      selected.push(array[i]);
      visited[i] = true;

      dfs(level + 1);

      selected.pop();
      visited[i] = false;
    }
  };

  dfs(0);
  console.log(result);
};

// console.log(solution2(4, 4));

/**
 * https://www.acmicpc.net/problem/7490
 * 1부터 N까지의 수를 오름차순으로 쓴 수열 1 2 3 ... N을 생각하자.
 * 그리고 '+'나 '-', 또는 ' '(공백)을 숫자 사이에 삽입하자(+는 더하기, -는 빼기, 공백은 숫자를 이어 붙이는 것을 뜻한다). 이렇게 만든 수식의 값을 계산하고 그 결과가 0이 될 수 있는지를 살피자.
 * N이 주어졌을 때 수식의 결과가 0이 되는 모든 수식을 찾는 프로그램을 작성하라.
 */

type FormulasKey<T extends readonly string[]> = T[number];

const solution3 = (n: number) => {
  const nums = Array.from({ length: n }, (_, index) => index + 1);
  const formulas = ['+', '-', ' '] as const;
  const combinationsOfFormulas: ('+' | '-' | ' ')[][] = [];
  const selected: ('+' | '-' | ' ')[] = [];

  const calculateNum = (
    num1: number,
    num2: number,
    formulasKey: FormulasKey<typeof formulas>,
  ) => {
    if (formulasKey === '+') return num1 + num2;
    if (formulasKey === '-') return num1 - num2;
    return num1 * 10 + num2;
  };

  const dfs = (level: number) => {
    if (level === n - 1) {
      const sum = nums.reduce((acc, curr, index) => {
        if (index === 0) return curr;
        return calculateNum(acc, curr, selected[index - 1]);
      }, 0);

      if (sum === 0) combinationsOfFormulas.push([...selected]);

      return;
    }

    for (let i = 0; i < formulas.length; i++) {
      selected.push(formulas[i]);
      dfs(level + 1);
      selected.pop();
    }
  };

  dfs(0);
};

/**
 * https://www.acmicpc.net/problem/15650
 * 자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.
 * 1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열
 * 고른 수열은 오름차순이어야 한다.
 */

const solution4 = (n: number, m: number) => {
  const result: number[][] = [];
  const record: number[] = [];

  const isLackOfNumber = (level: number, start: number) => {
    return n - start + 1 < m - level;
  };

  const dfs = (level: number, start: number) => {
    if (level === m) {
      result.push([...record]);
      return;
    }

    if (isLackOfNumber(level, start)) return;

    for (let i = start; i <= n; i++) {
      record.push(i);
      dfs(level + 1, i + 1);
      record.pop();
    }
  };

  dfs(0, 1);
  return result;
};

// console.log(solution4(5, 3));

/**
 * 중복 순열
 * https://www.acmicpc.net/problem/15652
 * 자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.
 * 1부터 N까지 자연수 중에서 M개를 고른 수열
 * 같은 수를 여러 번 골라도 된다.
 * 고른 수열은 비내림차순이어야 한다.
 * 길이가 K인 수열 A가 A1 ≤ A2 ≤ ... ≤ AK-1 ≤ AK를 만족하면, 비내림차순이라고 한다.
 */

const solution5 = (n: number, m: number) => {
  const result: number[][] = [];
  const record: number[] = [];

  const dfs = (level: number, start: number) => {
    if (level === m) {
      result.push([...record]);
      return;
    }

    for (let i = start; i <= n; i++) {
      record.push(i);
      dfs(level + 1, i);
      record.pop();
    }
  };

  dfs(0, 1);
  return result;
};

// console.log(solution5(4, 2));

/**
 * 외판원 순회 2
 * https://www.acmicpc.net/problem/10971
 */

const solution6 = (n: number, cites: number[][]) => {
  let result: number = Number.MAX_SAFE_INTEGER;
  const visited = Array.from({ length: n }, (_) => false);

  const dfs = (level: number, start: number, cost: number) => {
    if (level === n - 1) {
      if (cites[start][0] === 0) return;
      result = Math.min(result, cost + cites[start][0]);
      return;
    }

    for (let i = 0; i < cites.length; i++) {
      if (visited[i] || cites[start][i] === 0) continue;

      visited[i] = true;
      dfs(level + 1, i, cost + cites[start][i]);
      visited[i] = false;
    }
  };

  visited[0] = true;
  dfs(0, 0, 0);
  return result;
};

// 10
// console.log(
//   solution6(4, [
//     [0, 10, 15, 20],
//     [5, 0, 9, 10],
//     [6, 13, 0, 12],
//     [8, 8, 9, 0],
//   ]),
// );

/**
 * 도영이가 만든 맛있는 음식
 * https://www.acmicpc.net/problem/2961
 */

const solution7 = (n: number, elements: [number, number][]) => {
  let result: number = Number.MAX_SAFE_INTEGER;
  const record: [number, number][] = [];

  const dfs = (level: number) => {
    if (level === n) {
      if (record.length === 0) return;

      const total = record.reduce<[number, number]>(
        (acc, curr, index) => {
          if (index === 0) return curr;
          return [acc[0] * curr[0], acc[1] + curr[1]];
        },
        [0, 0],
      );

      result = Math.min(result, Math.abs(total[0] - total[1]));
      return;
    }

    record.push(elements[level]);
    dfs(level + 1);
    record.pop();
    dfs(level + 1);
  };

  dfs(0);
  return result;
};

// console.log(
//   solution7(4, [
//     [1, 7],
//     [2, 6],
//     [3, 8],
//     [4, 9],
//   ]),
// );

/**
 * 로또
 * https://www.acmicpc.net/problem/6603
 */

const solution9 = (n: number, nums: number[]) => {
  const records: number[][] = [];
  const record: number[] = [];

  const isLackOfNumber = (level: number, start: number) => {
    return n - start < 6 - level;
  };

  const dfs = (level: number, start: number) => {
    if (level === 6) {
      records.push([...record]);
      return;
    }

    for (let i = start; i < n; i++) {
      if (isLackOfNumber(level + 1, i + 1)) return;

      record.push(nums[i]);
      dfs(level + 1, i + 1);
      record.pop();
    }
  };

  dfs(0, 0);

  return Array.from({ length: 5 }).map((_, index, array) => {
    const randomIndex = Math.floor(Math.random() * records.length);
    return records[randomIndex];
  });
};

console.log(solution9(10, [3, 7, 12, 18, 21, 27, 33, 38, 42, 45]));
