export default {};

function getMaxProfit(pnl: number[], k: number): number {
  const n = pnl.length;
  let max = 0;

  for (let i = 0; i < pnl.length; i++) {
    let sum = 0;
    for (let j = i; j < pnl.length; j++) {
      if (j - i === k) break;
      sum += pnl[j];
      max = Math.max(max, sum);
    }
  }

  return max;
}

console.log(getMaxProfit([-7, -5, -8, -6, -7], 3));
console.log(getMaxProfit([4, 3, -2, 9, -4, 2, 7, 6], 6));
console.log(getMaxProfit([2, 5, -7, 8, -6, 4, 1 - 9], 5));
console.log(getMaxProfit([-3, 4, 3, -2, 2, 5], 4));

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

function findConsistentLogsOptimized(userEvent: number[]): number {
  const makeTotalFreq = () => {
    const freq = new Map<number, number>();
    for (const id of userEvent) {
      freq.set(id, (freq.get(id) || 0) + 1);
    }
    return freq;
  };

  const totalFreq = makeTotalFreq();
  if (totalFreq.size === 0) return 0;
  const minGlobalFreq = Math.min(...totalFreq.values());

  let maxLen = 0;
  let left = 0;
  const windowFreq = new Map<number, number>(); // ID -> 현재 윈도우 내 빈도
  const freqCount = new Map<number, number>(); // 빈도 -> 해당 빈도를 가진 ID의 개수
  let maxWindowFreq = 0; // 현재 윈도우 내 최대 빈도

  for (let right = 0; right < userEvent.length; right++) {
    const rightID = userEvent[right];

    // --- 윈도우 확장 ---
    // 이전 빈도 가져오기 및 freqCount에서 제거
    const oldFreq = windowFreq.get(rightID) || 0;
    if (oldFreq > 0) {
      freqCount.set(oldFreq, freqCount.get(oldFreq)! - 1);
      if (freqCount.get(oldFreq) === 0) {
        freqCount.delete(oldFreq);
      }
    }

    // 새 빈도 계산 및 windowFreq, freqCount 업데이트
    const newFreq = oldFreq + 1;
    windowFreq.set(rightID, newFreq);
    freqCount.set(newFreq, (freqCount.get(newFreq) || 0) + 1);

    // maxWindowFreq 업데이트 (O(1))
    maxWindowFreq = Math.max(maxWindowFreq, newFreq);

    // --- 윈도우 축소 ---
    // 현재 윈도우의 최대 빈도가 전체 최소 빈도를 초과하는 동안 반복
    while (maxWindowFreq > minGlobalFreq) {
      const leftID = userEvent[left];
      const currentLeftFreq = windowFreq.get(leftID)!; // leftID는 반드시 맵에 존재

      // freqCount에서 현재 빈도 제거
      freqCount.set(currentLeftFreq, freqCount.get(currentLeftFreq)! - 1);
      if (freqCount.get(currentLeftFreq) === 0) {
        freqCount.delete(currentLeftFreq);
        // 중요: 제거된 빈도가 현재 maxWindowFreq와 같았다면, maxWindowFreq를 갱신해야 함
        if (currentLeftFreq === maxWindowFreq) {
          // freqCount에 키가 없을 때까지 maxWindowFreq를 1씩 감소시킴
          while (!freqCount.has(maxWindowFreq) && maxWindowFreq > 0) {
            maxWindowFreq--;
          }
        }
      }

      // windowFreq 업데이트 (빈도 감소 또는 ID 제거)
      const newLeftFreq = currentLeftFreq - 1;
      if (newLeftFreq === 0) {
        windowFreq.delete(leftID);
      } else {
        windowFreq.set(leftID, newLeftFreq);
        // freqCount에 감소된 새 빈도 추가
        freqCount.set(newLeftFreq, (freqCount.get(newLeftFreq) || 0) + 1);
      }

      left++; // 왼쪽 포인터 이동
    }

    // --- 최대 길이 갱신 ---
    // 현재 윈도우의 최대 빈도가 전체 배열의 최소 빈도와 정확히 같을 때만 갱신
    if (maxWindowFreq === minGlobalFreq) {
      maxLen = Math.max(maxLen, right - left + 1);
    }
  }

  return maxLen;
}

// 테스트 케이스
// console.log(findConsistentLogsOptimized([1, 2, 1, 3, 4, 2, 4, 3, 3, 4])); // 예상 결과: 8
// console.log(findConsistentLogsOptimized([1, 2, 2, 3, 1])); // 예상 결과: 3
// console.log(findConsistentLogsOptimized([4, 4, 4, 4])); // 예상 결과: 4
// console.log(findConsistentLogsOptimized([1, 2, 3, 4])); // 예상 결과: 4
// console.log(findConsistentLogsOptimized([1, 1, 2, 2, 2])); // 예상 결과: 4
// console.log(findConsistentLogsOptimized([])); // 예상 결과: 0
// console.log(findConsistentLogsOptimized([5])); // 예상 결과: 1
