// 빈도수 패턴
/**
 * 주어진 두배열이 같은 요소인지 확인.
 */
function same(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  const arr1Obj = {};
  // const arr2Obj = {};

  for (const x of arr1) {
    arr1Obj[x] = (arr1Obj[x] || 0) + 1;
  }

  for (const x of arr2) {
    if (!arr1Obj[x]) return false;
    arr1Obj[x] -= 1;
  }
}
// console.log(same([4, 5, 6, 4, 5], [6, 5, 4, 4, 4]));

// 중복된 값이 있는지 확인한다.
function areThereDuplicates(...args) {
  const obj = {};
  for (const x of args) {
    if (obj[x]) return false;
    obj[x] = true;
  }
  return true;
}
// console.log(areThereDuplicates('a', 'b', 'c'));
/**
 * 합이0인 두요소를 구해라.
 * @param {*} arr
 */
function sumZero(arr) {
  if (arr.length < 2) return;
  arr.sort((a, b) => a - b);

  let left = 0,
    rigth = arr.length - 1,
    sum = 0;

  while (left < rigth) {
    sum = arr[left] + arr[rigth];
    if (sum === 0) return [arr[left], arr[rigth]];
    else if (sum > 0) rigth--;
    else left++;
  }
  return;
}
// console.log(sumZero([4, 5, 1, 2, 3, 45, -15, 2, -55]));
// 주어진 배열에서 유니크한 요소의 갯수를 구한다.
function countUniqueValues(arr) {
  arr.sort((a, b) => a - b);
  let temp,
    answer = 0;
  for (const x of arr) {
    if (temp !== x) {
      answer++;
      temp = x;
    }
  }
  return answer;
}
// console.log(countUniqueValues([1, 1, 1, 1, 2, 3, 4, 1]));

// 주언진 수의 배열내 합중 가장큰합을 구해라.
function maxSubarraySum(arr, nums = 1) {
  if (arr.length < nums) return undefined;
  let sum = 0;
  let temp = 0;
  for (let i = 0; i < nums; i++) {
    sum += arr[i];
  }
  for (let i = nums; i < arr.length; i++) {
    temp = sum - arr[i - nums] + arr[i];
    sum = Math.max(temp, sum);
  }
  return sum;
}

console.log(maxSubarraySum([1, 2, 3, 4, 5, 6, 7, 10], 3));
