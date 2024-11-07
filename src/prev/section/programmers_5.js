// 이진 변환 반복하기
function solution1(s) {
  const answer = [0, 0];
  const dfs = (l, s) => {
    if (s === '1') {
      answer[0] = l;
      return;
    }
    let newS = '';
    for (const str of s) {
      if (str === '1') {
        newS += '1';
        continue;
      }
      answer[1]++;
    }
    dfs(l + 1, newS.length.toString(2));
  };
  dfs(0, s);
  return answer;
}

// console.log(solution1('1111111'));

// 개인정보 수집 유효기간
function solution2(today, terms, privacies) {
  const calDay = (strDay, limit = 0) => {
    const [y, m, d] = strDay.split('.');
    return +y * 12 * 28 + +m * 28 + +d + limit * 28;
  };

  const termsInfo = terms.reduce((acc, curr) => {
    curr = curr.split(' ');
    acc[curr[0]] = curr[1];
    return acc;
  }, {});
  const answer = [];
  const todayDays = calDay(today);
  for (let i = 0; i < privacies.length; i++) {
    const [endDay, no] = privacies[i].split(' ');
    if (todayDays >= calDay(endDay, termsInfo[no])) answer.push(i + 1);
  }
  return answer;
}

// console.log(
//   solution2(
//     '2022.05.19',
//     ['A 6', 'B 12', 'C 3'],
//     ['2021.05.02 A', '2021.07.01 B', '2022.02.19 C', '2022.02.20 C'],
//   ),
// );
// console.log(4 ** 7);

// 이모티콘 할인행사
function solution3(users, emoticons) {
  const discountRates = [40, 30, 20, 10];
  const rates = [];

  (function dfs(l, arr) {
    if (l === emoticons.length) return rates.push(arr);
    for (let i = 0; i < discountRates.length; i++)
      dfs(l + 1, arr.concat(discountRates[i]));
  })(0, []);

  // 유저는 일정이상의 할인율이 되면 이모티콘을 구매한다.
  let answer = [0, 0];
  for (const rate of rates) {
    const purchaseInfo = [0, 0];

    for (const user of users) {
      const [userRate, d] = user;
      const ratedPrices = emoticons.reduce((acc, curr, idx) => {
        if (rate[idx] >= userRate) return acc + curr * (1 - rate[idx] * 0.01);
        return acc;
      }, 0);

      if (ratedPrices >= d) purchaseInfo[0]++;
      else purchaseInfo[1] += ratedPrices;
    }

    if (purchaseInfo[0] > answer[0]) answer = purchaseInfo;
    else if (purchaseInfo[0] === answer[0] && purchaseInfo[1] >= answer[1])
      answer = purchaseInfo;
  }
  return answer;
}
// console.log(
//   solution3(
//     [
//       [40, 10000],
//       [25, 10000],
//     ],
//     [7000, 9000],
//   ),
// );

// 택배 배달과 수거하기
function solution4(cap, n, deliveries, pickups) {
  let answer = 0;
  let i = n - 1;
  let j = n - 1;
  let box;

  while (i >= 0 || j >= 0) {
    if (deliveries[i] === 0 && pickups[j] === 0) {
      i--;
      j--;
      continue;
    }
    answer += (Math.max(i, j) + 1) * 2;
    box = 0;

    while (i >= 0 && box <= cap) {
      if (box + deliveries[i] <= cap) {
        box += deliveries[i];
        i--;
      } else {
        deliveries[i] -= cap - box;
        break;
      }
    }

    box = 0;
    while (j >= 0 && box <= cap) {
      if (box + pickups[j] <= cap) {
        box += pickups[j];
        j--;
      } else {
        pickups[j] -= cap - box;
        break;
      }
    }
  }
  return answer;
}
// 3 - 3
// 4 + 4
// console.log(solution4(2, 2, [0, 0], [0, 0]));

// 3진법 뒤집기
function solution5(n) {
  n = n.toString(3);
  let answer = 0;
  for (let i = n.length - 1; 0 <= i; i--) answer += n[i] * 3 ** i;
  return answer;
}
// console.log(solution5(45));

// 배달
function solution6(N, road, K) {
  let answer = 0;
  const list = {};

  for (const [vertex1, vertex2, w] of road) {
    list[vertex1] = list[vertex1]?.concat([[vertex2, w]]) || [[vertex2, w]];
    list[vertex2] = list[vertex2]?.concat([[vertex1, w]]) || [[vertex1, w]];
  }

  const dfs = (s) => {
    const distances = {};
    const nodes = [[s, 0]];

    for (const node in list) {
      if (node === s) distances[node] = 0;
      else distances[node] = Infinity;
    }

    while (nodes.length) {
      const [currNode, currW] = nodes.shift();
      list[currNode].forEach(([next, w]) => {
        if (distances[next] > currW + w) {
          distances[next] = currW + w;
          nodes.push([next, currW + w]);
        }
      });
    }
    for (const key in distances) if (distances[key] <= K) answer++;
  };

  dfs('1');
  return answer;
}

// console.log(
//   solution6(
//     5,
//     [
//       [1, 2, 1],
//       [2, 3, 3],
//       [5, 2, 2],
//       [1, 4, 2],
//       [5, 3, 1],
//       [5, 4, 2],
//     ],
//     3,
//   ),
// );

//정수 제곱근 판별
function solution7(n) {
  const sqrt = Math.sqrt(n);
  if (sqrt % 1 === 0) return (sqrt + 1) ** 2;
  return -1;
}
// console.log(solution7(121));

function solution8(s) {
  return parseInt(s, 10);
}
// console.log(solution8(-1234));

// 표현 가능한 이진트리
function solution9(numbers) {
  const num = 58;
  console.log('0' + num.toString(2));
}

// console.log(solution9([5]));

// // 후위 우선탐색
// // 후위 순회는 왼쪽자식->오른쪽 자식-> 뿌리
// DFSpostORder() {
//   if (!this.root) return [];
//   const data = [];
//   const travers = (node) => {
//     if (node.left) travers(node.left);
//     if (node.rigth) travers(node.rigth);
//     return data.push(node.val);
//   };
//   travers(this.root);
//   return data;
// }

// 시소 짝꿍
function solution10(weights) {
  // 각몸무게의 사람수
  // 키[몸무게]:사람수
  const ch = {};
  for (let i = 0; i < weights.length; i++) {
    ch[weights[i]] = (ch[weights[i]] || 0) + 1;
  }

  let answer = 0;
  for (const key in ch) {
    const persons = ch[key];
    let curW;

    curW = +key * 2;
    if (curW % 3 === 0) answer += (ch[curW / 3] ?? 0) * persons;
    if (curW % 4 === 0) answer += (ch[curW / 4] ?? 0) * persons;

    curW = +key * 3;
    if (curW % 2 === 0) answer += (ch[curW / 2] ?? 0) * persons;
    if (curW % 4 === 0) answer += (ch[curW / 4] ?? 0) * persons;

    curW = +key * 4;
    if (curW % 2 === 0) answer += (ch[curW / 2] ?? 0) * persons;
    if (curW % 3 === 0) answer += (ch[curW / 3] ?? 0) * persons;

    // nc2
    if (persons > 1) answer += (persons * (persons - 1)) / 2;
    // 중복을 제거한다
    delete ch[key];
  }
  return answer;
}
// console.log(solution10([100, 180, 360, 100, 270]));

function solution11(numbers) {
  const stack = [];
  const answer = [...numbers].fill(-1);

  for (let i = 0; i < numbers.length; i++) {
    if (stack.length === 0) stack.push(i);
    else {
      while (numbers[stack[stack.length - 1]] < numbers[i]) {
        answer[stack.pop()] = numbers[i];
      }

      stack.push(i);
    }
  }

  // console.log(stack);
  return answer;
}
// console.log(solution11([1, 1, 100, 100, 3, 3, 5]));

// bfs
// 숫자 변환하기
function solution12(x, y, n) {
  if (x === y) return 0;
  const q = [x];
  const visited = Array(1000001);
  visited[x] = 0;
  while (q.length) {
    const d = q.shift();
    for (const newD of [d + n, d * 2, d * 3]) {
      if (newD === y) return visited[d] + 1;
      if (!visited[newD] && newD < y) {
        visited[newD] = visited[d] + 1;
        q.push(newD);
      }
    }
  }
  return -1;
}
// csonsole.log(solution12(10, 40, 5));

function solution13(maps) {
  maps = maps.map((str) => str.split(''));
  const answer = [];
  const yLen = maps[0].length;
  const xLen = maps.length;
  const moves = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const isValidLoc = (px, py) => {
    if (px >= 0 && px < xLen && py >= 0 && py < yLen && maps[px][py] !== 'X')
      return true;
    return false;
  };

  for (let x = 0; x < xLen; x++) {
    for (let y = 0; y < yLen; y++) {
      if (maps[x][y] === 'X') continue;
      const q = [[x, y]];
      let currFood = +maps[x][y];
      maps[x][y] = 'X';
      while (q.length) {
        const [currX, currY] = q.shift();
        for (const [moveX, moveY] of moves) {
          const [newX, newY] = [currX + moveX, currY + moveY];
          if (!isValidLoc(newX, newY)) continue;
          currFood += +maps[newX][newY];
          maps[newX][newY] = 'X';
          q.push([newX, newY]);
        }
      }
      answer.push(currFood);
    }
  }

  if (answer.length) return answer.sort((a, b) => a - b);
  return -1;
}

// console.log(solution13(['X591X', 'X1X5X', 'X231X', '1XXX1']));

function solution14(n, l, r) {
  const count_bit_1 = (num) => {
    if (num <= 5) return [1, 2, 2, 3, 4][num];

    let base = 1;
    while (5 ** (base + 1) < num) base += 1;

    let section = num / 5 ** base;
    let remainder = num % 5 ** base;
    let answer = section * 4 ** base;

    if (section >= 3) answer -= 4 ** base;
    if (section === 2) return answer;
    return answer + count_bit_1(remainder);
  };
  return count_bit_1(r) - count_bit_1(l - 1);
}
// console.log(solution14(2, 4, 17));

// 둘만의 암호
function solution15(s, skip, index) {
  let answer = '';
  const lastCharCode = 'z'.charCodeAt();
  for (const x of s) {
    let charCode = x.charCodeAt();
    let cnt = index;
    while (cnt > 0) {
      charCode++;
      if (charCode > lastCharCode)
        charCode = 'a'.charCodeAt() - 1 + (charCode % lastCharCode);
      if (skip.indexOf(String.fromCharCode(charCode)) !== -1) continue;
      cnt--;
    }
    answer += String.fromCharCode(charCode);
  }
  return answer;
}
// console.log(solution15('aukks', 'wbqd', 5));

// 호텔 대실
function solution16(book_time) {
  const covertTime = (t, plusTime = 0) => {
    const [h, m] = t.split(':');
    return +h * 60 + +m + plusTime;
  };

  book_time = book_time
    .reduce((prev, curTimes) => {
      prev.push([covertTime(curTimes[0]), 'S']);
      prev.push([covertTime(curTimes[1], 10), 'E']);
      return prev;
    }, [])
    .sort((a, b) => {
      if (a[0] === b[0]) return a[1].charCodeAt() - b[1].charCodeAt();
      return a[0] - b[0];
    });

  let cnt = 0;
  let answer = 0;
  for (const [_, status] of book_time) {
    if (status === 'S') cnt++;
    else cnt--;
    answer = Math.max(cnt, answer);
  }
  return answer;
}
// console.log(
//   solution16([
//     ['23:50', '23:59'],
//     ['23:51', '23:59'],
//     ['23:59', '23:59'],
//   ]),
// );

// 인사고과
function solution17(scores) {
  if (scores.length === 1) return 1;
  const sum = (arr) => arr[0] + arr[1];
  const wanHo = scores[0];
  const wanHoScore = sum(wanHo);

  scores.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    return b[0] - a[0];
  });

  let cnt = 1;
  let max = 0;
  for (let i = 0; i < scores.length; i++) {
    if (scores[i][0] > wanHo[0] && scores[i][1] > wanHo[1]) return -1;
    if (max > scores[i][1]) continue;
    else max = Math.max(scores[i][1], max);
    if (sum(scores[i]) > wanHoScore) cnt++;
  }
  return cnt;
}
// console.log(
//   solution17([
//     [4, 1],
//     [2, 4],
//     [4, 2],
//     [3, 3],
//     [3, 5],
//     [3, 4],
//     [0, 9],
//   ]),
// );

// 혼자 놀기의 달인
function solution18(cards) {
  const getNumOfArray = (arr, idx, cnt) => {
    if (!arr[idx]) return [cnt, arr];
    const nextIdx = arr[idx];
    arr[idx] = 0;
    return getNumOfArray(arr, nextIdx, ++cnt);
  };

  let answer = 0;
  for (let i = 1; i < cards.length; i++) {
    const copy = [0, ...cards];
    const [firstNum, rest] = getNumOfArray(copy, i, 0);
    for (let j = 1; j < rest.length; j++) {
      if (!rest[j]) continue;
      const [secondNum, _] = getNumOfArray([...rest], j, 0);
      answer = Math.max(answer, firstNum * secondNum);
    }
  }
  return answer;
}
// console.log(solution18([8, 6, 3, 7, 2, 5, 1, 4]));

// n^2 배열 자르기
function solution19(n, left, right) {
  const answer = [];
  const l = Math.floor(left / n);
  const r = Math.floor(right / n);

  for (let i = l; i <= r; i++) {
    for (let j = 0; j <= n; j++) {
      if (j === i + 1) continue;
      if (j < i + 1) answer.push(i + 1);
      else answer.push(j);
    }
  }

  const s = left % n;
  let e = n - ((right + 1) % n);
  if (e === n) return answer.slice(s);
  return answer.slice(s, -e);
}

// [1,2,3,]
// [2,2,3,]
// [3,3,3,]

// 참고;
// for (let i = left; i <= right; i++) {
//   answer.push(Math.max(i % n, parseInt(i / n)) + 1)
// }
// console.log(solution19(3, 0, 3));

// 쿼드압축 후 개수 세기

function solution20(arr) {
  const answer = [0, 0];
  const split = (x1, x2, y1, y2, arr) => {
    const r = [];
    for (let x = x1; x < x2; x++) {
      const tmp = [];
      for (let y = y1; y < y2; y++) tmp.push(arr[x][y]);
      r.push(tmp);
    }
    return r;
  };

  const dfs = (arr) => {
    if (arr.length === 1) {
      const f = arr.flat();
      return f[0] === 0 ? ++answer[0] : ++answer[1];
    }
    if (arr.every((r) => r.every((v) => v === 0))) return dfs([0]);
    if (arr.every((r) => r.every((v) => v === 1))) return dfs([1]);

    const len = arr.length;
    const half = arr.length / 2;
    const r1 = split(0, half, 0, half, arr);
    const r2 = split(0, half, half, len, arr);
    const r3 = split(half, len, 0, half, arr);
    const r4 = split(half, len, half, len, arr);
    [r1, r2, r3, r4].map((r) => dfs(r));
  };
  dfs(arr);
  return answer;
}

// console.log(
//   solution20([
//     [1, 1, 1, 1, 1, 1, 1, 1],
//     [0, 1, 1, 1, 1, 1, 1, 1],
//     [0, 0, 0, 0, 1, 1, 1, 1],
//     [0, 1, 0, 0, 1, 1, 1, 1],
//     [0, 0, 0, 0, 0, 0, 1, 1],
//     [0, 0, 0, 0, 0, 0, 0, 1],
//     [0, 0, 0, 0, 1, 0, 0, 1],
//     [0, 0, 0, 0, 1, 1, 1, 1],
//   ]),
// );

// 최댓값과 최솟값
function solution21(s) {
  s = s.split(' ');
  return `${'' + Math.min(...s)} ${'' + Math.max(...s)}`;
}
// console.log(solution21('1 2 3 4'));

// 숫자의 표현
function solution22(n) {
  let answer = 0;
  let l = 1;
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
    while (sum > n) {
      sum -= l;
      l++;
    }
    if (sum === n) answer++;
  }
  return answer;
}
// console.log(solution22(15));

// 멀리 뛰기
function solution23(n) {
  const dy = [];
  dy[0] = 0;
  dy[1] = 1;
  dy[2] = 2;
  for (let i = 3; i <= n; i++) {
    dy[i] = dy[i - 1] + dy[i - 2];
  }
  return dy[n];
}
// console.log(solution23(3));

// 땅따먹기
function solution24(land) {
  for (let i = 1; i < land.length; i++) {
    const tmp = land[i - 1];
    land[i][0] += Math.max(tmp[1], tmp[2], tmp[3]);
    land[i][1] += Math.max(tmp[0], tmp[2], tmp[3]);
    land[i][2] += Math.max(tmp[0], tmp[1], tmp[3]);
    land[i][3] += Math.max(tmp[0], tmp[1], tmp[2]);
  }
  return Math.max(...land.at(-1));
}
// console.log(
//   solution24([
//     [1, 2, 3, 5],
//     [5, 6, 7, 8],
//     [4, 3, 2, 1],
//   ]),
// );

// 최소합
function solution25(A, B) {
  A = A.sort((a, b) => a - b);
  B = B.sort((a, b) => a - b);
  let answer = 0;
  for (let i = 0; i < A.length; i++) {
    answer += A[i] * B.at(-1 + -i);
  }
  return answer;
}
// console.lㄴog(solution25([1, 2], [3, 4]));

// 3 x n 타일링
function solution26(n) {
  if (n % 2 === 1) return 0;
  const dy = [];
  dy[0] = 0;
  dy[2] = 3;
  dy[4] = 11;
  // dy[2] =
}
// console.log(solution26(3));

// 최고의 집합
function solution27(n, s) {
  const max = Math.floor(s / n);
  if (max < 0) return [-1];
  const rest = s % n;
  const answer = Array(n).fill(max);
  for (let i = 0; i < rest; i++) answer[answer.length - 1 - i]++;
  return answer;
}
// console.log(solution27(5, 7));

function solution28(board) {
  const rowLen = board.length;
  const colLen = board[0].length;
  // if (rowLen < 2 || colLen < 2) return 1;
  let max = 0;
  for (let i = 1; i < rowLen; i++) {
    for (let j = 1; j < colLen; j++) {
      if (board[i][j] === 0) continue;
      const min = Math.min(
        board[i - 1][j - 1],
        board[i][j - 1],
        board[i - 1][j],
      );
      board[i][j] = min + 1;
      max = Math.max(max, min + 1);
    }
  }
  return max ** 2;
}
// console.log(
//   solution28([
//     [0, 1, 1, 1],
//     [1, 0, 0, 0],
//     [1, 0, 0, 0],
//     [1, 0, 0, 0],
//   ]),
// );

// 소수찾기
/**
1보다 큰 모든 자연수는 소수의 곱으로 이루어져 있다.
따라서 100이 소수인지 확인하기 위해서는 100보다 작은 소수를 이용하면 된다.
자연수 n이 있을 때 √n 보다 작은 수로 나눠 떨어지지 않으면 n은 소수이다.
2보다 큰 모든 짝수는 2로 나누어 떨어지는 소수가 아닌 수이다.
 */
function solution29(n) {
  let decimalS = [2];
  const isDecimal = (pn) => {
    for (const n of decimalS) {
      if (n > Math.sqrt(pn)) return true;
      if (pn % n === 0) return false;
    }
    return true;
  };
  for (let i = 3; i <= n; i = i + 2) {
    if (isDecimal(i)) decimalS.push(i);
  }
  return decimalS.length;
}

// 2016년
function solution30(a, b) {
  const weeks = ['FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU'];
  const month = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const diffDay =
    month.slice(0, a - 1).reduce((acc, curr) => acc + curr, 0) + b - 1;
  return weeks[diffDay % 7];
}
// console.log(solution30(5, 24));
