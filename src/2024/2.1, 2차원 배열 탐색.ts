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
