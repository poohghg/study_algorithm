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
// https://school.programmers.co.kr/learn/courses/30/lessons/388352/questions

const secretCode = (n: number, q: number[][], ans: number[]) => {
  const dfs = (count: number, arr: number[], subs?: number[][]) => {
    const res: number[][] = [];
    const temp: number[] = [];

    const loop = (level: number, start: number) => {
      if (count === level) {
        const copy = [...temp];
        if (subs) {
          for (const sub of subs) {
            const candidate = [...sub, ...copy];
            if (validArray(candidate)) res.push(candidate);
          }
        } else {
          res.push(copy);
        }
        return;
      }

      for (let i = start; i < arr.length; i++) {
        temp.push(arr[i]);
        loop(level + 1, i + 1);
        temp.pop();
      }
    };

    loop(0, 0);
    return res;
  };

  const validArray = (arr: number[]) => {
    for (const [i, queryArr] of q.entries()) {
      const set = new Set(arr.concat(queryArr));
      if (10 - set.size !== ans[i]) return false;
    }
    return true;
  };

  const maxAns = Math.max(...ans);
  const maxIdx = ans.indexOf(maxAns);
  const candidate = q[maxIdx];
  const candidateSet = new Set(candidate);
  const nArray: number[] = Array.from(
    { length: n },
    (_, i: number) => i + 1,
  ).filter((n) => !candidateSet.has(n));

  const maxArray = dfs(maxAns, candidate);
  return dfs(5 - maxAns, nArray, maxArray).length;
};

// console.log(
//   secretCode(
//     10,
//     [
//       [1, 2, 3, 4, 5],
//       [6, 7, 8, 9, 10],
//       [3, 7, 8, 9, 10],
//       [2, 5, 7, 9, 10],
//       [3, 4, 5, 6, 7],
//     ],
//     [2, 3, 4, 3, 3],
//   ),
// );
// console.log(
//   secretCode(
//     15,
//     [
//       [2, 3, 9, 12, 13],
//       [1, 4, 6, 7, 9],
//       [1, 2, 8, 10, 12],
//       [6, 7, 11, 13, 15],
//       [1, 4, 10, 11, 14],
//     ],
//     [2, 1, 3, 0, 1],
//   ),
// );

// https://school.programmers.co.kr/learn/courses/30/lessons/389481
const sealedSpell = (n: number, bans: string[]) => {
  const size = 26;
  const alphabet = Array.from({ length: size }, (_, i) =>
    String.fromCharCode('a'.charCodeAt(0) + i),
  );
  let removeCount = 0;
  for (const ban of bans) {
    let len = ban.length - 1;
    let code = 0;
    for (const s of ban) {
      const idx = alphabet.indexOf(s) + 1;
      code += +len * size;
      len--;
    }
  }
};

// console.log(sealedSpell(30, ['d', 'e', 'bb', 'aa', 'ae']));
// console.log(sealedSpell(30, ['d', 'e', 'bb', 'aa', 'ae']));

// https://school.programmers.co.kr/learn/courses/30/lessons/258709

const selectDice = (dice: number[][]) => {
  const canPickIndexes = (
    level: number = 0,
    result: number[][] = [],
    temp: number[] = [],
  ) => {
    if (half === level) {
      result.push([...temp]);
      return;
    }

    for (let i = 0; i < 6; i++) {
      temp.push(i);
      canPickIndexes(level + 1, result, temp);
      temp.pop();
    }
    return result;
  };

  const dfs = (
    level: number = 0,
    start: number = 0,
    result: number[][] = [],
    temp: number[] = [],
  ) => {
    if (half === level) {
      result.push([...temp]);
      return;
    }

    for (let i = start; i < size; i++) {
      temp.push(i);
      dfs(level + 1, i + 1, result, temp);
      temp.pop();
    }

    return result;
  };

  const getScores = (indexes: number[]) => {
    const scores: number[] = [];

    for (const indexSet of pickIndexes) {
      let score = 0;
      for (const [i, x] of indexSet.entries()) {
        score += dice[indexes[i]][x];
      }
      scores.push(score);
    }
    scores.sort((a, b) => a - b);

    return scores;
  };

  const getWinCount = (arr1: number[], arr2: number[]) => {
    const maxValue = Math.max(...arr1, ...arr2);
    const count = new Array(maxValue + 1).fill(0);
    for (const v of arr2) count[v]++;

    const prefix = [...count];
    for (let i = 2; i <= maxValue; i++) prefix[i] += prefix[i - 1];

    let result = 0;
    for (const n of arr1) result += prefix[n - 1] ?? 0;

    return result;
  };

  const size = dice.length;
  const half = size / 2;
  const indexes = Array.from({ length: size }, (_, i) => i);
  const pickIndexes = canPickIndexes()!;
  const combinableIndexes = dfs()!;
  const maps = new Map<string, number[]>();
  let maxWinCount = 0;
  let result: number[] = [];

  for (const my of combinableIndexes) {
    const you = indexes.filter((v) => !my.includes(v));
    const myKey = my.join('');
    const youKey = you.join('');

    if (!maps.has(myKey)) maps.set(myKey, getScores(my));
    if (!maps.has(youKey)) maps.set(youKey, getScores(you));
    let winCount = getWinCount(maps.get(myKey)!, maps.get(youKey)!);

    if (winCount > maxWinCount) {
      maxWinCount = winCount;
      result = [...my];
    }
  }
  return result.map((v) => v + 1);
};

// console.log(
//   selectDice([
//     [1, 2, 3, 4, 5, 6],
//     [3, 3, 3, 3, 4, 4],
//     [1, 3, 3, 4, 4, 4],
//     [1, 1, 4, 4, 5, 5],
//     [1, 1, 4, 4, 5, 5],
//     [1, 1, 4, 4, 5, 5],
//   ]),
// );
// console.log(
//   selectDice([
//     [40, 41, 42, 43, 44, 45],
//     [43, 43, 42, 42, 41, 41],
//     [1, 1, 80, 80, 80, 80],
//     [70, 70, 1, 1, 70, 70],
//   ]),
// );

const bandaging = (bandage: number[], health: number, attacks: number[][]) => {
  const max = health;
  const bonus = bandage[2];
  let prev = 0;
  for (const [time, damage] of attacks) {
    // const sequenceTime = time - prev;
    // const bonus = Math.floor(sequenceTime/)
  }
};

// 시전 시간, 초당 회복량, 추가 회복량
// console.log(
//   bandaging([5, 1, 5], 30, [
//     [2, 10],
//     [9, 15],
//     [10, 5],
//     [11, 5],
//   ]),
// );

//https://school.programmers.co.kr/learn/courses/30/lessons/178871
const calling = (players: string[], callings: string[]) => {
  const rankMap = new Map<string, number>();
  players.forEach((v, i) => rankMap.set(v, i));

  for (const caller of callings) {
    const callerRank = rankMap.get(caller)!;
    const callerPrevRankName = players[callerRank - 1];

    // array swap
    [players[callerRank], players[callerRank - 1]] = [
      players[callerRank - 1],
      players[callerRank],
    ];

    // rankMap swap
    rankMap.set(caller, callerRank - 1);
    rankMap.set(callerPrevRankName, callerRank);
  }

  return players;
};

console.log(
  calling(
    ['mumu', 'soe', 'poe', 'kai', 'mine'],
    ['kai', 'kai', 'mine', 'mine'],
  ),
);
