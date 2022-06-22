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
      if (j === arr.length - 1 && i !== minIndex) {
        swap(arr, i, minIndex);
      }
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
      console.log(arr);
    }
    if (lastJ >= 0) arr[lastJ] = curV;
  }
  return arr;
}
console.log(insertionSort([1, 2, 3, 0]));
1, 2, 0, 3;
