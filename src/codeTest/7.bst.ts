export default {};

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

function power(m: number, n: number): number {
  if (n === 0) return 1;
  return power(m, n - 1) * 2;
}

// power(2,0) // 1
// power(2,2) // 4
// power(2,4) // 16
// console.log(power(2, 0));
// console.log(power(2, 2));
// console.log(power(2, 4));

function fib(n: number, dp: number[] = []): number {
  if (dp[n]) return dp[n];
  if (n <= 2) {
    dp[n] = 1;
    return 1;
  }

  dp[n] = fib(n - 1, dp) + fib(n - 2, dp);
  return dp[n];
}

// fib(4) // 3
// fib(10) // 55
// fib(28) // 317811
// fib(35) // 9227465
// console.log(fib(4));
// console.log(fib(10));
// console.log(fib(28));

// 0 1 1 2 3 5

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

console.log(
  solution3_1(
    [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [
      [0, 1],
      [1, 2],
      [1, 4],
      [0, 8],
      [8, 7],
      [9, 10],
      [9, 11],
      [4, 3],
      [6, 5],
      [4, 6],
      [8, 9],
    ],
  ),
);

const q = new Queue([1]);
