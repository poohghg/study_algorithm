import { Queue } from '../dataStructure/Queue';
import { cloneDeep } from 'lodash';

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

// console.log(
//   solution3([
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 1, 1, 1, 1, 1, 0],
//     [0, 0, 0, 1, 0, 0, 0],
//     [1, 1, 0, 1, 0, 1, 1],
//     [1, 1, 0, 0, 0, 0, 1],
//     [1, 1, 0, 1, 1, 0, 0],
//     [1, 0, 0, 0, 0, 0, 0],
//   ]),
// );

/**
 * 최단 거리(BFS)
 * 현수는 스카이 콩콩을 타고 가는데 한 번의 점프로 앞으로 1, 뒤로 1, 앞으로 5를 이동할 수
 * 있다. 최소 몇 번의 점프로 현수가 송아지의 위치까지 갈 수 있는지 구하는 프로그램을 작성
 * 하세요.
 * 첫 번째 줄에 현수의 위치 S와 송아지의 위치 E가 주어진다. 직선의 좌표 점은 1부터 10,000까지이다.
 */

const solution4 = (s: number, e: number) => {
  const jumps = [-1, 1, 5];
  const visited: boolean[] = Array(10001).fill(false);
  const distance: number[] = Array(10001).fill(0);

  const queues = new Queue(s);
  visited[s] = true;

  while (queues.size) {
    const x = queues.dequeue()!;

    for (const value of jumps) {
      const nextX = x + value;

      if (visited[nextX]) continue;

      if (nextX === e) return distance[x] + 1;

      visited[nextX] = true;
      distance[nextX] = distance[x] + 1;
      queues.enqueue(nextX);
    }
  }
};

// console.log(solution4(8, 3));

/**
 * N*N의 섬나라 아일랜드의 지도가 격자판의 정보로 주어집니다. 각 섬은 1로 표시되어 상하좌
 * 우와 대각선으로 연결되어 있으며, 0은 바다입니다. 섬나라 아일랜드에 몇 개의 섬이 있는지
 * 구하는 프로그램을 작성하세요.
 */
const solution5 = (n: number, nums: number[][]) => {
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, -1],
    [1, 1],
    [-1, -1],
    [-1, 1],
  ];

  const getNextPosition = (x: number, y: number) => {
    return directions
      .map(([nx, ny]) => [nx + x, ny + y])
      .filter(([nx, ny]) => 0 <= nx && nx < n && 0 <= ny && ny < n);
  };

  let result = 0;
  const visited = cloneDeep(nums);

  const dfs = (x: number, y: number) => {
    for (const [nextX, nextY] of getNextPosition(x, y)) {
      if (visited[nextX][nextY] === 0) continue;

      visited[nextX][nextY] = 0;
      dfs(nextX, nextY);
    }
  };

  const bfs = (x: number, y: number) => {
    const queue = new Queue<[number, number]>([[x, y]]);
    visited[x][y] = 0;

    while (queue.size) {
      const [x, y] = queue.dequeue()!;

      for (const [nx, ny] of getNextPosition(x, y)) {
        if (visited[nx][ny] === 0) continue;

        visited[nx][ny] = 0;
        queue.enqueue([nx, ny]);
      }
    }
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (visited[i][j] === 0) continue;

      visited[i][j] = 0;
      result++;
      bfs(i, j);
      // dfs(i, j);
    }
  }

  return result;
};

console.log(
  solution5(7, [
    [1, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0],
    [1, 0, 1, 0, 1, 0, 0],
  ]),
);
