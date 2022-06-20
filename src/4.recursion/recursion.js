function basic(num) {
  if (num === 1) return 1;
  return num + basic(num - 1);
}
// basic(5);

function iterableFactorial(num) {
  // 비재귀적
  let total = 1;
  for (let i = num; i > 1; i--) {
    total *= i;
  }
  return total;
}
// console.log(iterableFactorial(2));

function factorial(num) {
  if (num === 1) return 1;
  return num * factorial(num - 1);
}
// console.log(factorial(3));

function oddValues(arr) {
  let newArr = [];
  if (arr.length === 0) return newArr;
  if (arr[0] % 2 !== 0) newArr.push(arr[0]);
  newArr = newArr.concat(oddValues(arr.slice(1)));
  return newArr;
}
// oddValues([1, 2, 3, 4, 5]);

function productOfArray(arr) {
  if (arr.length === 0) {
    return 1;
  }
  return arr[0] * productOfArray(arr.slice(1));
}
// productOfArray([0, 1, 2, 3, 4, 5, 6]);
function recursiveRange(num) {
  if (num === 0) return 0;
  return num + recursiveRange(num - 1);
}

// 수학에서, 피보나치 수(영어: Fibonacci numbers)는 첫째 및 둘째 항이 1이며 그 뒤의 모든 항은 바로 앞 두 항의 합인 수열이다.
function fib(num) {
  if (num <= 2) return 1;
  return fib(num - 1) + fib(num - 2);
}
// console.log(fib(4));
function reverse(str) {
  if (str.length === 1) return str;
  return reverse(str.slice(1)) + str[0];
}
// console.log(reverse('str'));

function isPalindrome(str) {
  if (str.length === 1) return true;
  if (str.length === 2) return str[0] === str[1];
  // end: slice -1 마지막전까지
  // 생략시 arr.length 마지막까지
  return isPalindrome(str.slice(1, -1));
}
// console.log(isPalindrome('tacocat'));

function someRecursive(arr, callback) {
  if (arr.length === 0) return false;
  if (callback(arr[0])) return true;
  return someRecursive(arr.slice(1), callback);
}
// someRecursive([1,2,3,4], isOdd) // true
// const isOdd = (val) => val % 2 !== 0;
// console.log(someRecursive([2, 4, 8, 4], isOdd));
