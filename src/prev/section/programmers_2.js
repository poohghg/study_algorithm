function solution_1(ingredient) {
  ingredient = ingredient.join('');
  const initLen = ingredient.length;
  let lastLen = initLen;
  let cnt = 0;
  while (true) {
    // replace의 시간복잡도는 o(n)으로 실패
    ingredient = ingredient.replace('1231', '');
    if (ingredient.length === lastLen) break;
    lastLen = ingredient.length;
    cnt++;
  }
  return cnt;
  // return Math.floor((len - ingredient[0].length) / 4);
}
// 햄버거 만들기
function solution_1_1(ingredient) {
  const str = [1, 3, 2, 1];
  let cnt = 0;
  let stack = [];
  for (const x of ingredient) {
    stack.push(x);
    while (stack.length >= 4 && x === 1) {
      const lastIdx = stack.length - 1;
      let isContinue = true;
      for (let i = 0; i < 4; i++) {
        if (stack[lastIdx - i] !== str[i]) {
          isContinue = false;
          break;
        }
      }
      if (!isContinue) break;
      for (let i = 0; i < 4; i++) stack.pop();
      cnt++;
    }
  }
  return cnt;
}
// console.log(solution_1_1([1, 2, 1, 2, 3, 1, 3, 1, 2, 3, 1, 2, 3, 1]));

//야간 전술보행
function solution2(distance, scope, times) {
  let sortedInfo = scope
    .map((range, idx) => range.concat(times[idx]))
    .sort((a, b) => Math.min(a[0], a[1]) - Math.min(b[0], b[1]));

  for (const info of sortedInfo) {
    const [start, end, workTiem, breakTime] = info;
    const totalTime = workTiem + breakTime;
    let ls = Math.min(start, end);
    let rs = Math.max(start, end);
    while (ls <= rs) {
      let tmp = ls % totalTime;
      if (0 < tmp && tmp <= workTiem) return ls;
      ls++;
    }
  }
  return distance;
}
// console.log(
//   solution2(
//     12,
//     [
//       [7, 8],
//       [4, 6],
//       [11, 10],
//     ],
//     [
//       [2, 2],
//       [2, 4],
//       [3, 3],
//     ],
//   ),
// );

// if (list[curNode].length > 2) activeLigth.push(curNode);
// else if (list[curNode].length <= 2 && !activeLigth.includes(prev[curNode]))
//   activeLigth.push(curNode);

//등대
// 단방향에 홀수번째면 등불을 키고
// 연결된 노드가 많으면 등불을 킨다?
function solution3(n, lighthouse) {
  const list = lighthouse.reduce((prev, curr) => {
    const [node1, node2] = curr;
    prev[node1] = prev[node1]?.concat(node2) || [node2];
    prev[node2] = prev[node2]?.concat(node1) || [node1];
    return prev;
  }, {});

  const prev = Array(n + 1).fill(0);
  const path = [];
  const findPath = () => {
    const queue = [1];
    prev[1] = null;
    while (queue.length) {
      const curNode = queue.shift();
      list[curNode].forEach((node) => {
        if (prev[node] === 0) {
          prev[node] = curNode;
          queue.push(node);
        } else if (prev[node] !== 0 && list[curNode].length === 1) {
          let tmpNode = curNode;
          const tmp = [];
          while (tmpNode) {
            tmp.push(tmpNode);
            tmpNode = prev[tmpNode];
          }
          path.push(tmp);
        }
      });
    }
    return path;
  };
  findPath();
  const activeLigth = [];
  console.log(path);
}

// console.log(
//   solution3(12, [
//     [1, 2],
//     [1, 3],
//     [1, 4],
//     [1, 5],
//     [5, 6],
//     [5, 7],
//     [5, 8],
//     [4, 9],
//     [9, 10],
//     [10, 11],
//     [10, 12],
//   ]),
// );

// 크레인 인형뽑기 게임
function solution4(board, moves) {
  const stack = [];
  let cnt = 0;
  for (let move of moves) {
    move = move - 1;
    for (let i = 0; i < board.length; i++) {
      if (board[i][move] !== 0) {
        if (stack[stack.length - 1] === board[i][move]) {
          stack.pop();
          cnt += 2;
        } else {
          stack.push(board[i][move]);
        }
        board[i][move] = 0;
        break;
      }
    }
  }
  return cnt;
}
// console.log(
//   solution4(
//     [
//       [0, 0, 0, 0, 0],
//       [0, 0, 1, 0, 3],
//       [0, 2, 5, 0, 1],
//       [4, 2, 4, 4, 2],
//       [3, 5, 1, 3, 1],
//     ],
//     [1, 5, 3, 5, 1, 2, 1, 4],
//   ),
// );

// 신규 아이디 추천
// function solution5(new_id) {
//   // if (!new_id) return 'a';
//   let answer = '';
//   const reg = /[\{\}\[\]\/?,;:|\)*~`!^\+<>@\#$%&\\\=\(\'\"]/gi;
//   for (let i = 0; i < new_id.length; i++) {
//     let newStr = new_id[i].toUpperCase();
//     if (answer.length === 15) break;
//     else if (reg.test(newStr)) continue;
//     else if (answer[answer.length - 1] === '.' && newStr === '.') continue;
//     else if (answer.length === 14 && newStr === '.') break;
//   }
// }
// console.log('bat.y.abcdefghi');

// 실패율
function solution5(N, stages) {
  stages.sort((a, b) => a - b);
  const answer = [];
  let cnt = 0;
  let total = stages.length;
  let stageIdx = 0;
  for (let i = 1; i <= N; i++) {
    while (i === stages[stageIdx]) {
      cnt++;
      stageIdx++;
    }
    answer[i - 1] = [i, cnt / total];
    total -= cnt;
    cnt = 0;
  }
  return answer
    .sort((a, b) => {
      if (a[1] === b[1]) return a[0] - b[0];
      return b[1] - a[1];
    })
    .map((sorted) => sorted[0]);
}
// console.log(solution5(5, [2, 1, 2, 6, 2, 4, 3, 3]));

// 오픈채팅방
function solution6(record) {
  const userInfo = {};
  const result = [];

  for (const info of record) {
    const [status, userId, nickName] = info.split(' ');
    if (status !== 'Leave') userInfo[userId] = nickName;
    if (status === 'Change') continue;
    const msg = `님이 ${status === 'Enter' ? '들어왔습니다.' : '나갔습니다.'}`;
    result.push([userId, msg]);
  }
  return result.map((msgArr) => userInfo[msgArr[0]] + msgArr[1]);
}
// console.log(
//   solution6([
//     'Enter uid1234 Muzi',
//     'Enter uid4567 Prodo',
//     'Leave uid1234',
//     'Enter uid1234 Prodo',
//     'Change uid4567 Ryan',
//   ]),
// );

// 큰 수 만들기
function solutio7(number, k) {
  const stack = [];
  for (let i = 0; i < number.length; i++) {
    // 스택의 쌍인수보다 큰수가 들어오면 앞에쌍인수들을 교체한다.
    while (number[i] > stack[stack.length - 1] && k > 0) {
      k--;
      stack.pop();
    }
    // 스택에 숫자를 쌓는다.
    stack.push(number[i]);
  }
  if (k) return stack.slice(0, stack.length - k).join('');
  return stack.join('');
}
// console.log(solutio7('1541234', 3));
function solutio8(routes) {
  routes.sort((a, b) => a[1] - b[1]);
  let cnt = 0;
  for (let i = 0; i < routes.length; i++) {
    const [entry, out] = routes[i];
    let j = i + 1;
    while (j < routes.length && routes[j][0] <= out) {
      j++;
      i++;
    }
    cnt++;
  }
  return cnt;
}
// console.log(
//   solutio8([
//     [0, 5],
//     [1, 5],
//     [2, 5],
//     [5, 5],
//   ]),
// );

//여행걍로
function solutio9(tickets) {
  // tickets.sort((a, b) => a[1].charCodeAt() - b[1].charCodeAt());
  const answer = [];
  function DFS(list, s, path) {
    if (!list.length) {
      answer.push(path);
    }
    list.forEach(([curr, next], idx) => {
      if (curr === s) {
        const newList = [...list];
        newList.splice(idx, 1);
        DFS(newList, next, path.concat(next));
      }
    });
  }
  DFS(tickets, 'ICN', ['ICN']);
  // console.log(answer);
  // console.log(answer.sort());
  return answer.sort()[0];
}
// console.log(
//   solutio9([
//     ['ICN', 'SFO'],
//     ['ICN', 'ATL'],
//     ['SFO', 'ATL'],
//     ['ATL', 'ICN'],
//     ['ATL', 'SFO'],
//   ]),
// );

// 타겟 넘버
function solutio10(numbers, target) {
  let answer = 0;
  function DFS(i, sum) {
    if (i === numbers.length) {
      if (sum === target) answer++;
      return;
    }
    DFS(i + 1, sum + numbers[i]);
    DFS(i + 1, sum - numbers[i]);
  }
  DFS(0, 0);
  return answer;
}
// console.log(solutio10([1, 1, 1, 1, 1], 3));
// function solutio11(relation) {
//   const ch = [0, 0, 0, 0];
//   const combination = [];
//   function DFS(l) {
//     if (l === 4) {
//       combination.push([...ch]);
//       return;
//     }
//     if (ch[l] === 0) {
//       ch[l] = 1;
//       DFS(l + 1);
//       ch[l] = 0;
//       DFS(l + 1);
//     }
//   }
//   DFS(0);
//   // 부분집합이 있으면 유일성을 충족하지 못함.
//   // ex 같은
//   for (const x of combination) {
//     // console.log(x);
//   }

//   console.log(combination.length);
// }

// console.log(
//   solutio11([
//     ['100', 'ryan', 'music', '2'],
//     ['200', 'apeach', 'math', '2'],
//     ['300', 'tube', 'computer', '3'],
//     ['400', 'con', 'computer', '4'],
//     ['500', 'muzi', 'music', '3'],
//     ['600', 'apeach', 'music', '2'],
//   ]),
// );

// replaceAll
// str = str.replace(new RegExp(b, 'gi'), '#');
// 옹알이 (2)
function solutio11(babbling) {
  const init = ['aya', 'ye', 'woo', 'ma'];
  let answer = 0;
  for (let str of babbling) {
    let cnt = 4;
    let isBreak = false;
    while (true) {
      for (const x of init) {
        cnt--;
        if (str.startsWith(x)) {
          str = str.replace(x, '');
          cnt = 3;
        }
        if (!str || cnt === 0) {
          if (!str) answer++;
          isBreak = true;
          break;
        }
      }
      if (isBreak) break;
    }
  }
  return answer;
}
// console.log(solutio11(['ayaye', 'uuu', 'yeye', 'yemawoo', 'ayaayaa']));
function solution11_1(babbling) {
  let result = 0;
  const babblings = ['aya', 'ye', 'woo', 'ma'];

  const division = (babble) => {
    let newBabble = babble;
    babblings.forEach((el, index) => {
      newBabble = newBabble.replaceAll(el, index + 1);
    });

    console.log(newBabble);
    for (let i = 0; i < newBabble.length; i++) {
      // 숫잩타입이 아니라면
      if (!+newBabble[i]) return 0;
      if (newBabble[i] === newBabble[i + 1]) return 0;
    }
    return 1;
  };

  babbling.forEach((el) => {
    result += division(el);
    return false;
  });

  return result;
}
// console.log(solution11_1(['ayayeayayeaya', 'yemawoo', 'yee', 'u', 'maa']));
function solution12(num, total) {
  let r = 0;
  for (let i = 0; i < num; i++) {
    r += i;
  }
  const m = (total - r) / num;
  return Array.from({ length: num }).map((_, idx) => idx + m);
}
// console.log(solution12(5, 5));
// 다음에 올 숫자
function solution13(common) {
  let nextNum;
  if (common[0] - common[1] === common[1] - common[2])
    nextNum = common[common.length - 1] + common[1] - common[0];
  else nextNum = common[common.length - 1] * (common[1] / common[0]);
  return nextNum;
}
// console.log(solution13([1, 2, 3, 4]));

// 옹알이 (1)
function solution13(babbling) {
  const init = ['aya', 'ye', 'woo', 'ma'];
  const checkCnt = (str) => {
    init.forEach((v, idx) => {
      str = str.replaceAll(v, idx + 1);
    });
    return isNaN(str) ? 0 : 1;
  };

  let cnt = 0;
  for (const str of babbling) cnt += checkCnt(str);
  return cnt;
}
// console.log(solution13(['ayaye', 'uuuma', 'ye', 'yemawoo', 'ayaa']));

// N-Queen
// function solutio14(n) {
//   for (let i = 0; i < n; i++) {
//     const ch = Array.from(Array(n), () => Array(n).fill(0));
//     ch[0][i] = 1;
//     console.log(ch);
//     break;
//   }
// }
// console.log(solutio14(4));

function solutio15(food) {
  const answer = [];
  for (let i = 1; i < food.length; i++) {
    if (food[i] >= 2) {
      const m = Math.floor(food[i] / 2);
      answer.push(...Array(m).fill(i));
    }
  }
  return [...answer, 0, ...answer.reverse()].join('');
}
// console.log(solutio15([1, 3, 4, 6]));

// 문자열 압축
// 문자열을 압축하였을때 가장 짧은 길이의 문자의 길이를 출력해라
// 전체
function solutio16(s) {
  const getIdxSplitCount = (idx) => {
    let str = '';
    let tmp = s.substring(0, idx);
    let cnt = 1;
    for (let i = idx; i <= s.length; i = i + idx) {
      if (tmp === s.substring(i, i + idx)) {
        cnt++;
      } else {
        str += cnt > 1 ? cnt + tmp : tmp;
        tmp = s.substring(i, i + idx);
        cnt = 1;
      }
    }
    if (cnt > 1) str += cnt + tmp;
    if (s.length % idx !== 0) str += s.substring(s.length - (s.length % idx));
    return str.length;
  };

  let min = Number.MAX_SAFE_INTEGER;
  for (let i = 1; i <= Math.floor(s.length); i++) {
    min = Math.min(min, getIdxSplitCount(i));
  }
  return min;
}
// console.log(solutio16('ababcdcdababcdcd'));

// 배열의 유사도
function solutio17(s1, s2) {
  const obj = s1.reduce((prev, curr) => {
    prev[curr] = (prev[curr] || 0) + 1;
    return prev;
  }, {});

  let cnt = 0;
  for (const s of s2) {
    if (obj[s]) {
      --obj[s];
      cnt++;
    }
  }
  return cnt;
}
// console.log(solutio17(['a', 'b', 'c'], ['com', 'b', 'd', 'p', 'c']));

// 문자열밀기
function solutio18(A, B) {
  return (B + B).indexOf(A);
}
// console.log(solutio18('hello', 'ohell'));

// OX퀴즈
// eval을 사용하면 쉽게 풀이가능
function solution19(quiz) {
  const answer = [];
  for (let x of quiz) {
    x = x.split(' ').join('');
    let [a, b] = x.split('=');
    let lt = '';
    for (let i = 0; i < a.length; i++) {
      if (i === 0 && a[i] === '-') {
        lt += a[i];
        continue;
      }
      if (!isNaN(a[i])) lt += a[i];
      else {
        const rt = a.substring(i + 1);
        if (a[i] === '+') answer.push(+lt + +rt === +b ? 'O' : 'X');
        else answer.push(+lt - +rt === +b ? 'O' : 'X');
        break;
      }
    }
  }
  return answer;
}
// console.log(solution19(['-4 - 1 = -5', '5 + 6 = 11']));
