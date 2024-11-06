// 구명보트
function solution_1(people, limit) {
  people.sort((a, b) => a - b);
  let answer = 0;
  let lt = 0;
  let rt = people.length - 1;
  while (lt <= rt) {
    if (people[lt] + people[rt] <= limit) lt++;
    rt--;
    answer++;
  }
  return answer;
}
// console.log(solution_1([70, 50, 80, 50], 100));

function solution_2(n) {
  for (let x = 1; x <= 1000000; x++) {
    if (n % x === 1) return x;
  }
}

function solution_3(fees, records) {
  const [bT, bF, uT, uF] = fees;
  function calTime(t1, t2) {
    t1 = t1.split(':');
    let calT1 = Number(t1[0] * 60) + Number(t1[1]);

    t2 = t2.split(':');
    let calT2 = Number(t2[0] * 60) + Number(t2[1]);

    return calT2 - calT1;
  }

  const obj = {};
  for (const record of records) {
    const [time, no, active] = record.split(' ');
    if (active === 'IN') obj[no] = { ...obj[no], time, status: 'in' };
    else {
      const total = (obj[no].total || 0) + calTime(obj[no].time, time);
      obj[no] = { total, status: 'out' };
    }
  }

  // console.log(obj);
  return Object.entries(obj)
    .map(([key, value]) => {
      let totalT = value.total || 0;
      let fee = bF;
      if (value.status === 'in') totalT += calTime(value.time, '23:59');
      if (totalT > bT) fee += Math.ceil((totalT - bT) / uT) * uF;
      return [Number(key), fee];
    })
    .sort((a, b) => a[0] - b[0])
    .map((v) => v[1]);
}
// console.log(solution_3([1, 461, 1, 10], ['00:00 1234 IN']));

// 두 큐 합 같게 만들기
function solution_4(queue1, queue2) {
  const ilen = queue1.length + queue2.length;

  let q1Sum = queue1.reduce((a, b) => a + b, 0);
  let q2Sum = queue2.reduce((a, b) => a + b, 0);
  let cnt = 0;
  let q1Idx = 0;
  let q2Idx = 0;
  if ((q1Sum + q2Sum) % 2 !== 0) return -1;
  while (q1Idx < ilen && q2Idx < ilen) {
    if (q1Sum === q2Sum) return cnt;
    if (q1Sum > q2Sum) {
      const q1Value = queue1[q1Idx];
      queue2.push(q1Value);
      q1Sum -= q1Value;
      q2Sum += q1Value;
      q1Idx++;
    } else {
      const q2Value = queue2[q2Idx];
      queue1.push(q2Value);
      q1Sum += q2Value;
      q2Sum -= q2Value;
      q2Idx++;
    }
    cnt++;
  }
  return -1;
}
// console.log(
//   solution_4([1, 1, 1, 1, 1, 1, 1, 1, 1, 10], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
// );

// 숫자 짝꿍
function solution_5(X, Y) {
  const xObj = {};
  let common = [];

  for (let i = 0; i < X.length; i++) {
    const element = X[i];
    xObj[element] = (xObj[element] || 0) + 1;
  }

  for (let i = 0; i < Y.length; i++) {
    const element = Y[i];
    if (xObj[element]) {
      xObj[element] -= 1;
      common.push(element);
    }
  }

  if (!common.length) return '-1';
  common = common.sort((a, b) => b - a).join('');
  return common[0] === '0' ? '0' : common;
}
// console.log(solution_5('100', '2030450'));

// 없는 숫자 더하기
function solution_6(numbers) {
  const answer = 0;
  for (let i = 0; index < 10; i++) {
    if (numbers.indexOf(i) === -1) answer += i;
  }
  return answer;
}

function solution_7(id_list, report, k) {
  // let reports = [...new Set(report)].map((a) => {
  //   return a.split(' ');
  // });
  // console.log(reports);

  const reportedList = {};
  for (const info of report) {
    const [reporter, respondent] = info.split(' ');
    if (!reportedList[respondent]) reportedList[respondent] = [];
    if (reportedList[respondent].indexOf(reporter) === -1)
      reportedList[respondent].push(reporter);
  }

  const reportHistory = Object.values(reportedList).reduce((prev, curr) => {
    if (curr.length >= k) return prev.concat(...curr);
    return prev;
  }, []);

  return id_list.map(
    (id) => reportHistory.filter((reporter) => reporter === id).length,
  );
}
// console.log(
//   solution_7(
//     ['con', 'ryan'],
//     ['ryan con', 'ryan con', 'ryan con', 'ryan con'],
//     3,
//   ),
// );

// 연속 부분 수열 합의 개수
function solution_8(elements) {
  if (!elements.length) return;
  const lastSum = elements.reduce((a, b) => a + b);
  const answer = new Set([lastSum]);

  let l = 1;
  while (l < elements.length) {
    for (let i = 0; i < elements.length; i++) {
      let tmp = elements[i];
      let j = 1;
      let idx = i + j;
      while (j !== l) {
        if (idx >= elements.length) idx = idx - elements.length;
        tmp += elements[idx];
        j++;
        idx++;
      }
      answer.add(tmp);
    }
    l++;
  }
  return answer.size;
}

// console.log(solution_8([7, 9, 1, 1, 4]));
function solution_9(n, times) {
  times.sort((a, b) => a - b);
  let left = 1;
  let right = n * Math.max(...times);
  let answer = right;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let count = 0;
    for (const time of times) count += Math.floor(mid / time);
    if (count >= n) {
      answer = Math.min(answer, mid);
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return answer;
}
// console.log(solution_9(6, [7, 10]));
// function solution_10(target) {
//   let cnt = 0;
//   let centerCnt = 0;
//   // const answer = Array.from({ length: 2 }).fill(0);
//   const score = Array.from({ length: 20 }).map((_, i) => i + 1);
//   const dobuleScore = score.map((v) => v * 3);
//   console.log(dobuleScore);

//   // while (target > 0) {
//   //   cnt++;
//   // }

//   return [cnt, centerCnt];
// }
// console.log(solution_10(21));

// 스타 수열
function solution_11(a) {
  let max = 0;
  const total = [];

  function DFS(l, tmp) {
    if (tmp.length % 2 === 0) {
      const checkArr = [tmp[0], tmp[1]];
      for (let i = 0; i < tmp.length; i = i + 2) {
        if (
          tmp[i] === tmp[i + 1] ||
          (checkArr.indexOf(tmp[i]) === -1 &&
            checkArr.indexOf(tmp[i + 1]) === -1)
        )
          return;
      }
    }
    if (l === a.length) {
      if (tmp.length % 2 === 0) max = Math.max(max, tmp.length);
      // total.push(tmp.slice());
      return;
    }
    DFS(l + 1, tmp.concat(a[l]));
    DFS(l + 1, tmp);
  }

  DFS(0, []);
  return max;
}

// 스타 수열
function solution_11_1(a) {
  const aObj = a.reduce((prev, curr) => {
    prev[curr] = ++prev[curr] || 1;
    return prev;
  }, {});
  const sorted = Object.entries(aObj).sort((a, b) => b[1] - a[1]);

  let max = 0;
  for (let i = 0; i < sorted.length; i++) {
    let [key, value] = sorted[i];
    let cnt = 0;
    for (let j = 0; j < a.length - 1; j++) {
      if (!value) break;
      if (a[j] === a[j + 1]) continue;
      if (a[j] !== +key && a[j + 1] !== +key) continue;
      cnt += 2;
      value--;
      // 짝수
      j++;
    }
    if (cnt > max) max = cnt;
    else break;
  }
  return max;
}

// console.log(solution_11_1([0, 3, 3, 0, 7, 2, 0, 2, 2, 0]));

function solution_12(n, wires) {
  // 현재노드에서 끊어진 노드를 제외하고 방문한 노드의 수를 리턴한다.
  function BFS(root, e) {
    const visited = { [root]: true };
    const q = [root];
    let curNode;
    // let count = 0;
    while (q.length !== 0) {
      curNode = q.shift();
      list[curNode].forEach((next) => {
        if (!visited[next] && next !== e) {
          q.push(next);
          visited[next] = true;
        }
      });
    }
    console.log(root, visited);
    return Object.keys(visited).length;
  }

  const list = {};

  for (const [vertex1, vertex2] of wires) {
    if (!list[vertex1]) list[vertex1] = [];
    if (!list[vertex2]) list[vertex2] = [];
    list[vertex1].push(vertex2);
    list[vertex2].push(vertex1);
  }
  // const init = { ...list };
  let answer = Number.MAX_SAFE_INTEGER;
  for (const wire of wires) {
    const count = BFS(wire[0], wire[1]) - BFS(wire[1], wire[0]);
    answer = Math.min(answer, Math.abs(count));
  }
  return answer;
}
// console.log(
//   solution_12(7, [
//     [1, 2],
//     [2, 3],
//   ]),
// );

// 공 이동 시뮬레이션
// 추후 도전
function solution_13(n, m, x, y, queries) {
  // const grid = [n, m];
  // let cnt = 0;
  // let gridArr = [];
  // const answer = Array.from({ length: n }).map((_, i) =>
  //   Array.from({ length: m }).map((_, j) => {
  //     // gridArr.push([i, j]);
  //     return 1;
  //   }),
  // );
  // console.log('answer', answer);
  // // console.log(answer);
  // // console.log(gridArr);
  // // for (const [command, dx] of queries) {
  // //   // const tmp = new Set();
  // //   for (const start of gridArr) {
  // //     // start = start.split('').map((v) => Number(v));
  // //     const slice = start.slice();
  // //     switch (command) {
  // //       case 0:
  // //         start[1] -= dx;
  // //         if (start[1] < 0) start[1] = 0;
  // //         break;
  // //       case 1:
  // //         start[1] += dx;
  // //         if (start[1] >= grid[1]) start[1] = grid[1] - 1;
  // //         break;
  // //       case 2:
  // //         start[0] -= dx;
  // //         if (start[0] < 0) start[0] = 0;
  // //         break;
  // //       case 3:
  // //         start[0] += dx;
  // //         if (start[0] >= grid[0]) start[0] = grid[0] - 1;
  // //         break;
  // //       default:
  // //         break;
  // //     }
  // //     // answer[start[0]][start[1]] = 1;
  // //     // tmp.add(start);
  // //     // console.log('answer', start, answer);
  // //     // console.log('s', start);
  // //     answer[start[0]][start[1]] += 1;
  // //     // 원본을 빼고
  // //     answer[slice[0]][slice[1]] -= 1;
  // //   }
  // //   // gridArr = Array.from(tmp);
  // // }
  // // console.log(answer);
  // // console.log('gridArr', gridArr);
  // return cnt;
}
// console.log(
//   solution_13(2, 5, 0, 0, [
//     [3, 1],
//     [2, 2],
//     [1, 1],
//     [2, 3],
//     [0, 1],
//     [2, 1],
//   ]),
// );

// 거리두기 확인하기
function solution_14(places) {
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];
  const answer = [];
  let cnt = 0;

  // const BFS = () => {};
  for (const room of places) {
    let flage = 1;
    for (let i = 0; i < 5; i++) {
      if (flage === 0) break;
      for (let j = 0; j < 5; j++) {
        if (flage === 0) break;
        if (room[i][j] === 'P') {
          const visited = Array.from(Array(5), () => Array(5).fill(0));
          const q = [[i, j, 0]];
          visited[i][j] = 1;
          while (q.length) {
            if (cnt == 1 && i === 0 && j === 0) {
              console.log('q', q);
            }
            const [x, y, l] = q.shift();
            if (l >= 2) break;
            for (let k = 0; k < dx.length; k++) {
              let [nx, ny] = [x + dx[k], y + dy[k]];
              if (
                nx < 0 ||
                nx >= 5 ||
                ny < 0 ||
                ny >= 5 ||
                visited[nx][ny] === 1
              )
                continue;
              if (room[nx][ny] === 'P') {
                flage = 0;
                break;
              }
              visited[nx][ny] = 1;
              if (room[nx][ny] === 'O') q.push([nx, ny, l + 1]);
            }
            if (flage === 0) break;
          }
        }
      }
    }
    cnt++;
    answer.push(flage);
  }
  return answer;
}
// console.log(
//   solution_14([
//     ['POOOP', 'OXXOX', 'OPXPX', 'OOXOX', 'POXXP'],
//     ['POOPX', 'OXPXP', 'PXXXO', 'OXXXO', 'OOOPP'],
//     ['PXOPX', 'OXOXP', 'OXPOX', 'OXXOP', 'PXPOX'],
//     ['OOOXX', 'XOOOX', 'OOOXX', 'OXOOX', 'OOOOO'],
//     ['PXPXP', 'XPXPX', 'PXPXP', 'XPXPX', 'PXPXP'],
//   ]),
// );

// console.log(
//   solution_15(
//     [-5, 0, 4, 0, 1],
//     [
//       [0, 1],
//       [3, 4],
//       [2, 3],
//       [0, 3],
//     ],
//   ),
// );

// 괄호 변환
function solution_15(p) {
  if (!p) return '';
  const isCheck = (s) => {
    const stack = [];
    for (const x of s) {
      if (x === '(') stack.push('(');
      else {
        if (!stack.length) return false;
        stack.pop();
      }
    }
    return stack.length === 0 ? true : false;
  };

  let answer = '';
  let count = 0;
  for (let i = 0; i < p.length; i++) {
    p[i] === '(' ? count++ : count--;
    // 균형잡힌 괄호 문자열인지 체크
    if (count === 0) {
      // 올바른 괄호 문자열이라면
      if (isCheck(p.slice(0, i + 1))) {
        answer = p.slice(0, i + 1) + solution_15(p.slice(i + 1));
        return answer;
      } else {
        // v처리
        answer = '(' + solution_15(p.slice(i + 1)) + ')';
        for (let j = 1; j < i; j++) {
          if (p[j] === '(') answer += ')';
          else answer += '(';
        }
        return answer;
      }
    }
  }
}
// console.log(solution_15('))(((())(())'));

// 부족한 금액 계산하기
function solution_16(price, money, count) {
  let answer = 0;
  for (let i = 1; i <= count; i++) {
    answer += price * i;
  }
  return answer > money ? answer - money : 0;
}
// console.log(solution_16(3, 20, 4));

// 콜라 문제
function solution_17(a, b, n) {
  let answer = 0;
  while (a <= n) {
    let res = n % a;
    n = Math.floor(n / a) * b;
    answer += n;
    n += res;
  }
  return answer;
}
// console.log(solution_17(3, 2, 20));

// 롤케이크 자르기
function solution_17(topping) {
  // const getSetSize = (arr) => new Set(arr).size;

  const leftObj = topping.slice(0, 1).reduce((prev, curr) => {
    prev[curr] = (prev[curr] || 0) + 1;
    return prev;
  }, {});
  const rightObj = topping.slice(1).reduce((prev, curr) => {
    prev[curr] = (prev[curr] || 0) + 1;
    return prev;
  }, {});

  let cnt = 0;
  let lk = 1;
  let rk = Object.keys(rightObj).length;

  for (let i = 1; i < topping.length - 1; i++) {
    if (lk === rk) cnt++;
    else if (lk > rk) break;

    const element = topping[i];
    if (!leftObj[element]) {
      leftObj[element] = 1;
      lk++;
    }
    if (rightObj[element]) --rightObj[element];
    if (rightObj[element] === 0) {
      delete rightObj[element];
      rk--;
    }
  }
  return cnt;
}

// console.log(solution_17([1, 2, 1, 3, 1, 4, 1, 2]));

// 삼총사
function solution_18(number) {
  // const ch = [...number].fill(0);
  let cnt = 0;
  function DFS(l, s, sum) {
    if (l === 3) {
      if (sum === 0) cnt++;
      return;
    }
    for (let i = s; i < number.length; i++) DFS(l + 1, i + 1, sum + number[i]);
  }
  DFS(0, 0, 0);
  return cnt;
}
// console.log(solution_18([-2, 3, 0, 2, -5]));

// 격자판문제 다시풀어보기
/**
 * 7*7 격자판 미로를 탈출하는 경로의 가지수를 출력하는 프로그램을 작성하세요. 출발점은 격 자의 (1, 1) 좌표이고,
 * 탈출 도착점은 (7, 7)좌표이다. 격자판의 1은 벽이고, 0은 통로이다. 격 자판의 움직임은 상하좌우로만 움직인다. 미로가 다음과 같다면
 * 위의 지도에서 출발점에서 도착점까지 갈 수 있는 방법의 수는 8가지이다.
 */
function solution_19(arr) {
  // const visited = Array.from(Array(7), () => Array(7).fill(0));
  const moves = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ];

  let cnt = 0;
  function DFS(x, y) {
    // console.log(x, y);

    arr[x][y] = 1;
    if (x === 6 && y === 6) {
      cnt++;
      return;
    }
    for (let [px, py] of moves) {
      px = x + px;
      py = y + py;
      if (px < 0 || py < 0 || px > 6 || py > 6) continue;
      if (arr[px][py] === 0) {
        DFS(px, py);
        arr[px][py] = 0;
      }
    }
  }
  DFS(0, 0);

  return cnt;
}
// console.log(
//   solution_19([
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 1, 1, 1, 1, 1, 0],
//     [0, 0, 0, 1, 0, 0, 0],
//     [1, 1, 0, 1, 0, 1, 1],
//     [1, 1, 0, 0, 0, 0, 1],
//     [1, 1, 0, 1, 1, 0, 0],
//     [1, 0, 0, 0, 0, 0, 0],
//   ]),
// );

// 택배상자
function solution20(order) {
  // 보조 컨테이너는 스택구조
  // let answer = 0;
  let orderIdx = 0;
  const stack = [];
  for (let i = 1; i <= order.length; i++) {
    if (i === order[orderIdx]) {
      orderIdx++;
      while (stack.length && stack[stack.length - 1] === order[orderIdx]) {
        stack.pop();
        orderIdx++;
      }
    } else {
      stack.push(i);
    }
  }
  return orderIdx;
}
// console.log(solution20([4, 3, 1, 2, 5]));

// 부대복귀
function solution21(n, roads, sources, destination) {
  const list = roads.reduce((prev, curr) => {
    const [node1, node2] = curr;
    if (!prev[node1]) prev[node1] = [];
    if (!prev[node2]) prev[node2] = [];
    prev[node1].push(node2);
    prev[node2].push(node1);
    return prev;
  }, {});

  const BFS = (start) => {
    const previous = { [start]: start };
    const distances = { [start]: 0 };
    const queue = [start];

    let curNode;
    let curDistance;
    while (queue.length) {
      curNode = queue.shift();
      curDistance = distances[curNode];
      // 현재노드에서 갈수 있는방향
      list[curNode].forEach((node) => {
        // bfs 특성상 현재온 노드가 최단거리
        if (!previous[node]) {
          previous[node] = curNode;
          distances[node] = curDistance + 1;
          queue.push(node);
        }
      });
    }
    return distances;
  };

  const distances = BFS(destination);
  let answer = [];
  for (const curLocation of sources) {
    answer.push(distances[curLocation] ?? -1);
  }
  return answer;
}

// console.log(
//   solution21(
//     5,
//     [
//       [1, 2],
//       [1, 4],
//       [2, 4],
//       [2, 5],
//       [4, 5],
//     ],
//     [1, 3, 5],
//     5,
//   ),
// );
