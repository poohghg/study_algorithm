// const app = document.querySelector("#app");
/** 
문제1 
  100이하의 자연수 A, B, C를 입력받아 세 수 중 가장 작은 값을 출력하는 프로그램을 작성하 세요.(정렬을 사용하면 안됩니다)
*/
function solution_1(a, b, c) {
  let anser;
  if (a < b) {
    anser = a;
  } else {
    anser = b;
  }

  if (c < anser) anser = c;
  return anser;
}
// console.log("anser : ", solution_1(3, 4, 5));

/**
 * 문제 2
 * 길이가 서로 다른 A, B, C 세 개의 막대 길이가 주어지면
 * 이 세 막대로 삼각형을 만들 수 있 으면 “YES"를 출력하고, 만들 수 없으면 ”NO"를 출력한다.
 * 한변의 크기보다 두변의 크기의 합이 커야함.
 *
 */

function solution_2_my() {
  // 인자값들의 배열 arguments
  // (a, b) => a - b 오름차순
  // (a, b) => b - a 내림차순
  const args = Object.values(arguments).sort((a, b) => b - a);
  console.log('args', args);

  const maxValue = args[0];
  const lastValues = args[1] + args[2];

  if (lastValues >= maxValue) return 'YES';
  return 'NO';
}

// console.log("anser : ", solution_2_my(13, 33, 17));

function solution_2(a, b, c) {
  let anser = 'NO',
    max;
  let sum = a + b + c;
  if (a > b) {
    max = a;
  } else {
    max = b;
  }
  if (c > max) max = c;
  if (sum - max >= max) anser = 'YES';
  return anser;
}

// console.log("anser : ", solution_2(13, 33, 17));

/**
 * 문제3
 * 연필 1 다스는 12자루입니다.
 * 학생 1인당 연필을 1자루씩 나누어 준다고 할 때 N명이 학생수 를 입력하면
 * 필요한 연필의 다스 수를 계산하는 프로그램을 작성하세요.
 */

function solution_3_my(students) {
  let anser = parseInt(students / 12, 10);
  if (students % 12 !== 0) {
    anser = anser + 1;
  }
  return anser;
}

// console.log("anser : ", solution_3_my(11));

function solution_3(students) {
  // ceil 올림
  // floor 내림
  // round 반올림
  return Math.ceil(students / 12);
}

// console.log("anser : ", solution_3(13));

/**
 *자연수 N이 입력되면 1부터 N까지의 합을 출력하는 프로그램을 작성하세요.
▣ 입력설명
첫 번째 줄에 20이하의 자연수 N이 입력된다..
▣ 출력설명
첫 번째 줄에 1부터 N까지의 합을 출력한다.
 */

function solution_4_my(n) {
  let anser = 0;
  for (let index = 0; index < n; index++) {
    anser += index;
  }
  return anser;
}

// console.log("anser_4 : ", solution_4_my(5));

/**
 * 7개의 수가 주어지면 그 숫자 중 가장 작은 수를 출력하는 프로그램을 작성하세요.
 * 최솟값 구하기
 *▣ 입력예제 1
5 3 7 11 2 15 17
 */

function solution_5_my() {
  const agrsList = Object.values(arguments);
  const minValue = agrsList.reduce((prev, curr) => (prev < curr ? prev : curr));
  return minValue;
}

function solution_5(arr) {
  // 초기 최소값에 가장큰 정수값을 할당해 놓는다.
  let min = Number.MAX_SAFE_INTEGER;
  for (let index = 0; index < arr.length; index++) {
    if (arr[index] < min) min = arr[index];
  }
  return min;
}

function solution_5_1(arr) {
  // const anser = Math.min(...arr);
  const anser = Math.min.apply(null, arr);
  return anser;
}

// console.log("anser_5 : ", solution_5_my(5, 3, 7, 11, 2, 15, 17));
// const arr = [5, 3, 7, 11, 2, 15, 17];
// console.log("anser_5_1 : ", solution_5_1(arr));

/**
 * 7개의 자연수가 주어질 때,
 * 이들 중 홀수인 자연수들을 모두 골라 그 합을 구하고,
 * 고른 홀수들 중 최소값을 찾는 프로그램을 작성하세요.
 */

function solution_6_my(arr) {
  let sumOddNumbers, minOddNumber;
  const oddNumbers = arr.filter((number) => number % 2 === 1);

  sumOddNumbers = oddNumbers.reduce((prev, curr) => prev + curr, 0);
  minOddNumber = Math.min(...oddNumbers);

  return [sumOddNumbers, minOddNumber];
}

function solution_6(arr) {
  let answer = [];
  let sum = 0,
    min = Number.MAX_SAFE_INTEGER;

  for (const number of arr) {
    if (number % 2 === 1) {
      sum += number;
      if (number < min) min = number;
    }
  }
  return [sum, min];
}

// const arr = [12, 77, 38, 41, 53, 92, 85];
// console.log("solution_6_my", solution_6(arr));

/**
서울시는 6월 1일부터 교통 혼잡을 막기 위해서 자동차 10부제를 시행한다. 
자동차 10부제는 자동차 번호의 일의 자리 숫자와 날짜의 일의 자리 숫자가 일치하면 해당 자동차의 운행을 금 지하는 것이다. 
예를 들어, 자동차 번호의 일의 자리 숫자가 7이면 7일, 17일, 27일에 운행하 지 못한다. 
또한, 자동차 번호의 일의 자리 숫자가 0이면 10일, 20일, 30일에 운행하지 못한 다.
여러분들은 일일 경찰관이 되어 10부제를 위반하는 자동차의 대수를 세는 봉사활동을 하려고 한다. 
날짜의 일의 자리 숫자가 주어지고 7대의 자동차 번호의 끝 두 자리 수가 주어졌을 때 위반하는 자동차의 대수를 출력하는 프로그램을 작성하세요.
 */

function solution_7_my(day, arrayNums) {
  // 10으로 나누면 나머지는 마지막자리.
  const totalNums = arrayNums.filter((num) => day === num % 10);
  return totalNums.length;
}

function solution_7(day, arrayNums) {
  let anser = 0;
  for (let num of arrayNums) {
    if (num % 10 === day) anser++;
  }
  return anser;
}

// 3 25 23 11 47 53 17 33
// console.log("solution_7_my", solution_7(3, [25, 23, 11, 47, 53, 17, 33]));

/**
▣ 입력설명
아홉 개의 줄에 걸쳐 난쟁이들의 키가 주어진다. 주어지는 키는 100을 넘지 않는 자연수이며, 아홉 난쟁이의 키는 모두 다르며, 가능한 정답이 여러 가지인 경우에는 아무거나 출력한다.
▣ 출력설명
입력된 순서대로 일곱 난쟁이의 키를 출력한다.
 */

function solution_8_my(...arr) {
  // const arr;
  // 총합을 더한후 두숫자를뽑아 총합에서 두합을 뺀다.
  // splic 특정인덱스 제거 || 추가
  const totalSum = arr.reduce((acc, curr) => acc + curr, 0);
  const len = arr.length;
  let filterArr = null;
  // let tempArr = [...arr];

  arr.forEach((num, index) => {
    const tempArr = arr.slice(index + 1, len);
    if (filterArr) return;
    tempArr.forEach((tempNUm, jindex) => {
      if (totalSum - num - tempNUm === 100) {
        filterArr = { index, jindex: index + 1 + jindex };
      }
    });
  });

  if (filterArr) {
    const { index, jindex } = filterArr;
    arr.splice(jindex, 1);
    arr.splice(index, 1);
  }
  return arr;
}

function solution_8(...arr) {
  const totalSum = arr.reduce((acc, curr) => acc + curr, 0);
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (totalSum - arr[i] - arr[j] === 100) {
        arr.splice(j, 1);
        arr.splice(i, 1);
      }
    }
  }
  return arr;
}

// console.log("solution_8", solution_8_my(20, 7, 23, 19, 10, 15, 25, 8, 13));

/**
한 개의 문자열을 입력받고, 특정 문자를 입력받아 해당 특정문자가 입력받은 문자열에 몇 개 존재하는지 알아내는 프로그램을 작성하세요.
문자열의 길이는 100을 넘지 않습니다.
 */
function solution_9_my(inputString, searchString = 'A') {
  const arr = inputString.split('');
  for (let index = 0; index < arr.length; index++) {
    if (arr[index] === searchString) arr[index] = '#';
  }
  return arr.join();
  // console.log(arr.join(""));
}

function solution_9(str, searchString) {
  console.log(searchString);
  return str.replace(/A/g, '#');
}

// console.log("solution_9", solution_9("BANANA", "B"));

/**
 * 한 개의 문자열을 입력받고, 
 * 특정 문자를 입력받아 해당 특정문자가 입력받은 문자열에 몇 개 존재하는지 알아내는 프로그램을 작성하세요.
    문자열의 길이는 100을 넘지 않습니다.
 */

function solution_10_my(inputString, searchString = 'A') {
  let cnt = 0;
  inputString.split('').forEach((v) => {
    if (v === searchString) cnt++;
  });
  return cnt;
}

function solution_10(str, searchString) {
  // 찾고자하는 값으로 배열을 나눠 값을 구한다.
  // console.log(String(str).split(searchString));
  return String(str).split(searchString).length - 1;
}

// console.log("solution_10", solution_10("COMPUTERPROGRAMMING", "R"));

/**
 * 대문자로 통일
 대문자와 소문자가 같이 존재하는 문자열을 입력받아 대문자로 모두 통일하여 문자열을 출력 하는 프로그램을 작성하세요.
 */

function solution_11_my(str) {
  const arr = str.split('');
  return arr
    .map((char) => {
      if (char === String(char).toUpperCase()) return char;
      return char.toUpperCase();
    })
    .join('');
}

function solution_11(str) {
  return str.toUpperCase();
}

// console.log("solution_11_my", solution_11("ItisTimeToStudy"));

/**
 한 개의 문자열을 입력받아 해당 문자열에 알파벳 대문자가 몇 개 있는지 알아내는 프로그램 을 작성하세요.
 */

function solution_12_my(str) {
  let cnt = 0;
  // in 이면 index
  for (const x of str) {
    // if (x === x.toUpperCase()) cnt++;
    let num = String(x).charCodeAt();
    // charCodeAt 65~90은 대문자이다.
    if (num >= 65 && num <= 90) cnt++;
  }
  return cnt;
}

// console.log("solution_12_my", solution_12_my("KoreaTimeGood"));

/**
첫 줄에 자연수 N이 주어진다.(3<=N<=30)
두 번째 줄부터 N개의 문자열이 주어진다. 문자열의 길이는 100을 넘지 않습니다. 각 문자열의 길이는 서로 다릅니다.
첫 줄에 가장 긴 문자열을 출력한다.
 */

function solution_13_my(arr) {
  let answer = '',
    max = Number.MIN_SAFE_INTEGER;
  arr.forEach((str) => {
    const curStrLen = str.length;
    if (curStrLen > max) {
      max = curStrLen;
      answer = str;
    }
  });
  return answer;
}

// const strArr = ["teacher", "time", "student", "beautiful", "good"];
// console.log("solution_13_my : ", solution_13_my(strArr));

/**
 소문자로 된 단어(문자열)가 입력되면 그 단어의 가운데 문자를 출력하는 프로그램을 작성하세 요. 
 단 단어의 길이가 짝수일 경우 가운데 2개의 문자를 출력합니다.
 */

function solution_14_my(str) {
  const strLen = str.length;
  const middleIndex = parseInt(str.length / 2, 10);
  if (strLen % 2 === 0) {
    return `${str[middleIndex - 1]}${str[middleIndex]}`;
  }
  return str[middleIndex];
}

function solution_14(str) {
  const strLen = str.length;
  const middleIndex = Math.floor(strLen / 2);

  if (strLen % 2 === 0)
    return String(str).substring(middleIndex - 1, middleIndex + 1);
  return String(str).substring(middleIndex, middleIndex + 1);
}

// console.log("solution_14_my : ", solution_14_my("test"));

/**
소문자로 된 한개의 문자열이 입력되면 중복된 문자를 제거하고 
출력하는 프로그램을 작성하 세요.
제거된 문자열의 각 문자는 원래 문자열의 순서를 유지합니다.
 */

function solution_15_my(str) {
  const overlapArrays = [];
  for (const x of str) {
    if (!overlapArrays.some((innerV) => innerV === x)) overlapArrays.push(x);
  }
  return overlapArrays.join('');
}

function solution_15(str) {
  // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
  // indexOf를 통한 중복제거
  let answer = '';
  for (let index = 0; index < str.length; index++) {
    // indexOf는 주어진 문자열에서 특정 문자의 첫번째 위치를 반환한다.
    // 반환된 순서와 현재 index 순서와 같다면. 중복된 문자가 아니다.
    if (String(str).indexOf(str[index]) === index) {
      answer += str[index];
    }
  }
  return answer;
}

// console.log("solution_15 : ", solution_15("ksekksetss"));

/**
 N개의 문자열이 입력되면 중복된 문자열은 제거하고 출력하는 프로그램을 작성하세요. 
 출력하는 문자열은 원래의 입력순서를 유지합니다.
 */

function solution_16_my(arr) {
  const overlapArrays = [];
  arr.forEach((str) => {
    const _str = String(str).trim();
    // 참고: 빈 배열에서 호출하면 무조건 false를 반환합니다.
    if (!overlapArrays.some((overlapStr) => overlapStr === _str)) {
      overlapArrays.push(_str);
    }
  });
  return overlapArrays.join('\n');
}

function solution_16_my2(arr) {
  let answer = '';
  for (const x of arr) {
    if (answer.indexOf(x) === -1) answer += `${x}\n`;
  }
  return answer;
}

function solution_16(arr) {
  return arr.filter((str, index) => arr.indexOf(str) === index);
}

const arr = ['good', 'time', 'good', 'time', 'student'];
console.log('solution_16', solution_16(arr));
