export {};

/**
 * 오름차순으로 정렬이 된 두 배열이 주어지면 두 배열을 오름차순으로 합쳐 출력하는 프로그램 을 작성하세요.
 * 투 포인터 알고리즘 두 개의 포인트를 가지고 일차시간만큼 순회한다.
 */
const solution1 = (arr1: number[], arr2: number[]) => {
  let arr1Index = 0;
  let arr2Index = 0;
  const result: number[] = [];

  const mergeArray = () => {
    while (arr1Index < arr1.length && arr2Index < arr2.length) {
      const arr1Value = arr1[arr1Index];
      const arr2Value = arr2[arr2Index];

      if (arr1Value === arr2Value) {
        result.push(arr1Value);
        result.push(arr2Value);
        arr1Index++;
        arr2Index++;
      } else if (arr1Value > arr2Value) {
        result.push(arr2Value);
        arr2Index++;
      } else {
        result.push(arr1Value);
        arr1Index++;
      }
    }
  };

  const pushRestElement = () => {
    if (arr1Index !== arr1.length) {
      result.push(...arr1.slice(arr1Index));
    } else {
      result.push(...arr2.slice(arr2Index));
    }
  };

  mergeArray();
  pushRestElement();

  return result;
};

// console.log(solution1([1, 3, 5], [2, 3, 6, 7, 9]));

/**
 * A, B 두 개의 집합이 주어지면 두 집합의 공통 원소를 추출하여 오름차순으로 출력하는 프로 그램을 작성하세요.
 * 이차 시간 보다 투포인터를 사용하는게 좋다.
 */

const solution2 = (arr1: number[], arr2: number[]) => {
  const sortArray = (array: number[]) => {
    return array.slice().sort((a, b) => a - b);
  };

  const sortedArr1 = sortArray(arr1);
  const sortedArr2 = sortArray(arr2);

  const arr1Size = sortedArr1.length;
  const arr2Size = sortedArr2.length;

  let arr1Index = 0;
  let arr2Index = 0;

  const result: number[] = [];

  while (arr1Index < arr1Size && arr2Index < arr2Size) {
    const arr1Value = sortedArr1[arr1Index];
    const arr2Value = sortedArr2[arr2Index];

    if (arr1Value === arr2Value) {
      result.push(arr1Value);
      arr1Index++;
      arr2Index++;
    } else if (arr1Value > arr2Value) {
      arr2Index++;
    } else {
      arr1Index++;
    }
  }

  return result;
};

// console.log(solution2([1, 3, 9, 5, 2], [3, 2, 5, 7, 8]));

/**
 * N개의 수로 이루어진 수열이 주어집니다.
 * 이 수열에서 연속부분수열의 합이 특정숫자 M이 되는 경우가 몇 번 있는지 구하는 프로그램을 작성하세요.
 * 만약 N=8, M=6이고 수열이 다음과 같다면
 * 12131112
 * 합이 6이 되는 연속부분수열은 {2, 1, 3}, {1, 3, 1, 1}, {3, 1, 1, 1}로 총 3가지입니다.
 */

const solution3 = (arr: number[], k: number) => {
  let firstIndex = 0;
  let sum = 0;
  let result = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];

    while (sum >= k) {
      if (sum === k) result++;
      sum -= arr[firstIndex];
      firstIndex++;
    }
  }
  return result;
};

// console.log(solution3([1, 2, 1, 3, 1, 1, 1, 2], 6));

/**
 * N개의 수로 이루어진 수열이 주어집니다.
 * 이 수열에서 연속부분수열의 합이 특정숫자 M이하가 되는 경우가 몇 번 있는지 구하는 프로그 램을 작성하세요.
 * 만약 N=5, M=5이고 수열이 다음과 같다면
 * 13123
 * 합이 5이하가 되는 연속부분수열은 {1}, {3}, {1}, {2}, {3}, {1, 3}, {3, 1}, {1, 2}, {2, 3}, {1, 3, 1}로 총 10가지입니다.
 */
const solution4 = (arr: number[], k: number) => {
  let result = 0;
  let sum = 0;
  let leftPoint = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (sum <= k) {
      result++;
      continue;
    }

    while (sum >= k) {}
  }
};

console.log(solution4([1, 3, 1, 2, 3], 5));
