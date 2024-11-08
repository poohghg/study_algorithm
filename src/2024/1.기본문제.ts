export {};

// 세 수중 최솟값 찾기
const solution1 = (a: number, b: number, c: number) => {
  let result: number;

  if (a < b) {
    result = a;
  } else {
    result = b;
  }
  return result > c ? c : result;

  // return Math.min(a, b, c);
};

// console.log(solution1(3, 12, 1));

/**
 * 길이가 서로 다른 A, B, C 세 개의 막대 길이가 주어지면 이 세 막대로 삼각형을 만들 수 있 으면 “YES"를 출력하고, 만들 수 없으면 ”NO"를 출력한다.
 */

const solution2 = (a: number, b: number, c: number): 'YES' | 'NO' => {
  // 삼각형의 조건 나머지 변의 합이 가장 긴 변보다 커야 한다.
  const sum = a + b + c;
  const longestSide = Math.max(a, b, c);

  return sum - longestSide > longestSide ? 'YES' : 'NO';
};

// console.log(solution2(13, 33, 17));

/**
 * 연필 1 다스는 12자루입니다.
 * 학생 1인당 연필을 1자루씩 나누어 준다고 할 때 N명이 학생수 를 입력하면 필요한 연필의 다스 수를 계산하는 프로그램을 작성하세요.
 */

const solution3 = (n: number) => {
  return Math.ceil(n / 12);
};

// console.log(solution3(24));

/**
 * 자연수 N이 입력되면 1부터 N까지의 합을 출력하는 프로그램을 작성하세요.
 */

const solution4 = (n: number) => {
  let startNum = n;
  let result: number = 0;

  while (startNum > 0) {
    result += startNum--;
  }

  return result;
};

// console.log(solution4(10));

/**
 * 7개의 수가 주어지면 그 숫자 중 가장 작은 수를 출력하는 프로그램을 작성하세요.
 */
const solution5 = (
  arr: [number, number, number, number, number, number, number],
) => {
  let min: number = Number.MAX_SAFE_INTEGER;

  for (const number of arr) {
    if (number < min) min = number;
  }

  return min;
};

// console.log(solution5([5, 3, 7, 11, 2, 15, 17]));

/**
 * 7개의 자연수가 주어질 때, 이들 중 홀수인 자연수들을 모두 골라 그 합을 구하고, 고른 홀수들 중 최소값을 찾는 프로그램을 작성하세요.
 */

const solution6 = (
  arr: [number, number, number, number, number, number, number],
) => {
  const oddNumbers = arr.filter((number) => {
    return number % 2 === 1;
  });

  const sum = oddNumbers.reduce((sum, curr) => {
    return sum + curr;
  }, 0);

  const min = Math.min(...oddNumbers);

  return {
    sum,
    min,
  };
};

// console.log(solution6([12, 77, 38, 41, 53, 92, 85]));

/**
 * 서울시는 6월 1일부터 교통 혼잡을 막기 위해서 자동차 10부제를 시행한다.
 * 자동차 10부제는 자동차 번호의 일의 자리 숫자와 날짜의 일의 자리 숫자가 일치하면 해당 자동차의 운행을 금 지하는 것이다.
 * 첫 줄에는 날짜의 일의 자리 숫자가 주어지고 두 번째 줄에는 7대의 자동차 번호의 끝 두 자 리 숫자가 주어진다.
 */

// const solution7 = (
//   day: number,
//   arr: [number, number, number, number, number, number, number],
// ) => {
//   const firstDigit = (num: number): number => {
//     return num % 10;
//   };
//
//   const matchedCars = arr.filter((carNumber) => {
//     return day === firstDigit(carNumber);
//   });
//
//   return matchedCars.length;
// };

// console.log(solution7(3, [25, 23, 11, 47, 53, 17, 33]));

/**
 * 왕비를 피해 일곱 난쟁이들과 함께 평화롭게 생활하고 있던 백설공주에게 위기가 찾아왔다. 일과를 마치고 돌아온 난쟁이가 일곱 명이 아닌 아홉 명이었던 것이다.
 * 아홉 명의 난쟁이는 모두 자신이 "백설 공주와 일곱 난쟁이"의 주인공이라고 주장했다. 뛰어난 수학적 직관력을 가지고 있던 백설공주는, 다행스럽게도 일곱 난쟁이의 키의 합이 100이 됨을 기억해 냈다.
 * 아홉 난쟁이의 키가 주어졌을 때, 백설공주를 도와 일곱 난쟁이를 찾는 프로그램을 작성하시 오.
 * ▣ 입력설명
 * 아홉 개의 줄에 걸쳐 난쟁이들의 키가 주어진다. 주어지는 키는 100을 넘지 않는 자연수이며, 아홉 난쟁이의 키는 모두 다르며, 가능한 정답이 여러 가지인 경우에는 아무거나 출력한다.
 */

const solution8 = (arr: number[]) => {
  const filterFakeDwarf = (indexArrOfFakeDwarf: [number, number]) => {
    return arr.filter((_, index) => !indexArrOfFakeDwarf.includes(index));
  };

  const findFakeDwarf = (): [number, number] | null => {
    const sum = arr.reduce((acc, curr) => acc + curr);

    for (let i = 0; i < arr.length; i++) {
      const firstValue = arr[i];

      for (let j = i + 1; j < arr.length; j++) {
        const secondsValue = arr[j];
        if (sum - (firstValue + secondsValue) === 100) return [i, j];
      }
    }

    return null;
  };

  const indexArrOfFakeDwarf = findFakeDwarf();

  return indexArrOfFakeDwarf ? filterFakeDwarf(indexArrOfFakeDwarf) : [];
};

// console.log(solution8([20, 7, 23, 19, 10, 15, 25, 8, 13]));

/**
 * 대문자로 이루어진 영어단어가 입력되면 단어에 포함된 ‘A'를 모두 ’#‘으로 바꾸어 출력하는 프로그램을 작성하세요.
 */
const solution9 = (input: string) => {
  let result: string = '';
  for (const str of input) {
    if (str === 'A') result += '#';
    else result += str;
  }

  return result;
};

// console.log(solution9('BANANA'));

/**
 * 한 개의 문자열을 입력받고, 특정 문자를 입력받아 해당 특정문자가 입력받은 문자열에 몇 개 존재하는지 알아내는 프로그램을 작성하세요.
 * 문자열의 길이는 100을 넘지 않습니다.
 */

const solution10 = (str: string, keyword: string) => {
  // 구분자를 통해서도 가능
  return str.split(keyword).length - 1;

  // let result = 0;

  // for (const strElement of str) {
  //   if (strElement === keyword) result++;
  // }
  //
  // return result;
};

// console.log(solution10('COMPUTERPROGRAMMING', 'R'));

/**
 * 한 개의 문자열을 입력받아 해당 문자열에 알파벳 대문자가 몇 개 있는지 알아내는 프로그램 을 작성하세요
 */

const solution11 = (str: string) => {
  let result = 0;

  for (const strElement of str) {
    if (strElement === strElement.toUpperCase()) result++;
  }

  return result;
};

// console.log(solution11('KoreaTimeGood'));

/**
 * 대문자와 소문자가 같이 존재하는 문자열을 입력받아 대문자는 소문자로 소문자는 대문자로 변환하여 출력하는 프로그램을 작성하세요.
 */
const solution12 = (str: string) => {
  const isUpperCase = (s: string) => {
    return s === s.toUpperCase();
  };

  let result: string = '';

  for (const strElement of str) {
    if (isUpperCase(strElement)) result += strElement.toLowerCase();
    else result += strElement.toUpperCase();
  }

  return result;
};

// console.log(solution12('StuDY'));

/**
 * N개의 문자열이 입력되면 그 중 가장 긴 문자열을 출력하는 프로그램을 작성하세요.
 */
const solution13 = (arr: string[]) => {
  return arr.reduce(
    (result, currStr) => (currStr.length > result.length ? currStr : result),
    '',
  );
};

// console.log(solution13(['teacher', 'time', 'student', 'beautiful', 'good']));

/**
 * 소문자로 된 단어(문자열)가 입력되면 그 단어의 가운데 문자를 출력하는 프로그램을 작성하세
 * 요. 단 단어의 길이가 짝수일 경우 가운데 2개의 문자를 출력합니다.
 */

const solution14 = (str: string): string => {
  const len = str.length;
  const isEvenNumber = len % 2 === 0;
  const midIndex = Math.floor(len / 2);
  return isEvenNumber
    ? str.substring(midIndex - 1, midIndex + 1)
    : str[midIndex];
};

// console.log(solution14('goaaod'));

/**
 * 소문자로 된 한개의 문자열이 입력되면 중복된 문자를 제거하고 출력하는 프로그램을 작성하 세요.
 * 제거된 문자열의 각 문자는 원래 문자열의 순서를 유지합니다.
 */

const solution15 = (str: string) => {
  let result = '';
  const strObject: Record<string, boolean> = {};

  for (const strElement of str) {
    // index of를 사용해도 가능 index of 를 통해 현재 인덱스와 index of의 반환값이 다르면 중복 문자가 존재하는것
    if (strObject[strElement]) continue;

    strObject[strElement] = true;
    result += strElement;
  }

  return result;
};

// console.log(solution15('ksekkset'));

/**
 * N개의 문자열이 입력되면 중복된 문자열은 제거하고 출력하는 프로그램을 작성하세요. 출력하는 문자열은 원래의 입력순서를 유지합니다.
 */
const solution16 = (arr: string[]) => {
  return arr.filter((str, index) => arr.indexOf(str) === index).join(' ');

  // const strObject: Record<string, boolean> = {};
  // return arr
  //   .reduce((result, str) => {
  //     if (strObject[str]) return result;
  //     strObject[str] = true;
  //     return `${result} ${str}`;
  //   }, '')
  //   .trimLeft();
};

console.log(solution16(['good', 'time', 'good', 'time', 'student']));
