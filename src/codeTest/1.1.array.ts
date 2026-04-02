export default {};

//https://leetcode.com/problems/maximum-amount-of-money-robot-can-earn/?envType=daily-question&envId=2026-04-02
function maximumAmount(coins: number[][]): number {
  const n = coins.length;
  const m = coins[0].length;
  const dp = Array.from({ length: n }, () =>
    Array.from({ length: m }, (): number[] => [
      -Infinity,
      -Infinity,
      -Infinity,
    ]),
  );

  const start = coins[0][0];
  dp[0][0][0] = start;

  if (start < 0) {
    dp[0][0][1] = 0;
  }

  for (let i = 1; i < 2; i++) {
    const num = coins[0][i];
    const prev = dp[0][i - 1].slice();

    for (let k = 0; k < 2; k++) {
      dp[0][i][k] = Math.max(dp[0][i][k], prev[k] + num);

      if (num < 0 && k > 1) {
        dp[0][i][k] = Math.max(dp[0][i][k], prev[k - 1]);
      }
    }
  }

  // for (let i = 1; i < m; i++) {
  //   const num = coins[0][i];
  //   dp[0][i] = dp[0][i - 1] + num;
  //   k[0][i] = k[0][i - 1].slice();
  //   if (num < 0) {
  //     k[0][i].push(Math.abs(num));
  //     k[0][i] = k[0][i].sort((a, b) => b - a).slice(0, 2);
  //   }
  // }
  //
  // for (let i = 1; i < n; i++) {
  //   for (let j = 1; j < m; j++) {
  //     const num = coins[i][j];
  //     const upSum = dp[i - 1][j];
  //     const upKSum = k[i - 1][j].reduce((a, b) => a + b, 0);
  //     const leftSum = dp[i][j - 1];
  //     const leftKSum = k[i][j - 1].reduce((a, b) => a + b, 0);
  //
  //     // 현재 자리를 확정한다.
  //     // 각각의 자리는 무조건썸으로 ?
  //     if (upSum + upKSum < leftSum + leftKSum) {
  //       dp[i][j] = num + leftSum;
  //       if (num < 0) {
  //         k[i][j] = [Math.abs(num), ...k[i][j - 1]]
  //           .sort((a, b) => b - a)
  //           .slice(0, 2);
  //       } else {
  //         k[i][j] = k[i][j - 1].slice();
  //       }
  //     } else {
  //       dp[i][j] = num + upSum;
  //       if (num < 0) {
  //         k[i][j] = [Math.abs(num), ...k[i - 1][j]]
  //           .sort((a, b) => b - a)
  //           .slice(0, 2);
  //       } else {
  //         k[i][j] = k[i - 1][j].slice();
  //       }
  //     }
  //   }
  // }
  //
  // return dp[n - 1][m - 1] + k[n - 1][m - 1].reduce((a, b) => a + b, 0);
  return 1;
}

console.log(
  maximumAmount([
    [-16, 4, 1, -1],
    [11, 9, 3, 3],
    [-6, 17, -19, 9],
    [14, -17, -19, -13],
  ]),
);

//https://leetcode.com/problems/greatest-sum-divisible-by-three/?envType=daily-question&envId=2026-04-01
function maxSumDivThree(nums: number[]): number {
  const dp: number[] = [0, 0, 0];

  for (const num of nums) {
    const prev = dp.slice();
    for (const v of prev) {
      const sum = num + v;
      dp[sum % 3] = Math.max(dp[sum % 3], sum);
    }
  }

  return dp[0];
}

// console.log(maxSumDivThree([3, 6, 5, 1, 8]));

//https://leetcode.com/problems/construct-product-matrix/?envType=daily-question&envId=2026-03-31
function constructProductMatrix(grid: number[][]): number[][] {
  const n = grid.length;
  const m = grid[0].length;
  const mod = 12345;
  const dp = Array.from({ length: n }, () => Array(m).fill(0));

  let total = 1;
  for (let i = n - 1; 0 <= i; i--) {
    for (let j = m - 1; 0 <= j; j--) {
      dp[i][j] = total;
      total = (total * grid[i][j]) % mod;
    }
  }

  total = 1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      dp[i][j] = (dp[i][j] * total) % mod;
      total = (total * grid[i][j]) % mod;
    }
  }

  return dp;
}

//https://leetcode.com/problems/equal-sum-grid-partition-i/?envType=daily-question&envId=2026-03-25
function canPartitionGrid(grid: number[][]): boolean {
  const n = grid.length;
  const m = grid[0].length;
  const total = grid.reduce((acc, row) => {
    return acc + row.reduce((a, b) => a + b);
  }, 0);

  const makeTotalNums = () => {
    return grid.reduce((acc, row) => {
      row.forEach((n) => {
        acc.set(n, 1 + (acc.get(n) ?? 0));
      });
      return acc;
    }, new Map<number, number>());
  };

  const canRowPartition = () => {
    const leftNums = new Map<number, number>();
    const rightNums = makeTotalNums();

    let rightSum = total;
    let sum = 0;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < m; j++) {
        const n = grid[i][j];
        sum += n;
        rightSum -= n;
        leftNums.set(n, (leftNums.get(n) ?? 0) + 1);
        rightNums.set(n, rightNums.get(n)! - 1);
        if (rightNums.get(n) === 0) rightNums.delete(n);
      }

      if (sum === rightSum) return true;

      if (sum < rightSum) {
        const splitNum = rightSum - sum;
        if (rightNums.has(splitNum)) {
          return true;
        }
      }

      if (rightSum < sum) {
        const splitNum = sum - rightSum;
        if (leftNums.has(splitNum)) {
          return true;
        }
      }
    }
    return false;
  };

  const canColPartition = () => {
    const leftNums = new Map<number, number>();
    const rightNums = makeTotalNums();

    let rightSum = total;
    let sum = 0;

    for (let j = 0; j < m - 1; j++) {
      for (let i = 0; i < n; i++) {
        const n = grid[i][j];

        sum += n;
        rightSum -= n;
        leftNums.set(n, (leftNums.get(n) ?? 0) + 1);
        rightNums.set(n, rightNums.get(n)! - 1);
        if (rightNums.get(n) === 0) rightNums.delete(n);
      }

      if (sum === rightSum) return true;

      if (sum < rightSum) {
        const splitNum = rightSum - sum;
        if (rightNums.has(splitNum)) {
          return true;
        }
      }

      if (rightSum < sum) {
        const splitNum = sum - rightSum;
        if (leftNums.has(splitNum)) {
          return true;
        }
      }
    }

    return false;
  };

  return canRowPartition() || canColPartition();
}

// console.log(
//   canPartitionGrid([
//     [1, 2, 4], // 7
//     [2, 3, 5], // 10
//   ]),
// );

//https://leetcode.com/problems/successful-pairs-of-spells-and-potions/?envType=daily-question&envId=2026-02-25
function successfulPairs(spells: number[], potions: number[], success: number) {
  const bs = (spell: number) => {
    const target = Math.ceil(success / spell);

    if (potions[potions.length - 1] < target) {
      return 0;
    }

    if (target <= potions[0]) {
      return potions.length;
    }

    let left = 1;
    let right = potions.length - 2;
    let result = potions.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (target <= potions[mid]) {
        result = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return potions.length - result;
  };

  potions.sort((a, b) => a - b);
  const result = new Uint32Array(spells.length);

  for (let i = 0; i < spells.length; i++) {
    result[i] = bs(spells[i]);
  }

  return result;
}

// console.log(successfulPairs([1, 2, 3, 4, 5, 6, 7], [1, 2, 3, 4, 5, 6, 7], 25));

//https://leetcode.com/problems/maximum-total-damage-with-spell-casting/?envType=daily-question&envId=2026-02-21
function maximumTotalDamage(power: number[]): number {
  const n = power.length;
  power.sort((a, b) => a - b);
  return 1;
}

// console.log(maximumTotalDamage([7, 1, 6, 6]));

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

// console.log(maxBottlesDrunk(13, 6));

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
