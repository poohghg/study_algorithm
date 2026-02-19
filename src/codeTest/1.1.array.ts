export default {};

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

//https://leetcode.com/problems/valid-triangle-number/description/?envType=daily-question&envId=2026-02-19
function triangleNumber(nums: number[]): number {
  nums.sort((a, b) => a - b);
  let result = 0;

  for (let k = nums.length - 1; 0 <= k; k--) {
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

console.log(triangleNumber([1, 2, 3, 4, 2]));
// console.log(triangleNumber([4, 2, 3, 4, 1]));
