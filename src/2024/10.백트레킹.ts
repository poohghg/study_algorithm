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
const solution3 = (n: number) => {
  const formulas = ['+', '-', ''];
  const combinationsOfFormulas: string[][] = [];
  const selected: string[] = [];

  const dfs = (level: number) => {
    if (level === n - 1) {
      combinationsOfFormulas.push([...selected]);
      return;
    }

    for (let i = 0; i < formulas.length; i++) {
      selected.push(formulas[i]);
      dfs(level + 1);
      selected.pop();
    }
  };

  // "1 2 3 4"
  // 3 * 3 * 3
  dfs(0);
  console.log(combinationsOfFormulas.length);
};

console.log(solution3(5));
