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
};

// console.log(boundaryArrange([3, 4, 5, 5, 5, 7, 9], 5));
