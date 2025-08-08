import PriorityQueue from '../dataStructure/PriorityQueue';

export default {};

const solution1 = (k: number, operations: (string | number)[][]) => {
  const find = (parents: number[], x: number) => {
    if (parents[x] === x) return x;
    parents[x] = find(parents, parents[x]);
    return parents[x];
  };

  const union = (parents: number[], x: number, y: number) => {
    const root1 = find(parents, x);
    const root2 = find(parents, y);
    parents[root2] = root1;
  };

  const parents = Array.from({ length: k }, (_, i) => i);
  let n = k; // 집합의 개수를 저장할 변수, 처음에는 모든 노드가 서로 다른 집합에 있으므로 k

  for (const op of operations) {
    // operations 리스트에 있는 연산들을 하나씩 처리
    if (op[0] === 'u') {
      union(parents, op[1] as number, op[2] as number); // op[1]과 op[2]가 속한 집합을 합칩니다.
    } else if (op[0] === 'f') {
      find(parents, op[1] as number);
    }
  }

  // 모든 노드의 루트 노드를 찾아서 집합의 개수를 계산
  n = new Set(
    Array.from({ length: k }, (_, i) => {
      const x = find(parents, i);
      console.log('x', x);
      return x;
    }),
  ).size;

  return n;
};

// console.log(
//   solution1(3, [
//     ['u', 0, 1],
//     ['u', 1, 2],
//     ['f', 2],
//   ]),
// ); // 반환값 : 1

const solution2 = (n: number, words: string[]) => {
  const wordSet = new Set<string>([words[0]]);
  let prevLastWord = words[0][words[0].length - 1];

  for (let i = 1; i < words.length; i++) {
    const currentWord = words[i];

    if (currentWord[0] !== prevLastWord || wordSet.has(currentWord)) {
      const no = Math.floor(i % n) + 1;
      const round = Math.floor(i / n) + 1;
      return [no, round];
    }

    prevLastWord = currentWord[currentWord.length - 1];
    wordSet.add(currentWord);
  }

  return [0, 0];
};

// console.log(
//   solution2(2, ['hello', 'one', 'even', 'never', 'now', 'world', 'draw']),
// );

const solution3 = (n: number, costs: number[][]) => {
  const graph: number[][][] = [];

  for (const [node1, node2, cost] of costs) {
    if (!graph[node1]) graph[node1] = [];
    if (!graph[node2]) graph[node2] = [];
    graph[node1].push([node2, cost]);
    graph[node2].push([node1, cost]);
  }

  console.log(graph);

  const bfs = () => {
    const pq = new PriorityQueue<[number, number]>((a, b) => a[1] - b[1]);
    const distance = Array.from({ length: n + 1 }, () => Infinity);
    pq.push([0, 0]);
    distance[0] = 0;

    while (pq.size) {
      const [node, cost] = pq.pop()!;
    }
  };
};

// console.log(
//   solution3(4, [
//     [0, 1, 1],
//     [0, 2, 2],
//     [1, 2, 5],
//     [1, 3, 1],
//     [2, 3, 8],
//   ]),
// );

const solution4 = (M: string[]) => {
  const sort = M.sort();

  for (let i = 0; i < sort.length - 1; i++) {
    const currentStr = sort[i];
    if (sort[i + 1].startsWith(currentStr)) {
      return false;
    }
  }

  return true;
};

console.log(solution4(['119', '97674223', '1101', '1195524421', '96']));
