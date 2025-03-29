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
 * 투 포인터
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
 * 투 포인터
 * N개의 수로 이루어진 수열이 주어집니다.
 * 이 수열에서 연속부분수열의 합이 특정숫자 M이하가 되는 경우가 몇 번 있는지 구하는 프로그램을 작성하세요.
 * 합이 5이하가 되는 연속부분수열은 {1}, {3}, {1}, {2}, {3}, {1, 3}, {3, 1}, {1, 2}, {2, 3}, {1, 3, 1}로 총 10가지입니다.
 */
const solution4 = (arr: number[], k: number) => {
  let result = 0;
  let sum = 0;
  let leftPoint = 0;

  for (let rightPoint = 0; rightPoint < arr.length; rightPoint++) {
    sum += arr[rightPoint];

    while (sum > k) {
      sum -= arr[leftPoint];
      leftPoint++;
    }

    // 끝자리가 rp일때 가능한 갯수
    result += rightPoint - leftPoint + 1;
  }

  return result;
};

// console.log(solution4([1, 3, 1, 2, 3], 5));

/**
 * 최대 매출
 * 슬라이딩 윈도우
 * 현수의 아빠는 제과점을 운영합니다. 현수 아빠는 현수에게 N일 동안의 매출기록을 주고 연속 된 K일 동안의 최대 매출액이 얼마인지 구하라고 했습니다.
 * 만약 N=10이고 10일 간의 매출기록이 아래와 같습니다. 이때 K=3이면
 * 12 15 11 20 25 10 20 19 13 15
 * 연속된 3일간의 최대 매출액은 11+20+25=56만원입니다. 여러분이 현수를 도와주세요.
 */

const solution5 = (arr: number[], k: number) => {
  let sum = arr.slice(0, k).reduce((acc, curr) => acc + curr);
  let result = sum;

  for (let i = k; i < arr.length; i++) {
    sum += arr[i] - arr[i - k];
    result = Math.max(result, sum);
  }

  return result;
};

// console.log(solution5_1([12, 15, 11, 20, 25, 10, 20, 19, 13, 15], 3));

/**
 * 학급 회장(해쉬)
 * 학급 회장을 뽑는데 후보로 기호 A, B, C, D, E 후보가 등록을 했습니다.
 * 투표용지에는 반 학생들이 자기가 선택한 후보의 기호(알파벳)가 쓰여져 있으며 선생님은 그 기호를 발표하고 있습니다.
 * 선생님의 발표가 끝난 후 어떤 기호의 후보가 학급 회장이 되었는지 출력하는 프로그램을 작 성하세요. 반드시 한 명의 학급회장이 선출되도록 투표결과가 나왔다고 가정합니다.
 */

const solution6 = (str: string) => {
  const strArray = str.split('');
  const obj = new Map<string, number>();

  strArray.forEach((value) => {
    if (obj.has(value)) {
      obj.set(value, obj.get(value)! + 1);
    } else {
      obj.set(value, 1);
    }
  });

  return Array.from(obj).sort((a, b) => b[1] - a[1])[0][0];
};

// console.log(solution6('BACBACCACCBDEDE'));

/**
 * Anagram이란 두 문자열이 알파벳의 나열 순서를 다르지만 그 구성이 일치하면 두 단어는 아나그램이라고 합니다.
 * 예를 들면 AbaAeCe 와 baeeACA 는 알파벳을 나열 순서는 다르지만 그 구성을 살펴보면 A(2), a(1), b(1), C(1), e(2)로 알파벳과 그 개수가 모두 일치합니다. 즉 어느 한 단어를 재 배열하면 상대편 단어가 될 수 있는 것을 아나그램이라 합니다.
 * 길이가 같은 두 개의 단어가 주어지면 두 단어가 아나그램인지 판별하는 프로그램을 작성하세 요. 아나그램 판별시 대소문자가 구분됩니다.
 */

const solution7 = (str1: string, str2: string) => {
  if (str1.length !== str2.length) return false;
  const makeHashMap = (str: string) => {
    const strArray = str.split('');
    const hashMap = new Map<string, number>();

    strArray.forEach((value) => {
      if (hashMap.has(value)) {
        hashMap.set(value, (hashMap.get(value) ?? 0) + 1);
      } else {
        hashMap.set(value, 1);
      }
    });

    return hashMap;
  };

  const str1Hash = makeHashMap(str1);
  // const str2Hash = makeHashMap(str2);

  for (const x of str2) {
    // if (!str2Hash.has(key)) return false;
    // if (str1Hash.get(key) !== value) return false;
    if (!str1Hash.get(x) || str1Hash.get(x) === 0) return false;
    str1Hash.set(x, (str1Hash.get(x) ?? 0) - 1);
  }

  return true;
};

// console.log(solution7('AbaAeCe', 'baeeACA'));

/**
 * 모든 아나그램 찾기(해쉬, 투포인터, 슬라이딩 윈도우)
 * S문자열에서 T문자열과 아나그램이 되는 S의 부분문자열의 개수를 구하는 프로그램을 작성하세요.
 * 아나그램 판별시 대소문자가 구분됩니다. 부분문자열은 연속된 문자열이어야 합니다.
 */

const solution8 = (str: string, target: string) => {
  const makeHashMap = (str: string) => {
    const strArray = str.split('');
    const hashMap = new Map<string, number>();

    strArray.forEach((value) => {
      if (hashMap.has(value)) {
        hashMap.set(value, (hashMap.get(value) ?? 0) + 1);
      } else {
        hashMap.set(value, 1);
      }
    });

    return hashMap;
  };

  const isSameAnagram = (
    hashMap1: Map<string, number>,
    hashMap2: Map<string, number>,
  ) => {
    if (hashMap1.size !== hashMap2.size) return false;

    for (const [key, value] of hashMap1) {
      if (hashMap2.get(key) !== value) return false;
    }

    return true;
  };

  const updateLtSlidingHashMap = (ltIndex: number) => {
    const key = str[ltIndex];
    const value = slidingHashMap.get(key);

    if (value === 1) {
      slidingHashMap.delete(key);
    } else {
      slidingHashMap.set(key, value! - 1);
    }
  };

  const targetSize = target.length;
  const targetHashMap = makeHashMap(target);
  const slidingHashMap = makeHashMap(str.slice(0, targetSize - 1));
  let result = 0;
  let lt = 0;

  for (let rt = targetSize - 1; rt < str.length; rt++) {
    const value = str[rt];
    slidingHashMap.set(value, (slidingHashMap.get(value) ?? 0) + 1);

    if (isSameAnagram(slidingHashMap, targetHashMap)) result++;

    updateLtSlidingHashMap(lt);
    lt++;
  }

  return result;
};

// console.log(solution8('bacaAacba', 'abc'));

const solution9 = (nums: number[], target: number) => {
  const set = new Set();
  const result: number[][] = [];

  for (const num of nums) {
    const complement = target - num;

    if (set.has(complement)) {
      result.push([complement, num]);
    }

    set.add(num);
  }

  return result;
};

// console.log(solution9([1, 2, 3, 4, 5, 6], 7));

const solution10 = (nums: number[], target: number) => {
  const newNums = Array.from(new Set(nums));
  newNums.sort((a, b) => a - b);

  const result: number[][] = [];
  const size = newNums.length;

  for (let i = 0; i < size - 2; i++) {
    const num = newNums[i];
    let left = i + 1;
    let right = size - 1;

    while (left < right) {
      const sum = num + newNums[left] + newNums[right];

      if (sum === target) {
        result.push([num, newNums[left], newNums[right]]);
        left++;
        right--;
      } else if (sum < target) {
        left++;
      } else if (sum > target) {
        right--;
      }
    }
  }

  return result;
};

console.log(solution10([1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 5, 6, 7], 10));
