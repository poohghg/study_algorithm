export default {};

//https://leetcode.com/problems/four-divisors/?envType=daily-question&envId=2026-01-05
function sumFourDivisors(nums: number[]): number {
  const getFactorSum = (n: number) => {
    let count = 2;
    let sum = 1 + n;

    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        count++;

        if (n / i !== i) {
          count++;
        }

        if (4 < count) {
          return 0;
        }

        sum += i + n / i;
      }
    }

    1 >> 6;
    return count === 4 ? sum : 0;
  };

  return nums.reduce((acc, n) => acc + getFactorSum(n), 0);
}

console.log(sumFourDivisors([21, 4, 7]));

//https://leetcode.com/problems/plus-one/?envType=daily-question&envId=2026-01-01
function plusOne(digits: number[]): number[] {
  for (let i = digits.length - 1; 0 <= i; i--) {
    if (digits[i] === 9) {
      digits[i] = 0;
    } else {
      digits[i] = digits[i] + 1;
      return digits;
    }
  }

  digits.unshift(1);
  return digits;
}

// console.log(plusOne([9, 8, 9]));
// console.log(plusOne([5, 9, 9]));

//https://leetcode.com/problems/count-square-sum-triples/?envType=daily-question&envId=2025-12-08
function countTriples(n: number): number {
  let result = 0;
  const set: number[] = [];

  for (let i = 1; i <= n; i++) {
    const target = i ** 2;
    let left = 0;
    let right = set.length - 1;

    while (left <= right) {
      const sum = set[left] + set[right];
      if (sum == target) {
        result += 2;
        break;
      }
      if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
    set.push(target);
  }

  return result;
}

// console.log(countTriples(10));

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

// console.log(threeSum([-1, 0, 1, 2, -1, -4]));

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
