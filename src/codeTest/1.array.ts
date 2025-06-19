export default {};

/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/42889
 * 전체 스테이지의 개수 N, 게임을 이용하는 사용자가 현재 멈춰있는 스테이지의 번호가 담긴 배열 stages가 매개변수로 주어질 때,
 * 실패율이 높은 스테이지부터 내림차순으로 스테이지의 번호가 담겨있는 배열을 return 하도록 solution 함수를 완성하라.
 */

const solution1 = (N: number, stages: number[]) => {
  const count: number[] = Array(N + 2).fill(0);

  for (const stage of stages) {
    count[stage] = count[stage] + 1;
  }

  const answer: number[] = [];
  let persons = stages.length;

  for (let i = 1; i <= N; i++) {
    answer[i] = count[i] / persons;
    persons -= count[i];
  }

  return [...answer.entries()]
    .sort(([aIndex, aFail], [bIndex, bFail]) => {
      if (aFail === bFail) return aIndex - bIndex;
      return bFail - aFail;
    })
    .map((sortingInfo) => sortingInfo[0] + 1);
};

// console.log(solution1(4, [4, 4, 4, 4, 4]));

/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/49994?language=javascript
 */

type DirType = 'U' | 'D' | 'R' | 'L';

class UniqKeySet {
  private set = new Set<string>();

  public isUniqueKeys(key: string | string[]) {
    if (Array.isArray(key)) {
      return key.every((k) => !this.set.has(k));
    }

    return !this.set.has(key);
  }

  public updateSet(keys: string[]) {
    keys.forEach((key) => this.set.add(key));
  }
}

const solution2 = (dirs: string) => {
  const dirMap: Record<DirType, [number, number]> = {
    U: [1, 0],
    D: [-1, 0],
    R: [0, 1],
    L: [0, -1],
  };

  const nextPositions = (
    [x, y]: [number, number],
    dir: DirType,
  ): [number, number] => {
    const [dx, dy] = dirMap[dir];
    const [nx, ny] = [dx + x, dy + y];

    return [nx, ny];
  };

  const canMove = ([x, y]: [number, number]) => {
    return -5 <= x && x <= 5 && -5 <= y && y <= 5;
  };

  const makeKey = (current: [number, number], next: [number, number]) => {
    const uniqKey1 = [...current, ...next].join('');
    const uniqKey2 = [...next, ...current].join('');

    return [uniqKey1, uniqKey2];
  };

  const set = new UniqKeySet();
  let position: [number, number] = [0, 0];
  let result = 0;

  for (const dir of dirs) {
    const next = nextPositions(position, dir as DirType);

    if (!canMove(next)) continue;

    const keys = makeKey(position, next);
    if (set.isUniqueKeys(keys)) result++;
    set.updateSet(keys);

    position = next;
  }

  return result;
};

// console.log(solution2('URULDD'));

/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/87390
 */
const solution3 = (n: number, left: number, right: number) => {
  const result = [];

  for (let i = left; i <= right; i++) {
    const min = Math.floor(i / n) + 1;
    const targetNum = (i % n) + 1;
    result.push(Math.max(min, targetNum));
  }

  return result;
};

// console.log(solution3(4, 7, 14));

const solution4 = (points: number[][], queries: number[][]) => {
  const ys: number[] = [];
  const xs: number[] = [];

  for (const [x, y] of points) {
    xs.push(x);
    ys.push(y);
  }

  const top = Math.max(...ys);
  const bottom = Math.min(...ys);
  const left = Math.min(...xs);
  const right = Math.max(...xs);

  console.log(top, bottom, left, right);

  const xLen = top - bottom + 1;
  const yLen = right - left + 1;

  const map = Array.from({ length: xLen }, () => Array(yLen).fill(0));

  const distY = top;
  const distX = left;

  console.log(distY, distX);

  for (const [x, y] of points) {
    // -2,-3
    const convertedY = y + distY;
    const convertedX = x + distX;

    console.log(convertedX, convertedX);
    // 여기서 컨버전이 일어나야함.
    // -3 > 5
    // -2 > 0
  }
};

// points = [[-2, -3], [0, 0], [1, 2]]
// queries = [[0, 0], [3, 5], [2, 2]]
// console.log(
//   solution4(
//     [
//       [2, -2],
//       [-2, -3],
//       [0, 0],
//       [1, 2],
//     ],
//     [
//       [0, 0],
//       [3, 5],
//       [2, 2],
//     ],
//   ),
// );

const test = () => {
  const p = new Promise((resolve, reject) => {
    console.log('pending');
    resolve('value');
    setTimeout(() => {
      console.log('time');
    }, 0);
  });

  console.log('1');

  p.then((v) => {
    console.log('then', v);
  });
};

test();
