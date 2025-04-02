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

// console.log(solution4(7, 9));

/**
 * https://www.acmicpc.net/problem/18405
 * 첫째 줄에 자연수 N, K가 공백을 기준으로 구분되어 주어진다. (1 ≤ N ≤ 200, 1 ≤ K ≤ 1,000) 둘째 줄부터 N개의 줄에 걸쳐서 시험관의 정보가 주어진다.
 * 각 행은 N개의 원소로 구성되며, 해당 위치에 존재하는 바이러스의 번호가 공백을 기준으로 구분되어 주어진다.
 * 단, 해당 위치에 바이러스가 존재하지 않는 경우 0이 주어진다. 또한 모든 바이러스의 번호는 K이하의 자연수로만 주어진다. N+2번째 줄에는 S, X, Y가 공백을 기준으로 구분되어 주어진다. (0 ≤ S ≤ 10,000, 1 ≤ X, Y ≤ N)
 * 3
 * 1 0 2
 * 0 0 0
 * 3 0 0
 * 2 3 2
 */

const solution5 = (
  n: number,
  arr: number[][],
  [s, x, y]: [number, number, number],
) => {
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

  const grape = arr
    .reduce(
      (acc, cur, x) => {
        cur.forEach((v, y) => {
          if (v !== 0) acc.push([v, 0, [x, y]]);
        });
        return acc;
      },
      [] as [number, number, [number, number]][],
    )
    .sort((a, b) => a[0] - b[0]);
};

// console.log(
//   solution5(
//     3,
//     [
//       [1, 0, 2],
//       [0, 0, 0],
//       [3, 0, 0],
//     ],
//     [2, 3, 2],
//   ),
// );

/**
 * https://www.acmicpc.net/problem/18352
 * 첫째 줄에 도시의 개수 N, 도로의 개수 M, 거리 정보 K, 출발 도시의 번호 X가 주어진다. (2 ≤ N ≤ 300,000, 1 ≤ M ≤ 1,000,000, 1 ≤ K ≤ 300,000, 1 ≤ X ≤ N)
 * 둘째 줄부터 M개의 줄에 걸쳐서 두 개의 자연수 A, B가 공백을 기준으로 구분되어 주어진다.
 * 이는 A번 도시에서 B번 도시로 이동하는 단방향 도로가 존재한다는 의미다. (1 ≤ A, B ≤ N) 단, A와 B는 서로 다른 자연수이다.
 */

const solution6 = (n: number, k: number, x: number, arr: number[][]) => {
  const grape = arr.reduce(
    (acc, curr) => {
      const [node1, node2] = curr;
      acc.set(node1, [...(acc.get(node1) ?? []), node2]);
      return acc;
    },
    new Map() as Map<number, number[]>,
  );

  const bsf = (start: number) => {
    const visited: number[] = Array(n + 1).fill(-1);
    const queue = new SimpleQueue(start);
    visited[start] = 0;

    while (!queue.isEmpty) {
      const node = queue.dequeue()!;
      const dist = visited[node];

      for (const nextNode of grape.get(node) ?? []) {
        if (visited[nextNode] !== -1) continue;
        if (dist + 1 === k) return dist + 1;

        queue.enqueue(nextNode);
        visited[nextNode] = dist + 1;
      }
    }

    return -1;
  };

  return bsf(x);
};

// console.log(
//   solution6(4, 2, 1, [
//     [1, 2],
//     [1, 3],
//     [2, 3],
//     [2, 4],
//   ]),
// );

/**
 * https://www.acmicpc.net/problem/5567
 * 상근이는 자신의 결혼식에 학교 동기 중 자신의 친구와 친구의 친구를 초대하기로 했다. 상근이의 동기는 모두 N명이고, 이 학생들의 학번은 모두 1부터 N까지이다. 상근이의 학번은 1이다.
 * 상근이는 동기들의 친구 관계를 모두 조사한 리스트를 가지고 있다. 이 리스트를 바탕으로 결혼식에 초대할 사람의 수를 구하는 프로그램을 작성하시오.
 */

const solution7 = (n: number, arr: number[][]) => {
  const grape = arr.reduce(
    (acc, curr) => {
      const [node1, node2] = curr;
      acc.set(node1, [...(acc.get(node1) ?? []), node2]);
      return acc;
    },
    new Map() as Map<number, number[]>,
  );
  const visited: number[] = Array(n + 1).fill(-1);

  const queue = new SimpleQueue(1);
  visited[1] = 0;

  while (!queue.isEmpty) {
    const node = queue.dequeue()!;
    const cnt = visited[node];

    for (const nextNode of grape.get(node) ?? []) {
      if (visited[nextNode] !== -1) continue;
      queue.enqueue(nextNode);
      visited[nextNode] = cnt + 1;
    }
  }

  return visited.filter((v) => 0 < v && v <= 2).length;
};

console.log(
  solution7(5, [
    [1, 2],
    [1, 3],
    [3, 4],
    [2, 3],
    [4, 5],
  ]),
);

console.log(
  solution7(5, [
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [2, 5],
  ]),
);
