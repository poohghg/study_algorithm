export default {};

function saveThePrisoner(n: number, m: number, s: number): number {
  // Write your code here
  const last = (s + m - 1) % n;
  return last === 0 ? n : last;
}

// console.log(saveThePrisoner(7, 19, 2)); // 3
// console.log(saveThePrisoner(5, 2, 5)); // 1

function maxSumOfArray(nums: number[]) {
  const n = nums.length;
  const visited: boolean[] = Array(n).fill(false);

  const sum = (arr: number[]) => {
    let result = 0;

    for (let i = 0; i < n - 1; i++) {
      result += arr[i] = arr[i + 1];
    }

    return result;
  };

  const dfs = (level: number, arr: number[]) => {
    if (level === n) {
      console.log(arr);
    }

    for (let i = 0; i < n; i++) {
      if (!visited[i]) {
        visited[i] = true;
        dfs(level + 1, [...arr, nums[i]]);
        visited[i] = false;
      }
    }
  };

  dfs(0, []);
}

// 20 1 15 8 4 10
// console.log(maxSumOfArray([20, 1, 15, 8, 4, 10]));

function findNode(
  n: number,
  arr: [number, number, number][],
  targets: [number, number][],
) {
  const graph = arr.reduce(
    (acc, curr) => {
      const [node1, node2, dist] = curr;
      if (!acc[node1]) acc[node1] = [];
      if (!acc[node2]) acc[node2] = [];

      acc[node1].push([node2, dist]);
      acc[node2].push([node1, dist]);

      return acc;
    },
    {} as Record<number, [number, number][]>,
  );

  const bfs = (start: number, end: number) => {
    const distances: number[] = Array(n + 1).fill(-1);
    distances[start] = 0;
    const queue = [start];

    while (queue.length) {
      const currentNode = queue.shift()!;
      const currentDist = distances[currentNode];

      for (const [nextNode, nextDist] of graph[currentNode] ?? []) {
        if (nextNode === end) {
          return currentDist + nextDist;
        }

        if (distances[nextNode] === -1) {
          distances[nextNode] = currentDist + nextDist;
          queue.push(nextNode);
        }
      }
    }

    return distances[end];
  };

  const result: number[] = [];

  bfs(3, 2);

  for (const [start, end] of targets) {
    result.push(bfs(start, end));
  }

  return result;
}

// console.log(
//   findNode(
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

function countOfTree(n: number, arr: [number, number][]) {
  const s = new Set<string>();
  const m = new Map<string, number>();
  for (const string of s) {
  }

  const makeGraph = () => {
    const graph = Array.from({ length: n + 1 }, (): number[] => []);

    for (const [node1, node2] of arr) {
      graph[node1].push(node2);
      graph[node2].push(node1);
    }

    return graph;
  };

  const graph = makeGraph();
  const visited: boolean[] = Array(n + 1).fill(false);

  const isCycle = (node: number, parent: number) => {
    visited[node] = true;

    for (const nextNode of graph[node]) {
      // 다음 노드중 방문한 노드는 부모여야만 한다. 간선(경로)이 하나만 존재해야하기때문이다.
      if (visited[nextNode]) {
        if (nextNode !== parent) return true;
      } else {
        return isCycle(nextNode, node);
      }
    }

    return false;
  };

  let result = 0;

  for (let i = 1; i <= n; i++) {
    if (!visited[i] && !isCycle(i, 0)) {
      result++;
    }
  }

  return result;
}

console.log(
  countOfTree(6, [
    [1, 2],
    [2, 3],
    [1, 3],
    [4, 5],
    [5, 6],
    [6, 4],
  ]),
);

console.log(
  countOfTree(6, [
    [1, 2],
    [2, 3],
    [3, 4],
  ]),
);
