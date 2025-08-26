import PriorityQueue from '../dataStructure/PriorityQueue';

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

// console.log(downToZero(966514)); //8
// console.log(downToZero(0)); //8

function shortestReach(n: number, edges: number[][], s: number): number[] {
  const graph = Array.from({ length: n + 1 }, (): [number, number][] => []);

  for (const [node1, node2, cost] of edges) {
    graph[node1].push([node2, cost]);
    graph[node2].push([node1, cost]);
  }

  const bfs = (s: number) => {
    const dists = Array.from({ length: n + 1 }, () => Infinity);
    const unVisited = new Set(graph.keys());
    dists[s] = 0;

    while (unVisited.size) {
      const current = Array.from(unVisited).reduce((a, b) => {
        if (dists[a] > dists[b]) return b;
        return a;
      });

      const currentCost = dists[current];
      if (currentCost === Infinity) break;
      unVisited.delete(current);

      for (const [nextNode, nextCost] of graph[current] ?? []) {
        if (currentCost + nextCost < dists[nextNode]) {
          dists[nextNode] = currentCost + nextCost;
        }
      }
    }

    return dists;
  };

  const dists = bfs(s);
  dists.splice(s, 1);
  dists.splice(0, 1);
  return dists;
}

// https://school.programmers.co.kr/learn/courses/30/lessons/388353
const forklift = (storage: string[], requests: string[]) => {
  const n = storage.length;
  const m = storage[0].length;
  const moves = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const maps = storage.map((s) => s.split(''));

  const isValidPos = (x: number, y: number) =>
    0 <= x && x < n && 0 <= y && y < m;

  const canMoveOutside = (x: number, y: number) => {
    const visited = Array.from({ length: n }, () => new Array(m).fill(false));
    const q = [[x, y]];
    visited[x][y] = true;

    while (q.length) {
      const [cx, cy] = q.shift()!;
      for (const [dx, dy] of moves) {
        const [nx, ny] = [cx + dx, cy + dy];
        if (!isValidPos(nx, ny)) return true;
        if (visited[nx][ny]) continue;
        if (maps[nx][ny] === '') {
          q.push([nx, ny]);
          visited[nx][ny] = true;
        }
      }
    }
    return false;
  };

  const isOutsideNearby = (x: number, y: number): boolean => {
    for (const [dx, dy] of moves) {
      const [nx, ny] = [x + dx, y + dy];
      // 주변이 밖이 거나
      if (!isValidPos(nx, ny)) return true;
      // bfs로 해당 위치에서 밖으로 갈 수 있는지 확인?
      if (maps[nx][ny] === '' && canMoveOutside(nx, ny)) return true;
    }

    return false;
  };

  for (const request of requests) {
    const updatePos = [];
    const size = request.length;

    if (size === 2) {
      for (const [i, row] of maps.entries()) {
        for (const [j, s] of row.entries()) {
          if (s === request[0]) {
            updatePos.push([i, j]);
          }
        }
      }
    } else {
      for (const [i, row] of maps.entries()) {
        for (const [j, s] of row.entries()) {
          if (s === request && isOutsideNearby(i, j)) {
            updatePos.push([i, j]);
          }
        }
      }
    }

    updatePos.forEach(([i, j]) => {
      maps[i][j] = '';
    });
  }

  return maps.flat().filter((v) => v !== '').length;
};

// console.log(forklift(['AZWQY', 'CAABX', 'BBDDA', 'ACACA'], ['A', 'BB', 'A']));
// console.log(
//   forklift(['HAH', 'HBH', 'HHH', 'HAH', 'HBH'], ['C', 'B', 'B', 'B', 'B', 'H']),
// );

// https://school.programmers.co.kr/learn/courses/30/lessons/258711
const donutAndLeafGraph = (edges: [number, number][]) => {
  const bfs = (start: number) => {
    const q = [start];
    const visited = new Set<number>();
    let edges = 0;
    visited.add(start);

    while (q.length) {
      const currentNode = q.shift()!;
      for (const nextNode of graph.get(currentNode) ?? []) {
        edges++;
        if (!visited.has(nextNode)) {
          q.push(nextNode);
          visited.add(nextNode);
        }
      }
    }

    return [visited.size, edges];
  };

  const calcedGraphCount = (arr: number[][]) => {
    // 도넛 모양 그래프의 수, 막대 모양 그래프의 수, 8자 모양 그래프의 수
    // donut, line , leaf
    const result = [0, 0, 0];
    for (const [nodes, edges] of arr) {
      // donut: n,n
      // line: n,n-1
      // leaf n+1,n+2
      if (nodes === edges) {
        result[0]++;
      } else if (nodes - 1 === edges) {
        result[1]++;
      } else {
        result[2]++;
      }
    }
    return result;
  };

  const graph = new Map<number, number[]>([[0, []]]);
  const startNodes = new Set<number>();
  const nextNodes = new Set<number>();

  for (const [node1, node2] of edges) {
    if (!graph.has(node1)) graph.set(node1, []);
    graph.get(node1)?.push(node2);
    startNodes.add(node1);
    nextNodes.add(node2);
  }

  // root를 찾는다.
  // start는 할수 있지만 도달할 수 없는 노드
  const roots = [];
  for (const key of graph.keys()) {
    if (startNodes.has(key) && !nextNodes.has(key)) {
      roots.push(key);
    }
  }

  const root = roots.reduce((a, b) => {
    if (graph.get(a)!.length < graph.get(b)!.length) return b;
    return a;
  }, 0);

  const graphInfo = graph.get(root)!.map((nextNodes) => bfs(nextNodes));

  return [root, ...calcedGraphCount(graphInfo)];
};

// console.log(
//   donutAndLeafGraph([
//     [4, 11],
//     [1, 12],
//     [8, 3],
//     [12, 7],
//     [4, 2],
//     [7, 11],
//     [4, 8],
//     [9, 6],
//     [10, 11],
//     [6, 10],
//     [3, 5],
//     [11, 1],
//     [5, 3],
//     [11, 9],
//     [3, 8],
//   ]),
// );

//https://school.programmers.co.kr/learn/courses/30/lessons/340211
const solution9 = (points: number[][], routes: number[][]) => {
  // r 좌표가 변하는 이동을 c 좌표가 변하는 이동보다 먼저
  const generatePath = (start: number, end: number) => {
    const [sx, sy] = points[start - 1];
    const [ex, ey] = points[end - 1];

    const path = [[sx, sy]];

    let r = sx;
    while (r !== ex) {
      r += ex < sx ? -1 : 1;
      path.push([r, sy]);
    }

    let c = sy;
    while (c !== ey) {
      c += ey < sy ? -1 : 1;
      path.push([r, c]);
    }

    if (path.length) path.pop();
    return path;
  };

  const updateMap = (pos: number[], order: number) => {
    const key = pos.join(',');
    if (!map.has(key)) map.set(key, []);
    map.get(key)?.push(order);
  };

  const map = new Map<string, number[]>();
  for (const route of routes) {
    let time = 0;
    for (let i = 0; i < route.length - 1; i++) {
      const [start, end] = [route[i], route[i + 1]];
      for (const pos of generatePath(start, end)) {
        updateMap(pos, time++);
      }
    }
    const lastIdx = route[route.length - 1];
    updateMap(points[lastIdx - 1], time);
  }

  let result = 0;
  for (const values of map.values()) {
    if (new Set(values).size === values.length) continue;
    const count = new Map();
    for (const v of values) count.set(v, (count.get(v) ?? 0) + 1);
    for (const c of count.values()) if (1 < c) result++;
  }
  return result;
};

// console.log(
//   solution9(
//     [
//       [3, 2],
//       [6, 4],
//       [4, 7],
//       [1, 4],
//     ],
//     [
//       [4, 2],
//       [1, 3],
//       [4, 2],
//       [4, 3],
//     ],
//   ),
// );

// console.log(
//   solution9(
//     [
//       [2, 2],
//       [2, 3],
//       [2, 7],
//       [6, 6],
//       [5, 2],
//     ],
//     [
//       [2, 3, 4, 5],
//       [1, 3, 4, 5],
//     ],
//   ),
// );

const solution10 = (land: number[][]) => {
  const n = land.length;
  const m = land[0].length;
  const moves = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const canMove = (x: number, y: number) => 0 <= x && x < n && 0 <= y && y < m;

  const bfs = (i: number, j: number) => {
    land[i][j] = 0;
    const queue: number[][] = [[i, j]];
    let [miny, maxy, size] = [m, 0, 0];
    while (queue.length) {
      const [x, y] = queue.shift()!;
      miny = Math.min(y, miny);
      maxy = Math.max(y, maxy);
      size++;

      for (const [dx, dy] of moves) {
        const [nx, ny] = [x + dx, y + dy];
        if (!canMove(nx, ny) || land[nx][ny] === 0) continue;
        queue.push([nx, ny]);
        land[nx][ny] = 0;
      }
    }
    return [miny, maxy, size];
  };

  const sizes = Array.from({ length: m + 1 }, () => 0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (land[i][j] === 1) {
        const [min, max, size] = bfs(i, j);
        for (let i = min; i <= max; i++) sizes[i + 1] += size;
      }
    }
  }

  return Math.max(...sizes);
};

// console.log(
//   solution10([
//     [0, 0, 0, 1, 1, 1, 0, 0],
//     [0, 0, 0, 0, 1, 1, 0, 0],
//     [1, 1, 0, 0, 0, 1, 1, 0],
//     [1, 1, 1, 0, 0, 0, 0, 0],
//     [1, 1, 1, 0, 0, 0, 1, 1],
//   ]),
// );

// https://school.programmers.co.kr/learn/courses/30/lessons/118669
// 다익스트라 응용
const solution11 = (
  n: number,
  paths: number[][],
  gates: number[],
  summits: number[],
) => {
  const graph = paths.reduce(
    (acc, curr) => {
      const [node1, node2, cost] = curr;
      acc[node1].push([node2, cost]);
      acc[node2].push([node1, cost]);
      return acc;
    },
    Array.from({ length: n + 1 }, (): number[][] => []),
  );
  const summitsSet = new Set(summits);
  const queue = new PriorityQueue<[number, number]>((a, b) => a[1] < b[1]);
  const intensities = Array.from({ length: n + 1 }, () => Infinity);
  gates.forEach((gate) => queue.push([gate, 0]));
  gates.forEach((gate) => (intensities[gate] = 0));

  while (queue.size) {
    const [node, cost] = queue.pop()!;
    if (intensities[node] < cost) continue;
    for (const [next, nextCost] of graph[node]) {
      const maxIntensity = Math.max(cost, nextCost);
      // 현재까지 온 높이가 현재 저장된 높이보다 작으면 갱신하다.
      if (maxIntensity < intensities[next]) {
        intensities[next] = maxIntensity;
        if (!summitsSet.has(next)) queue.push([next, maxIntensity]);
      }
    }
  }

  const result = [0, Infinity];
  for (const summit of summits) {
    if (intensities[summit] < result[1]) {
      result[0] = summit;
      result[1] = intensities[summit];
    } else if (intensities[summit] === result[1] && summit < result[0]) {
      result[0] = summit;
    }
  }
  return result;
};

// console.log(
//   solution11(
//     7,
//     [
//       [1, 2, 5],
//       [1, 4, 1],
//       [2, 3, 1],
//       [2, 6, 7],
//       [4, 5, 1],
//       [5, 6, 1],
//       [6, 7, 1],
//     ],
//     [3, 7],
//     [1, 5],
//   ),
// );
// console.log(
//   solution11(
//     6,
//     [
//       [1, 2, 3],
//       [2, 3, 5],
//       [2, 4, 2],
//       [2, 5, 4],
//       [3, 4, 4],
//       [4, 5, 3],
//       [4, 6, 1],
//       [5, 6, 1],
//     ],
//     [1, 3],
//     [5],
//   ),
// );

console.log(
  solution11(
    4,
    [
      [1, 3, 1],
      [1, 4, 1],
      [4, 2, 1],
    ],
    [1],
    [2, 3, 4],
  ),
);
