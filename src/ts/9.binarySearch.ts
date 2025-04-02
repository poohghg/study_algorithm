export default {};

const binarySearch = (arr: number[], target: number) => {
  const search = (left: number, right: number): number => {
    if (right < left) return -1;

    const mid = Math.floor((left + right) / 2);
    const midValue = arr[mid];

    if (midValue === target) {
      return mid;
    } else if (target < midValue) {
      return search(left, mid - 1);
    } else {
      return search(left + 1, right);
    }
  };

  return search(0, arr.length - 1);
};

const binarySearch1 = (arr: number[], target: number) => {
  let start = 0;
  let end = arr.length - 1;

  // 한개 이상의 원소가 탐색할 범위가 존재할때
  while (start <= end) {
    let mid: number = Math.floor(start + end / 2);
    const midValue = arr[mid];

    if (target === midValue) return mid;
    else if (target < midValue) end = mid - 1;
    else start = start = mid + 1;
  }
};

// console.log(binarySearch1([1, 3, 5, 19, 21, 44], 3));

const boundaryArrange = (arr: number[], target: number) => {
  const lowerBound = (start: number, end: number) => {
    while (start < end) {
      const mid = Math.floor((start + end) / 2);
      const midValue = arr[mid];
      if (target <= midValue) {
        end = mid;
      } else {
        start = mid;
      }
    }

    return end;
  };

  const upperBound = (start: number, end: number) => {
    while (start < end) {
      const mid = Math.floor((start + end) / 2);
      const midValue = arr[mid];
      if (target < midValue) {
        end = mid;
      } else {
        start = mid;
      }
    }

    return end;
  };

  // console.log(upperBound(0,));
};

// console.log(boundaryArrange([3, 4, 5, 5, 5, 7, 9], 5));

/**
 * 예산
 * https://www.acmicpc.net/problem/2512
 * 전체 국가예산이 485이고 4개 지방의 예산요청이 각각 120, 110, 140, 150이라고 하자. 이 경우, 상한액을 127로 잡으면,
 * 위의 요청들에 대해서 각각 120, 110, 127, 127을 배정하고 그 합이 484로 가능한 최대가 된다.
 * 여러 지방의 예산요청과 국가예산의 총액이 주어졌을 때, 위의 조건을 모두 만족하도록 예산을 배정하는 프로그램을 작성하시오.
 *
 */

const solution1 = (budgets: number[], total: number) => {
  const totalSum = (top: number) => {
    return budgets.reduce((acc, curr) => {
      return acc + Math.min(top, curr);
    }, 0);
  };

  let start = 0;
  let end = Math.max(...budgets);

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (total <= totalSum(mid)) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return Math.floor((start + end) / 2);
};

// console.log(solution1([120, 110, 140, 150], 485));

/**
 * 나무 자르기
 * https://www.acmicpc.net/problem/2805
 */

const solution2 = (nums: number[], total: number) => {
  const sum = (height: number) => {
    return nums.reduce((acc, curr) => {
      return (acc += Math.max(curr - height, 0));
    }, 0);
  };

  let start = 0;
  let end = Math.max(...nums);

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (sum(mid) < total) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return Math.floor((start + end) / 2);
};

// console.log(solution2([20, 15, 10, 17], 7));

// 결정 알고리즘

const solution3 = (num: number, recodes: number[]) => {
  const getCount = (time: number) => {
    let cnt = 1;
    let sum = 0;

    for (const recode of recodes) {
      if (sum + recode > time) {
        cnt++;
        sum = recode;
      } else {
        sum += recode;
      }
    }

    return cnt;
  };

  let [min, max] = [num * Math.min(...recodes), num * Math.max(...recodes)];
  let mid = Math.floor((min + max) / 2);

  while (min <= max) {
    mid = Math.floor((min + max) / 2);
    let result = getCount(mid);

    if (result > num) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }
  return mid;
};

// console.log(solution3(3, [1, 2, 3, 4, 5, 6, 7, 8, 9]));

/**
 * C마리의 말을 N개의 마구간에 배치했을 때 가장 가까운 두 말의 거리가 최대가 되는 그 최대
 * 값을 출력하는 프로그램을 작성하세요.
 * ▣ 입력설명
 * 첫 줄에 자연수 N(3<=N<=200,000)과 C(2<=C<=N)이 공백을 사이에 두고 주어집니다.
 * 둘째 줄에 마구간의 좌표 xi(0<=xi<=1,000,000,000)가 차례로 주어집니다.
 */

const solution4 = (nums: number, positions: number[]) => {
  const getCount = (distance: number) => {
    let cnt = 1;
    let prevPosition = 0;

    for (const p of positions) {
      if (p - prevPosition > distance) {
        cnt++;
        prevPosition = p;
      }
    }

    return cnt;
  };

  let [min, max] = [Math.min(...positions), Math.max(...positions)];
  let answer = 0;

  while (min <= max) {
    const mid = Math.floor((min + max) / 2);
    const result = getCount(mid);

    if (result >= nums) {
      min = mid + 1;
      answer = mid;
    } else {
      max = mid - 1;
    }
  }

  return answer;
};

console.log(solution4(3, [1, 2, 4, 8, 9]));
