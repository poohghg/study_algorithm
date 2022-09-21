function same(arr1, arr2) {
  let answer = true;
  for (const x of arr1) {
    // const findIndex = arr2.findIndex((v) => x ** 2 === v);
    const findIndex = arr2.indexOf(x ** 2);
    if (findIndex === -1) {
      answer = false;
      break;
    }
    arr2.splice(findIndex, 1);
  }
  return answer;
}

/**
  빈도수 세기패턴
  O(n2) -> O(3n)  
  오브젝트 키에 엘레민트를 삽입하고 벨류에 엘레멘트의 숫자를 넣음.
*/
function refactoringSame(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  const arr1Obj = {};
  const arr2Obj = {};
  // 각 엘레멘트가 몇개인지 오브젝트에 기록한다
  for (const x of arr1) {
    arr1Obj[x] = (arr1Obj[x] || 0) + 1;
  }

  for (const x of arr2) {
    arr2Obj[x] = (arr2Obj[x] || 0) + 1;
  }

  for (const key in arr1Obj) {
    const arr1keySquared = key ** 2;
    // 엘레민트 제곱의 값이 존재하지 않을때
    // in연산자는 프로토타입 체인상 상위 프로터타입의 속성도 확인?
    // O(1) 상수시간.
    if (!arr2Obj.hasOwnProperty(arr1keySquared)) {
      return false;
    }
    // 엘레민트의 갯수가 다를대
    if (arr1Obj[key] !== arr2Obj[arr1keySquared]) {
      return false;
    }
  }
  return true;
}
// console.log(refactoringSame([1, 2, 3, 2, 5], [9, 1, 4, 4, 25]));

// 문제풀이
function sameFrequency(num1, num2) {
  const strNum1 = String(num1);
  const strNum2 = String(num2);
  if (strNum1.length !== strNum2.length) return false;

  const firstObj1 = {};
  for (let i = 0; i < strNum1.length; i++) {
    const v = strNum1[i];
    firstObj1[v] = firstObj1[v] + 1 || 1;
  }

  for (const x of strNum2) {
    if (!firstObj1[x]) return false;
    firstObj1[x] -= 1;
  }
  return true;
}

console.log(sameFrequency(3589578, 5279385));
/**
 아나그램
 같은 엘레민트를 소유하고 있는지 확인한다,
 */
function validAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;
  const str1Obj = {};
  const str2Obj = {};
  function fillObj(obj, str) {
    for (const key of str) {
      obj[key] = ++obj[key] || 1;
    }
    return obj;
  }
  fillObj(str1Obj, str1);
  fillObj(str2Obj, str2);

  for (const key in str1Obj) {
    if (!str2Obj.hasOwnProperty(key)) return false;
    if (str1Obj[key] !== str2Obj[key]) return false;
  }
  return true;
}
/**
 3n -> 2n
 */
function refactValidAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;
  const str1Obj = {};
  for (const x of str1) {
    str1Obj[x] = ++str1Obj[x] || 1;
  }
  for (const x of str2) {
    if (!str1Obj[x]) return false;
    else str1Obj[x] -= 1;
  }
  return true;
}
// console.log(refactValidAnagram('anagram', 'nagaram'));

/**
  다중포인터
  ex) 주어진 배열에서 합계가 0인 첫번째 한쌍의 배열을 구해라/
 */

function sumZero(arr) {
  let left = 0;
  let rigth = arr.length - 1;

  while (left < rigth) {
    let sum = arr[left] + arr[rigth];
    if (sum === 0) return [arr[left], arr[rigth]];
    // 포인터를 옮기는조건
    // 이미 정렬이 되어있는 배열에서 옮기는 조건이다.
    else if (sum > 0) {
      --rigth;
    } else {
      ++left;
    }
  }
}
// console.log(sumZero([-5, -3, -2, 1, 4, 6]));

/**
 주어진 정렬된 배열에서 중복이 없는 숫자의 수를 반환해라
 */

function countUniqueValues(arr) {
  let answer = 0;
  let temp;
  for (let i = 0; i < arr.length; i++) {
    const curVal = arr[i];
    if (temp === curVal) continue;
    temp = arr[i];
    answer++;
  }
  return answer;
}

function refactCountUniqueValues(arr) {
  let i = 0;
  for (let j = 0; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return i + 1;
}

// console.log(refactCountUniqueValues([1, 1, 1, 1, 2, 3, 3, 4, 5, 10]));

// 특정 슬라이딩 조건을 만족하는 로직?
// 주로 왼쪽에서 오른쪽으로 순회
function slidingWindow(arr, num) {
  let max = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < arr.length + 1 - num; i++) {
    let curNum = arr[i];
    for (let j = 1; j < num; j++) {
      curNum += arr[i + j];
    }
    if (curNum > max) max = curNum;
  }
  return max;
}

function refactSlidingWindow(arr, num) {
  if (arr.length < num) return null;
  let max = 0,
    temp = 0;

  for (let i = 0; i < num; i++) {
    max += arr[i];
  }
  temp = max;
  // console.log(temp);
  for (let i = num; i < arr.length; i++) {
    temp = temp + arr[i] - arr[i - num];
    max = Math.max(max, temp);
  }
  return max;
}

// console.log(refactSlidingWindow([1, 2, 5, 2, 8, 1, 5], 2));

//인전합 숫자들중 주어진 숫자를 넘는 가장작은 배열의 길이를 구해라
function minSubArrayLen(arr, num) {
  let index = 0,
    sum = 0,
    temp = 0,
    minlen = Infinity;
  while (index <= arr.length) {
    if (sum < num && temp < arr.length) {
      sum += arr[index];
      temp++;
      index++;
    } else if (sum >= num) {
      minlen = Math.min(temp, minlen);
      sum -= arr[index - temp];
      temp--;
    } else {
      break;
    }
  }
  return minlen === Infinity ? 0 : minlen;
}

function refactMinSubArrayLen(nums, sum) {
  let total = 0;
  let start = 0;
  let end = 0;
  let minLen = Infinity;

  while (start < nums.length) {
    // if current window doesn't add up to the given sum then
    // move the window to right
    if (total < sum && end < nums.length) {
      total += nums[end];
      end++;
    }
    // if current window adds up to at least the sum given then
    // we can shrink the window
    else if (total >= sum) {
      minLen = Math.min(minLen, end - start);
      total -= nums[start];
      start++;
    }
    // current total less than required total but we reach the end, need this or else we'll be in an infinite loop
    else {
      break;
    }
  }
  return minLen === Infinity ? 0 : minLen;
}

// 분할정복 이진탐색
function search(arr, val) {
  let min = 0,
    max = arr.length - 1;
  while (min <= max) {
    const middle = Math.floor((min + max) / 2);
    const curVal = arr[middle];
    if (curVal < val) {
      min = middle + 1;
    } else if (curVal > val) {
      max = middle - 1;
    } else {
      return middle;
    }
  }
  return -1;
}
// console.log(search([1, 2, 3, 4, 5, 6, 8, 10, 14, 16, 21, 31], 5));
