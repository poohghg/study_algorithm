// 매칭 점수
function solution1(n, lost, reserve) {
  lost.sort((a, b) => a - b);
  const res = [];
  const reserveCnt = reserve.reduce((acc, curr) => {
    acc[curr] = acc[curr]++ || 1;
    return acc;
  }, {});
  n = n - lost.length;

  for (const x of lost) {
    if (reserveCnt[x]) {
      reserveCnt[x]--;
      n++;
      continue;
    }
    res.push(x);
  }

  for (const x of res) {
    if (reserveCnt[x - 1]) {
      reserveCnt[x - 1]--;
      n++;
    } else if (reserveCnt[x + 1]) {
      reserveCnt[x + 1]--;
      n++;
    }
  }
  return n;
}

// console.log(solution_1(8, [5, 6, 7], [4, 5]));

// 명예의 전당
function solution2(k, score) {
  const addElement = (ele) => {
    let isBreak = false;
    for (let i = rank.length - 1; i >= 0; i--) {
      if (rank[i] > ele) {
        rank.splice(i + 1, 0, ele);
        isBreak = true;
        break;
      }
    }
    if (!isBreak) rank.unshift(ele);
  };

  const answer = [];
  const rank = [];
  for (const s of score) {
    addElement(s);
    if (rank.length > k) rank.pop();
    answer.push(rank[rank.length - 1]);
  }
  return answer;
}

// console.log(solution_2(4, [0, 300, 40, 300, 20, 70, 150, 50, 500, 1000]));

// 귤 고르기
function solution3(k, tangerine) {
  const countObj = tangerine.reduce((acc, curr) => {
    acc[curr] = ++acc[curr] || 1;
    return acc;
  }, {});
  const sorted = Object.values(countObj).sort((a, b) => b - a);

  // let cnt = 0;
  for (let i = 0; i < sorted.length; i++) {
    k -= sorted[i];
    if (0 >= k) return i + 1;
  }
}

// console.log(solution_3(4, [1, 3, 2, 5, 4, 5, 2, 3]));

// https://school.programmers.co.kr/learn/courses/30/lessons/42861
// 섬 연결하기
function solution4(n, costs) {
  const list = {};

  for (const [node1, node2, weigth] of costs) {
    list[node1] = list[node1]?.concat([[node2, weigth]]) || [[node2, weigth]];
    list[node2] = list[node2]?.concat([[node1, weigth]]) || [[node1, weigth]];
  }

  const BFS = (start) => {
    // console.log(start);
    const queue = [[start, 0]];
    // 시작점부터의 각노드의 거리를 표기한다.
    const distances = {};
    // 해당노드가 전 방문노드를 체크
    const previous = { [start]: start };

    for (const vertex in list) {
      if (start === vertex) distances[start] = 0;
      else distances[vertex] = Infinity;
    }

    while (queue.length) {
      // queue.sort((a, b) => b[1] - a[1]);
      const [curNode, dist] = queue.shift();
      // 갈수있는 방법이있고
      if (distances[curNode] !== Infinity) {
        list[curNode].forEach((next) => {
          const [nextNode, weigth] = next;
          const curDist = dist + weigth;
          if (distances[nextNode] > curDist) {
            distances[nextNode] = curDist;
            queue.push([nextNode, curDist]);
            previous[nextNode] = curNode;
          }
        });
      }
    }
    console.log('distances', distances);
    console.log('previous', previous);
    // console.log('list', list);

    // let cnt = 0;
    // for (const [cur, prev] of Object.entries(previous)) {
    //   console.log(cur, prev);
    //   cnt += distances[cur] - distances[prev];
    // }
    // return cnt;
  };
  return BFS(costs[0][0].toString());
}

// console.log(
//   solution_4(4, [
//     [0, 1, 5],
//     [1, 2, 3],
//     [2, 3, 3],
//     [1, 3, 2],
//     [0, 3, 4],
//   ]),
// );

// https://gmlwjd9405.github.io/2018/08/28/algorithm-mst.html
// https://velog.io/@longroadhome/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-LV.3-%EC%84%AC-%EC%97%B0%EA%B2%B0%ED%95%98%EA%B8%B0-JS
function solution4_1(n, costs) {
  const getParent = (parent, node) => {
    if (parent[node] === node) return node;
    return getParent(parent, parent[node]);
  };

  const unionParent = (parent, a, b) => {
    const n1 = getParent(parent, a);
    const n2 = getParent(parent, b);
    if (n1 < n2) parent[n2] = n1;
    else parent[n1] = n2;
  };

  const isSameParent = (parent, a, b) => {
    const n1 = getParent(parent, a);
    const n2 = getParent(parent, b);
    return n1 === n2;
  };

  let answer = 0;
  const parent = Array.from({ length: n }).map((_, i) => i);
  costs.sort((a, b) => a[2] - b[2]);
  for (const cost of costs) {
    if (!isSameParent(parent, cost[0], cost[1])) {
      answer += cost[2];
      unionParent(parent, cost[0], cost[1]);
    }
  }
  return answer;
}

// console.log(
//   solution4_1(4, [
//     [0, 1, 5],
//     [1, 2, 3],
//     [2, 3, 3],
//     [1, 3, 2],
//     [0, 3, 4],
//   ]),
// );

// 베스트앨범
function solution5(genres, plays) {
  const info = {};
  for (let i = 0; i < genres.length; i++) {
    info[genres[i]] = info[genres[i]]?.concat([[plays[i], i]]) || [
      [plays[i], i],
    ];
  }
  return Object.values(info)
    .sort(
      (a, b) =>
        b.reduce((accu, curr) => (accu += curr[0]), 0) -
        a.reduce((accu, curr) => (accu += curr[0]), 0),
    )
    .map((genreArr) =>
      genreArr
        .sort((a, b) => b[0] - a[0])
        .slice(0, 2)
        .map((v) => v[1]),
    )
    .flat();
}

// console.log(
//   solution5(
//     ['classic', 'pop', 'classic', 'classic', 'pop'],
//     [500, 600, 150, 800, 2500],
//   ),
// );

// 문자열 내 p와 y의 개수
function solution6(s) {
  let cnt = [0, 0];
  for (const str of s) {
    if (str.toLowerCase() === 'p') cnt[0]++;
    else if (str.toLowerCase() === 'y') cnt[1]++;
  }
  return cnt[0] === cnt[1];
}

// console.log(solution6('pPoooyY'));

// 문자열 나기
function solution7(s) {
  const divive = (s, answer) => {
    if (!s.length) return answer;

    let cnt = 1;
    for (let i = 1; i < s.length; i++) {
      if (s[0] !== s[i]) cnt--;
      else cnt++;
      if (cnt == 0) return divive(s.slice(i + 1), answer + 1);
    }
    return answer + 1;
  };
  return divive(s, 0);
}

// console.log(solution7('bananaa'));

function solution8(k, d) {
  const moves = [
    [0, k],
    [k, 0],
    [k, k],
  ];
  const visited = { [[0, 0].join(',')]: 1 };
  const queue = [[0, 0]];

  while (queue.length) {
    const curLoc = queue.shift();

    for (const move of moves) {
      const row = curLoc[0] + move[0];
      const loc = curLoc[1] + move[1];
      const newLoc = [row, loc];
      if (row ** 2 + loc ** 2 > d ** 2 || visited[newLoc.join('')]) continue;
      visited[newLoc.join(',')] = 1;
      queue.push(newLoc);
    }
  }
  console.log(visited);
  return Object.keys(visited).length;
}

// 점 찍기
function solution8_1(k, d) {
  let answer = 0;
  const limit = d ** 2;
  for (let i = 0; i <= d; i += k) {
    const max = Math.floor(Math.sqrt(limit - i ** 2));
    answer += Math.floor(max / k) + 1;
  }
  return answer;
}

// console.log(solution8_1(3, 5));

function solution9(e, starts) {
  const memo = {};
  const getDivisors = (num) => {
    let cnt = 0;
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        cnt++;
        if (num / i !== i) cnt++;
      }
    }
    return cnt;
  };

  // for (let i = e; i < Math.min(...starts); i--) {
  //   const element = array[i];
  // }
  //2부터 e까지의 숫자에 대한 약수 정보 삽입
  // https://velog.io/@infinite1305/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EC%96%B5%EC%96%B5%EB%8B%A8%EC%9D%84-%EC%99%B8%EC%9A%B0%EC%9E%90
  const dp = Array(e + 1).fill(0);
  for (let i = 2; i <= e; i++) {
    for (let k = 1; k <= e / i; k++) {
      dp[i * k]++;
    }
  }

  console.log(dp);

  // let max = [e, 0];
  // const ch = Array(e + 1).fill(0);
  // for (e; Math.min(...starts) <= e; e--) {
  //   const cnt = getDivisors(e);
  //   if (cnt >= max[1]) max = [e, cnt];
  //   ch[e] = max[0];
  // }
  // return starts.map((start) => ch[start]);
}

// console.log(solution9(8, [1, 3, 7]));
function solution10(n) {
  const s = '수박';
  return n % 2 === 0 ? s.repeat(n / 2) : s.repeat(Math.floor(n / 2)) + '수';
}

// console.log(solution10(3));
function solution11(n, cores) {
  if (n < cores.length) return n;
  const bs = () => {
    // low = n // len(cores) * min(cores)
    // high = n * min(cores)
    let ls = 1;
    let rs = n / cores.length;
    let middle = (ls + rs) / 2;
    console.log(middle);
    console.log(rs);
    while (ls <= rs) {
      // if()
      break;
    }
  };
  bs();
}

// console.log('solution11', solution11(6, [1, 2, 3]));
// 최빈값
function solution12(array) {
  if (array.length === 1) return array[0];

  const ch = {};
  let max = [];
  for (const x of array) ch[x] = (ch[x] || 0) + 1;
  for (const key in ch) {
    if (ch[key] > ch[max[0]] || !max.length) max = [key];
    else if (ch[key] === ch[max[0]]) max.push(key);
  }
  return max.length > 1 ? -1 : Number(max[0]);
}

// console.log(solution12([3, 3, 1, 2, 4, 4, 4, 3, 3]));

// 2 x n 타일링
function solution13(n) {
  const dy = Array(n + 1).fill(0);
  dy[1] = 1;
  dy[2] = 2;
  dy[3] = 3;
  for (let i = 4; i <= n; i++) dy[i] = (dy[i - 2] + dy[i - 1]) % 1000000007;
  return dy[n];
}

function solution14(begin, target, words) {
  const queue = [[begin, [...words]]];
  // 한번에 하나의 알파벳을 변경할 수 있다.
  while (queue.length) {
    console.log(queue);
    const [el, array] = queue.shift();
    if (el === target) return words.length - array.length;

    for (let i = 0; i < array.length; i++) {
      let cnt = target.length - 1;
      for (let j = 0; j < el.length; j++) {
        if (el[j] === array[i][j]) cnt--;
        else array[i][j] = el[j];
      }
      if (cnt === 0)
        queue.push([array[i], [...array.filter((_, idx) => idx !== i)]]);
    }
  }
  return 0;
}

// console.log(
//   solution14('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']),
// );
function solution15(s) {
  const obj = {};
  const answer = [];
  for (let i = 0; i < s.length; i++) {
    if (obj[s[i]] != null) answer[i] = i - obj[s[i]];
    else answer[i] = -1;
    obj[s[i]] = i;
  }
  return answer;
}

// console.log(solution15('bananab'));

// 디팬스 게임
function solution16(n, k, enemy) {
  if (k >= enemy.length) return enemy.length;

  const getSumWithoutK = (mid) => {
    return enemy
      .slice(0, mid + 1)
      .sort((a, b) => b - a)
      .reduce((acc, curr, idx) => {
        if (idx < k) return acc;
        return acc + curr;
      }, 0);
  };

  let answer = 0;
  let min = k;
  let max = enemy.length - 1;

  while (min <= max) {
    let mid = Math.floor((min + max) / 2);
    if (getSumWithoutK(mid) > n) max = mid - 1;
    else {
      console.log(mid);
      answer = Math.max(answer, mid);
      min = mid + 1;
    }
  }
  return answer + 1;
}

// console.log(solution16(5, 2, [1, 1, 1]));

// 완주하지 못한 선수
function solution17(participant, completion) {
  const completionObj = completion.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});
  for (const v of participant) {
    if (!completionObj[v]) return v;
    completionObj[v]--;
  }
}

// console.log(
//   solution17(
//     ['mislav', 'stanko', 'mislav', 'ana'],
//     ['stanko', 'ana', 'mislav'],
//   ),
// );

// 숫자 블록
function solution18(begin, end) {
  const getDivisors = (num) => {
    if (num === 1) return 0;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0 && num / i <= 10000000) return Math.max(i, num / i);
    }
    return 1;
  };
  const answer = [];
  for (let i = begin; i <= end; i++) {
    answer.push(getDivisors(i));
  }
  return answer;
}

// console.log(solution18(1, 10));

// 특이한 정렬
function solution19(numlist, n) {
  return numlist.sort((a, b) => {
    const calA = n - a;
    const calB = n - b;
    if (Math.abs(calA) === Math.abs(calB)) return b - a;
    return Math.abs(calA) - Math.abs(calB);
  });
}

// console.log(solution19([1, 2, 3, 4, 5, 6], 4));

// 평행
function solution20(dots) {
  const obj = {};
  for (let i = 0; i < dots.length - 1; i++) {
    const [x, y] = dots[i];
    for (let j = i + 1; j < dots.length; j++) {
      const calX = Math.abs(x - dots[j][0]);
      const calY = Math.abs(y - dots[j][1]);
      // 기울기 = y좌표의 차이 / x좌표의 차이
      if (obj[calY / calX]) return 1;
      obj[calY / calX] = true;
    }
  }
  return 0;
}

// console.log(
//   solution20([
//     [3, 5],
//     [4, 1],
//     [2, 4],
//     [5, 10],
//   ]),
// );

// 겹치는 선분의 길이
function solution21(lines) {
  const arr = lines.reduce((acc, cur) => {
    acc.push(['s', cur[0]]);
    acc.push(['e', cur[1]]);
    return acc;
  }, []);
  arr.sort((a, b) => {
    if (a[1] === b[1]) return a[0].charCodeAt() - b[0].charCodeAt();
    return a[1] - b[1];
  });

  let answer = 0;
  let lastEnd = Number.MIN_SAFE_INTEGER;
  const queue = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === 's') queue.push(arr[i]);
    else {
      queue.shift();
      if (queue.length) {
        answer +=
          lastEnd > queue[0][1] ? arr[i][1] - lastEnd : arr[i][1] - queue[0][1];
        lastEnd = arr[i][1];
      }
    }
  }
  return answer;
}

// console.log(
//   solution21([
//     [0, 5],
//     [3, 9],
//     [1, 10],
//   ]),
// );

// 다시
//모두 0으로 만들기
function solution22(a, edges) {
  // 임의의 연결된 두 점을 골라서 한쪽은 1 증가시키고, 다른 한쪽은 1 감소시킵니다.
  if (a.reduce((a, b) => a + b) !== 0) return -1;
  const list = Array(a.length)
    .fill()
    .map(() => []);
  for (const [node1, node2] of edges) {
    list[node1].push(node2);
    list[node2].push(node1);
  }

  let answer = 0n;
  // 현재노드 부모노드
  // root노드에 값을 합산한다.
  const stack = [[0, 0]];
  const visited = {};
  while (stack.length) {
    const [node, parent] = stack.pop();
    // for문을 돌지 않고온 마지막 노드!
    if (visited[node]) {
      a[parent] += a[node];
      answer += BigInt(Math.abs(a[node]));
      continue;
    }
    stack.push([node, parent]);
    visited[node] = true;
    for (const next of list[node]) if (!visited[next]) stack.push([next, node]);
  }
  return answer;
}

// console.log(
//   solution22(
//     [-5, 0, 2, 1, 2],
//     [
//       [0, 1],
//       [3, 4],
//       [2, 3],
//       [0, 3],
//     ],
//   ),
// );
function solution23(phone_number) {
  const answer = [];
  for (let i = 0; i < phone_number.length; i++) {
    if (i > phone_number.length - 5) answer.push(phone_number[i]);
    else answer.push('*');
  }
  return answer.join('');
}

// console.log(solution23('01033334444'));

function solution24(answers) {
  const a = [1, 2, 3, 4, 5];
  const b = [2, 1, 2, 3, 2, 4, 2, 5];
  const c = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  const answer = [
    [0, 1],
    [0, 2],
    [0, 3],
  ];

  for (let i = 0; i < answers.length; i++) {
    if (a[i % a.length] === answers[i]) answer[0][0]++;
    if (b[i % b.length] === answers[i]) answer[1][0]++;
    if (c[i % c.length] === answers[i]) answer[2][0]++;
  }
  answer.sort((a, b) => b[0] - a[0]);
  if (answer[0][0] !== answer[1][0]) return answer[0][1];
  if (answer[0][0] === answer[2][0]) return answer.map((v) => v[1]);
  return [answer[0][1], answer[1][1]];
}

// console.log(solution24([1, 3, 2, 4, 2, 1, 3, 2, 4, 5, 6]));

function solution25(participant, completion) {
  const completed = completion.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  for (const name of participant) {
    if (!completed[name]) return name;
    completed[name]--;
  }
}

// console.log(solution(['leo', 'kiki', 'eden'], ['eden', 'kiki']));

function solution26(numbers) {
  const set = new Set();
  const ch = Array(numbers.length).fill(0);

  const isPrime = (n) => {
    for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
    return n >= 2;
  };

  const dfs = (l, num) => {
    if (num) set.add(Number(num));
    if (l === numbers.length) return;
    for (let i = 0; i < numbers.length; i++) {
      if (ch[i] === 0) {
        ch[i] = 1;
        dfs(l + 1, num + numbers[i]);
        ch[i] = 0;
      }
    }
  };
  dfs(0, '');

  let answer = 0;
  for (const num of set) {
    if (isPrime(Number(num))) answer++;
  }
  return answer;
}

// console.log(solution26('123'));

// 숫자 카드 나누기
function solution27(arrayA, arrayB) {
  arrayA.sort((a, b) => a - b);
  arrayB.sort((a, b) => a - b);
  const confirm = (a, b) => {
    const min = Math.min(...a);
    for (let i = min; i > 1; i--) {
      if (a.every((num) => num % i === 0) && !b.some((num) => num % i === 0))
        return i;
    }
    return 0;
  };
  return Math.max(confirm(arrayA, arrayB), confirm(arrayB, arrayA));
}

// 크기가 작은 부분문자열
function solution28(t, p) {
  const pLen = p.length;
  let answer = 0;
  for (let i = 0; i <= t.length - pLen; i++) {
    if (+p >= +t.substring(i, pLen + i)) answer++;
  }
  return answer;
}

// console.log(solution28('3141592', '271'));

// 테이블 해시 함수
function solution29(data, col, row_begin, row_end) {
  data.sort((a, b) => {
    if (a[col - 1] === b[col - 1]) return b[0] - a[0];
    return a[col - 1] - b[col - 1];
  });

  let answer = 0;
  for (let i = row_begin - 1; i <= row_end - 1; i++) {
    answer ^= data[i].reduce((a, b) => (a += b % (i + 1)), 0);
  }
  return answer;
}

// console.log(
//   solution29(
//     [
//       [2, 2, 6],
//       [1, 5, 10],
//       [4, 2, 9],
//       [3, 8, 3],
//     ],
//     2,
//     2,
//     3,
//   ),
// );

// 마법의 엘리베이터
function solution30(storey) {
  storey = storey.toString();
  let answer = 0;
  let nextPlus = 0;
  for (let i = storey.length - 1; 0 <= i; i--) {
    let n = +storey[i] + nextPlus;
    if (n < 5) {
      answer += n;
      nextPlus = 0;
    } else if (n > 5) {
      answer += 10 - n;
      nextPlus = 1;
    } else {
      if (storey[i - 1] >= 5) nextPlus = 1;
      else nextPlus = 0;
      answer += 5;
    }
  }
  if (nextPlus) answer++;
  return answer;
}

// console.log(solution30(45));

// console.log('1101111011000001101111011'.length);
