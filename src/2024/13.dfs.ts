export {};

/**
 * https://www.acmicpc.net/problem/2606
 */

const solution1 = (n: number, m: number[][]) => {
  const list = Array.from({ length: n + 1 }, (): number[] => []);
  const visited = Array.from({ length: n + 1 }, () => false);

  const makeGrape = () => {
    for (const [node1, node2] of m) {
      list[node1].push(node2);
      list[node2].push(node1);
    }
  };

  let result = 0;
  const dfs = (node: number) => {
    visited[node] = true;
    result++;

    for (const nextNode of list[node]) {
      if (visited[nextNode]) continue;
      dfs(nextNode);
    }
  };

  makeGrape();
  dfs(1);
  return result;
};

// console.log(
//   solution1(7, [
//     [1, 2],
//     [2, 3],
//     [1, 5],
//     [5, 2],
//     [5, 6],
//     [4, 7],
//   ]),
// );

/**
 * https://www.acmicpc.net/problem/1240
 */

const solution2 = (
  n: number,
  arr: [number, number, number][],
  targets: [number, number][],
) => {
  const makeGraph = () => {
    const graph = Array.from(
      { length: n + 1 },
      () => [] as { node: number; distance: number }[],
    );
    for (const [node1, node2, distance] of arr) {
      graph[node1].push({ node: node2, distance });
      graph[node2].push({ node: node1, distance });
    }
    return graph;
  };

  const graph = makeGraph();
  const visited: number[] = new Array(n + 1).fill(0);
  const distances: number[] = new Array(n + 1).fill(0);
  const result: number[] = [];

  const dfs = (node: number, target: number): number => {
    if (node === target) return distances[target];

    visited[node] = 1;

    for (const { node: nextNode, distance } of graph[node]) {
      if (visited[nextNode]) continue;

      distances[nextNode] = distances[node] + distance;
      const foundDistance = dfs(nextNode, target);

      if (foundDistance !== -1) return foundDistance; // 목적지 찾으면 반환
    }

    return -1; // 경로를 찾지 못한 경우
  };

  for (const [start, target] of targets) {
    visited.fill(0);
    distances.fill(0);
    result.push(dfs(start, target));
  }

  return result;
};

// console.log(
//   solution2(
//     4,
//     [
//       [2, 1, 2],
//       [4, 3, 2],
//       [1, 4, 3],
//     ],
//     [
//       [1, 2],
//       [3, 2],
//     ],
//   ),
// );

/**
 * https://www.acmicpc.net/problem/4803
 * 입력은 여러 개의 테스트 케이스로 이루어져 있다.
 * 각 테스트 케이스의 첫째 줄에는 n ≤ 500과 m ≤ n(n-1)/2을 만족하는 정점의 개수 n과 간선의 개수 m이 주어진다.
 * 다음 m개의 줄에는 간선을 나타내는 두 개의 정수가 주어진다. 같은 간선은 여러 번 주어지지 않는다. 정점은 1번부터 n번까지 번호가 매겨져 있다.
 * 입력의 마지막 줄에는 0이 두 개 주어진다
 * 트리: 사이클이 없는 연결요소이다(즉 무방향 그래프에서 사이클이 없는 연결 요소)
 * 양방향 요소
 */
const solution3 = (n: number, m: number, arr: [number, number][]) => {
  const makeGraph = () => {
    const graph = Array.from({ length: n + 1 }, (): number[] => []);
    for (const [node1, node2] of arr) {
      graph[node1].push(node2);
      graph[node2].push(node1);
    }
    return graph;
  };

  const graph = makeGraph();
  const visited: boolean[] = new Array(n + 1).fill(false);
  let result = 0;

  const isCycle = (node: number, prevNode: number) => {
    visited[node] = true;

    for (const nextNode of graph[node]) {
      if (visited[nextNode]) {
        if (nextNode !== prevNode) return true;
      } else return isCycle(nextNode, node);
    }

    return false;
  };

  for (let i = 1; i <= n; i++) if (!visited[i] && !isCycle(i, 0)) result++;

  return result;
};

// console.log(
//   solution3(6, 3, [
//     [1, 2],
//     [2, 3],
//     [2, 5],
//     [3, 4],
//     [4, 5],
//   ]),
// );

/**
 * https://www.acmicpc.net/problem/15686
 * 도시에 있는 치킨집 중에서 최대 M개를 고르고, 나머지 치킨집은 모두 폐업시켜야 한다. 어떻게 고르면, 도시의 치킨 거리가 가장 작게 될지 구하는 프로그램을 작성하시오.
 * 도시의 정보는 0, 1, 2로 이루어져 있고, 0은 빈 칸, 1은 집, 2는 치킨집을 의미한다
 */

const solution4 = (n: number, m: number, arr: number[][]) => {
  const LOCATIONS = ['empty', 'house', 'chicken'] as const;
  const getLocations = (loc: (typeof LOCATIONS)[number]) => {
    const targetValue = LOCATIONS.indexOf(loc);

    return arr.reduce(
      (acc, curr, x) => {
        curr.forEach((value: number, y: number) => {
          if (value === targetValue) acc.push([x, y]);
        });
        return acc;
      },
      [] as [number, number][],
    );
  };

  const getCombinations = () => {
    const chickenRestaurants = getLocations('chicken');
    let result: [number, number][][] = [];

    const dfs = (level: number, start: number, record: [number, number][]) => {
      if (level === m) {
        result.push(record);
        return;
      }

      for (let i = start; i < chickenRestaurants.length; i++)
        dfs(level + 1, i + 1, [...record, chickenRestaurants[i]]);
    };

    dfs(0, 0, []);
    return result;
  };

  const main = () => {
    const chickenCombinations = getCombinations();
    const houses = getLocations('house');
    let result = Number.MAX_SAFE_INTEGER;

    chickenCombinations.forEach((chickenSet) => {
      let sumOfDistance = 0;

      houses.forEach(([x1, y1]) => {
        let minDistance = Number.MAX_SAFE_INTEGER;

        chickenSet.forEach(([x2, y2]) => {
          minDistance = Math.min(
            minDistance,
            Math.abs(x1 - x2) + Math.abs(y1 - y2),
          );
        });

        sumOfDistance += minDistance;
      });

      result = Math.min(result, sumOfDistance);
    });

    return result;
  };

  return main();
};

// console.log(
//   solution4(5, 2, [
//     [0, 2, 0, 1, 0],
//     [1, 0, 1, 0, 0],
//     [0, 0, 0, 0, 0],
//     [2, 0, 0, 1, 1],
//     [2, 2, 0, 1, 2],
//   ]),
// );

/**
 * https://www.acmicpc.net/problem/9466
 * 싸이클을 이루는 요소
 */

const solution5 = (n: number, nums: number[]) => {
  const grape = [0, ...nums];
  const finished: boolean[] = Array(n + 1).fill(false);
  const visited: boolean[] = Array(n + 1).fill(false);
  let result: number[] = [];

  const dfs = (node: number) => {
    visited[node] = true;
    let nextNode = grape[node];

    if (!visited[nextNode]) dfs(nextNode);
    // 다음 노드를 방문했고, 아직 스택에 있다면
    else if (!finished[nextNode]) {
      while (nextNode !== node) {
        result.push(nextNode);
        nextNode = grape[nextNode];
      }
      result.push(node);
    }
    finished[node] = true;
  };

  for (let i = 1; i < grape.length; i++) {
    if (!visited[i]) dfs(i);
  }

  return result;
};

// console.log(solution5(7, [3, 1, 3, 7, 3, 4, 6]));

/**
 * https://www.acmicpc.net/problem/2668
 * 싸이클을 구성하는 부분 그래프에 포함된 노드의 갯수를 구해보자
 */

const solution6 = (n: number, nums: number[]) => {
  const grape = [0, ...nums];
  const stackDone = Array.from({ length: n + 1 }, () => false);
  const visited = Array.from({ length: n + 1 }, () => false);
  const result: number[] = [];

  const dfs = (node: number) => {
    visited[node] = true;

    let nextNode = grape[node];

    if (!visited[nextNode]) dfs(nextNode);
    else if (!stackDone[nextNode]) {
      while (nextNode !== node) {
        result.push(nextNode);
        nextNode = grape[nextNode];
      }
      result.push(node);
    }

    stackDone[node] = true;
  };

  for (let i = 1; i <= n; i++) {
    if (!visited[i]) dfs(i);
  }

  return result;
};

// console.log(solution6(7, [3, 1, 1, 5, 5, 4, 6]));

/**
 * https://www.acmicpc.net/problem/10026
 */

const solution7 = (n: number, arr: string[][]) => {
  const getNextPositions = (() => {
    const directions = [
      [1, 0],
      [-1, 0],
      [0, -1],
      [0, 1],
    ];

    return (x: number, y: number) =>
      directions
        .map(([px, py]) => [px + x, py + y])
        .filter(([px, py]) => px >= 0 && px < n && py >= 0 && py < n);
  })();

  const main = (map: string[][]) => {
    const visited = Array.from({ length: n }, (): boolean[] =>
      Array(n).fill(false),
    );

    const dfs = (x: number, y: number, value: string) => {
      visited[x][y] = true;

      for (const [nx, ny] of getNextPositions(x, y)) {
        if (visited[nx][ny] || map[nx][ny] !== value) continue;
        dfs(nx, ny, value);
      }
    };

    let result = 0;

    for (let x = 0; x < n; x++) {
      for (let y = 0; y < n; y++) {
        if (!visited[x][y]) {
          dfs(x, y, map[x][y]);
          result++;
        }
      }
    }

    return result;
  };

  const newArr = arr.map((x) =>
    x.map((value) => (value === 'G' ? 'R' : value)),
  );

  return [main(arr), main(newArr)];
};

console.log(
  solution7(5, [
    ['R', 'R', 'R', 'B', 'B'],
    ['G', 'G', 'B', 'B', 'B'],
    ['B', 'B', 'B', 'R', 'R'],
    ['B', 'B', 'R', 'R', 'R'],
    ['R', 'R', 'R', 'R', 'R'],
  ]),
);
