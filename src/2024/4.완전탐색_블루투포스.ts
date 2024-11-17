export {};
/**
 * 자릿수의 합
 * N개의 자연수가 입력되면 각 자연수의 자릿수의 합을 구하고, 그 합이 최대인 자연수를 출력 하는 프로그램을 작성하세요.
 * 자릿수의 합이 같은 경우 원래 숫자가 큰 숫자를 답으로 합니다. 만약 235 와 1234가 동시에 답이 될 수 있다면 1234를 답으로 출력해야 합니다.
 */
const solution1 = (nums: number[]) => {
  if (!nums.length) return null;

  const sumOfDigits = (n: number) => {
    let divisionValue = n;
    let result = 0;

    while (divisionValue > 0) {
      result += divisionValue % 10;
      const quotient = Math.floor(divisionValue / 10);
      divisionValue = quotient;
    }

    return result;

    // return Array.from(String(n), Number).reduce((acc, curr) => {
    //   return (acc += curr);
    // }, 0);
  };

  const getMaxSumOfDigits = () => {
    let result = Number.MIN_SAFE_INTEGER;
    let maxSumOfDigits = Number.MIN_SAFE_INTEGER;

    for (const num of nums) {
      const sum = sumOfDigits(num);

      if (sum > maxSumOfDigits) {
        result = num;
        maxSumOfDigits = sum;
      } else if (sum === maxSumOfDigits) {
        result = Math.max(result, num);
      }
    }
  };

  return getMaxSumOfDigits();
};

// console.log(solution1([128, 460, 603, 40, 521, 137, 123]));

/**
 * 뒤집은 소수
 * N개의 자연수가 입력되면 각 자연수를 뒤집은 후 그 뒤집은 수가 소수이면 그 소수를 출력하 는 프로그램을 작성하세요.
 * 예를 들어 32를 뒤집으면 23이고, 23은 소수이다. 그러면 23을 출 력한다. 단 910를 뒤집으면 19로 숫자화 해야 한다. 첫 자리부터의 연속된 0은 무시한다.
 */
const solution2 = (nums: number[]) => {
  // 소수 판별
  // 소수: 1과 자기 자신의 값
  const isPrime = (num: number) => {
    if (num === 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const getReverseNum = (num: number) => {
    let result = 0;
    let divisionValue = num;

    while (divisionValue > 0) {
      const rest = divisionValue % 10;
      divisionValue = Math.floor(divisionValue / 10);
      // 한자리 씩 더하기
      result = result * 10 + rest;
    }

    return result;
  };

  return nums.reduce<number[]>((result, num) => {
    const reverseNum = getReverseNum(num);

    if (isPrime(reverseNum)) {
      result.push(reverseNum);
    }

    return result;
  }, []);
};

// console.log(solution2([32, 55, 62, 20, 250, 370, 200, 30, 100]));

/**
 * 현수네 반 선생님은 반 학생들의 수학점수를 향상시키기 위해 멘토링 시스템을 만들려고 합니 다. 멘토링은 멘토(도와주는 학생)와 멘티(도움을 받는 학생)가 한 짝이 되어 멘토가 멘티의 수학공부를 도와주는 것입니다.
 * 선생님은 M번의 수학테스트 등수를 가지고 멘토와 멘티를 정합니다.
 * 만약 A학생이 멘토이고, B학생이 멘티가 되는 짝이 되었다면, A학생은 M번의 수학테스트에서 모두 B학생보다 등수가 앞서야 합니다.
 * M번의 수학성적이 주어지면 멘토와 멘티가 되는 짝을 만들 수 있는 경우가 총 몇 가지 인지 출력하는 프로그램을 작성하세요.
 * 학생번호가 제일 앞에서부터 1등, 2등, ...N등 순으로 표현된다.
 */

const solution3 = (scores: number[][]) => {
  // 뽑히는 사람은 모든 시험에서 앞서야 한다.
  // 스코어의 인덱스는 등수순이다.
  // 블루투스 버스 가능한 모든 경우의 수를 생각해서 만든다.
  // 가능한 경우의 수를 먼저 확인 4 * 3
  // 1 2 3 4
  // 1 2 3 4

  // const sortedScoresOfIndex =

  const canMentor = (mentor: number, mentee: number) => {
    for (const score of scores) {
      const mentorRank = score.indexOf(mentor);
      const menteeRank = score.indexOf(mentee);

      if (mentorRank > menteeRank) {
        return false;
      }
    }
    return true;
  };

  const studentSize = scores[0].length;
  const initCandidate = Array.from({ length: studentSize }, () => false);

  let result = 0;

  for (let i = 1; i <= studentSize; i++) {
    const candidate = [...initCandidate];

    for (let j = 1; j <= studentSize; j++) {
      if (i === j) continue;

      if (canMentor(i, j)) {
        candidate[j - 1] = true;
      } else if (candidate[j - 1]) {
        candidate[j - 1] = false;
      }
    }
    result += candidate.filter(Boolean).length;
  }

  return result;
};

// console.log(
//   solution3([
//     [3, 4, 1, 2],
//     [4, 3, 2, 1],
//     [3, 1, 4, 2],
//   ]),
// );

/**
 * 선생님은 올해 졸업하는 반 학생들에게 졸업선물을 주려고 합니다.
 * 학생들에게 인터넷 쇼핑몰에서 각자 원하는 상품을 골라 그 상품의 가격과 배송비를 제출하라 고 했습니다. 선생님이 가지고 있는 예산은 한정되어 있습니다.
 * 현재 예산으로 최대 몇 명의 학생에게 선물을 사줄 수 있는지 구하는 프로그램을 작성하세요.
 * 선생님은 상품 하나를 50% 할인해서(반 가격) 살 수 있는 쿠폰을 가지고 있습니다. 배송비는 할인에 포함되지 않습니다.
 *
 *  N줄에 걸쳐 각 학생들이 받고 싶은 상품의 가격과 배송비가 입력됩니다.
 *  상품가격과 배송비는 각각 100,000을 넘지 않습니다. 상품가격은 짝수로만 입력됩니다.
 */

const solution4 = (budget: number, priceInfo: [number, number][]) => {
  const size = priceInfo.length;
  let result: number = 0;

  priceInfo.forEach((currPriceInfo, index) => {
    let currBudget = budget;
    let cnt = 0;

    const halfPrice = currPriceInfo[0] / 2;
    currBudget -= halfPrice + currPriceInfo[1];

    for (let i = 0; i < size; i++) {
      if (i === index) continue;

      currBudget -= priceInfo[i][0] + priceInfo[i][1];

      if (currBudget > 0) cnt++;
      else break;
    }

    result = Math.max(result, cnt);
  });

  return result;
};

// console.log(
//   solution4(66, [
//     [6, 6],
//     [2, 2],
//     [4, 3],
//     [4, 5],
//     [10, 3],
//   ]),
// );

function nestedLoops(n: number, depth = 0, result: number[] = []) {
  if (depth === n) {
    console.log(result); // 각 루프 결과 출력
    return;
  }

  for (let i = 0; i < 3; i++) {
    // 각 루프에서 3번 반복
    result[depth] = i;
    nestedLoops(n, depth + 1, result);
  }
}

const solution5 = (k: number, nums: number[]) => {
  const n = 3;

  function nestedLoops(index: number, depth: number, sum: number) {
    // console.log(sum);

    if (3 <= depth) {
      return sum;
    }

    for (let i = index + depth; i < nums.length; i++) {
      const num = nestedLoops(i, depth + 1, sum + nums[i]);
      console.log(num);
    }
  }

  nestedLoops(0, 0, 0);
};

console.log(solution5(3, [1, 2]));
