export default {};

//https://leetcode.com/problems/reverse-integer/
function reverse(x: number): number {
  const maxInt = 2 ** 31 - 1;
  let result = 0;
  let divisionValue = Math.abs(x);

  while (0 < divisionValue) {
    const lastValue = divisionValue % 10;
    divisionValue = Math.floor(divisionValue / 10);
    result = result * 10 + lastValue;
    if (maxInt < result) return 0;
  }

  return x < 0 ? -result : result;
}

// console.log(reverse(1534236469));
// console.log(reverse(-120));
console.log(reverse(-1563847412));
