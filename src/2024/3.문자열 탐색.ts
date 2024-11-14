import { parseInt } from 'lodash';

export {};

/**
 * 회문 문자열
 * 앞에서 읽을 때나 뒤에서 읽을 때나 같은 문자열을 회문 문자열이라고 합니다.
 * 문자열이 입력되면 해당 문자열이 회문 문자열이면 "YES", 회문 문자열이 아니면 “NO"를 출력 하는 프로그램을 작성하세요.
 * 단 회문을 검사할 때 대소문자를 구분하지 않습니다.
 */
const solution1 = (str: string) => {
  const toUpper = (s: string) => s.toUpperCase();

  if (str.length % 2 !== 0) return 'NO';

  const len = str.length;
  const halfLen = len / 2;

  for (let i = 0; i < halfLen; i++) {
    if (toUpper(str[i]) !== toUpper(str[len - (i + 1)])) {
      return 'NO';
    }
  }

  return 'YES';
};

// console.log(solution1('gooG'));

/**
 * 유효한 팰린드롬
 * 앞에서 읽을 때나 뒤에서 읽을 때나 같은 문자열을 팰린드롬이라고 합니다.
 * 문자열이 입력되면 해당 문자열이 팰린드롬이면 "YES", 아니면 “NO"를 출력하는 프로그램을 작성하세요.
 * 단 회문을 검사할 때 알파벳만 가지고 회문을 검사하며, 대소문자를 구분하지 않습니다. 알파벳 이외의 문자들의 무시합니다.
 */
const solution2 = (str: string) => {
  //todo 알파벳만 가지고 회문검사

  const trimmedStr = str.toLowerCase().replace(/[^a-z]/g, '');
  return solution1(trimmedStr);
};

// console.log(solution2('found7, time: study; Yduts; emit, 7Dnuof'));

/**
 * 숫자만 추출
 * 문자와 숫자가 섞여있는 문자열이 주어지면 그 중 숫자만 추출하여 그 순서대로 자연수를 만 듭니다.
 * 만약 “tge0a1h205er”에서 숫자만 추출하면 0, 1, 2, 0, 5이고 이것을 자연수를 만들면 1205 이 됩니다.
 * 추출하여 만들어지는 자연수는 100,000,000을 넘지 않습니다.
 */

const solution3 = (str: string) => {
  // const distinguishNumber = (str: string) => {
  //   return str.split('').reduce<number[]>((acc, curr) => {
  //     const convertedStr = parseInt(curr, 10);
  //
  //     if (Number.isInteger(convertedStr)) {
  //       acc.push(convertedStr);
  //     }
  //
  //     return acc;
  //   }, []);
  // };
  // const toNumber = (nums: number[]): number => {
  //   const size = nums.length;
  //
  //   return nums.reduce((result, curr, index) => {
  //     const digits = 10 ** (size - (index + 1));
  //     return (result += curr * digits);
  //   }, 0);
  // };
  //
  // const numbersOfStr = distinguishNumber(str);
  //
  // return toNumber(numbersOfStr);

  let result = 0;

  for (const strElement of str) {
    if (!Number.isNaN(parseInt(strElement, 10))) {
      // 한자리 씩 더하기
      result = result * 10 + parseInt(strElement, 10);
    }
  }

  return result;
};

// console.log(solution3('tge0a1h205er'));
// console.log(solution3('g0en2T0s8eSoft'));

/**
 * 가장 짧은 문자거리
 * 한 개의 문자열 s와 문자 t가 주어지면 문자열 s의 각 문자가 문자 t와 떨어진 최소거리를 출 력하는 프로그램을 작성하세요.
 * 문자열과 문자는 소문자로만 주어집니다.
 */
const solution4 = (str: string, target: string) => {
  const strArray = str.split('');

  const targetIndexs = strArray.reduce<number[]>((acc, curr, index) => {
    if (curr === target) acc.push(index);
    return acc;
  }, []);

  const len = str.length;

  const getForwardDistances = (targetIndex: number): number[] => {
    return targetIndexs.map((index) => {
      if (index >= targetIndex) return index - targetIndex;
      return len - targetIndex + index;
    });
  };

  const getReversDistances = (targetIndex: number): number[] => {
    return targetIndexs.map((index) => {
      if (targetIndex >= index) return targetIndex - index;
      return len - index + targetIndex;
    });
  };

  return strArray.map((_, index) => {
    const distances = [
      ...getForwardDistances(index),
      ...getReversDistances(index),
    ];
    return Math.min(...distances);
  });
};

const solution4_1 = (str: string, target: string) => {
  const result: number[] = [];
  let distance = str.length;

  for (const s of str) {
    if (s === target) {
      distance = 0;
    } else {
      distance++;
    }
    result.push(distance);
  }

  distance = str.length;

  for (let i = str.length - 1; 0 <= i; i--) {
    if (str[i] === target) {
      distance = 0;
    } else {
      distance++;
    }

    result[i] = Math.min(result[i], distance);
  }

  return result;
};

console.log(solution4_1('teachermode', 'e'));

/**
 * 문자열 압축
 * 알파벳 대문자로 이루어진 문자열을 입력받아 같은 문자가 연속으로 반복되는 경우 반복되는 문자 바로 오른쪽에 반복 횟수를 표기하는 방법으로 문자열을 압축하는 프로그램을 작성하시 오.
 * 단 반복횟수가 1인 경우 생략합니다.
 */

const solution5 = (str: string) => {
  if (!str.length) return '';

  let result: string = '';
  let count: number = 1;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      count++;
      continue;
    }

    result += str[i];
    if (count > 1) result += `${count}`;
    count = 1;
  }

  return result;
};

// console.log(solution5('KKHSS'));