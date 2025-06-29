export default {};

interface QueueImpl<T> {
  size: number;

  enqueue(item: T): void;

  dequeue(): T | undefined;
}

class Queue<T> implements QueueImpl<T> {
  private readonly data: T[] = [];
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

  const bfs = () => {
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

    return result;
  };

  return bfs();
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

const solution6 = (v: number, wires: [number, number][]) => {
  const grape = wires.reduce(
    (acc, wire) => {
      const [node1, node2] = wire;
      acc[node1] ? acc[node1].push(node2) : (acc[node1] = [node2]);
      acc[node2] ? acc[node2].push(node1) : (acc[node2] = [node1]);
      return acc;
    },
    {} as Record<number, number[]>,
  );

  const getGrapeCount = () => {
    const visited: number[] = new Array(v + 1).fill(0);
    const queue: number[] = [1];
    visited[1] = 1;

    while (queue.length) {
      const currentNode = queue.shift()!;
      for (const nextNode of grape[currentNode]) {
        if (visited[nextNode] === 0) {
          visited[nextNode] = 1;
          queue.push(nextNode);
        }
      }
    }

    return visited.filter((v) => v === 1).length;
  };

  let result = Number.MAX_SAFE_INTEGER;

  for (const [node1, node2] of wires) {
    grape[node1].splice(grape[node1].indexOf(node2), 1);
    grape[node2].splice(grape[node2].indexOf(node1), 1);

    const cnt = getGrapeCount();
    const restCount = v - cnt;
    result = Math.min(Math.abs(cnt - restCount), result);

    grape[node1].push(node2);
    grape[node2].push(node1);
  }

  return result;
};

// console.log(
//   solution6(9, [
//     [1, 3],
//     [2, 3],
//     [3, 4],
//     [4, 5],
//     [4, 6],
//     [4, 7],
//     [7, 8],
//     [7, 9],
//   ]),
// );
//
// console.log(
//   solution6(7, [
//     [1, 2],
//     [2, 7],
//     [3, 7],
//     [3, 4],
//     [4, 5],
//     [6, 7],
//   ]),
// );

const solution7 = (maps: string[]) => {
  const getPosition = (matcher: string): [number, number] | undefined => {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (map[i][j] === matcher) return [i, j];
      }
    }
  };

  const bfs = (start: [number, number], end: [number, number]) => {
    const validPos = (nx: number, ny: number) =>
      -1 < nx && nx < n && -1 < ny && ny < m && map[nx][ny] !== 'X';

    const moves = [
      [0, 1],
      [0, -1],
      [-1, 0],
      [1, 0],
    ];

    const visited = Array.from({ length: n }, () => new Array(m).fill(0));
    const queue = new Queue([start]);

    while (queue.size) {
      const [currentX, currentY] = queue.dequeue()!;
      const currentDist = visited[currentX][currentY];

      for (const [dx, dy] of moves) {
        const [nx, ny] = [currentX + dx, currentY + dy];
        if (validPos(nx, ny) && visited[nx][ny] === 0) {
          if (nx === end[0] && ny === end[1]) return currentDist + 1;
          visited[nx][ny] = currentDist + 1;
          queue.enqueue([nx, ny]);
        }
      }
    }

    return -1;
  };

  const n = maps.length;
  const m = maps[0].length;
  const map = maps.map((m) => m.split(''));
  let result = 0;

  const start = getPosition('S');
  const lever = getPosition('L');

  if (start && lever) {
    const dist = bfs(start, lever);
    if (dist === -1) return -1;
    result += dist;
  }

  const exit = getPosition('E');

  if (lever && exit) {
    const dist = bfs(lever, exit);
    if (dist === -1) return -1;
    result += dist;
  }

  return result;
};

// console.log(solution7(['SOOOL', 'XXXXO', 'OOOOO', 'OXXXX', 'OOOOE']));

const solution8 = (n: number, result: number[][]) => {
  const tree = Array.from({ length: n + 1 }, (): number[] => []);

  for (const [win, lose] of result) {
    tree[win].push(lose);
  }

  console.log(tree);
};

// console.log(
//   solution8(5, [
//     [4, 3],
//     [4, 2],
//     [3, 2],
//     [1, 2],
//     [2, 5],
//   ]),
// );

function downToZero(n: number) {
  if (n === 0) return 0;

  const bfs = (target: number) => {
    const visited = new Array(target + 1).fill(0);
    const q = [target];

    while (q.length) {
      const current = q.shift()!;

      if (current - 1 === 0) return visited[current] + 1;

      if (!visited[current - 1]) {
        visited[current - 1] = visited[current] + 1;
        q.push(current - 1);
      }

      for (let i = 2; i <= Math.sqrt(current); i++) {
        if (current % i === 0) {
          const max = Math.max(i, current / i);
          if (!visited[max]) {
            visited[max] = visited[current] + 1;
            q.push(max);
          }
        }
      }
    }
  };
  return bfs(n);
}

console.log(downToZero(966514)); //8
console.log(downToZero(0)); //8
