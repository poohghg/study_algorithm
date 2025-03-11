import SimpleQueue from '../dataStructure/SimpleQueue';

export default {};

/**
 * https://www.acmicpc.net/problem/1697
 * 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 순간이동을 하는 경우에는 1초 후에 2*X의 위치로 이동하게 된다.
 */

const solution1 = (n: number, k: number) => {
  if (n === k) return 0;

  const nextPositions = (x: number) => {
    return [x + 1, x - 1, x * 2];
  };

  const queue = new SimpleQueue(n);
  const visited: Record<number, number> = { [n]: 0 };

  while (queue.size > 0) {
    const value = queue.dequeue()!;
    const count = visited[value];

    for (const nextX of nextPositions(value)) {
      if (visited[nextX] != null) continue;
      if (nextX === k) return count + 1;
      queue.enqueue(nextX);
      visited[nextX] = count + 1;
    }
  }

  return -1;
};

// console.log(solution1(5, 17));

/**
 * https://www.acmicpc.net/problem/7562
 * 각 테스트 케이스는 세 줄로 이루어져 있다. 첫째 줄에는 체스판의 한 변의 길이 l(4 ≤ l ≤ 300)이 주어진다.
 * 체스판의 크기는 l × l이다. 체스판의 각 칸은 두 수의 쌍 {0, ..., l-1} × {0, ..., l-1}로 나타낼 수 있다. 둘째 줄과 셋째 줄에는 나이트가 현재 있는 칸, 나이트가 이동하려고 하는 칸이 주어진다.
 */

const solution2 = (
  n: number,
  start: [number, number],
  target: [number, number],
) => {
  const nextPositions = (() => {
    const directions = [
      [2, 1],
      [1, 2],
      [-2, 1],
      [-1, 2],
      [2, -1],
      [1, -2],
      [-2, -1],
      [-1, -2],
    ];

    return (x: number, y: number) =>
      directions
        .map(([px, py]) => [px + x, py + y])
        .filter(([nx, ny]) => nx >= 0 && nx < n && ny >= 0 && ny < n);
  })();

  const visited = Array.from({ length: n }, (): number[] => Array(n).fill(0));
  const queue = new SimpleQueue<[number, number]>([[0, 0]]);

  while (!queue.isEmpty) {
    const [x, y] = queue.dequeue()!;
    const dist = visited[x][y];

    for (const [nx, ny] of nextPositions(x, y)) {
      if (visited[nx][ny]) continue;
      if (nx === target[0] && ny === target[1]) return dist + 1;

      queue.enqueue([nx, ny]);
      visited[nx][ny] = dist + 1;
    }
  }

  return -1;
};
// console.log(solution2(100, [0, 0], [30, 50]));

/**
 * https://www.acmicpc.net/problem/1707
 * 이분 그래프
 */
const solution3 = (v: number, arr: number[][]) => {
  const makeGrape = () => {
    return arr.reduce(
      (acc, curr) => {
        const [node1, node2] = curr;
        acc.set(node1, [...(acc.get(node1) ?? []), node2]);
        acc.set(node2, [...(acc.get(node2) ?? []), node1]);
        return acc;
      },
      new Map() as Map<number, number[]>,
    );
  };

  const bfs = (x: number) => {
    const queue = new SimpleQueue(x);
    visited[x] = 1;

    while (!queue.isEmpty) {
      const value = queue.dequeue()!;
      const groupId = visited[value];

      for (const nextNode of grape.get(value) ?? []) {
        if (visited[nextNode] !== 0) continue;
        queue.enqueue(nextNode);
        visited[nextNode] = (groupId % 2) + 1;
      }
    }
  };

  const grape = makeGrape();
  // 1,2 그룹으로 그루핑
  const visited: number[] = Array(v + 1).fill(0);

  for (let i = 1; i <= v; i++) {
    if (visited[i] === 0) bfs(i);
  }

  for (const [key, value] of grape) {
    for (const node of value) {
      if (visited[key] === visited[node]) return 'NO';
    }
  }

  return 'YES';
};

// console.log(
//   solution3(3, [
//     [1, 3],
//     [2, 3],
//   ]),
// );

// console.log(
//   solution3(4, [
//     [1, 2],
//     [2, 3],
//     [3, 4],
//     [4, 2],
//   ]),
// );

/**
 * https://www.acmicpc.net/problem/14395
 * 정수 s가 주어진다. 정수 s의 값을 t로 바꾸는 최소 연산 횟수를 구하는 프로그램을 작성하시오.
 * 사용할 수 있는 연산은 아래와 같다.
 * s = s + s; (출력: +)
 * s = s - s; (출력: -)
 * s = s * s; (출력: *)
 * s = s / s; (출력: /) (s가 0이 아닐때만 사용 가능)
 */

type Operator = '+' | '-' | '*' | '/';

type PrevNumber = number;

const solution4 = (s: number, t: number) => {
  const maxNum = Number.MAX_SAFE_INTEGER;
  const queue = new SimpleQueue(s);
  const visited = new Map<number, [Operator, PrevNumber]>();

  const isValidNum = (nextNumber: number) => {
    return 0 < nextNumber && maxNum > nextNumber && !visited.has(nextNumber);
  };

  const calcImpl = (num: number, operator: Operator) => {
    switch (operator) {
      case '+':
        return num + num;
      case '-':
        return num - num;
      case '*':
        return num * num;
      case '/':
        return num / num;
    }
  };

  const makeResult = (startNumber: number, lastOperator: Operator) => {
    const result = [lastOperator];
    let currNum = startNumber;

    while (currNum !== s) {
      const prev = visited.get(currNum);
      if (!prev) return result;
      const [op, prevNum] = prev;
      result.push(op);
      currNum = prevNum;
    }
    return result;
  };

  const bfs = () => {
    while (!queue.isEmpty) {
      const num = queue.dequeue()!;

      for (const operator of ['*', '+', '-', '/'] as Operator[]) {
        const nextNum = calcImpl(num, operator);
        if (!isValidNum(nextNum)) continue;

        if (nextNum === t) return makeResult(num, operator).reverse();

        queue.enqueue(nextNum);
        visited.set(nextNum, [operator, num]);
      }
    }

    return -1;
  };

  return bfs();
};

console.log(solution4(7, 9));
