function jsSort(arr) {
  // 올림차순
  // -(음수)를 반환하면 a,b
  console.log(arr.sort((a, b) => a - b));
  // 내림차순
  // +(양수)를 반환하면 b,a
  console.log(arr.sort((a, b) => b - a));
}

function bubbleSort(arr) {
  function swap(arr, inx1, inx2) {
    let temp = arr[inx1];
    arr[inx1] = arr[inx2];
    arr[inx2] = temp;
  }
  for (let i = arr.length; i >= 1; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) swap(arr, j, j + 1);
    }
  }
  return arr;
}

function refactBubbleSort(arr) {
  function swap(arr, inx1, inx2) {
    let temp = arr[inx1];
    arr[inx1] = arr[inx2];
    arr[inx2] = temp;
  }
  // 비교를 수행할 횟수.
  for (let i = arr.length; i > 0; i--) {
    // 현재루프에서 스왑을 하고있는지 확인.
    let isSwap = true;
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        isSwap = false;
      }
    }
    if (isSwap) {
      break;
    }
  }
  return arr;
}
// console.log(refactBubbleSort([1, 2, 3, 5, 6, 3]));

function selectionSort(arr) {
  function swap(arr, inx1, inx2) {
    const temp = arr[inx1];
    arr[inx1] = arr[inx2];
    arr[inx2] = temp;
  }

  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) minIndex = j;
    }
    if (i !== minIndex) {
      swap(arr, i, minIndex);
    }
  }
  return arr;
}
// console.log(selectionSort([4, 1, 2, 3]));

function insertionSort(arr) {
  function swap(arr, idx1, idx2) {
    const temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
  }

  for (let i = 1; i < arr.length; i++) {
    const curV = arr[i];
    let lastJ;
    // 순서를 바꿔야 하는 조건
    for (let j = i - 1; j >= 0 && arr[j] > curV; j--) {
      arr[j + 1] = arr[j];
      lastJ = j;
    }
    if (lastJ >= 0) arr[lastJ] = curV;
  }
  return arr;
}
// console.log(insertionSort([1, 0, 1, 2, 3, 0]));
// 1, 2, 0, 3;

function mergeSort(arr) {
  function merge(arr1, arr2) {
    let i = 0,
      j = 0,
      newArr = [];

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] < arr2[j]) {
        newArr.push(arr1[i]);
        i++;
      } else {
        newArr.push(arr2[j]);
        j++;
      }
    }
    while (i < arr1.length) {
      newArr.push(arr1[i]);
      i++;
    }
    while (j < arr2.length) {
      newArr.push(arr2[j]);
      j++;
    }

    return newArr;
  }

  function sort(arr) {
    if (arr.length <= 1) return arr;
    const middle = Math.floor(arr.length / 2);
    const left = sort(arr.slice(0, middle));
    const right = sort(arr.slice(middle));
    return merge(left, right);
  }
  return sort(arr);
}
// console.log(mergeSort([1, 0, 1, 2, 3, 0]));
function refactMergeSort(arr) {
  function merge(arr1, arr2) {
    let i = 0,
      j = 0,
      newArr = [];

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] < arr2[j]) {
        newArr.push(arr1[i]);
        i++;
      } else {
        newArr.push(arr2[j]);
        j++;
      }
    }
    while (i < arr1.length) {
      newArr.push(arr1[i]);
      i++;
    }
    while (j < arr2.length) {
      newArr.push(arr2[j]);
      j++;
    }
    return newArr;
  }

  function splitArr(arr) {
    // console.log(arr);
    if (arr.length <= 1) return arr;
    const middle = Math.floor(arr.length / 2);
    const left = splitArr(arr.slice(0, middle));
    const right = splitArr(arr.slice(middle));
    return merge(left, right);
  }
  return splitArr(arr);
}
// console.log(refactMergeSort([1, 0, 1, 2]));
function quickSort(arr) {
  function refactQuickSort(arr) {
    function swap(arr, i, j) {
      if (i === j) return;
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    function pivot(arr) {
      if (arr.length <= 1) return arr;
      const selectedPivot = arr[0];
      let index = 0;
      for (let i = 1; i < arr.length; i++) {
        // 피벗값보다 작은면 왼쪽
        // 아니면 오른쪽으로 배열을 정렬하자
        if (arr[i] < selectedPivot) {
          arr[index] = arr[i];
          arr[i] = arr[index + 1];
          index++;
        }
      }
      arr[index] = selectedPivot;
      return index;
    }
    pivot([5, 1, 7, 9, 1]);
  }

  function pivot(arr, start, end) {
    const selectedPivot = arr[start];
    // 피봇의 index, 피봇값의 자리
    let swapIdx = start;
    for (let i = start + 1; i <= end; i++) {
      if (selectedPivot > arr[i]) {
        swapIdx++;
        swap(arr, swapIdx, i);
      }
    }
    swap(arr, start, swapIdx);
    return swapIdx;
  }

  function main(arr, left, right) {
    if (left < right) {
      let pivotIndex = pivot(arr, left, right);
      main(arr, left, pivotIndex - 1);
      main(arr, pivotIndex + 1, right);
    }
    return arr;
  }
  main(arr, 0, arr.length - 1);
  return arr;
}

function qsort(arr) {
  function swap(arr, i, j) {
    if (i === j) return;
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  function pivot(arr, start, end) {
    let middle = Math.floor((start + end) / 2);
    const curPivot = arr[middle];
    let index = middle;
    for (let i = start; i <= end; i++) {
      if (i < middle && arr[i] > curPivot) {
        index--;
        swap(arr, index, i);
      } else if (i > middle && arr[i] < curPivot) {
        index++;
        swap(arr, index, i);
      } else if (i === middle) {
        swap(arr, middle, index);
        // 현재 인덱스
        middle = index;
      }
    }
    swap(arr, middle, index);
    return index;
  }

  function main(arr, left, right) {
    if (left < right) {
      let pivotIndex = pivot(arr, left, right);
      console.log('pivotIndex', pivotIndex);
      main(arr, left, pivotIndex - 1);
      main(arr, pivotIndex + 1, right);
    }
    return arr;
  }
  main(arr, 0, arr.length - 1);
  return arr;
}

// console.clear();
// console.log(qsort([1, 5, 3, 4, 5, 1, 3, 12, 312, 31]));

function radixSort(arr) {
  // 수와 자릿수를 입력받아
  // 해당 자릿수의 수를 리턴해주는 함수
  function getDigit(num, digit) {
    return Math.floor((Math.abs(num) / 10 ** digit) % 10);
  }
  function getMaxCnt(arr) {
    let max = 0;
    // 해당수가 몇의 자리수인지 구한다.
    function digitCount(num) {
      if (num === 0) return 1;
      return Math.floor(Math.log10(Math.abs(num)) + 1);
      // return num.toString().length;
    }
    arr.forEach((i) => {
      const cnt = digitCount(i);
      if (cnt > max) max = cnt;
    });
    return max;
  }
  const maxCnt = getMaxCnt(arr);
  // const cnt
  for (let i = 0; i < maxCnt; i++) {
    const buffer = Array.from({ length: 10 }, () => []);
    for (let j = 0; j < arr.length; j++) {
      const digit = getDigit(arr[j], i);
      buffer[digit].push(arr[j]);
    }
    arr = [].concat(...buffer);
  }
  return arr;
}
radixSort([1, 321, 12, 5, 3, 27, 1]);

function rSort(arr) {
  const getDigit = (nums, digit) =>
    Math.floor((Math.abs(nums) / 10 ** digit) % 10);

  const getMaxCnt = (arr) => {
    let max = 0;
    const getNumsLen = (num) => num.toString().length;
    arr.forEach((v) => {
      const curVLen = getNumsLen(v);
      if (curVLen > max) max = curVLen;
    });
    return max;
  };

  // 최대 자릿수
  const maxCnt = getMaxCnt(arr);
  for (let k = 0; k < maxCnt; k++) {
    const buffer = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < arr.length; i++) {
      const digit = getDigit(arr[i], k);
      buffer[digit].push(arr[i]);
    }
    // flatten
    arr = [].concat(...buffer);
  }
  console.log(arr);
  return arr;
}

rSort([3, 1, 3, 41, 312]);
