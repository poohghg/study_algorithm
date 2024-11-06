function solution(n, edge) {
  let answer = 0;
  const list = {};
  const distance = { 1: 0 };
  const q = [1];
  // const visited = { 1: true };

  for (const [v1, v2] of edge) {
    if (!list[v1]) list[v1] = [];
    if (!list[v2]) list[v2] = [];
    list[v1].push(v2);
    list[v2].push(v1);
  }

  for (const x in list) {
    if (x === '1') distance[x] = 0;
    else distance[x] = Infinity;
  }

  let curNode;
  while (q.length) {
    curNode = q.shift();
    for (const x of list[curNode]) {
      if (distance[x] > distance[curNode] + 1) {
        distance[x] = distance[curNode] + 1;
        q.push(x);
      }
    }
  }
  const values = Object.values(distance);
  const max = Math.max(...values);
  values.forEach((v) => {
    if (v === max) answer++;
  });
  return answer;
}

// console.log(
//   solution(6, [
//     [3, 6],
//     [4, 3],
//     [3, 2],
//     [1, 3],
//     [1, 2],
//     [2, 4],
//     [5, 2],
//   ]),
// );

function fibo(n) {
  const tmp = [];
  for (let i = 0; i <= n; i++) {
    if (i < 2) tmp[i] = i;
    else tmp[i] = (tmp[i - 1] + tmp[i - 2]) % 1234567;
  }
  console.log(tmp);
  return tmp[n];
}
// console.log('test', fibo(7));

function solution_2(s) {
  const stack = [];
  for (const x of s) {
    if (x === '(') stack.push(x);
    else {
      if (stack.length === 0) return false;
      stack.pop();
    }
  }
  if (stack.length !== 0) return false;
  return true;
}
// console.log(solution_2('(())()'));
function solution_3(progresses, speeds) {
  const answer = [];
  while (progresses.length !== 0) {
    let cnt = 0;
    while (progresses[0] >= 100) {
      progresses.shift();
      speeds.shift();
      cnt++;
    }
    if (cnt) answer.push(cnt);
    for (let i = 0; i < speeds.length; i++) {
      progresses[i] = progresses[i] + speeds[i];
    }
  }
  return answer;
}
// 남은 일수를 계산해서 처리
function solution_3_1(progresses, speeds) {
  const answer = [];
  const days = progresses.map((progresse, idx) =>
    Math.ceil((100 - progresse) / speeds[idx]),
  );
  console.log(days);
  let count = 1;
  let maxDay = days[0];
  for (let i = 1; i < days.length; i++) {
    if (maxDay >= days[i]) {
      count++;
    } else {
      maxDay = days[i];
      answer.push(count);
      count = 1;
    }
  }
  if (count) answer.push(count);
  return answer;
}
// console.log(solution_3_1([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]));

/**
 * 스파이들은 매일 다른 옷을 조합하여 입어 자신을 위장합니다.
 * 예를 들어 스파이가 가진 옷이 아래와 같고 오늘 스파이가 동그란 안경, 긴 코트, 파란색 티셔츠를 입었다면
 * 다음날은 청바지를 추가로 입거나 동그란 안경 대신 검정 선글라스를 착용하거나 해야 합니다.
 */
function solution_4(clothes) {
  let answer = 1;
  const obj = {};
  for (let i = 0; i < clothes.length; i++) {
    obj[clothes[i][1]] = (obj[clothes[i][1]] || 1) + 1;
  }

  console.log(obj);
  for (let key in obj) {
    answer *= obj[key];
  }

  return answer - 1;
}
// console.log(
//   solution_4([
//     ['yellow_hat', 'headgear'],
//     ['blue_sunglasses', 'eyewear'],
//     ['green_turban', 'headgear'],
//   ]),
// );

// 순위
function solution_5(score) {
  const answer = Array.from({ length: score.length }).fill(1);
  let sum;
  for (let i = 0; i < score.length; i++) {
    sum = score[i].reduce((a, b) => a + b, 0);
    for (let j = 0; j < score.length; j++) {
      if (score[j].reduce((a, b) => a + b, 0) >= sum) {
        answer[i]++;
      }
    }
  }
  return answer;
}

// 문자열 내 마음대로 정렬하기
// 이 함수가 리턴하는 값이 0보다 작을 경우, a가 b보다 앞에 오도록 정렬하고,
// 이 함수가 리턴하는 값이 0보다 클 경우, b가 a보다 앞에 오도록 정렬합니다.
function solution_5_1(strings, n) {
  return strings.sort((a, b) => {
    if (a.charCodeAt(n) === b.charCodeAt(n)) {
      return a > b ? 1 : -1;
      // return b - a;
    }
    return a.charCodeAt(n) - b.charCodeAt(n);
  });
}

// 내적
function solution_5_2(a, b) {
  return a.reduce((prev, curr, idx) => prev + curr * b[idx], 0);
}

console.log(solution_5_2([1, 2, 3, 4], [-3, -1, 0, 2]));

// console.log(solution_5_1(['abce', 'abcd', 'cdx'], 2));
// console.log(
//   solution_5([
//     [80, 70],
//     [70, 80],
//     [30, 50],
//     [90, 100],
//     [100, 90],
//     [100, 100],
//     [10, 30],
//   ]),
// );

/**
 * 캐쉬
 * LRU
 */
function solution_6(cacheSize, cities) {
  let answer = 0;
  const cache = new Set();
  for (let city of cities) {
    if (!cacheSize) return 5 * cities.length;
    city = city.toLowerCase();
    if (cache.has(city)) {
      cache.delete(city);
      answer += 1;
    } else {
      if (cache.size === cacheSize) cache.delete(cache.values().next().value);
      answer += 5;
    }
    cache.add(city);
  }
  return answer;
}
// console.log(
//   solution_6(3, [
//     'Jeju',
//     'Pangyo',
//     'Seoul',
//     'NewYork',
//     'LA',
//     'Jeju',
//     'Pangyo',
//     'Seoul',
//     'NewYork',
//     'LA',
//   ]),
// );

function solution_7(array, commands) {
  const answer = [];
  for (let [s, e, k] of commands) {
    let tmp = array.slice(s - 1, e).sort((a, b) => a - b)[k - 1];
    answer.push(tmp);
  }
  return answer;
}
// console.log(
//   solution_7(
//     [1, 5, 2, 6, 3, 7, 4],
//     [
//       [2, 5, 3],
//       [4, 4, 1],
//       [1, 7, 3],
//     ],
//   ),
// );
/**
 * 자연수 n이 주어졌을 때, n의 다음 큰 숫자는 다음과 같이 정의 합니다.
 * 조건 1. n의 다음 큰 숫자는 n보다 큰 자연수 입니다.
 * 조건 2. n의 다음 큰 숫자와 n은 2진수로 변환했을 때 1의 갯수가 같습니다.
 * 조건 3. n의 다음 큰 숫자는 조건 1, 2를 만족하는 수 중 가장 작은 수 입니다.
 */
function solution_8(n) {
  const binaryCnt = Array.from(n.toString(2)).filter((v) => v === '1').length;
  let tmp;
  while (true) {
    n++;
    tmp = Array.from(n.toString(2)).filter((v) => v === '1').length;
    if (binaryCnt === tmp) return n;
  }
}
// console.log(solution_8(15));
// 포켓몬 해쉬
function solution_8(nums) {
  const getMaxCnt = Math.floor(nums.length / 2);
  const size = new Set(nums).size;
  return getMaxCnt > size ? size : getMaxCnt;
}
// console.log(solution_8([3, 1, 2, 3]));

// 피로도
function solution_9(k, dungeons) {
  let max = 0;
  const ch = Array.from({ length: dungeons.length }).fill(0);
  function DFS(l, k) {
    max = Math.max(max, l);
    for (let i = 0; i < dungeons.length; i++) {
      const [limitedNum, exhaustion] = dungeons[i];
      if (ch[i] === 0 && k >= limitedNum) {
        ch[i] = 1;
        DFS(l + 1, k - exhaustion);
        ch[i] = 0;
      }
    }
  }
  DFS(0, k);
  return max;
}
// console.log(
//   solution_9(80, [
//     [80, 20],
//     [50, 40],
//     [30, 10],
//   ]),
// );

// 같은 숫자는 싫어
function solution_10(arr) {
  const answer = [];
  let last = '';
  for (let i = 0; i < arr.length; i++) {
    if (last !== arr[i]) {
      answer.push(arr[i]);
      last = arr[i];
    }
  }
  return answer;
}

// 두 개 뽑아서 더하기
function solution_11(numbers) {
  let answer = new Set();
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      answer.add(numbers[i] + numbers[j]);
    }
  }
  return Array.from(answer).sort((a, b) => a - b);
}
// console.log(solution_11([2, 1, 3, 4, 1]));

// 시저 암호
function solution_12(s, n) {
  function checkalphabet(num) {
    let tmp = num + n;
    if ('a'.charCodeAt() <= num && num <= 'z'.charCodeAt()) {
      if (tmp > 'z'.charCodeAt()) {
        tmp = tmp - 'z'.charCodeAt() + 'a'.charCodeAt() - 1;
      }
    } else if ('A'.charCodeAt() <= num && num <= 'Z'.charCodeAt()) {
      if (tmp > 'Z'.charCodeAt()) {
        tmp = tmp - 'Z'.charCodeAt() + 'A'.charCodeAt() - 1;
      }
    }
    return String.fromCharCode(tmp);
  }
  let answer = '';
  for (let i = 0; i < s.length; i++) {
    if (s[i].charCodeAt() === 32) {
      answer += ' ';
    } else {
      answer += checkalphabet(s[i].charCodeAt());
    }
  }
  return answer;
}
// console.log(solution_12('a B z', 4));

// 예산
function solution_13(d, budget) {
  let answer = 0;
  d.sort((a, b) => a - b);
  for (const m of d) {
    console.log(m);
    if (budget < m) break;
    answer += 1;
    budget -= m;
  }
  return answer;
}
// console.log(solution_13([1, 3, 2, 5, 4], 9));
// 카펫
function solution_14(brown, yellow) {
  let sum = brown + yellow;
  for (let h = 3; h <= sum; h++) {
    if (sum % h === 0) {
      let w = sum / h;
      if (h > w) return;
      if ((w - 2) * (h - 2) === yellow) return [w, h];
    }
  }
}
// console.log(solution_14(24, 9));

// 최소직사각형
function solution_15(sizes) {
  let answer = [0, 0];
  //  큰 순서로 정렬
  const sorted = sizes.map(([w, h]) => (h > w ? [h, w] : [w, h]));
  for (const [w, h] of sorted) {
    if (w > answer[0]) answer[0] = w;
    if (h > answer[1]) answer[1] = h;
  }
  return answer[0] * answer[1];
}
// console.log(
//   solution_15([
//     [10, 7],
//     [12, 3],
//     [8, 15],
//     [14, 7],
//     [5, 15],
//   ]),
// );
// 가운데 숫자가져오기
function solution_15(s) {
  let answer = '';
  const len = Math.floor(s.length / 2);
  if (s.length % 2 === 0) {
    answer = s[len - 1] + s[len];
  } else {
    answer = s[len];
  }
  return answer;
}
// console.log(solution_15('qwer'));

function solution_16(arr) {
  const min = Math.min(...arr);
  const minIndex = arr.findIndex((v) => v === min);
  arr.splice(minIndex, 1);
  return arr.length !== 0 ? arr : [-1];
}

// console.log(solution([4, 3, 2, 1]));

// 이상한 문자 만들기
function solution_17(s) {
  let answer = '';
  let cnt = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ') {
      cnt = 0;
      answer += ' ';
    } else {
      cnt++;
      cnt % 2 !== 0
        ? (answer += s[i].toUpperCase())
        : (answer += s[i].toLowerCase());
    }
  }
  return answer;
}
// console.log(solution_17('try hello world'));

/**
 * 짝지어 제하
 * 짝지어 제거하기는, 알파벳 소문자로 이루어진 문자열을 가지고 시작합니다.
 * 먼저 문자열에서 같은 알파벳이 2개 붙어 있는 짝을 찾습니다.
 * 그다음, 그 둘을 제거한 뒤, 앞뒤로 문자열을 이어 붙입니다.
 * 이 과정을 반복해서 문자열을 모두 제거한다면 짝지어 제거하기가 종료됩니다.
 * 문자열 S가 주어졌을 때, 짝지어 제거하기를 성공적으로 수행할 수 있는지 반환하는 함수를 완성해 주세요.
 * 성공적으로 수행할 수 있으면 1을, 아닐 경우 0을 리턴해주면 됩니다.
 */

function solution_18(s) {
  if (s.length % 2 !== 0) return 0;
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (stack[stack.length - 1] === s[i]) stack.pop();
    else stack.push(s[i]);
  }
  return stack.length === 0 ? 1 : 0;
}
// console.log(solution_18('baabaa'));

// 비밀지도
function solution_19(n, arr1, arr2) {
  const answer = Array.from({ length: n }).fill('');
  for (let i = 0; i < n; i++) {
    const tmp1 = arr1[i].toString(2).split('');
    const tmp2 = arr2[i].toString(2).split('');
    const tmpArr = [];

    while (tmpArr.length !== n) {
      const x1 = tmp1.pop();
      const x2 = tmp2.pop();
      if (x1 === '1' || x2 === '1') tmpArr.push('#');
      else tmpArr.push(' ');
    }
    answer[i] = tmpArr.reverse().join('');
  }
  return answer;
}
// console.log(solution_19(6, [46, 33, 33, 22, 31, 50], [27, 56, 19, 14, 14, 10]));

// 숫자 문자열과 영단어
function solution_20(s) {
  if (s.length === 0) return;
  const stringToNum = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  for (let i = 0; i < 10; i++) {
    s = s.split(stringToNum[i]).join(i);
  }
  return parseInt(s, 10);
}
// console.log(solution_20('one4seveneight'));
