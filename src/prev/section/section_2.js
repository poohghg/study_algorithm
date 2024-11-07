/** 
문제1 
N(1<=N<=100)개의 정수를 입력받아, 
자신의 바로 앞 수보다 큰 수만 출력하는 프로그램을 작 성하세요.(첫 번째 수는 무조건 출력한다)*/
function solution_1_my(...arr) {
  let answer = [];
  arr.reduce((prev, curr) => {
    if (curr > prev) answer.push(curr);
    return curr;
  }, 0);
  return answer;
}

function solution_1(...arr) {
  let answer = [arr[0]];
  for (let index = 1; index < arr.length; index++) {
    if (arr[index] > arr[index - 1]) answer.push(arr[index]);
  }
  return answer;
}

// console.log("solution_1_my", solution_1(7, 3, 9, 5, 6, 12));

/**
 문제2
 선생님이 N(1<=N<=1000)명의 학생을 일렬로 세웠습니다. 
 일렬로 서 있는 학생의 키가 앞에 서부터 순서대로 주어질 때, 
 맨 앞에 서 있는 선생님이 볼 수 있는 학생의 수를 구하는 프로그램을 작성하세요. 
 (앞에 서 있는 사람들보다 크면 보이고, 작거나 같으면 보이지 않습니다.)
 */

function solution_2_my(...arr) {
  let answer = 0,
    max = Number.MIN_SAFE_INTEGER;

  arr.forEach((height) => {
    if (height > max) {
      max = height;
      answer++;
    }
  });

  return answer;
}

// console.log(
//   "solution_2",
//   solution_2_my(130, 135, 148, 140, 145, 150, 150, 153)
// );

/**
 문제 3
 A, B 두 사람이 가위바위보 게임을 합니다. 총 N번의 게임을 하여 A가 이기면 A를 출력하고, 
 B가 이기면 B를 출력합니다. 비길 경우에는 D를 출력합니다.
가위, 바위, 보의 정보는 1:가위, 2:바위, 3:보로 정하겠습니다.
 */

function solution_3_my(len, _A, _B) {
  let answer = [];
  function calRockPaperScissors(a_number, b_number) {
    if (a_number === b_number) return 'D';
    if (
      (a_number === 1 && b_number === 2) ||
      (a_number === 2 && b_number === 3) ||
      (a_number === 3 && b_number === 1)
    )
      return 'B';
    return 'A';
  }

  for (let index = 0; index < len; index++) {
    answer.push(calRockPaperScissors(_A[index], _B[index]));
  }
  return answer.join('\n');
}

// const A = [2, 3, 3, 1, 3];
// const B = [1, 1, 2, 2, 3];
// console.log("solution_3", solution_3_my(5, A, B));

/**
 문제4
 OX 문제는 맞거나 틀린 두 경우의 답을 가지는 문제를 말한다. 
 여러 개의 OX 문제로 만들어진 시험에서 연속적으로 답을 맞히는 경우에는 가산점을 주기 위해서 다음과 같이 점수 계산을 하기 로 하였다. 
 1번 문제가 맞는 경우에는 1점으로 계산한다. 앞의 문제에 대해서는 답을 틀리다가 답이 맞는 처음 문제는 1점으로 계산한다. 
 또한, 연속으로 문제의 답이 맞는 경우에서 두 번째 문제는 2점, 세 번째 문제는 3점, ..., 
 K번째 문제는 K점으로 계산한다. 틀린 문제는 0점으로 계산한다.
 */

function solution_4_my(len, arr) {
  let answer = 0,
    cumulativeValue = 0;

  arr.forEach((value) => {
    if (value === 1) {
      cumulativeValue++;
      answer += cumulativeValue;
      return;
    }
    return (cumulativeValue = 0);
  });
  return answer;
}
// const arr = [1, 0, 1, 1, 1, 0, 0, 1, 1, 0];
// console.log("solution_4_my", solution_4_my(10, arr));

/**
 문제 5
 N(1<=N<=100)명의 학생의 국어점수가 입력되면 각 학생의 등수를 입력된 순서대로 출력하는 프로그램을 작성하세요.
▣ 입력설명
첫 줄에 N(3<=N<=1000)이 입력되고, 두 번째 줄에 국어점수를 의미하는 N개의 정수가 입력 된다. 
같은 점수가 입력될 경우 높은 등수로 동일 처리한다. 
즉 가장 높은 점수가 92점인데 92점이 3명 존재하면 1등이 3명이고 그 다음 학생은 4등이 된다.
 */

function solution_5(arr) {
  const arrLen = arr.length;
  let answer = Array.from({ length: arrLen }, () => 1);
  for (let i = 0; i < arr.length; i++) {
    // 현재 점수
    for (let j = 0; j < arr.length; j++) {
      // 나보다 큰점수가 있을경우.
      if (arr[j] > arr[i]) answer[i]++;
    }
  }
  return answer;
}

function solution_5_my(arr) {
  return arr.map((score) => arr.filter((v) => v > score).length + 1);
}

// const arr = [87, 89, 92, 100, 99, 99, 76];
// console.log("solution_5", solution_5(arr));

/**
 문제6 
N*N의 격자판이 주어지면 각 행의 합, 각 열의 합, 두 대각선의 합 중 가 장 큰 합을 출력합 니다.
 */

function solution_6_my(len, arr) {
  let max = Number.MIN_SAFE_INTEGER;
  let rowSum = 0;
  let colSum = 0;
  let diagonalSum = 0;
  let reverseDiagonalSum = 0;

  function comparisonNum(leftNum, rigthNum) {
    if (leftNum > rigthNum) return leftNum;
    return rigthNum;
  }

  for (let i = 0; i < len; i++) {
    rowSum = colSum = 0;
    diagonalSum += arr[i][i];
    reverseDiagonalSum += arr[i][len - 1 - i];
    for (let j = 0; j < len; j++) {
      rowSum += arr[i][j];
      colSum += arr[j][i];
    }
    const curMax = comparisonNum(rowSum, colSum);
    max = comparisonNum(curMax, max);
    // MAth.max를 사용하면 더 편함.
    // max = Math.max(rowSum, colSum, max);
  }

  const curMax = comparisonNum(diagonalSum, reverseDiagonalSum);
  max = comparisonNum(curMax, max);

  return max;
}

// const arr = [
//   [10, 13, 10, 12, 15],
//   [12, 39, 30, 23, 11],
//   [11, 25, 50, 53, 15],
//   [19, 27, 29, 37, 27],
//   [19, 13, 30, 13, 19]
// ];

// console.log("solution_6_my", solution_6_my(5, arr));
/**
지도 정보가 N*N 격자판에 주어집니다. 각 격자에는 그 지역의 높이가 쓰여있습니다. 
각 격자 판의 숫자 중 자신의 상하좌우 숫자보다 큰 숫자는 봉우리 지역입니다. 
봉우리 지역이 몇 개 있는 지 알아내는 프로그램을 작성하세요.
격자의 가장자리는 0으로 초기화 되었다고 가정한다.
 */

function solution_7_my(arr) {
  let answer = 0;
  // d 방향 격좌자표에서 움직이는 값.
  const d = [-1, 0, 1, 0];
  const dLen = d.length;

  for (let x = 0; x < arr.length; x++) {
    for (let y = 0; y < arr.length; y++) {
      const curValue = arr[x][y];
      let flage = true;
      d.forEach((dValue, index) => {
        let nx = Number(x + dValue);
        let ny = Number(y + d[dLen - 1 - index]);
        if (arr?.[nx]?.[ny] >= curValue) {
          flage = false;
          return false;
        }
      });
      if (flage) answer++;
    }
  }
  console.log(answer);
}

const arr = [
  [5, 3, 7, 2, 3],
  [3, 7, 1, 6, 1],
  [7, 2, 5, 3, 4],
  [4, 3, 6, 4, 1],
  [8, 7, 3, 5, 2],
];
console.log('solution_7_my', solution_7_my(arr));
