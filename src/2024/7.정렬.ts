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

// console.log(insertionSort([1, 2, 34, 13, 1, 3, 5, 11, 7, 23, 15, 6]));

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

/**
 * 새 학기가 시작되었습니다. 현수는 새 짝꿍을 만나 너무 신이 났습니다.
 * 현수네 반에는 N명의 학생들이 있습니다.
 * 선생님은 반 학생들에게 반 번호를 정해 주기 위해 운동장에 반 학생들을 키가 가장 작은 학 생부터 일렬로 키순으로 세웠습니다. 제일 앞에 가장 작은 학생부터 반 번호를 1번부터 N번까 지 부여합니다. 현수는 짝꿍보다 키가 큽니다. 그런데 현수가 앞 번호를 받고 싶어 짝꿍과 자 리를 바꿨습니다. 선생님은 이 사실을 모르고 학생들에게 서있는 순서대로 번호를 부여했습니 다.
 * 현수와 짝꿍이 자리를 바꾼 반 학생들의 일렬로 서있는 키 정보가 주어질 때 현수가 받은 번 호와 현수 짝꿍이 받은 번호를 차례로 출력하는 프로그램을 작성하세요.
 */

const solution1 = (arr: number[]): number[] => {
  const sorted = arr.slice().sort((a, b) => a - b);

  return arr.reduce<number[]>((acc, curr, index) => {
    if (curr !== sorted[index]) {
      acc.push(index + 1);
    }
    return acc;
  }, []);
};

// console.log(solution1([120, 130, 150, 150, 130, 150]));

/**
 * N개의 평면상의 좌표(x, y)가 주어지면 모든 좌표를 오름차순으로 정렬하는 프로그램을 작성하 세요. 정렬기준은 먼저 x값의 의해서 정렬하고, x값이 같을 경우 y값에 의해 정렬합니다.
 */
const solution2 = (arr: [number, number][]) => {
  return arr.slice().sort(([x1, y1], [x2, y2]) => {
    return x1 === x2 ? y1 - y2 : x1 - x2;
  });
};

// console.log(
//   solution2([
//     [2, 7],
//     [1, 3],
//     [1, 2],
//     [2, 5],
//     [3, 6],
//   ]),
// );
s;
