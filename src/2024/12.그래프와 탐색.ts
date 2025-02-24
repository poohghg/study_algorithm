export default {};

// 인접 행렬
const solution1 = (num: number, target: number, vertexes: number[][]) => {
  const makeMatrix = (): number[][] => {
    const matrix = Array.from({ length: num + 1 }, () =>
      new Array(num + 1).fill(0),
    );
    vertexes.forEach(([vertex, edge]) => (matrix[vertex][edge] = 1));
    return matrix;
  };

  const matrix = makeMatrix();
  const result: number[][] = [];

  const dfs = (current: number, path: number[], visited: Set<number>) => {
    if (current === target) {
      result.push([...path]);
      return;
    }

    for (let next = 1; next <= num; next++) {
      if (matrix[current][next] === 0 || visited.has(next)) continue;

      visited.add(next);
      dfs(next, [...path, next], visited);
      visited.delete(next);
    }
  };

  dfs(1, [1], new Set([1]));

  return result;
};

// console.log(
//   solution1(5, 5, [
//     [1, 2],
//     [1, 3],
//     [1, 4],
//     [2, 1],
//     [2, 3],
//     [2, 5],
//     [3, 4],
//     [4, 2],
//     [4, 5],
//   ]),
// );

// 인접 리스트
const solution2 = (num: number, target: number, vertexes: number[][]) => {
  const makeList = (): number[][] => {
    const list = Array.from({ length: num + 1 }, (): number[] => []);

    vertexes.forEach(([vertex, edge]) => {
      list[vertex].push(edge);
    });

    return list;
  };

  const list = makeList();
  const result: number[][] = [];

  const dfs = (current: number, path: number[], visited: Set<number>) => {
    if (current === target) {
      result.push([...path]);
      return;
    }

    for (const next of list[current]) {
      if (visited.has(next)) continue;

      visited.add(next);
      dfs(next, [...path, next], visited);
      visited.delete(next);
    }
  };

  dfs(1, [1], new Set([1]));

  return result;
};

// console.log(
//   solution2(5, 5, [
//     [1, 2],
//     [1, 3],
//     [1, 4],
//     [2, 1],
//     [2, 3],
//     [2, 5],
//     [3, 4],
//     [4, 2],
//     [4, 5],
//   ]),
// );

/**
 * 미로탐색(DFS)
 */

const solution3 = (nums: number[][]) => {
  const n = nums.length;
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const getNextPosition = (x: number, y: number) =>
    directions.reduce(
      (acc, [dx, dy]) => {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < n && ny >= 0 && ny < n) acc.push([nx, ny]);
        return acc;
      },
      [] as [number, number][],
    );

  const visited = Array.from({ length: n }, () => new Array(n).fill(false));

  const dfs = (x: number, y: number): number => {
    if (x === n - 1 && y === n - 1) return 1;

    let count = 0;
    for (const [nx, ny] of getNextPosition(x, y)) {
      if (!visited[nx][ny] && nums[nx][ny] === 0) {
        visited[nx][ny] = true;
        count += dfs(nx, ny);
        visited[nx][ny] = false;
      }
    }
    return count;
  };

  visited[0][0] = true;
  return dfs(0, 0);
};

console.log(
  solution3([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [1, 1, 0, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0],
  ]),
);
