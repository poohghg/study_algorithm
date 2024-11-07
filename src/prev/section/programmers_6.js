// 행렬의 곱셈
function solution1(arr1, arr2) {
  const answer = Array(3)
    .fill()
    .map((_, idx) => []);

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1[i].length; j++) {
      let sum = 0;
      // [i][j]의 자리는?
      for (let k = 0; k < arr2.length; k++) sum += arr1[i][k] * arr2[k][j];
      answer[i][j] = sum;
    }
  }
  return answer;
}

// 10 6 6
// 8 12 2
// 6 3 2
// console.log(
//   solution1(
//     [
//       [2, 3, 2],
//       [4, 2, 4],
//       [3, 1, 4],
//     ],
//     [
//       [5, 4, 3],
//       [2, 4, 1],
//       [3, 1, 1],
//     ],
//   ),
// );

// 카드 뭉치
function solution2(cards1, cards2, goal) {
  for (const word of goal) {
    if (word === cards1[0]) cards1.shift();
    else if (word === cards2[0]) cards2.shift();
    else return 'No';
  }
  return 'Yes';
}
// console.log(solution2(['i'], ['want'], ['i', 'want']));

function solution3(maps) {
  const sMaps = maps.map((r) => r.split(''));
  const moves = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const XLen = sMaps.length;
  const YLen = sMaps[0].length;
  let S, L, E;
  sMaps.forEach((r, idx) => {
    if (!S && r.indexOf('S') !== -1) S = [idx, r.indexOf('S')];
    if (!L && r.indexOf('L') !== -1) L = [idx, r.indexOf('L')];
    if (!E && r.indexOf('E') !== -1) E = [idx, r.indexOf('E')];
  });

  const bfs = (s, e) => {
    const copyMaps = maps.map((r) => r.split(''));
    const q = [[s, 0]];
    copyMaps[s[0]][s[1]] === 'X';
    while (q.length) {
      const [[x, y], cnt] = q.shift();
      for (const [px, py] of moves) {
        const [nextX, nextY] = [x + px, y + py];
        if (nextX < 0 || nextX >= XLen || nextY < 0 || nextY >= YLen) continue;
        if (copyMaps[nextX][nextY] === 'X') continue;
        if (copyMaps[nextX][nextY] === e) return [[x, y], cnt + 1];

        copyMaps[nextX][nextY] = 'X';
        q.push([[nextX, nextY], cnt + 1]);
      }
    }
    return -1;
  };

  const toL = bfs(S, 'L');
  if (toL === -1) return -1;
  const toE = bfs(L, 'E');
  if (toE === -1) return -1;
  return toL[1] + toE[1];
}

// console.log(solution3(['SOOOL', 'XXXXO', 'OOOOO', 'OXXXX', '2OOOOE']));

function solution4(nums) {
  let answer = 0;
  const sums = [];

  const dfs = (s, l, sum) => {
    if (l === 3) return sums.push(sum);
    for (let i = s; i < nums.length; i++) dfs(i + 1, l + 1, sum + nums[i]);
  };

  const isDecimal = (n) => {
    for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
    return true;
  };

  dfs(0, 0, 0);
  for (const n of sums) if (isDecimal(n)) answer++;
  return answer;
}

// console.log(solution4([1, 2, 3, 4]));
// 대충 만든 자판
function solution5(keymap, targets) {
  const keyObj = {};
  const answer = [];
  for (let i = 0; i < keymap.length; i++) {
    const keys = keymap[i].split('');
    for (let j = 0; j < keys.length; j++) {
      if (!keyObj[keys[j]]) keyObj[keys[j]] = j + 1;
      else if (keyObj[keys[j]] > j + 1) keyObj[keys[j]] = j + 1;
    }
  }

  for (const target of targets) {
    let cnt = 0;
    let isStop = false;
    for (const s of target.split('')) {
      if (!keyObj[s]) {
        isStop = true;
        break;
      }
      cnt += keyObj[s];
    }
    answer.push(isStop ? -1 : cnt);
  }
  return answer;
}

// console.log(solution5(['ABACD', 'BCEFD'], ['ABCD', 'AABB']));

function solution6(board) {
  board = board.map((v) => v.split(''));

  let oCnt = 0;
  let xCnt = 0;
  for (const s of board.flat()) {
    if (s === 'O') oCnt++;
    else if (s === 'X') xCnt++;
  }
  if (xCnt > oCnt || oCnt > xCnt + 1) return 0;

  // 가로 세로 대각선의 데이터를 모은다
  const total = [];
  for (let i = 0; i < board.length; i++) {
    total.push(board[i]);
    const tmp = [];
    for (let j = 0; j < board.length; j++) tmp.push(board[j][i]);
    total.push(tmp);
  }
  total.push([board[0][0], board[1][1], board[2][2]]);
  total.push([board[0][2], board[1][1], board[2][0]]);

  let doneO = 0;
  let doneX = 0;
  for (const arr of total) {
    if (arr.filter((v) => v === 'O').length === 3) doneO++;
    if (arr.filter((v) => v === 'X').length === 3) doneX++;
  }
  // 둘다 승리한경우
  if (doneO && doneX) return 0;
  // O가 이겼는데 x가 패를 놓는경우
  if (doneO && xCnt === oCnt) return 0;
  // X가 이겼는데 O가 패를 놓는경우
  if (doneX && oCnt > xCnt) return 0;

  return 1;
}
// console.log(solution6(['O.X', '.O.', '..X']));

const arr = [3, 5, 123, 321, 44, 1];
// function bSort(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = 1; j < arr.length - i; j++) {
//       if (arr[j - 1] > arr[j]) [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
//     }
//   }
//   return arr;
// }

// 덧칠하기
function solution7(n, m, section) {
  let answer = 0;
  let s;
  for (const n of section) {
    if (n < s) continue;
    s = n + m;
    answer++;
  }
  return answer;
}
// console.log(solution7(8, 4, [2, 3, 5, 6]));

function solution8(n, arr) {
  // dy는 자기자신이 우항이되는 최대증가수열의 길이
  const dy = Array(n).fill(0);
  dy[0] = 1;

  for (let i = 1; i < arr.length; i++) {
    let max = 0;
    for (let j = i - 1; 0 <= j; j--) {
      if (arr[j] < arr[i] && max < dy[j]) max = dy[j];
    }
    dy[i] = max + 1;
  }
  console.log(dy);
  // return Math.max(...dy);
}
// console.log(solution8(9, [2, 7, 5, 15, 6, 4, 7, 12, 3]));
function solution9(sequence) {
  const dy1 = Array(sequence.length).fill(0);
  const dy2 = Array(sequence.length).fill(0);
  dy1[0] = sequence[0];
  dy2[0] = sequence[0] * -1;
  let answer = Math.max(dy1[0], dy2[0]);

  for (let i = 1; i < sequence.length; i++) {
    if (i % 2 === 0) {
      dy1[i] = Math.max(0, dy1[i - 1]) + sequence[i];
      dy2[i] = Math.max(0, dy2[i - 1]) + sequence[i] * -1;
    } else {
      dy1[i] = Math.max(0, dy1[i - 1]) + sequence[i] * -1;
      dy2[i] = Math.max(0, dy2[i - 1]) + sequence[i];
    }
    answer = Math.max(answer, dy1[i], dy2[i]);
  }
  return answer;
}

console.log(solution9([2, 3, -6, 1, 3, -1, 2, 4]));
