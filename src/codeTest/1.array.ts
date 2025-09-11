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

// console.log(
//   calling(
//     ['mumu', 'soe', 'poe', 'kai', 'mine'],
//     ['kai', 'kai', 'mine', 'mine'],
//   ),
// );

//https://school.programmers.co.kr/learn/courses/30/lessons/68646
const solution5 = (a: number[]) => {
  // 더 큰 풍선만 터트릴수 있다. -> 가장 작은 풍선이 남는다.
  // 1회 더 작은 풍선을 터트릴 수 있다.
  const n = a.length;

  const leftMin = Array.from({ length: n }, () => Infinity);
  leftMin[0] = a[0];
  for (let i = 1; i < n; i++) {
    leftMin[i] = Math.min(leftMin[i - 1], a[i]);
  }

  const rightMin = Array.from({ length: n }, () => Infinity);
  rightMin[n - 1] = a[n - 1];
  for (let i = n - 2; 0 <= i; i--) {
    rightMin[i] = Math.min(rightMin[i + 1], a[i]);
  }

  let result = 0;
  for (let i = 0; i < n; i++) {
    if (a[i] <= leftMin[i] || a[i] <= rightMin[i]) {
      result++;
    }
  }

  return result;
};

// console.log(solution5([-16, 27, 65, -2, 58, -92, -71, -68, -61, -33]));

const solution6 = (user_id: string[], banned_id: string[]) => {
  const getCombinations = (candidates: string[][]) => {
    const result = new Set<string>();
    const usedNames = new Set<string>();

    const dfs = (level: number) => {
      if (level === banned_id.length) {
        const key = [...usedNames.values()].sort().join(',');
        result.add(key);
        return;
      }

      for (const userId of candidates[level] ?? []) {
        if (!usedNames.has(userId)) {
          usedNames.add(userId);
          dfs(level + 1);
          usedNames.delete(userId);
        }
      }
    };

    dfs(0);
    return result;
  };

  const isAllStar = (x: string) => {
    return [...x].every((a) => a === '*');
  };

  const isMatch = (target: string, str: string) => {
    for (let i = 0; i < target.length; i++) {
      if (target[i] === '*') continue;
      if (target[i] !== str[i]) return false;
    }
    return true;
  };

  const sizes = new Map<number, string[]>();
  for (const string of user_id) {
    const size = string.length;
    if (!sizes.has(size)) sizes.set(size, []);
    sizes.get(size)?.push(string);
  }

  let result = [];
  for (const banId of banned_id) {
    const size = banId.length;
    const candidates = sizes.get(size) ?? [];

    if (isAllStar(banId)) {
      result.push(candidates);
    } else {
      const currArr = [];
      for (const str of candidates) {
        if (isMatch(banId, str)) currArr.push(str);
      }
      if (currArr.length) result.push(currArr);
    }
  }

  return getCombinations(result).size;
};

// console.log(
//   solution6(
//     ['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'],
//     ['fr*d*', '*rodo', '******', '******'],
//   ),
// );

//https://www.hackerrank.com/challenges/the-birthday-bar/problem?isFullScreen=true
const birthday = (s: number[], d: number, m: number) => {
  return s
    .reduce(
      (acc, v, index) => {
        acc[index + 1] = acc[index] + v;
        return acc;
      },
      Array(s.length + 1).fill(0) as number[],
    )
    .map((_, i, array) => (m <= i ? array[i] - array[i - m] : null))
    .filter((v) => v === d).length;
};

// console.log(birthday([2, 2, 1, 3, 2], 4, 2));

const divisibleSumPairs = (n: number, k: number, ar: number[]) => {
  let result = 0;
  const dfs = (start: number = 0, level: number = 0, sum: number = 0) => {
    if (level === 2) {
      if (sum % k === 0) result++;
      return;
    }

    for (let i = start; i < ar.length; i++) {
      dfs(i + 1, level + 1, sum + ar[i]);
    }
  };

  dfs();
  return result;
};

// console.log(divisibleSumPairs(6, 3, [1, 3, 2, 6, 1, 2]));

const migratoryBirds = (arr: number[]) => {
  return [
    ...arr
      .reduce(
        (acc, v) => acc.set(v, acc.get(v)! + 1),
        new Map<number, number>(
          Array.from({ length: 5 }, (_, i) => [i + 1, 0]),
        ),
      )
      .entries(),
  ].reduce((max, current) => (max[1] < current[1] ? current : max))[0];
};

// console.log(migratoryBirds([1, 4, 4, 4, 5, 3]));

//https://school.programmers.co.kr/learn/courses/30/lessons/250137
const solution7 = (bandage: number[], health: number, attacks: number[][]) => {
  const [시전시간, 초당회복량, 추가회복량] = bandage;
  const [첫공격시간, 첫피해량] = attacks.shift()!;
  const maxHealth = health;

  let prevAttackTime = 첫공격시간;
  health -= 첫피해량;
  for (const [공격시간, 피해량] of attacks) {
    const tempTime = 공격시간 - prevAttackTime - 1;

    if (0 < tempTime) {
      health += tempTime * 초당회복량;
      health += Math.floor(tempTime / 시전시간) * 추가회복량;
      health = Math.min(health, maxHealth);
    }

    prevAttackTime = 공격시간;
    health -= 피해량;
    if (health <= 0) return -1;
  }

  return health;
};

// console.log(
//   solution7([5, 1, 5], 30, [
//     [2, 10],
//     [9, 15],
//     [10, 5],
//     [11, 5],
//   ]),
// );

const solution8 = (picks: number[], minerals: string[]) => {
  const costTable: Map<number, Map<string, number>> = new Map([
    [
      0,
      new Map([
        ['diamond', 1],
        ['iron', 1],
        ['stone', 1],
      ]),
    ],
    [
      1,
      new Map([
        ['diamond', 5],
        ['iron', 1],
        ['stone', 1],
      ]),
    ],
    [
      2,
      new Map([
        ['diamond', 25],
        ['iron', 5],
        ['stone', 1],
      ]),
    ],
  ]);

  const getCost = (start: number, end: number, pick: number) => {
    let cost = 0;

    for (let i = start; i < end && i < minerals.length; i++) {
      const mineral = minerals[i];
      cost += costTable.get(pick)?.get(mineral)!;
    }

    return cost;
  };

  let result = Number.MAX_SAFE_INTEGER;
  const dfs = (start: number, curPicks: number[], cost: number) => {
    if (result < cost) return;

    if (minerals.length < start || curPicks.every((p) => p === 0)) {
      result = Math.min(result, cost);
      return;
    }

    for (const [index, pick] of curPicks.entries()) {
      if (pick === 0) continue;
      const newPicks = [...curPicks];
      newPicks[index]--;
      dfs(start + 5, newPicks, getCost(start, start + 5, index) + cost);
    }
  };

  dfs(0, [...picks], 0);

  return result;
};

const solution9 = (picks: number[], minerals: string[]) => {
  const getCost = (startIdx: number, pick: number) => {
    const start = startIdx * 5;
    let cost = 0;

    for (let i = start; i < start + 5 && i < minerals.length; i++) {
      const mineral = minerals[i];
      cost += costTable.get(pick)?.get(mineral)!;
    }

    return cost;
  };

  const costTable: Map<number, Map<string, number>> = new Map([
    [
      0,
      new Map([
        ['diamond', 1],
        ['iron', 1],
        ['stone', 1],
      ]),
    ],
    [
      1,
      new Map([
        ['diamond', 5],
        ['iron', 1],
        ['stone', 1],
      ]),
    ],
    [
      2,
      new Map([
        ['diamond', 25],
        ['iron', 5],
        ['stone', 1],
      ]),
    ],
  ]);

  const n = minerals.length;
  const m = Math.ceil(n / 5);
  const dp: Map<string, number>[] = Array.from(
    { length: m + 1 },
    () => new Map(),
  );
  dp[0].set(picks.join(''), 0);

  for (let i = 0; i < m; i++) {
    for (const [key, cost] of dp[i]) {
      if (key === '000') return Math.min(...dp[i].values());

      const curPicks = key.split('').map(Number);

      curPicks.forEach((count, pick) => {
        if (count === 0) return;

        const newPicks = [...curPicks];
        newPicks[pick]--;
        const newPicksKey = newPicks.join('');
        const newCost = cost + getCost(i, pick);

        if (
          !dp[i + 1].has(newPicksKey) ||
          newCost < dp[i + 1].get(newPicksKey)!
        ) {
          dp[i + 1].set(newPicksKey, newCost);
        }
      });
    }
  }

  return Math.min(...dp[m].values());
};

console.log(
  solution9(
    [0, 1, 1],
    [
      'diamond',
      'diamond',
      'diamond',
      'diamond',
      'diamond',
      'iron',
      'iron',
      'iron',
      'iron',
      'iron',
      'diamond',
    ],
  ),
);
