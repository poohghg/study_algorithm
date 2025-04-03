{
  // 배열 A가 주어졌을 때, 배열에 포함되지 않은 가장 작은 양의 짝수를 반환하는 함수를 작성하세요.
  const solution1 = (A) => {
    const set = new Set(A ?? []);
    let minValue = 2;

    while (set.has(minValue)) {
      minValue += 2;
    }

    return minValue;
  };

  // console.log(solution1([1, 3, 6, 4, 1, 2]));
  // console.log(solution1([2, 4, 6, 8, 10]));
  // console.log(solution1([-1, -3, 3, 5, 7]));

  /**
   *누락된 숫자 찾기 (Missing Number in a Sequence)
   *1부터 N까지의 연속된 정수 중에서 하나의 숫자가 누락되어 있다.
   *이 배열에서 누락된 숫자를 찾아 반환하는 함수를 작성하세요.
   */

  const solution2 = (n) => {
    const min = Math.min(...n);
    const max = Math.max(...n);
    const set = new Set(n);

    for (let i = min; i <= max; i++) {
      if (!set.has(i)) return i;
    }

    return null;
  };

  // console.log(solution2([3, 7, 2, 8, 4, 5]));

  /**
   * 배열에서 두 개의 숫자로 특정 합 만들기 (Two Sum 변형)
   * 배열 A와 목표 숫자 K가 주어졌을 때, 배열에서 서로 다른 두 개의 숫자를 더해서 K를 만들 수 있는지 여부를 반환하세요.
   */

  const solution3 = (nums, k) => {
    const set = new Set();
    const result = [];

    for (const n of nums) {
      const diff = k - n;

      if (set.has(diff)) {
        result.push([n, diff]);
      }

      set.add(n);
    }

    return result;
  };

  // console.log(solution3([1, 2, 3, 4, 5], 9));
  // console.log(solution3([1, 2, 4, 7], 10));
  // console.log(solution3([-1, 2, 3, 6], 5));

  /**
   * 배열에서 연속된 가장 긴 숫자 시퀀스 찾기 (Longest Consecutive Sequence)
   */

  const solution4 = (nums) => {
    const set = new Set(nums);
    let result = [];

    for (const value of set) {
      let currValues = value;
      let nextValue = value + 1;

      while (set.has(nextValue)) {
        currValues.push(nextValue);
        nextValue = nextValue + 1;
      }

      if (currValues.length > result.length) {
        result = currValues;
      }
    }

    return result;
  };

  // console.log(solution4([100, 4, 200, 1, 3, 2]));
  // console.log(solution4([9, 1, 4, 7, 3, -1, 0, 5, 8, -2, 6]));

  /**
   *  K번째로 작은 숫자 찾기
   *  배열 A가 주어졌을 때, K번째로 작은 숫자를 반환하세요.
   */

  const solution5 = (nums, k) => {};

  const mergeSort = (arr) => {
    const merge = (arr1, arr2) => {
      const result = [];
      let leftIndex = 0;
      let rightIndex = 0;

      while (leftIndex < arr1.length && rightIndex < arr2.length) {
        if (arr1[leftIndex] < arr2[rightIndex]) {
          result.push(arr1[leftIndex]);
          leftIndex++;
        } else {
          result.push(arr2[rightIndex]);
          rightIndex++;
        }
      }

      while (leftIndex < arr1.length) {
        result.push(arr1[leftIndex]);
        leftIndex++;
      }

      while (rightIndex < arr2.length) {
        result.push(arr2[rightIndex]);
        rightIndex++;
      }

      return result;
    };

    const sort = (arr) => {
      if (arr.length <= 1) return arr;

      const mid = Math.floor(arr.length / 2);
      const leftArray = sort(arr.slice(0, mid));
      const rightArray = sort(arr.slice(mid));

      return merge(leftArray, rightArray);
    };

    return sort(arr);
  };

  // console.log(mergeSort([3, 2, 4, 1, 5, 6, 7, 100, 12, 5]));

  const solution6 = (nums) => {
    // todo
    // 1 hash 기반으로 해당 hasg에 해당 값이 있는지 확인한다.

    const map = new Map();
    const result = [];

    for (const num of nums) {
      if (map.has(num)) {
        result.push(num);
      }

      map.set(num, true);
    }

    return result;
  };

  // console.log(solution6([1, 3, 2, 3, 4, 5, 2, 6, 7, 8, 8]));

  // 배열에서 한 번만 등장한 숫자 찾기
  // 배열 A가 주어졌을 때, 한 번만 등장한 숫자들을 모두 찾아 배열로 반환하는 함수를 작성하세요.

  const solution7 = (nums) => {
    const map = new Map();

    for (const num of nums) {
      if (map.has(num)) {
        map.set(num, map.get(num) + 1);
        continue;
      }

      map.set(num, 1);
    }

    const result = [];
    for (const [num, count] of map) {
      if (count === 1) result.push(num);
    }

    return result;
  };

  console.log(solution7([1, 3, 2, 3, 4, 5, 2, 6, 7, 8, 8])); // [1, 4, 5, 6, 7]
}
