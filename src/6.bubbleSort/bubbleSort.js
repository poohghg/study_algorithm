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
    console.log(i);
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
    // swap할 요소가 없다면
    let isSwap = true;
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        isSwap = false;
      }
    }
    console.log(' i', i);
    console.log('_________________');
    console.log(arr);
    if (isSwap) {
      break;
    }
  }
  // return arr;
}
console.clear();
console.log(refactBubbleSort([1, 2, 3, 5, 6, 3]));
