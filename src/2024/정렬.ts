import { cloneDeep } from 'lodash';

export default {};

const swapArrayIndex = (
  arr: number[],
  originalIndex: number,
  targetIndex: number,
) => {
  const temp = arr[originalIndex];
  arr[originalIndex] = arr[targetIndex];
  arr[targetIndex] = temp;
};

// 선택정렬
const selectionSort = (arr: number[]): number[] => {
  const copy = cloneDeep(arr);

  for (let i = 0; i < copy.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < copy.length; j++) {
      if (copy[j] < copy[minIndex]) minIndex = j;
    }

    if (minIndex !== i) swapArrayIndex(copy, i, minIndex);
  }
  return copy;
};

// console.log(selectionSort([13, 5, 11, 7, 23, 15]));

// 버블정렬
const bubbleSort = (arr: number[]): number[] => {
  const copy = cloneDeep(arr);
  const size = copy.length;

  // 자릿수 만큼 반복
  for (let i = 0; i < size; i++) {
    let isSwap = false;
    for (let j = 1; j < size - 1; j++) {
      if (copy[j] < copy[j - 1]) {
        isSwap = true;
        swapArrayIndex(copy, j, j - 1);
      }
    }
    if (!isSwap) break;
  }

  return copy;
};

// console.log(bubbleSort([13, 5, 11, 7, 23, 15]));
// 5 13 11
const insertionSort = (arr: number[]): number[] => {
  for (let i = 1; i < arr.length; i++) {
    const selectedValue = arr[i];
    let j = i - 1;

    while (0 <= j && selectedValue < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = selectedValue;
  }

  return arr;
};

console.log(insertionSort([1, 2, 34, 13, 1, 3, 5, 11, 7, 23, 15, 6]));

const mergeSort = (arr: number[]): number[] => {
  const merge = (left: number[], right: number[]) => {
    const leftPush = () => {
      sorted.push(left[leftIndex]);
      leftIndex++;
    };

    const rightPush = () => {
      sorted.push(right[rightIndex]);
      rightIndex++;
    };

    const sorted: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        leftPush();
      } else {
        rightPush();
      }
    }

    while (leftIndex < left.length) {
      leftPush();
    }

    while (rightIndex < right.length) {
      rightPush();
    }

    return sorted;
  };

  const sort = (arr: number[]): number[] => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = sort(arr.slice(0, mid));
    const right = sort(arr.slice(mid));

    return merge(left, right);
  };

  return sort(arr);
};

// console.log(mergeSort([13, 5, 11, 7, 23, 15]));
