export default {};

interface QueueImpl<T> {
  size: number;

  enqueue(item: T): void;

  dequeue(): T | undefined;
}

class Queue<T> implements QueueImpl<T> {
  private data: T[] = [];
  private headIndex: number = 0;

  constructor(init?: T | T[]) {
    if (!init) return;
    if (Array.isArray(init)) {
      this.data = init;
    } else {
      this.data.push(init);
    }
  }

  public get size() {
    return this.data.length - this.headIndex;
  }

  public enqueue(item: T) {
    this.data.push(item);
  }

  public dequeue() {
    if (this.size === 0) return undefined;

    const item = this.data[this.headIndex];
    this.headIndex++;
    return item;
  }
}

const solution1 = (maps: number[][]) => {
  const n = maps.length;
  const m = maps[0].length;

  const moves = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  const nextPositions = (x: number, y: number) => {
    return moves
      .map(([nx, ny]) => [x + nx, y + ny])
      .filter(([nx, ny]) => 0 <= nx && nx < n && 0 <= ny && ny < m);
  };

  const visited = Array.from({ length: n }, (): number[] => Array(m).fill(0));
  const queue = new Queue<[number, number]>([[0, 0]]);
  visited[0][0] = 1;

  while (queue.size) {
    const [x, y] = queue.dequeue()!;
    const currentDist = visited[x][y];

    for (const [nx, ny] of nextPositions(x, y)) {
      if (maps[nx][ny] === 0 || visited[nx][ny] !== 0) continue;
      if (nx === n - 1 && ny === m - 1) return currentDist + 1;
      queue.enqueue([nx, ny]);
      visited[nx][ny] = currentDist + 1;
    }
  }

  return -1;
};

// console.log(
//   solution1([
//     [1, 0, 1, 1, 1],
//     [1, 0, 1, 0, 1],
//     [1, 0, 1, 1, 1],
//     [1, 1, 1, 0, 1],
//     [0, 0, 0, 0, 1],
//   ]),
// );

const solution2 = (n: number, computers: number[][]) => {
  const visited = Array.from({ length: n }, () => 0);

  const dfs = (node: number) => {
    visited[node] = 1;

    for (let nextNode = 0; nextNode < computers[node].length; nextNode++) {
      if (visited[nextNode] || computers[node][nextNode] === 0) continue;
      dfs(nextNode);
    }
  };

  let result = 0;

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;
    dfs(i);
    result++;
  }

  return result;
};

// console.log(
//   solution2(3, [
//     [1, 1, 0],
//     [1, 1, 1],
//     [0, 1, 1],
//   ]),
// );

const solution3 = (N: number, roads: [number, number, number][], K: number) => {
  const grape = roads.reduce((map, current) => {
    const [node1, node2, cost] = current;
    map.set(node1, [...(map.get(node1) ?? []), [node2, cost]]);
    map.set(node2, [...(map.get(node2) ?? []), [node1, cost]]);
    return map;
  }, new Map<number, [number, number][]>());

  const dijkstra = (start: number) => {
    const unVisited = new Set(grape.keys());
    const dist = new Map([...unVisited].map((node) => [node, Infinity]));
    dist.set(start, 0);

    while (unVisited.size) {
      const shortestNode = [...unVisited].reduce((shortNode, current) => {
        if (dist.has(shortNode) && dist.has(current)) {
          return dist.get(shortNode)! < dist.get(current)!
            ? shortNode
            : current;
        }
        return shortNode;
      });

      const currentCost = dist.get(shortestNode)!;
      unVisited.delete(shortestNode);

      if (currentCost === Infinity) break;

      for (const [nextNode, cost] of grape.get(shortestNode) ?? []) {
        if (currentCost + cost < dist.get(nextNode)!) {
          dist.set(nextNode, currentCost + cost);
        }
      }
    }

    return dist;
  };

  return [...dijkstra(1).values()].filter((dist) => dist !== 0 && dist <= K)
    .length;
};

// console.log(
//   solution3(
//     5,
//     [
//       [1, 2, 1],
//       [2, 3, 3],
//       [5, 2, 2],
//       [1, 4, 2],
//       [5, 3, 1],
//       [5, 4, 2],
//     ],
//     3,
//   ),
// );

const solution4 = (board: number[][]) => {
  // 지금 까지간 최소비용을 우선 저장?
  // 최소 비용보다 적으면 게속해서 bfs
  const isValid = (x: number, y: number) => 0 <= x && x < n && 0 <= y && y < n;

  const n = board.length;
  const distInfo = Array.from({ length: n }, () => new Array(n).fill(Infinity));

  const dfs = () => {
    const moves = [
      [0, -1],
      [-1, 0],
      [0, 1],
      [1, 0],
    ];

    let result = Number.MAX_SAFE_INTEGER;
    const queue = new Queue<[number, number, number]>();
    queue.enqueue([0, 0, -1]);
    distInfo[0][0] = 0;

    while (queue.size) {
      const [x, y, d] = queue.dequeue()!;
      const currentCost = distInfo[x][y];

      for (const [nextD, [dx, dy]] of moves.entries()) {
        const nx = dx + x;
        const ny = dy + y;
        if (!isValid(nx, ny) || board[nx][ny] === 1) continue;

        if (nx === 1 && ny === 2) {
          console.log(x, y, d, nextD);
          // console.log(nextD, d);
        }

        const newCost: number =
          d === -1 || d === nextD ? currentCost + 100 : currentCost + 600;

        if (nx === n - 1 && ny === n - 1) {
          result = Math.min(result, newCost);
          continue;
        }

        if (newCost < distInfo[nx][ny]) {
          distInfo[nx][ny] = newCost;
          queue.enqueue([nx, ny, nextD]);
        }
      }
    }

    console.log(distInfo);
    return result;
  };

  return dfs();
};

// console.log(
//   solution4([
//     [0, 0, 1, 0],
//     [0, 0, 0, 0],
//     [0, 1, 0, 1],
//     [1, 0, 0, 0],
//   ]),
// );

// console.log(
//   solution4([
//     [0, 0, 0, 0, 0, 0],
//     [0, 1, 1, 1, 1, 0],
//     [0, 0, 1, 0, 0, 0],
//     [1, 0, 0, 1, 0, 1],
//     [0, 1, 0, 0, 0, 1],
//     [0, 0, 0, 0, 0, 0],
//   ]),
// );

/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/86971
 */

const solution5 = (n: number, wires: number[][]) => {
  const makeGrape = () => {
    const grape: Record<number, number[]> = {};

    for (const [node1, node2] of wires) {
      grape[node1] = (grape[node1] || []).concat(node2);
      grape[node2] = (grape[node2] || []).concat(node1);
    }

    return grape;
  };

  const dfs = (start: number, parent: number) => {
    let cnt = 1;
    for (const nextNode of grape[start]) {
      if (nextNode === parent) continue;
      cnt += dfs(nextNode, start);
    }
    return cnt;
  };

  const grape = makeGrape();
  let result = Number.MAX_SAFE_INTEGER;

  for (const [index, [node1, node2]] of wires.entries()) {
    grape[node1].splice(grape[node1].indexOf(node2), 1);
    grape[node2].splice(grape[node2].indexOf(node1), 1);

    const cntA = dfs(node1, node2);
    const cntB = n - cntA;
    result = Math.min(Math.abs(cntA - cntB), result);

    grape[node1].push(node2);
    grape[node2].push(node1);
  }

  return result;
};

console.log(
  solution5(9, [
    [1, 3],
    [2, 3],
    [3, 4],
    [4, 5],
    [4, 6],
    [4, 7],
    [7, 8],
    [7, 9],
  ]),
);
