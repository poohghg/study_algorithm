export default {};

//https://leetcode.com/problems/3sum/description/
function threeSum(nums: number[]): number[][] {
  const result: number[][] = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i - 1] === nums[i]) continue;

    const target = -nums[i];
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[left] + nums[right];
      if (sum === target) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
        }
        while (left < right && nums[right] === nums[right - 1]) {
          right--;
        }
        left++;
        right--;
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));

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
// console.log(reverse(-1563847412));
