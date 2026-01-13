export default {};

const mod = Math.pow(10, 9) + 7;

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

//https://leetcode.com/problems/separate-squares-i/description/?envType=daily-question&envId=2026-01-13
function separateSquares(squares: number[][]): number {
  // x,y,l
  const widths: number[] = [0];

  for (const [x, y, l] of squares) {
    for (let i = y; i < y + l; i++) {
      widths[i] = (widths[i] ?? 0) + l;
    }
  }

  console.log(widths);

  return 1;
}

console.log(
  separateSquares([
    [0, 0, 2],
    [1, 1, 1],
  ]),
);

function subtreeWithAllDeepest(root: TreeNode | null): TreeNode | null {
  const dfs = (
    node: TreeNode | null,
  ): { node: TreeNode | null; depth: number } => {
    if (!node)
      return {
        node: null,
        depth: 0,
      };

    const leftNode = dfs(node.left);
    const rightNode = dfs(node.right);

    if (leftNode.depth === rightNode.depth) {
      return {
        node: node,
        depth: leftNode.depth + 1,
      };
    } else if (leftNode.depth < rightNode.depth) {
      return {
        node: rightNode.node,
        depth: rightNode.depth + 1,
      };
    } else {
      return {
        node: leftNode.node,
        depth: leftNode.depth,
      };
    }
  };

  return dfs(root).node;
}

//[0,1,3,null,2]
// console.log(
//   subtreeWithAllDeepest(
//     new TreeNode(0, new TreeNode(1, null, new TreeNode(2)), new TreeNode(3)),
//   ),
// );

// console.log(
//   subtreeWithAllDeepest(
//     new TreeNode(
//       3,
//       new TreeNode(
//         5,
//         new TreeNode(6),
//         new TreeNode(2, new TreeNode(7), new TreeNode(4)),
//       ),
//       new TreeNode(1, new TreeNode(0), new TreeNode(8)),
//     ),
//   ),
// );

//https://leetcode.com/problems/maximum-product-of-splitted-binary-tree/?envType=daily-question&envId=2026-01-07
function maxProduct(root: TreeNode | null): number {
  const getTotalSum = (node: TreeNode | null): number => {
    if (!node) return 0;
    return node.val + getTotalSum(node.left) + getTotalSum(node.right);
  };

  const totalSum = getTotalSum(root);

  let max = 0;
  const dfs = (node: TreeNode | null): number => {
    if (!node) return 0;

    const currentSum = node.val + dfs(node.left) + dfs(node.right);
    max = Math.max(max, (totalSum - currentSum) * currentSum);
    return currentSum;
  };

  dfs(root);
  return max % mod;
}

// console.log(
//   maxProduct(
//     new TreeNode(
//       1,
//       new TreeNode(2, new TreeNode(4), new TreeNode(5)),
//       new TreeNode(3, new TreeNode(6)),
//     ),
//   ),
// );

function maxLevelSum(root: TreeNode | null): number {
  const sums = new Map<number, number>();

  const dfs = (node: TreeNode | null, level: number) => {
    if (!node) return;

    sums.set(level, (sums.get(level) ?? 0) + node.val);
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  };

  dfs(root, 1);

  let result = 0;
  let max = Number.MIN_SAFE_INTEGER;
  for (const [level, sum] of sums) {
    if (max < sum) {
      max = sum;
      result = level;
    }
  }

  return result;
}

//  [1,7,0,7,-8,null,null]
// console.log(
//   maxLevelSum(
//     new TreeNode(
//       1,
//       new TreeNode(7, new TreeNode(7), new TreeNode(-8)),
//       new TreeNode(0),
//     ),
//   ),
// );

function verifySameMultisetDifferentStructure(
  root1: number[],
  root2: number[],
): boolean {
  const preOrder = (
    nodeIndex: number,
    array: number[],
    values: number[] = [],
    structure: number[] = [],
  ): { values: number[]; structure: number[] } => {
    if (array.length <= nodeIndex) {
      structure.push(-1);
      return { values, structure };
    }

    const nodeValue = array[nodeIndex];

    if (nodeValue === nullValue) {
      structure.push(-1);
      return { values, structure };
    }

    values.push(nodeValue);
    structure.push(1);

    const left = nodeIndex * 2 + 1;
    const right = nodeIndex * 2 + 2;

    preOrder(left, array, values, structure);
    preOrder(right, array, values, structure);

    return { values, structure };
  };

  const sameMultiset = (data1: number[], data2: number[]) => {
    const makeMap = (data: number[]) =>
      data.reduce((map, currentValue) => {
        map.set(currentValue, (map.get(currentValue) ?? 0) + 1);
        return map;
      }, new Map<number, number>());

    const map = makeMap(data1);

    for (const v of data2) {
      if (!map.has(v)) return false;
      map.set(v, map.get(v)! - 1);
      if (map.get(v) === 0) map.delete(v);
    }

    return map.size === 0;
  };

  const sameStructures = (data1: number[], data2: number[]) => {
    for (let i = 0; i < data1.length; i++) {
      const v1 = data1[i];
      const v2 = data2[i];

      if (v1 !== v2) return false;
    }

    return true;
  };

  const nullValue = 100001;
  const { values: v1, structure: s1 } = preOrder(0, root1);
  const { values: v2, structure: s2 } = preOrder(0, root2);

  return sameMultiset(v1, v2) && !sameStructures(s1, s2);
}

// console.log(
//   verifySameMultisetDifferentStructure(
//     [4, 2, 5, 1, 3, 100001, 100001],
//     [3, 1, 5, 100001, 2, 4, 100001],
//   ),
// );

const getBinarySearchTreeHeight = (
  values: number[],
  leftChild: number[],
  rightChild: number[],
): number => {
  const treeHeight = (node: number): number => {
    if (node === -1) return -1;
    return (
      1 + Math.max(treeHeight(leftChild[node]), treeHeight(rightChild[node]))
    );
  };

  return treeHeight(0) + 1;
};

// console.log(
//   getBinarySearchTreeHeight(
//     [4, 2, 6, 1, 3, 5, 7],
//     [1, 3, 5, -1, -1, -1, -1],
//     [2, 4, 6, -1, -1, -1, -1],
//   ),
// );

function solution1(n: number, a: number, b: number) {
  const m = Math.log2(n);

  let aNum = a;
  let bNum = b;

  for (let i = 1; i <= m; i++) {
    aNum = Math.ceil(aNum / 2);
    bNum = Math.ceil(bNum / 2);
    if (aNum === bNum) return i;
  }

  // [실행] 버튼을 누르면 출력 값을 볼 수 있습니다.
  // 1 2 3 4 5 6 7 8 1
  //  1   2   3   4  2
  //    1       2    3
  //        1        4
}

// console.log(solution1(8, 4, 7));
// console.log(solution1(8, 3, 4));
// console.log(solution1(8, 4, 7));

function solution2(
  enroll: string[],
  referral: string[],
  seller: string[],
  amount: number[],
) {
  const n = enroll.length;
  const tree = {} as Record<
    string,
    {
      parent: string;
      result: number;
    }
  >;

  for (let i = 0; i < n; i++) {
    const parent = referral[i];
    const children = enroll[i];
    tree[children] = {
      parent: parent,
      result: 0,
    };
  }

  for (let i = 0; i < seller.length; i++) {
    let money = amount[i] * 100;
    let currentName = seller[i];

    while (1 <= money && currentName !== '-') {
      tree[currentName].result += money - Math.floor(money / 10);
      currentName = tree[currentName].parent;
      money = Math.floor(money / 10);
    }
  }

  return Object.values(tree).map((v) => v.result);
}

// console.log(
//   solution2(
//     ['john', 'mary', 'edward', 'sam', 'emily', 'jaimie', 'tod', 'young'],
//     ['-', '-', 'mary', 'edward', 'mary', 'mary', 'jaimie', 'edward'],
//     ['young', 'john', 'tod', 'emily', 'mary'],
//     [12, 4, 2, 5, 10],
//   ),
// );

// ["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"]	["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"]	["sam", "emily", "jaimie", "edward"]	[2, 3, 5, 4]	[0, 110, 378, 180, 270, 450, 0, 0]

// console.log(
//   solution2(
//     ['john', 'mary', 'edward', 'sam', 'emily', 'jaimie', 'tod', 'young'],
//     ['-', '-', 'mary', 'edward', 'mary', 'mary', 'jaimie', 'edward'],
//     ['sam', 'emily', 'jaimie', 'edward'],
//     [2, 3, 5, 4],
//   ),
// );

class Queue<T> {
  private readonly data: T[] = [];
  private headIdx: number = 0;
  private tailIndex = 0;

  constructor(init?: T | T[]) {
    if (!init) return;

    if (Array.isArray(init)) {
      init.forEach((v) => this.enqueue(v));
    } else {
      this.data = [init];
    }
  }

  get size() {
    return this.tailIndex - this.headIdx;
  }

  enqueue(value: T) {
    this.data.push(value);
    this.tailIndex++;
  }

  dequeue(): T | undefined {
    if (this.size === 0) return;
    return this.data[this.headIdx++];
  }
}

// https://school.programmers.co.kr/learn/courses/30/lessons/92343
function solution3(info: number[], edges: [number, number][]) {
  const makeNextData = (
    nextNode: number,
    sheepCnt: number,
    wolfCnt: number,
    visited: Set<number>,
  ): [number, number, number, Set<number>] => {
    const newVisited = new Set(visited);
    newVisited.delete(nextNode);
    return [nextNode, sheepCnt, wolfCnt, newVisited];
  };

  const tree = Array.from({ length: info.length }, (): number[] => []);
  for (const [from, to] of edges) tree[from].push(to);

  // 큐에 (현재 위치, count, 현재까지 이동한 배열을 넣는다?)
  const queue = new Queue<[number, number, number, Set<number>]>([
    [0, 1, 0, new Set()],
  ]);

  let max = 0;
  while (queue.size) {
    const [current, sheepCnt, wolfCnt, visited] = queue.dequeue()!;

    max = Math.max(sheepCnt, max);
    // 갈 수 있는 다음 노드들을 추가한다.
    for (const next of tree[current]) visited.add(next);

    for (const next of visited) {
      // 양이라면
      if (info[next] === 0) {
        const nextData = makeNextData(next, sheepCnt + 1, wolfCnt, visited);
        queue.enqueue(nextData);
      } else if (sheepCnt > wolfCnt + 1) {
        const nextData = makeNextData(next, sheepCnt, wolfCnt + 1, visited);
        queue.enqueue(nextData);
      }
    }
  }

  return max;
}

function solution3_1(info: number[], edges: [number, number][]) {
  const tree = Array.from({ length: info.length }, (): number[] => []);
  for (const [from, to] of edges) tree[from].push(to);

  let max = 0;

  const dfs = (
    node: number,
    sheep: number,
    wolf: number,
    visit: Set<number>,
  ) => {
    if (sheep < wolf) return;

    max = Math.max(max, sheep);

    // 현재 노드에서 갈 수 있는 노드를 추가.
    for (const willMove of tree[node]) visit.add(willMove);

    for (const next of visit) {
      const newVisit = new Set(visit);
      newVisit.delete(next);
      if (info[next] === 0) {
        dfs(next, sheep + 1, wolf, newVisit);
      } else {
        dfs(next, sheep, wolf + 1, newVisit);
      }
    }
  };

  dfs(0, 1, 0, new Set());
  return max;
}

// console.log(
//   solution3_1(
//     [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
//     [
//       [0, 1],
//       [1, 2],
//       [1, 4],
//       [0, 8],
//       [8, 7],
//       [9, 10],
//       [9, 11],
//       [4, 3],
//       [6, 5],
//       [4, 6],
//       [8, 9],
//     ],
//   ),
// );

// https://school.programmers.co.kr/learn/courses/30/lessons/43236
// 5만 이하?
// 바위 두개를 제거했을때 최솟값중 가장 큰값
function steppingStones(distance: number, rocks: number[], n: number) {
  const getRemoveCount = (midDist: number) => {
    let count = 0;
    let prev = 0;
    for (let i = 0; i < rocks.length; i++) {
      const diff = rocks[i] - prev;
      if (diff < midDist) {
        count++;
      } else {
        prev = rocks[i];
      }
    }
    return count;
  };

  rocks.push(distance);
  rocks.sort((a, b) => a - b);
  let left = 1;
  let right = distance;
  let result = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const removeCount = getRemoveCount(mid);

    if (removeCount > n) {
      // 최소 간격이 커 최소거리를 줄인다.
      right = mid - 1;
    } else {
      result = mid;
      left = mid + 1;
    }
  }
  return result;
}

// console.log(steppingStones(25, [2, 11, 14, 17, 21], 2));

// https://school.programmers.co.kr/learn/courses/30/lessons/389480
// 완전범죄
function perfectCrime(info: [number, number][], n: number, m: number) {
  // A도둑이 훔칠수 있는 최소값을 바이너리 서치형태로 구하고 남은 값을 B도둑이 털 수 있는지 확인한다.
  // A가 털려고 할때 B가 높은거부터 턴다.
  info.sort((a, b) => {
    if (a[1] === b[1]) return a[0] - b[0];
    return b[1] - a[1];
  });

  const size = info.length;

  const getRest = (min: number) => {
    let rest = [];
    for (let i = 0; i < size; i++) {
      const currentValue = info[i][0];
      if (currentValue <= min) {
        min -= currentValue;
      } else {
        rest.push(info[i][1]);
      }
    }
    return rest;
  };

  const isValid = (arr: number[]) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
      if (sum >= m) return false;
    }
    return true;
  };

  let left = 0;
  let right = n - 1;
  let result = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const rest = getRest(mid);
    // B가 더 털 수 있다면(조건에 부합한다.) A는 더 적게 턴다.
    if (isValid(rest)) {
      result = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return result;
}

// console.log(
//   perfectCrime(
//     [
//       [1, 2],
//       [2, 3],
//       [2, 1],
//     ],
//     4,
//     4,
//   ),
// );

// console.log(
//   perfectCrime(
//     [
//       [1, 4],
//       [1, 3],
//       [1, 4],
//     ],
//     6,
//     4,
//   ),
// );
//
// console.log(
//   perfectCrime(
//     [
//       [3, 3],
//       [3, 3],
//     ],
//     6,
//     1,
//   ),
// );
//
// console.log(
//   perfectCrime(
//     [
//       [1, 3],
//       [1, 3],
//       [1, 1],
//       [1, 1],
//       [1, 1],
//       [2, 3],
//       [2, 3],
//     ],
//     6,
//     7,
//   ),
// ); // 4

//https://school.programmers.co.kr/learn/courses/30/lessons/118668
const solution4 = (alp: number, cop: number, problems: number[][]) => {
  // 알고력이 최대값이 되기위한 조건?
  let [maxAlp, maxCop] = [alp, cop];
  problems.forEach((v) => {
    maxAlp = Math.max(maxAlp, v[0]);
    maxCop = Math.max(maxCop, v[1]);
  });
  const dp = Array.from({ length: maxAlp + 1 }, () =>
    new Array(maxCop + 1).fill(Infinity),
  );

  dp[alp][cop] = 0;

  for (let i = alp; i < maxAlp; i++) {
    dp[i][cop] = (dp[i - 1]?.[cop] ?? -1) + 1;
    for (let j = cop; j < maxCop; j++) {
      dp[i][j + 1] = dp[i][j] + 1;
    }
  }

  // 초기 alp, cop가 maxAlp, maxCop보다 클 경우에는 루프를 아예 시작하지 않음.
  for (let a = alp; a <= maxAlp; a++) {
    for (let c = cop; c <= maxCop; c++) {
      if (dp[a][c] === Infinity) continue;
      const currentCost = dp[a][c];
      if (a === maxAlp && c === maxCop) break;
      for (const [alp_req, cop_req, alp_rwd, cop_rwd, cost] of problems) {
        if (alp_req <= a && cop_req <= c) {
          // const nextA = Math.min(maxAlp, a + alp_rwd);
          const nextA = maxAlp < a + alp_rwd ? maxAlp : a + alp_rwd;
          // const nextC = Math.min(maxCop, c + cop_rwd);
          const nextC = maxCop < c + cop_rwd ? maxCop : c + cop_rwd;
          // dp[nextA][nextC] = Math.min(dp[nextA][nextC], currentCost + cost);
          dp[nextA][nextC] =
            dp[nextA][nextC] < currentCost + cost
              ? dp[nextA][nextC]
              : currentCost + cost;
        }
      }
    }
  }

  return dp[maxAlp][maxCop];
};

// alp_req, cop_req, alp_rwd, cop_rwd, cost
// console.log(
//   solution4(10, 10, [
//     [10, 15, 2, 1, 2],
//     [20, 20, 3, 3, 4],
//   ]),
// );

// https://school.programmers.co.kr/learn/courses/30/lessons/340212
const solution5 = (diffs: number[], times: number[], limit: number) => {
  const canSolution = (ability: number) => {
    let totalTime = 0;
    for (let i = 0; i < diffs.length; i++) {
      if (limit < totalTime) return false;
      const diff = diffs[i];
      const time = times[i];
      if (diff <= ability) {
        totalTime += time;
      } else {
        totalTime += (diff - ability) * (time + (times[i - 1] ?? 0)) + time;
      }
    }
    return totalTime <= limit;
  };

  let minAbility = 1;
  let maxAbility = diffs.reduce((a, b) => (a < b ? b : a), 1);
  let result = 0;
  while (minAbility <= maxAbility) {
    const mid = Math.floor((minAbility + maxAbility) / 2);
    if (canSolution(mid)) {
      result = mid;
      maxAbility = mid - 1;
    } else {
      minAbility = mid + 1;
    }
  }
  return result;
};

// console.log(solution5([1, 4, 4, 2], [6, 3, 8, 2], 59));
