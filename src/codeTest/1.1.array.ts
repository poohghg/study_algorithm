export default {};

//https://leetcode.com/problems/water-bottles-ii/?envType=daily-question&envId=2026-02-20
function maxBottlesDrunk(numBottles: number, numExchange: number): number {
  let result = 0;
  let empty = 0;
  while (0 < numBottles) {
    result += numBottles;
    empty += numBottles;
    numBottles = 0;

    if (numExchange <= empty) {
      empty -= numExchange;
      numBottles++;
      numExchange++;
    }
  }

  return result;
}

console.log(maxBottlesDrunk(13, 6));

//https://leetcode.com/problems/find-triangular-sum-of-an-array/?envType=daily-question&envId=2026-02-20
function triangularSum(nums: number[]): number {
  let size = nums.length;
  while (1 < size) {
    for (let i = 0; i < size - 1; i++) {
      nums[i] = (nums[i] + nums[i + 1]) % 10;
    }
    size--;
  }
  return nums[0];
}

// console.log(triangularSum([1, 2, 3, 4, 5]));

//https://leetcode.com/problems/triangle/submissions/1924198333/?envType=daily-question&envId=2026-02-19
function minimumTotal(triangle: number[][]): number {
  const n = triangle.length;
  const dp = Array.from({ length: n }, (_, i): number[] => triangle[i].slice());

  for (let i = n - 2; 0 <= i; i--) {
    for (let j = 0; j <= i; j++) {
      const left = dp[i + 1][j];
      const right = dp[i + 1][j + 1];
      dp[i][j] += Math.min(left, right);
    }
  }

  return dp[0][0];
}

// console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]));
/**
 * 두 변 중 짧은 합이 가장 긴 변보다 커야한다. a + b > c
 * 정렬된 배열에서 가장 긴 변이 가장 뒤에 오도록 정렬한 후, 가장 긴 변을 고정하고 나머지 두 변을 투 포인터로 탐색하는 방식으로 구현할 수 있다.
 */
//https://leetcode.com/problems/valid-triangle-number/description/?envType=daily-question&envId=2026-02-19
function triangleNumber(nums: number[]): number {
  nums.sort((a, b) => a - b);
  let result = 0;

  for (let k = nums.length - 1; 2 <= k; k--) {
    const max = nums[k];
    let l = 0;
    let r = k - 1;
    while (l < r) {
      if (max < nums[l] + nums[r]) {
        result += r - l;
        r--;
      } else {
        l++;
      }
    }
  }
  return result;
}

// console.log(triangleNumber([1, 2, 3, 4, 2]));
