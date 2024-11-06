// 버블정렬
// 올림차순
const arr = [3, 4, 1, 2, 199, 31, 11, 31];

// 버블정렬
function bubbleSort(arr) {
  // 제외될 원소의 갯수를 의미합니다. 1회전이 끝난 후, 배열의 마지막 위치에는 가장 큰 원소가 위치하기 때문에 하나씩 증가시켜줍니다.
  for (let i = 0; i < arr.length; i++) {
    let isSwap = false;
    // 소를 비교할 index를 뽑을 반복문입니다. j는 현재 원소를 가리키고, j-1은 이전 원소를 가리키게 되므로, j는 1부터 시작하게 됩니다.
    for (let j = 1; j < arr.length - i; j++) {
      if (arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
        isSwap = true;
      }
    }
    if (!isSwap) break;
  }
  return arr;
}
// console.log(bubbleSort(arr));

// 선택정렬
function selectionSort(arr) {
  // 현재 최소값의 자리
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}
console.log(selectionSort(arr));

// 합병정렬
function mergeSort(arr) {
  const merge = (arr1, arr2) => {
    const newArr = [];
    let i = 0,
      j = 0;

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] < arr2[j]) newArr.push(arr1[i++]);
      else newArr.push(arr2[j++]);
    }

    while (i < arr1.length) newArr.push(arr1[i++]);
    while (j < arr2.length) newArr.push(arr2[j++]);
    return newArr;
  };

  const sort = (arr) => {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const l = sort(arr.slice(0, mid));
    const r = sort(arr.slice(mid));
    return merge(l, r);
  };
  return sort(arr);
}
// console.log(mergeSort(arr));
