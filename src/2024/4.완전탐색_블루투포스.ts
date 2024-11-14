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

  return result;
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

console.log(solution2([32, 55, 62, 20, 250, 370, 200, 30, 100]));
