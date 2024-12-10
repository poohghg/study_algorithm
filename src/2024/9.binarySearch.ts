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

console.log(boundaryArrange([3, 4, 5, 5, 5, 7, 9], 5));

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
  const sum = (heigth: number) => {
    return nums.reduce((acc, curr) => {
      return (acc += Math.max(curr - heigth, 0));
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

    console.log(start, end);
  }

  return Math.floor((start + end) / 2);
};

console.log(solution2([20, 15, 10, 17], 7));
