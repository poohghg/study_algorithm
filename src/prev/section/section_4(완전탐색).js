/** 
자릿수의 합
문제1 
N개의 자연수가 입력되면 각 자연수의 자릿수의 합을 구하고, 
그 합이 최대인 자연수를 출력 하는 프로그램을 작성하세요. 
자릿수의 합이 같은 경우 원래 숫자가 큰 숫자를 답으로 합니다.
만약 235 와 1234가 동시에 답이 될 수 있다면 1234를 답으로 출력해야 합니다.
*/
function solution_1_my(numbers) {
  // forEach return - >continue
  // forEach return false - >brake
  let answer,
    max = Number.MIN_SAFE_INTEGER; // let maxInfo = { max: Number.MIN_SAFE_INTEGER, index: 0 };
  numbers.forEach((v) => {
    const curV = String(v)
      .split('')
      .reduce((prev, curr) => prev + Number(curr), 0);
    if (curV >= max) {
      if (curV === max && answer > v) {
        return;
      }
      max = curV;
      answer = v;
    }
  });
  return answer;
}

function solution_1(numbers) {
  let answer,
    max = Number.MIN_SAFE_INTEGER;

  for (const x of numbers) {
    let sum = 0,
      tmp = x;
    while (tmp) {
      // 1의자리
      sum += tmp % 10;
      // 1의자리의 앞자리수
      tmp = parseInt(tmp / 10, 10);
    }
    if (sum >= max) {
      if (sum === max && answer > x) {
        continue;
      }
      max = sum;
      answer = x;
    }
  }
  return answer;
}
// console.log("solution_1_my", solution_1([128, 460, 603, 40, 521, 137, 123]));

/**
 실수 변환
 문제2
 N개의 자연수가 입력되면 각 자연수를 뒤집은 후 그 뒤집은 수가 소수이면 
 그 소수를 출력하 는 프로그램을 작성하세요. 예를 들어 32를 뒤집으면 23이고, 23은 소수이다. 
 그러면 23을 출 력한다. 단 910를 뒤집으면 19로 숫자화 해야 한다. 첫 자리부터의 연속된 0은 무시한다.
 */

function solution_2_my(numbers) {
  let answer = [];

  function isPrimeNumber(n) {
    if (n === 1) return false;
    for (let i = 2; i < n; i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  numbers.forEach((v) => {
    const reverseV = parseInt(v.toString().split('').reverse().join(''), 10);
    if (isPrimeNumber(reverseV)) answer.push(reverseV);
  });
  return answer;
}

function solution_2(numbers) {
  let answer = [];
  function isPrimeNumber(n) {
    if (n === 1) return false;
    for (let i = 2; i < parseInt(Math.sqrt(n), 10); i++) {
      // 소수
      if (n % i === 0) return false;
    }
    return true;
  }

  for (let x of numbers) {
    let res = 0,
      t;
    while (x) {
      // 마지막 자릿수를 구한다.
      t = x % 10;
      x = parseInt(x / 10, 10);
      // 한자리씩 늘린다.
      res = res * 10 + t;
    }
    if (isPrimeNumber(res)) answer.push(res);
  }
  return answer;
}

// console.log(
//   'solution_2_my',
//   solution_2([32, 55, 62, 20, 250, 370, 200, 30, 100]),
// );

/**
문제3. 멘토링
현수네 반 선생님은 반 학생들의 수학점수를 향상시키기 위해 멘토링 시스템을 만들려고 합니 다. 
멘토링은 멘토(도와주는 학생)와 멘티(도움을 받는 학생)가 한 짝이 되어 멘토가 멘티의 수학공부를 도와주는 것입니다.
선생님은 M번의 수학테스트 등수를 가지고 멘토와 멘티를 정합니다.
만약 A학생이 멘토이고, B학생이 멘티가 되는 짝이 되었다면, A학생은 M번의 수학테스트에서 모두 B학생보다 등수가 앞서야 합니다.
M번의 수학성적이 주어지면 멘토와 멘티가 되는 짝을 만들 수 있는 경우가 총 몇 가지 인지 출력하는 프로그램을 작성하세요.
 */

function solution_3_my(n, array) {
  let answer = [];
  const students = Array.from({ length: n }, (_, index) => index + 1);
  students.forEach((firstS) => {
    students.forEach((secondS) => {
      if (firstS === secondS) return;
      let pi = 0;
      let pj = 0;
      let flage = true;
      for (let s = 0; s < array.length; s++) {
        const roundS = array[s];
        // 처음 뽑은 학생의 등수
        pi = roundS.findIndex((v) => v === firstS);
        // 두번째 뽑은 학생의 등수
        pj = roundS.findIndex((v) => v === secondS);
        if (pi > pj) {
          flage = false;
          break;
        }
      }
      if (flage) answer.push([firstS, secondS]);
    });
  });
  return answer;
}

function solution_3(test) {
  let anser = 0;
  // 시험횟수
  const m = test.length;
  // 학생의 수
  const n = test[0].length;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (i === j) continue;
      // 시험횟수 * 학생수 만큼 for문을 돈다.
      let cnt = 0;
      for (let k = 0; k < m; k++) {
        let pi = 0,
          pj = 0;
        for (let s = 0; s < n; s++) {
          if (test[k][s] === i) pi = s;
          if (test[k][s] === j) pj = s;
        }
        // 등수가 낮다면
        if (pi > pj) break;
        cnt++;
      }
      if (cnt === m) anser++;
    }
  }
  return anser;
}

// const input = [
//   [3, 4, 1, 2],
//   [4, 3, 2, 1],
//   [3, 1, 4, 2],
// ];
// console.log('solution_3', solution_3(input));

/**
 문제4.
  선생님은 올해 졸업하는 반 학생들에게 졸업선물을 주려고 합니다.
  학생들에게 인터넷 쇼핑몰에서 각자 원하는 상품을 골라 그 상품의 가격과 배송비를 제출하라 고 했습니다. 선생님이 가지고 있는 예산은 한정되어 있습니다.
  현재 예산으로 최대 몇 명의 학생에게 선물을 사줄 수 있는지 구하는 프로그램을 작성하세요. 
  선생님은 상품 하나를 50% 할인해서(반 가격) 살 수 있는 쿠폰을 가지고 있습니다. 배송비는 할인에 포함되지 않습니다.
 */

// 경우의수가 전부일때 완전탐색을 한다.
function solution_4_my(n, m, pl) {
  let answer = 0;
  pl.sort((a, b) => {
    return a[0] + a[1] - (b[0] + b[1]);
  });

  for (let i = 0; i < n; i++) {
    // 완전탐색임으로 전체 가격에 반값 조건을 준다.
    let money = m - pl[i][0] / 2 + pl[i][1];
    let cnt = 1;
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      if (money >= pl[j][0] + pl[j][1]) {
        money -= pl[j][0] + pl[j][1];
        cnt++;
      } else {
        if (cnt > answer) answer = cnt;
        break;
      }
    }
  }
  return answer;
}

const payList = [
  [6, 6],
  [2, 2],
  [4, 3],
  [4, 5],
  [10, 3],
];
// console.log('solution_1_my', solution_4_my(5, 28, payList));

/**
 k번째 큰수
 문제 5
 현수는 1부터 100사이의 자연수가 적힌 N장의 카드를 가지고 있습니다. 같은 숫자의 카드가 여러장 있을 수 있습니다. 현수는 이 중 3장을 뽑아 각 카드에 적힌 수를 합한 값을 기록하려 고 합니다. 3장을 뽑을 수 있는 모든 경우를 기록합니다. 기록한 값 중 K번째로 큰 수를 출력 하는 프로그램을 작성하세요.
만약 큰 수부터 만들어진 수가 25 25 23 23 22 20 19......이고 K값이 3이라면 K번째 큰 값 은 22입니다.
 */

function solution_5_my(n, m, arr) {
  let answer = 0;
  let totalArr = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        const sum = arr[i] + arr[j] + arr[k];
        totalArr.push(sum);
      }
    }
  }
  // 10c3 -> 120
  console.log(totalArr.length);
  let max = Number.MIN_SAFE_INTEGER;
  let cnt = 0;
  totalArr
    .sort((a, b) => b - a)
    .forEach((v, index) => {
      if (max !== v) {
        cnt++;
        max = v;
      }
      if (cnt === m) {
        answer = v;
        return false;
      }
    });

  return answer;
}

function solution_5(n, m, arr) {
  let answer = 0;
  let totalArr = new Set();
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        const sum = arr[i] + arr[j] + arr[k];
        totalArr.add(sum);
      }
    }
  }

  answer = Array.from(totalArr).sort((a, b) => b - a)[m - 1];
  return answer;
}

console.log(
  'solution_5_my',
  solution_5(10, 3, [13, 15, 34, 23, 45, 65, 33, 11, 26, 42]),
);
