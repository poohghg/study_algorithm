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

oddValues([1, 2, 3, 4, 5]);
