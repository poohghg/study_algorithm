function solution1(n: number) {
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
      console.log(queues);
    }
  };

  dfs(0);
  return answer;
}

console.log(solution1(3));
