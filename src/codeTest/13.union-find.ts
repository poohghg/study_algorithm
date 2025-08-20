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

  for (const op of operations) {
    if (op[0] === 'u') {
      union(parents, op[1] as number, op[2] as number);
    } else if (op[0] === 'f') {
      find(parents, op[1] as number);
    }
  }

  let n = k;
  n = new Set(
    Array.from({ length: k }, (_, i) => {
      const x = find(parents, i);
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

// https://school.programmers.co.kr/learn/courses/30/lessons/42861
const solution3 = (n: number, costs: number[][]) => {
  costs.sort((a, b) => a[2] - b[2]);

  const find = (parents: number[], node: number) => {
    if (parents[node] === node) return node;
    parents[node] = find(parents, parents[node]);
    return parents[node];
  };

  const union = (
    parents: number[],
    ranks: number[],
    root1: number,
    root2: number,
  ) => {
    // 작은 랭크 트리의 루트를 큰 랭크 트리 아래에 연결
    if (ranks[root1] < ranks[root2]) {
      parents[root1] = root2;
    } else if (ranks[root2] < ranks[root1]) {
      parents[root2] = root1;
    } else {
      // 랭크가 같다면 한쪽을 다른쪽에 붙이고 랭크를 올린다.
      parents[root2] = root1;
      ranks[root1] += 1;
    }
  };

  const parents = Array.from({ length: n }, (_, i) => i);

  const ranks = Array(n).fill(0);

  let minCost = 0;
  let edges = 0;
  for (const [node1, node2, cost] of costs) {
    if (edges === n - 1) break;

    const root1 = find(parents, node1);
    const root2 = find(parents, node2);

    if (root1 !== root2) {
      union(parents, ranks, root1, root2);
      minCost += cost;
      edges++;
    }
  }

  return minCost;
};

console.log(
  solution3(4, [
    [0, 1, 1],
    [0, 2, 2],
    [1, 2, 5],
    [1, 3, 1],
    [2, 3, 8],
  ]),
);

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

// console.log(solution4(['119', '97674223', '1101', '1195524421', '96']));
