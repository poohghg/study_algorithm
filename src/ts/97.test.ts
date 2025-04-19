export default {};

function getMaxProfit(pnl: number[], k: number): number {
  const n = pnl.length;
  const prefixSum = Array.from({ length: n + 1 }, () => 0);

  for (let i = 0; i <= n; i++) {
    prefixSum[i + 1] = prefixSum[i] + pnl[i];
  }

  let max = Number.MIN_SAFE_INTEGER;
  let dp: number[] = [];

  for (let i = 0; i < n; i++) {
    while (dp.length > 0 && dp[0] < i - k) {
      dp.shift();
    }

    if (dp.length > 0) {
      max = Math.max(max, prefixSum[i] - prefixSum[dp[0]]);
    }

    while (dp.length > 0 && prefixSum[dp[dp.length - 1]] >= prefixSum[i]) {
      dp.pop();
    }

    dp.push(i);
  }

  return Math.max(0, max);
}

// for (let i = 0; i < pnl.length; i++) {
//   let sum = 0;
//   for (let j = i; j < pnl.length; j++) {
//     if (j - i === k) break;
//     sum += pnl[j];
//     max = Math.max(max, sum);
//   }
// }

// console.log(getMaxProfit([-7, -5, -8, -6, -7], 3));
// console.log(getMaxProfit([4, 3, -2, 9, -4, 2, 7, 6], 6));
// console.log(getMaxProfit([2, 5, -7, 8, -6, 4, 1 - 9], 5));
// console.log(getMaxProfit([-3, 4, 3, -2, 2, 5], 4));

const solutoin2 = (cost: number[], k: number) => {
  const dp = Array.from({ length: cost.length }, () => Number.MAX_SAFE_INTEGER);

  for (let i = 0; i < k; i++) {
    dp[i] = cost[i];
  }

  for (let i = k; i < cost.length; i++) {
    for (let j = 1; j <= k; j++) {
      dp[i] = Math.min(dp[i], dp[i - j] + cost[i]);
    }
  }

  return dp[dp.length - 1];
};

// console.log(solutoin2([1, 9, 2, 6, 1], 3));

function findConsistentLogs(userEvent: number[]): number {
  const totalFreq = new Map<number, number>();
  const n = userEvent.length;

  for (const id of userEvent) {
    totalFreq.set(id, (totalFreq.get(id) || 0) + 1);
  }
  const minFreq = Math.min(...Array.from(totalFreq.values()));

  let maxLen = 0;
  let left = 0;
  let currentMaxFreq = 0;
  const windowFreq = new Map<number, number>();

  for (let right = 0; right < n; right++) {
    const rightID = userEvent[right];
    windowFreq.set(rightID, (windowFreq.get(rightID) || 0) + 1);

    if (windowFreq.get(rightID)! > currentMaxFreq) {
      currentMaxFreq = windowFreq.get(rightID)!;
    }

    while (currentMaxFreq > minFreq) {
      const leftID = userEvent[left];
      const leftCount = windowFreq.get(leftID)!;

      if (leftCount === 1) {
        windowFreq.delete(leftID);
      } else {
        windowFreq.set(leftID, leftCount - 1);
      }
      left++;
      currentMaxFreq = Math.max(...Array.from(windowFreq.values()));
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

console.log(findConsistentLogs([9, 9, 9]));
console.log(findConsistentLogs([1, 2, 2, 1, 3]));
