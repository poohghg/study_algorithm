function solution_1(begin, end) {
  let idx = end - begin;
  const answer = Array(idx).fill(1);
  for (let i = end; begin <= i; i--) {
    if (i === 1) {
      answer[i - 1] = 0;
      break;
    }
    let tmp = 2;
    while (true) {
      if (tmp >= i / 2) break;
      if (i % tmp === 0 && i / tmp < 10000000) break;
      tmp++;
    }
    answer[idx--] = i % tmp !== 0 ? 1 : i / tmp;
  }
  return answer;
}
// console.log(solution_1(1, 10));

// 조이스틱
function solution2(name) {
  const len = name.length;
  const AIDx = 'A'.charCodeAt();
  const ZIDx = 'Z'.charCodeAt();

  let count = 0;
  let minMove = len - 1;

  const getStrDistance = (str) =>
    Math.min(
      Math.abs(str.charCodeAt() - AIDx),
      Math.abs(str.charCodeAt() - ZIDx) + 1,
    );

  for (let i = 0; i < len; i++) {
    // count += getStrDistance(name[i]);
    let endAIdx = i + 1;
    while (endAIdx < len && name[endAIdx] === 'A') endAIdx++;
    const forwordSearch = i * 2 + (len - endAIdx);
    const backwardSearch = i + (len - endAIdx) * 2;
    console.log(forwordSearch, i, endAIdx);
    minMove = Math.min(minMove, forwordSearch, backwardSearch);
  }
  return count + minMove;
}
// console.log(solution2('EEAAE'));

// 안전지대
function solution3(board) {
  const moves = [
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
  ];

  const row = board.length;
  const col = board[0].length;
  let cnt = 0;
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < col; y++) {
      if (board[x][y] === 1) {
        cnt++;
        moves.forEach((move) => {
          const moveX = x + move[0];
          const moveY = y + move[1];
          if (moveX >= 0 && moveX < col && moveY >= 0 && moveY < row) {
            if (board[moveX][moveY] === 0) {
              board[moveX][moveY] = 2;
              cnt++;
            }
          }
        });
      }
    }
  }
  return row * col - cnt;
}
// console.log(
//   solution3([
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 1, 1, 0],
//     [0, 0, 0, 0, 0],
//   ]),
// );

// 가장 큰 수
function solution4(numbers) {
  const ch = [...numbers].fill(0);
  let max = Number.MIN_SAFE_INTEGER;
  function BFS(l, str) {
    if (l === ch.length) {
      max = Math.max(max, Number(str));
      return;
    }

    for (let i = 0; i < numbers.length; i++) {
      if (ch[i] === 0) {
        ch[i] = 1;
        BFS(l + 1, str + numbers[i]);
        ch[i] = 0;
      }
    }
  }
  BFS(0, '');
  return max.toString();
}
// console.log(solution4([6, 10, 2]));

// 가장 큰 수
function solution4_1(numbers) {
  numbers.sort((a, b) => {
    const aStr = a.toString();
    const bStr = b.toString();
    if (aStr[0] === bStr[0]) return Number(bStr + aStr) - Number(aStr + bStr);
    return Number(bStr[0]) - Number(aStr[0]);
  });
  if (numbers[0] === 0) return 0;
  return numbers.join('');
}

// console.log(solution4([555, 551, 550, 4]));
// console.log(solution4_1([110, 1110]));
// 소수찾기
function solution5(numbers) {
  // const set = [];
  const set = new Set();
  const ch = Array(numbers.length).fill(0);

  // 소수
  const isPrime = (n) => {
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return n >= 2;
  };

  const DFS = (l, s) => {
    if (!isNaN(s)) set.add(Number(s));
    if (l === numbers.length) return;
    for (let i = 0; i < numbers.length; i++) {
      if (ch[i] === 0) {
        ch[i] = 1;
        DFS(l + 1, s + numbers[i]);
        ch[i] = 0;
      }
    }
  };

  DFS(0, '');
  let cnt = 0;

  for (const v of set) if (isPrime(v)) cnt++;
  return cnt;
}
// console.log(solution5('143'));

// 과일 장수
function solution6(k, m, score) {
  let answer = 0;
  score.sort((a, b) => b - a);
  for (let i = 0; i < score.length; i += m) {
    const min = score[i + m - 1];
    if (min) answer += min * m;
  }
  return answer;
}
// console.log(solution6(3, 4, [1, 2, 3, 1, 2, 3, 1]));

//숫자 카드 나누기
function solution7(arrayA, arrayB) {
  const confirm = (a, b, num) => {
    const min = Math.min(...a);
    for (let i = min; i > 1; i--) {
      for (const num of a) if (num % a !== 0) continue;
      for (const num of b) if (num % b === 0) continue;
      return i;
    }
    return 0;
  };
  return Math.max(confirm(arrayA, arrayA), confirm(arrayB, arrayA));
}
// console.log(solution7([14, 35, 119], [18, 30, 102]));

// 행렬의 덧셈
function solution8(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1[i].length; j++) {
      arr1[i][j] = arr1[i][j] + arr2[i][j];
    }
  }
  return arr1;
}

// console.log(
//   solution8(
//     [
//       [1, 2],
//       [2, 3],
//     ],
//     [
//       [3, 4],
//       [5, 6],
//     ],
//   ),
// );

// bfs 시간초과
// 게임 맵 최단거리
// 최단거리 bfs를 사용
function solution9(maps) {
  let min = -1;
  const end = [maps.length - 1, maps[0].length - 1];
  const moves = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  const BFS = (x, y, cnt) => {
    if (min !== -1 && cnt + 1 > min) return;
    if (x === 0 && y === 0) {
      if (min === -1) min = cnt + 1;
      else min = Math.min(min, cnt + 1);
      return;
    }
    moves.forEach((move) => {
      const newX = x + move[0];
      const newY = y + move[1];
      if (newX >= 0 && newX <= end[0] && newY >= 0 && newY <= end[1]) {
        if (maps[newX][newY] === 1) {
          maps[newX][newY] = 0;
          BFS(newX, newY, cnt + 1);
          maps[newX][newY] = 1;
        }
      }
    });
  };
  BFS(end[0], end[1], 0);
  return min;
}

function solution9_1(maps) {
  const end = [maps.length - 1, maps[0].length - 1];
  const moves = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  // x,y,cnt
  const queue = [[0, 0, 0]];
  while (queue.length) {
    let [x, y, cnt] = queue.shift();
    if (x === end[0] && y === end[1]) return cnt + 1;
    moves.forEach((move) => {
      const newX = x + move[0];
      const newY = y + move[1];
      if (newX >= 0 && newX <= end[0] && newY >= 0 && newY <= end[1]) {
        if (maps[newX][newY] === 1) {
          maps[newX][newY] = 0;
          queue.push([newX, newY, cnt + 1]);
        }
      }
    });
  }
  return -1;
}

// console.log(
//   solution9_1([
//     [1, 0, 1, 1, 1],
//     [1, 0, 1, 0, 1],
//     [1, 0, 1, 1, 1],
//     [1, 1, 1, 0, 1],
//     [0, 0, 0, 0, 1],
//   ]),
// );

// 음양 더하기
function solution10(absolutes, signs) {
  let answer = 0;
  for (let i = 0; i < absolutes.length; i++) {
    signs[i] ? (answer += absolutes[i]) : (answer -= absolutes[i]);
  }
  return answer;
}
// console.log(solution10([4, 7, 12], [true, false, true]));

// 로또의 최고 순위와 최저 순위
function solution11(lottos, win_nums) {
  const rank = {
    0: 6,
    1: 6,
    2: 5,
    3: 4,
    4: 3,
    5: 2,
    6: 1,
  };

  // 현재 맞은갯수,0의갯수
  const info = lottos.reduce(
    (acc, num) => {
      if (num === 0) acc[1]++;
      else if (win_nums.indexOf(num) !== -1) acc[0]++;
      return acc;
    },
    [0, 0],
  );
  const [hits, zeros] = info;
  return [rank[hits + zeros], rank[hits]];
}
// console.log(solution11([0, 0, 0, 0, 0, 0], [38, 19, 20, 40, 15, 25]));

// https://mine-it-record.tistory.com/522
// 약수의 개수와 덧셈
function solution12(left, right) {
  // 제곱근이 정수면 약수의 개수가 홀수다.
  // 약수
  const getDivisors = (num) => {
    let cnt = 0;
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        cnt++;
        if (num / i !== i) cnt++;
      }
    }
    return cnt % 2 === 0 ? '+' : '-';
  };

  let answer = 0;
  for (left; left <= right; left++) {
    answer += getDivisors(left) === '+' ? +left : -left;
  }
  return answer;
}
// console.log(solution12(13, 17));

// 프린터
function solution13(priorities, location) {
  const stack = [];
  priorities = priorities.map((v, idx) => ({
    idx,
    v,
  }));

  while (priorities.length) {
    const curValue = priorities.shift();
    if (priorities.find((ele) => ele.v > curValue.v)) priorities.push(curValue);
    else {
      stack.push(curValue);
      if (curValue.idx === location) return stack.length;
    }
  }
}
// console.log(solution13([2, 1, 3, 2], 2));

// 스킬트리
function solution14(skill, skill_trees) {
  const skillArr = skill.split('');
  let cnt = 0;
  for (const tree of skill_trees) {
    let lastIdx = 0;
    let isBreak = false;
    for (let i = 0; i < tree.length; i++) {
      const idx = skillArr.indexOf(tree[i]);
      if (idx === -1) continue;
      if (lastIdx !== idx) {
        isBreak = true;
        break;
      }
      lastIdx++;
    }
    if (!isBreak) cnt++;
  }
  return cnt;
}
// console.log(solution14('CBD', ['BACDE', 'CBADF', 'AECB', 'BDA']));

function solution15(v) {
  const calVector = (v1, v2, v3) => {
    if (v1[1] === v3[1]) return [v3[0], v2[1]];
    if (v2[1] === v3[1]) return [v3[0], v1[1]];
  };

  const [initX, initY] = v[0];
  let sameIDx;
  let anotherIdx;

  for (let i = 1; i < v.length; i++) {
    const [x, y] = v[i];
    if (x === initX) sameIDx = i;
    else anotherIdx = i;
  }

  if (sameIDx) return calVector(v[0], v[sameIDx], v[anotherIdx]);
  else return calVector(v[1], v[2], v[0]);
}
// console.log(
//   solution15([
//     [3, 4],
//     [1, 4],
//     [3, 10],
//   ]),
// );

function solution16(number, limit, power) {
  const getMaxNum = (num) => {
    let cnt = 0;
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        cnt++;
        if (num / i !== i) cnt++;
        if (cnt > limit) return power;
      }
    }
    return cnt;
  };

  let answer = 0;
  for (let i = 1; i <= number; i++) answer += getMaxNum(i);
  return answer;
}
// console.log(solution16(5, 3, 2));

// 줄 서는 방법
function solution17(n, k) {
  let cnt = 0;
  let answer = [];
  const ch = Array(n).fill(0);
  const DFS = (l, arr) => {
    if (arr.length) answer.push(arr);
    if (l === n) return;

    // 3 + 9 + 27
    // 무;
    for (let i = 1; i <= n; i++) {
      // if (ch[i - 1] === 0 && !answer) {
      // ch[i - 1] = 1;
      DFS(l + 1, arr.concat(i));
      // ch[i - 1] = 0;
      // }
    }
  };
  DFS(0, []);
  console.log(answer.length);
  // console.log(Math.);
  // console.log(1562 / 2);
  return answer;
}
// console.log(solution17(3));

function solution17_1(n, k) {
  const factorial = (num) => {
    if (num <= 1) return 1;
    return num * factorial(num - 1);
  };
  const answer = [];
  let searchArr = Array.from({ length: n }).map((_, idx) => idx + 1);

  while (n > 0) {
    const f = factorial(--n);
    const idx = k % f === 0 ? k / f - 1 : Math.floor(k / f);
    answer.push(searchArr[idx]);
    searchArr = searchArr.filter((v) => v !== searchArr[idx]);
    k = k - idx * f;
  }
  return answer;
}
// console.log(solution17_1(5, 23));

function solution18(word) {
  const transferCnt = Array.from({ length: 5 })
    .map((_, idx) => {
      let total = 0;
      for (let i = 1; i <= idx + 1; i++) total += 5 ** i;
      return total / 5;
    })
    .reverse();

  word = word.split('');
  const dictionaryWord = ['A', 'E', 'I', 'O', 'U'];
  let result = 0;
  let cnt = 0;
  while (word.length) {
    const s = word.shift();
    result += transferCnt[cnt++] * dictionaryWord.indexOf(s) + 1;
  }
  return result;
}
// console.log(solution18('EIO'));

//튜플
function solution19(s) {
  // tupleObj = s
  //   .slice(2, -2)
  //   .split('},{')
  //   .map((s) => s.split(','))
  //   .flat()
  //   .reduce((acc, curr) => {
  //     acc[curr] = (acc[curr] || 0) + 1;
  //     return acc;
  //   }, {});
  // return Object.entries(tupleObj)
  //   .sort((a, b) => b[1] - a[1])
  //   .map((entry) => Number(entry[0]));

  s = JSON.parse(s.replaceAll('{', '[').replaceAll('}', ']'));
  const tupleObj = s.flat().reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(tupleObj)
    .sort((a, b) => b[1] - a[1])
    .map((entry) => Number(entry[0]));
}
// console.log(solution19('{{20,111},{111}}'));

// 문자 숫자 정규식
// https://dori-coding.tistory.com/entry/Algorithm-%ED%8C%8C%EC%9D%BC%EB%AA%85-%EC%A0%95%EB%A0%AC-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-Level2-%EB%AC%B8%EC%A0%9C-JavaScript
function solution20(files) {
  return files
    .map((file) => {
      console.log(file.match(/\d+/));
      return [
        // ^: 문자열의 시작
        // ＼D : 숫자가 아닌 문자
        file.match(/^\D+/)[0].toLowerCase(),
        // ＼d : 숫자
        file.match(/\d+/)[0].replace(/^0+/, ''),
        file,
      ];
    })
    .sort((a, b) => {
      const aHead = a[0];
      const bHead = b[0];
      if (aHead === bHead) return a[1] - b[1];
      if (aHead > bHead) return 1;
      if (bHead > aHead) return -1;
      return 0;
    })
    .map((info) => info[2]);
}

// console.log(solution20(['ABC12211211111aaaaa31231', 'AbC123111aa', 'aBc12']));
// console.log(isNaN('"));

function solution21(orders, course) {
  const DFS = (l, s, str, arr) => {
    if (str.length >= 2) menus[str] = (menus[str] || 0) + 1;
    for (let i = s; i < arr.length; i++) {
      DFS(l + 1, i + 1, str + arr[i], arr);
    }
  };

  const menus = {};
  const answer = [];
  for (const order of orders) {
    DFS(0, 0, '', order.split('').sort());
  }

  const menuInfo = Object.entries(menus);
  for (const cours of course) {
    let max;
    menuInfo
      .filter(([menu, cnt]) => menu.length === cours && cnt >= 2)
      .sort((a, b) => b[1] - a[1])
      .forEach((v, idx) => {
        if (max > v[1]) return false;
        if (idx === 0 || max === v[1]) {
          max = v[1];
          answer.push(v[0]);
        }
      });
  }
  return answer.sort();
}
// console.log(solution21(['XYZ', 'XWY', 'WXA'], [2, 3, 4]));

// 괄호 회전하기
function solution22(s) {
  // const checkString = (str, stack) => {
  //   if (str === '[') stack[0].push(str);
  //   else if (str === '{') stack[1].push(str);
  //   else if (str === '(') stack[2].push(str);
  //   else if (str === ']') {
  //     if (!stack[0].length) return false;
  //     stack[0].pop();
  //   } else if (str === '}') {
  //     if (!stack[1].length) return false;
  //     stack[1].pop();
  //   } else if (str === ')') {
  //     if (!stack[2].length) return false;
  //     stack[2].pop();
  //   }
  //   return true;
  // };

  const checkString = (str, stack) => {
    if (str === '[' || str === '{' || str === '(') stack.push(str);
    else if (str === ']') {
      if (!stack.length || stack[stack.length - 1] !== '[') return false;
      stack.pop();
    } else if (str === '}') {
      if (!stack.length || stack[stack.length - 1] !== '{') return false;
      stack.pop();
    } else if (str === ')') {
      if (!stack.length || stack[stack.length - 1] !== '(') return false;
      stack.pop();
    }
    return true;
  };

  if (s.length % 2 !== 0) return;
  let answer = 0;
  for (let i = 0; i < s.length; i++) {
    // 대,중,소
    // const stack = [[], [], []];
    const stack = [];
    const tmp = [...s.slice(i), ...s.slice(0, i)];
    let isRight = true;
    for (const str of tmp) {
      isRight = checkString(str, stack);
      if (!isRight) break;
    }
    if (isRight && stack.length === 0) answer++;
  }
  return answer;
}

// console.log(solution22('[{]}'));
// 최대 부분 증가수열
function solution23(arr = [5, 3, 7, 8, 6, 2, 9, 4]) {
  const dy = [...arr].fill(0);
  dy[0] = 1;
  for (let i = 1; i < arr.length; i++) {
    let max = 0;
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] < arr[i] && dy[j] > max) {
        max = dy[j];
      }
    }
    dy[i] = max + 1;
  }
  console.log(dy);
}
// console.log(solution23());

function solution24(m, coin) {
  let answer = 0;
  const dy = Array.from({ length: m + 1 }, () => 100);
  dy[0] = 0;
  for (let i = 0; i < coin.length; i++) {
    for (let j = coin[i]; j <= m; j++) {
      // 마지막 플러스1은 현재 사용하는 코인이다
      dy[j] = Math.min(dy[j], dy[j - coin[i]] + 1);
    }
  }
}
// console.log(solution24(15, [1, 2, 5]));

/**
이번 정보올림피아드대회에서 좋은 성적을 내기 위하여 현수는 선생님이 주신 N개의 문제를 풀려고 합니다. 
각 문제는 그것을 풀었을 때 얻는 점수와 푸는데 걸리는 시간이 주어지게 됩 니다. 
제한시간 M안에 N개의 문제 중 최대점수를 얻을 수 있도록 해야 합니다. 
(해당문제는 해당시간이 걸리면 푸는 걸로 간주한다, 한 유형당 한개만 풀 수 있습니다.)
 */
function solution25(n, m, arr) {
  const dy = Array(m + 1).fill(0);
  for (const [s, t] of arr) {
    for (let i = 20; i >= t; i--) {
      //  i는 현재시간 t는현재소요되는 시간
      dy[i] = Math.max(dy[i - t] + s, dy[i]);
    }
  }
  return dy[20];
}

// console.log(
//   solution25(5, 20, [
//     [10, 5],
//     [25, 12],
//     [15, 8],
//     [6, 3],
//     [7, 4],
//   ]),
// );

//야근지수
function solution26(works, n) {
  if (works.reduce((a, b) => a + b) <= n) return 0;
  works.sort((a, b) => b - a);
  let result = 0;

  while (n) {
    const max = works[0];
    for (let i = 0; i < works.length; i++) {
      if (works[i] >= max) {
        works[i]--;
        n--;
      }
      if (!n) break;
    }
  }

  for (const x of works) {
    if (x >= 1) result += x ** 2;
  }
  return result;
}
// console.log(solution26([5, 4, 5], 5));

function solution27(x) {
  let sum = 0;
  for (const s of String(x)) sum += Number(s);
  return x % sum === 0;
}

function solution28(answers) {
  const cnt = [
    [1, 0],
    [2, 0],
    [3, 0],
  ];
  const a = [1, 2, 3, 4, 5];
  const b = [2, 1, 2, 3, 2, 4, 2, 5];
  const c = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  // 인덱스 초과 인덱스 찾기
  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i];
    if (answer === a[i % a.length]) cnt[0][1]++;
    if (answer === b[i % b.length]) cnt[1][1]++;
    if (answer === c[i % c.length]) cnt[2][1]++;
  }

  const answer = [];
  let max;
  const sorted = cnt
    .sort((a, b) => b[1] - a[1])
    .forEach(([idx, s]) => {
      if (!max) max = s;
      if (s < max) return false;
      answer.push(idx);
    });
  return answer;
}

// console.log(solution28([1, 2, 3, 4, 5]));

function solution29(s1, s2) {
  const makeStr = (s1, s2) => {
    let tmp = '';
    let j = 0;
    for (let i = s1.length - 1; i >= 0; i--) {
      if (s1.slice(i) === s2.slice(0, ++j)) tmp = s1.slice(i);
    }
    return s1 + s2.slice(tmp.length);
  };

  const sub1 = makeStr(s1, s2);
  const sub2 = makeStr(s2, s1);
  if (sub1.length > sub2.length) return sub2;
  if (sub2.length > sub1.length) return sub1;
  else return [sub1, sub2].sort()[0];
}
// console.log(solution29('xyZA', 'ABCxy'));

function solution30(n, trees) {
  let cnt = 0;
  const ch = Array.from(Array(n), () => Array(n).fill(0));
  const moves = [
    [1, 0],
    [0, 1],
  ];
  for (const [a, b] of trees) {
    ch[a][b] = 1;
  }
  console.log(ch);
  const queue = [[0, 0]];
  while (queue.length) {
    let [x1, y1] = queue.shift();
    moves.forEach(([tx, ty]) => {
      const newX = x1 + tx;
      const newY = y1 + ty;
      if (newX >= 0 && newX < n && newY >= 0 && newY < n) {
        if (ch[newX][newY] === 0) {
          queue.push([newX, newY]);
          ch[newX][newY] = 2;
        }
        if (ch[newX][newY] === 1) {
          cnt++;
          ch[newX][newY] = 2;
          for (let i = newX; i < n; i++) ch[i][newY] = 2;
          for (let i = newY; i < n; i++) ch[newX][i] = 2;
          console.log(ch);
        }
      }
    });
  }
  return cnt;
}
console.log(
  solution30(6, [
    [4, 0],
    [3, 5],
    [2, 2],
    [1, 5],
  ]),
);
// function solution31(params) {}
// console.log(solution31());
// function solution32(params) {}
// console.log(solution32());
