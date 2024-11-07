function linearSearch(arr, num) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === num) return i;
  }
  return -1;
}
// console.log(linearSearch([100, 20, 51, 31, 22], 22));

function binarySearch(arr, num) {
  if (arr.length === 0) return -1;
  let start = 0;
  // 배열의 범위를 벗어날수 있다.
  let end = arr.length - 1;
  while (start <= end) {
    // 일관된 방식을 사용만 하면됨.
    let middle = Math.floor((start + end) / 2);
    if (num > arr[middle]) {
      start = middle + 1;
    } else if (num < arr[middle]) {
      end = middle - 1;
    } else {
      return middle;
    }
  }
  return -1;
}
// console.log(binarySearch([5, 6, 8], 8));

function naiveSearch(long, short) {
  let answer = 0;
  for (let i = 0; i < long.length; i++) {
    for (let j = 0; j < short.length; j++) {
      if (short[j] !== long[i + j]) break;
      if (j === short.length - 1) answer++;
    }
  }
  return answer;
}

console.log(naiveSearch('tt agtagttqasgtaggtag', 'tag'));
