export default {};

/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/161990?language=javascript
 */

const solution1 = (arr: string[]) => {
  // 상, 좌, 하, 우 초기값 설정
  let top = Number.MAX_SAFE_INTEGER;
  let left = Number.MAX_SAFE_INTEGER;
  let bottom = Number.MIN_SAFE_INTEGER;
  let right = Number.MIN_SAFE_INTEGER;

  arr.forEach((row, x) => {
    row.split('').forEach((char, y) => {
      if (char === '#') {
        top = Math.min(top, x);
        left = Math.min(left, y);
        bottom = Math.max(bottom, x);
        right = Math.max(right, y);
      }
    });
  });

  return [top, left, bottom + 1, right + 1]; // 직사각형 범위를 고려해 +1
};

// console.log(
//   solution1([
//     '..........',
//     '.....#....',
//     '......##..',
//     '...##.....',
//     '....#.....',
//   ]),
// );
//
// console.log(
//   solution1([
//     '.##...##.',
//     '#..#.#..#',
//     '#...#...#',
//     '.#.....#.',
//     '..#...#..',
//     '...#.#...',
//     '....#....',
//   ]),
// );

/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/389478
 * 창고에 있는 택배 상자의 개수를 나타내는 정수 n, 가로로 놓는 상자의 개수를 나타내는 정수 w와 꺼내려는 택배 상자의 번호를 나타내는 정수 num이 매개변수로 주어집니다.
 * 이때, 꺼내야 하는 상자의 총개수를 return 하도록 solution 함수를 완성해 주세요.
 */

const solution2 = (n: number, w: number, num: number) => {
  const getCol = (row: number) => {
    const forwardCol = (num - 1) % w;
    return row % 2 === 0 ? w - 1 - forwardCol : forwardCol;
  };

  const hasItemOnLastRow = () => {
    const lastRowSize = n % w;
    const col = getCol(row);

    if (lastRowSize === 0) return true;
    return totalRow % 2 === 1 ? col < lastRowSize : col >= w - lastRowSize;
  };

  const row = Math.ceil(num / w);
  const totalRow = Math.ceil(n / w);

  return hasItemOnLastRow() ? totalRow - row + 1 : totalRow - row;
};

// console.log(solution2(18, 6, 8));

/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/169199
 * 이 게임에서 말의 이동은 현재 위치에서 상, 하, 좌, 우 중 한 방향으로 게임판 위의 장애물이나 게임판 가장자리까지 부딪힐 때까지 미끄러져 움직이는 것을 한 번의 이동으로 정의합니다.
 */

const solution3 = (board: string[]) => {
  class SimpleQueue<T> {
    private items: Map<number, T> = new Map();
    private headIndex = 0;
    private tailIndex = 0;

    constructor(data?: T | T[]) {
      if (!data) return;

      if (Array.isArray(data)) {
        data.forEach((value) => this.enqueue(value));
      } else {
        this.enqueue(data);
      }
    }

    get size() {
      return this.tailIndex - this.headIndex;
    }

    get isEmpty() {
      return this.size === 0;
    }

    public enqueue(value: T) {
      this.items.set(this.tailIndex, value);
      this.tailIndex++;
    }

    public dequeue() {
      if (this.size === 0) return null;

      const item = this.items.get(this.headIndex);
      this.items.delete(this.headIndex);
      this.headIndex++;

      return item;
    }

    public peek() {
      return this.items.get(this.headIndex);
    }

    public has(value: T) {
      for (const v of this.items.values()) {
        if (v === value) return true;
      }
      return false;
    }

    public toArray() {
      return Array.from(this.items.values());
    }
  }

  const getNextPositions = (() => {
    const validPosition = (x: number, y: number) =>
      x >= 0 && x < n && y >= 0 && y < m;

    const moveUntilObstacle = (
      x: number,
      y: number,
      dx: number,
      dy: number,
    ) => {
      while (validPosition(x + dx, y + dy) && map[x + dx][y + dy] !== 'D') {
        x += dx;
        y += dy;
      }
      return [x, y];
    };

    return (x: number, y: number) =>
      [
        moveUntilObstacle(x, y, -1, 0), // 위로 이동
        moveUntilObstacle(x, y, 1, 0), // 아래로 이동
        moveUntilObstacle(x, y, 0, -1), // 왼쪽 이동
        moveUntilObstacle(x, y, 0, 1), // 오른쪽 이동
      ].filter(([nx, ny]) => nx !== x || ny !== y);
  })();

  const n = board.length;
  const m = board[0].length;
  const map = board.map((x) => x.split(''));
  const [startX, startY] = map.reduce(
    (acc, row, x) => {
      const y = row.indexOf('R');
      return y !== -1 ? [x, y] : acc;
    },
    [-1, -1],
  );

  const bfs = (x: number, y: number, count: number) => {
    const visited = Array.from({ length: n }, (): number[] =>
      new Array(m).fill(0),
    );
    visited[x][y] = 1;

    const queue = new SimpleQueue([[x, y, count]]);

    while (!queue.isEmpty) {
      const [cx, cy, count] = queue.dequeue()!;
      for (const [nx, ny] of getNextPositions(cx, cy)) {
        if (visited[nx][ny] !== 0 || map[nx][ny] === 'D') continue;
        if (map[nx][ny] === 'G') return count + 1;
        visited[nx][ny] = 1;
        queue.enqueue([nx, ny, count + 1]);
      }
    }

    return -1;
  };

  return bfs(startX, startY, 0);
};

// console.log(solution3(['...D..R', '.D.G...', '....D.D', 'D....D.', '..D....']));

const solution4 = (count: number, nums: number[]) => {
  const getLottoNumbers = () => {
    const record: Set<number> = new Set();

    while (record.size < 6) {
      const num = nums[Math.floor(Math.random() * nums.length)];

      if (record.has(num)) {
        record.delete(num);
        continue;
      }

      record.add(num);
    }
    return Array.from(record);
  };

  for (let i = 0; i < count; i++) {
    console.log(getLottoNumbers());
  }
};

// console.log(solution4(5, [9, 13, 21, 27, 34, 37, 41, 42, 44, 7, 17, 5, 29]));

/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/172928
 */

const solution5 = (park: string[], routes: string[]) => {
  const parkMap = park.map((x) => x.split(''));
  const n = park.length;
  const m = park[0].length;

  const dirMap: Record<string, [number, number]> = {
    N: [-1, 0],
    S: [1, 0],
    W: [0, -1],
    E: [0, 1],
  };

  const isValidPosition = (x: number, y: number) =>
    x >= 0 && x < n && y >= 0 && y < m;

  const canMove = (
    x: number,
    y: number,
    direction: string,
    limit: number,
  ): boolean => {
    const [dx, dy] = dirMap[direction];
    let count = 1;

    while (count <= limit) {
      const nx = x + dx * count;
      const ny = y + dy * count;
      if (!isValidPosition(nx, ny) || parkMap[nx][ny] === 'X') return false;
      count++;
    }

    return true;
  };

  const move = (startX: number, startY: number) => {
    let [x, y]: [number, number] = [startX, startY];

    for (const info of routes) {
      const [direction, count] = info.split(' ');
      if (canMove(x, y, direction, +count)) {
        const [dx, dy] = dirMap[direction];
        [x, y] = [x + dx * +count, y + dy * +count];
      }
    }

    return [x, y];
  };

  for (let x = 0; x < n; x++) {
    for (let y = 0; y < m; y++) {
      if (parkMap[x][y] === 'S') return move(x, y);
    }
  }
};

// console.log(solution5(['SOO', 'OXX', 'OOO'], ['E 2', 'S 2', 'W 1']));

/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/178870
 * 연속된 부분 수열의 합
 */

const solution6 = (sequence: number[], k: number) => {
  let headIndex = 0;
  let sum = 0;
  let size = Number.MAX_SAFE_INTEGER;
  let result: number[] = [];

  for (let i = 0; i < sequence.length; i++) {
    sum += sequence[i];

    if (sum < k) continue;

    while (sum >= k) {
      if (sum === k) {
        const currSize = i - headIndex + 1;
        if (currSize < size) {
          size = currSize;
          result = [headIndex, i];
        }
      }
      sum -= sequence[headIndex];
      headIndex++;
    }
  }

  return result;
};

// console.log(solution6([1, 1, 1, 2, 3, 4, 5], 5));

/**
 * N개의 정수로 구성된 배열 A가 주어졌을 때, A에 없는 가장 작은 양의 정수(0보다 큰)를 반환합니다.
 * 예를 들어, A = [1, 3, 6, 4, 1, 2]일 때, 함수는 5를 반환해야 합니다.
 * A = [1, 2, 3]일 때, 함수는 4를 반환해야 합니다.
 * A = [−1, −3]일 때, 함수는 1을 반환해야 합니다
 */

const solution7 = (A: number[]) => {
  const max = Math.max(...A);

  if (max < 1) return 1;

  const set = new Set(A);

  for (let i = 1; i <= max + 1; i++) {
    if (set.has(i)) continue;
    return i;
  }

  return 1;
};

/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/176963
 */

const solution8 = (name: string[], yearning: number[], photo: string[][]) => {
  const scoreMap = name.reduce<Map<string, number>>((map, n, index) => {
    map.set(n, yearning[index]);
    return map;
  }, new Map());

  return photo.map((array) =>
    array.reduce((sum, name) => sum + (scoreMap.get(name) ?? 0), 0),
  );
};

// console.log(
//   solution8(
//     ['may', 'kein', 'kain', 'radi'],
//     [5, 10, 1, 3],
//     [['may'], ['kein', 'deny', 'may'], ['kon', 'coni']],
//   ),
// );

/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/258712
 */

const solution9 = (friends: readonly string[], gifts: string[]) => {
  const friendSize = friends.length;

  const initArray = Array.from({ length: friendSize }, (): number[] =>
    Array(friendSize + 1).fill(0),
  );

  const getIndex = (name: string) =>
    friends.findIndex((friend) => friend === name);

  const records = gifts.reduce((acc, giftInfo) => {
    const [giver, receiver] = giftInfo.split(' ');
    const giverIdx = getIndex(giver);
    const receiverIdx = getIndex(receiver);

    acc[giverIdx][receiverIdx] = acc[giverIdx][receiverIdx] + 1;
    acc[giverIdx][friendSize] = acc[giverIdx][friendSize] + 1;

    acc[receiverIdx][giverIdx] = acc[receiverIdx][giverIdx] - 1;
    acc[receiverIdx][friendSize] = acc[receiverIdx][friendSize] - 1;

    return acc;
  }, initArray);

  return Math.max(
    ...records.map((record, i) => {
      let sum = 0;

      record.forEach((giftPoints, j) => {
        if (i === j || j === friendSize) return;

        if (giftPoints > 0) sum++;
        else if (
          giftPoints === 0 &&
          records[i][friendSize] > records[j][friendSize]
        )
          sum++;
      });

      return sum;
    }),
  );
};

// console.log(
//   solution9(
//     ['joy', 'brad', 'alessandro', 'conan', 'david'],
//     [
//       'alessandro brad',
//       'alessandro joy',
//       'alessandro conan',
//       'david alessandro',
//       'alessandro david',
//     ],
//   ),
// );

/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/389479
 */

const solution10 = (players: number[], m: number, k: number) => {
  let result = 0;
  const queue: number[] = [];

  players.forEach((player, time) => {
    while (queue.length && queue[0] + k === time) queue.shift();

    const needServer = Math.floor(player / m);

    while (queue.length < needServer) {
      queue.push(time);
      result++;
    }
  });

  return result;
};

console.log(
  solution10(
    [0, 2, 3, 3, 1, 2, 0, 0, 0, 0, 4, 2, 0, 6, 0, 4, 2, 13, 3, 5, 10, 0, 1, 5],
    3,
    5,
  ),
);
