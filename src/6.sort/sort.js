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
    while (newArr.length < arr1.length + arr2.length) {
      if (i < arr1.length && arr1[i] < (arr2[j] || arr2[j - 1])) {
        newArr.push(arr1[i]);
        i++;
      } else if (j < arr2.length && arr2[j] < (arr1[i] || arr1[i - 1])) {
        newArr.push(arr1[j]);
        j++;
      } else {
        if (i < arr1.length) {
          newArr.push(arr1[i]);
          i++;
        } else if (j < arr2.length) {
          newArr.push(arr2[j]);
          j++;
        }
      }
      // console.log('i', i);
      // console.log('j', j);
    }
    console.log(newArr);
    return newArr;
  }

  // while (condition) {}
  // }
  merge([1, 3, 4], [2, 5, 6, 10, 15, 19]);
  return null;
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
    console.log(arr);
    if (arr.length <= 1) return arr;
    const middle = Math.floor(arr.length) / 2;
    const left = splitArr(arr.slice(0, middle));
    const right = splitArr(arr.slice(middle));
    return merge(left, right);
  }
  return splitArr(arr);
}
console.log(refactMergeSort([1, 0, 1, 2]));
