export {};

/**
 * N(1<=N<=100)개의 정수를 입력받아, 자신의 바로 앞 수보다 큰 수만 출력하는 프로그램을 작 성하세요.(첫 번째 수는 무조건 출력한다)
 */
const solution1 = (arr: number[]): number[] => {
  if (arr.length === 0) return [];

  return arr.reduce<number[]>((result, curr, index, array) => {
    const prevIndex = index - 1;

    if (index === 0 || array[index] > array[prevIndex]) {
      result.push(arr[index]);
    }

    return result;
  }, []);
};

// console.log(solution1([7, 3, 9, 5, 6, 12, 1]));

/**
 * 선생님이 N(1<=N<=1000)명의 학생을 일렬로 세웠습니다. 일렬로 서 있는 학생의 키가 앞에 서부터 순서대로 주어질 때, 맨 앞에 서 있는 선생님이 볼 수 있는 학생의 수를 구하는 프로그 램을 작성하세요.
 * (앞에 서 있는 사람들보다 크면 보이고, 작거나 같으면 보이지 않습니다.)
 */

const solution2 = (arr: number[]) => {
  let currMax: number = Number.MIN_SAFE_INTEGER;

  return arr.filter((curr) => {
    if (currMax < curr) {
      currMax = curr;
      return true;
    }

    return false;
  }).length;
};

// console.log(solution2([130, 135, 148, 140, 145, 150, 150, 153]));

/**
 * A, B 두 사람이 가위바위보 게임을 합니다. 총 N번의 게임을 하여 A가 이기면 A를 출력하고, B가 이기면 B를 출력합니다. 비길 경우에는 D를 출력합니다.
 * 가위, 바위, 보의 정보는 1:가위, 2:바위, 3:보로 정하겠습니다.
 */
const ROCK_PAPER_SCISSORS = {
  // 가위
  SCISSORS: 1,
  // 바위
  ROCK: 2,
  // 보
  PAPER: 3,
} as const;

const WINNER_PLAN = {
  [ROCK_PAPER_SCISSORS.SCISSORS]: ROCK_PAPER_SCISSORS.PAPER,
  [ROCK_PAPER_SCISSORS.ROCK]: ROCK_PAPER_SCISSORS.SCISSORS,
  [ROCK_PAPER_SCISSORS.PAPER]: ROCK_PAPER_SCISSORS.ROCK,
};

type RockPaperScissorsKey = keyof typeof ROCK_PAPER_SCISSORS;

type RockPaperScissorsValue =
  (typeof ROCK_PAPER_SCISSORS)[RockPaperScissorsKey];

type WinnerFlags = 'M' | 'O' | 'D';

const calcWinner = (
  my: RockPaperScissorsValue,
  opponent: RockPaperScissorsValue,
): WinnerFlags => {
  if (my === opponent) return 'D';

  return WINNER_PLAN[my] === opponent ? 'M' : 'O';
};

const solution3 = (
  n: number,
  a: RockPaperScissorsValue[],
  b: RockPaperScissorsValue[],
) => {
  const result: ('A' | 'B' | 'D')[] = [];
  let count = 0;

  while (count < n) {
    const winner = calcWinner(a[count], b[count]);

    if (winner === 'M') result.push('A');
    else if (winner === 'O') result.push('B');
    else result.push('D');

    count++;
  }

  return result;
};

// console.log(solution3(5, [2, 3, 3, 1, 3], [1, 1, 2, 2, 3]));

/**
 * OX 문제는 맞거나 틀린 두 경우의 답을 가지는 문제를 말한다. 여러 개의 OX 문제로 만들어진 시험에서 연속적으로 답을 맞히는 경우에는 가산점을 주기 위해서 다음과 같이 점수 계산을 하기 로 하였다. 1번 문제가 맞는 경우에는 1점으로 계산한다. 앞의 문제에 대해서는 답을 틀리다가 답이 맞는 처음 문제는 1점으로 계산한다. 또한, 연속으로 문제의 답이 맞는 경우에서 두 번째 문제는 2점, 세 번째 문제는 3점, ..., K번째 문제는 K점으로 계산한다. 틀린 문제는 0점으로 계 산한다.
 * 예를 들어, 아래와 같이 10 개의 OX 문제에서 답이 맞은 문제의 경우에는 1로 표시하고, 틀린 경 우에는 0으로 표시하였을 때, 점수 계산은 아래 표와 같이 계산되어, 총 점수는 1+1+2+3+1+2=10 점이다.
 */

const solution4 = (arr: (0 | 1)[]) => {
  let point = 0;

  return arr.reduce((result, curr) => {
    if (curr === 1) {
      point += 1;
      result += point;
    } else {
      point = 0;
    }
    return result;
  }, 0);
};

// console.log(solution4([1, 0, 1, 1, 1, 0, 0, 1, 1, 0]));

/**
 * 첫 줄에 N(3<=N<=1000)이 입력되고, 두 번째 줄에 국어점수를 의미하는 N개의 정수가 입력 된다. 같은 점수가 입력될 경우 높은 등수로 동일 처리한다.
 */

const solution5 = (arr: number[]) => {
  const result: number[] = Array.from(
    {
      length: 5,
    },
    (_) => 1,
  );

  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[j] > arr[i]) result[i]++;
    }
  }

  return result;

  // const sortedArr = arr.slice().sort((a, b) => b - a);
  // return arr.map((point) => {
  //   return sortedArr.indexOf(point) + 1;
  // });
};

// console.log(solution5([87, 89, 92, 100, 76]));

/**
 * N*N의 격자판이 주어지면 각 행의 합, 각 열의 합, 두 대각선의 합 중 가 장 큰 합을 출력합 니다.
 */
const solution6 = (arr: number[][]) => {
  const len = arr.length;
  let max: number = Number.MIN_SAFE_INTEGER;

  const calcMax = (num: number) => {
    max = Math.max(max, num);
  };

  const calcRowMax = () => {
    const sum = (arr: number[]) =>
      arr.reduce((acc, value) => (acc += value), 0);

    for (let i = 0; i < len; i++) {
      const sumRow = sum(arr[i]);
      calcMax(sumRow);
    }
  };

  const calcColumnMax = () => {
    for (let i = 0; i < len; i++) {
      let temp: number = 0;
      for (let j = 0; j < len; j++) {
        temp += arr[i][j];
      }
      calcMax(temp);
    }
  };

  const calcDiagonalMax = () => {
    let sum1 = 0;
    let sum2 = 0;
    for (let i = 0; i < len; i++) {
      sum1 += arr[i][i];
      sum2 += arr[i][len - i - 1];
    }
    calcMax(sum1);
    calcMax(sum2);
  };

  calcRowMax();
  calcColumnMax();
  calcDiagonalMax();

  return max;
};

// console.log(
//   solution6([
//     [10, 13, 10, 12, 15],
//     [12, 39, 30, 23, 11],
//     [11, 25, 50, 53, 15],
//     [19, 27, 29, 37, 27],
//     [19, 13, 30, 13, 19],
//   ]),
// );

/**
 * 지도 정보가 N*N 격자판에 주어집니다. 각 격자에는 그 지역의 높이가 쓰여있습니다. 각 격자 판의 숫자 중 자신의 상하좌우 숫자보다 큰 숫자는 봉우리 지역입니다. 봉우리 지역이 몇 개 있는 지 알아내는 프로그램을 작성하세요.
 * 격자의 가장자리는 0으로 초기화 되었다고 가정한다.
 * 만약 N=5 이고, 격자판의 숫자가 다음과 같다면 봉우리의 개수는 10개입니다.
 */

const solution7 = (arr: number[][]) => {
  const parseSafeValue = (
    row: number,
    column: number,
    arr: number[][],
  ): number => {
    if (typeof arr[row] === 'undefined') return 0;
    return arr[row][column] ?? 0;
  };

  const getNearValues = (row: number, column: number) => {
    const upValue = parseSafeValue(row - 1, column, arr);
    const downValue = parseSafeValue(row + 1, column, arr);
    const leftValue = parseSafeValue(row, column - 1, arr);
    const rightValue = parseSafeValue(row, column + 1, arr);

    return [upValue, downValue, leftValue, rightValue];
  };

  const calcMax = (arr: number[]): number => {
    return Math.max(...arr);
  };

  const len = arr.length;
  let result = 0;

  arr.forEach((_, i) => {
    const row = arr[i];
    row.forEach((value, j) => {
      // 데이터 양이 많아지면 좋지 않을 수 있음.
      // break 사용이 필요할 수 도 있음.
      if (value > calcMax(getNearValues(i, j))) {
        result++;
      }
    });
  });

  return result;
};

//53723 37161 72534 43641 87352

console.log(
  solution7([
    [5, 3, 7, 2, 3],
    [3, 7, 1, 6, 1],
    [7, 2, 5, 3, 4],
    [4, 3, 6, 4, 1],
    [8, 7, 3, 5, 2],
  ]),
);
