// 한루프에서 최소값을 구한후 루프가 끝나면 교환한다.
function selectionSort(arr) {
  const swap = (i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };
  let minIndex;
  for (let i = 0; i < arr.length - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) minIndex = j;
    }
    if (i !== minIndex) swap(i, minIndex);
  }
  return arr;
}
// console.log(selectionSort([13, 5, 11, 7, 23, 15, 1]));
function bubbleSort(arr) {
  const swap = (i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };
  for (let i = arr.length; 0 < i; i--) {
    let isSwap = false;
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(j, j + 1);
        isSwap = true;
      }
    }
    if (!isSwap) break;
  }
  return arr;
}
// console.log(bubbleSort([13, 5, 11, 7, 23, 15, 1]));
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const selectedValue = arr[i];
    let lastJindex;
    for (let j = i - 1; j >= 0; j--) {
      if (selectedValue > arr[j]) break;
      else {
        arr[j + 1] = arr[j];
        lastJindex = j;
      }
    }
    if (lastJindex >= 0) arr[lastJindex] = selectedValue;
  }
  return arr;
}
// console.log(insertionSort([13, 5, 1, 7, 23, 15, 1]));
function mergeSort(arr) {
  function merge(arr1, arr2) {
    const arr = [];
    let i = 0,
      j = 0;

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] < arr2[j]) {
        arr.push(arr1[i]);
        i++;
      } else {
        arr.push(arr2[j]);
        j++;
      }
    }
    while (i < arr1.length) {
      arr.push(arr1[i]);
      i++;
    }
    while (j < arr2.length) {
      arr.push(arr2[j]);
      j++;
    }
    return arr;
  }
  function sort(arr) {
    if (arr.length <= 1) return arr;
    const middle = Math.floor(arr.length / 2);
    const left = sort(arr.slice(0, middle));
    const rigth = sort(arr.slice(middle));
    return merge(left, rigth);
  }
  return sort(arr);
}
// console.log(mergeSort([13, 5, 1, 7, 23, 15, 1]));

/**
 * N개의 정수가 입력되면 당신은 입력된 값을 정렬해야 한다.
 * 음의 정수는 앞쪽에 양의정수는 뒷쪽에 있어야 한다. 또한 양의정수와 음의정수의 순서에는 변함이 없어야 한다.
 *
 */
function specialmergeSort(arr) {
  function merge(arr1, arr2) {
    const arr = [];
    let i = 0,
      j = 0;

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] < 0 && arr2[j] < 0) {
        if (arr1[i] < arr2[j]) {
          arr.push(arr1[i]);
          i++;
        } else {
          arr.push(arr2[j]);
          j++;
        }
      } else {
        if (arr1[i] < arr2[j]) {
          arr.push(arr1[i]);
          i++;
        } else {
          arr.push(arr2[j]);
          j++;
        }
      }
    }
    while (i < arr1.length) {
      arr.push(arr1[i]);
      i++;
    }
    while (j < arr2.length) {
      arr.push(arr2[j]);
      j++;
    }
    return arr;
  }
  function sort(arr) {
    if (arr.length <= 1) return arr;
    const middle = Math.floor(arr.length / 2);
    const left = sort(arr.slice(0, middle));
    const rigth = sort(arr.slice(middle));
    return merge(left, rigth);
  }
  return sort(arr);
}
// console.log(specialmergeSort([1, 2, 3, -3, -2, 5, 6, -6]));

/**
 * N개의 평면상의 좌표(x, y)가 주어지면 모든 좌표를 오름차순으로 정렬하는 프로그램을 작성하 세요.
 * 정렬기준은 먼저 x값의 의해서 정렬하고, x값이 같을 경우 y값에 의해 정렬합니다
 */

function solution_1(arr) {
  arr.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    return a[0] - b[0];
  });
  return arr;
}
// console.log(
//   solution_1([
//     [2, 7],
//     [1, 3],
//     [1, 2],
//     [2, 5],
//     [3, 6],
//   ]),
// );

/**
 * Least Recently Used
 */
function solution_2(s, n, move = [1, 2, 3, 2, 6, 2, 3, 5, 7]) {
  const memory = Array.from({ length: s }).map(() => 0);
  for (const x of move) {
    const index = memory.indexOf(x);
    if (index != -1) {
      const element = memory[index];
      for (let i = index - 1; i >= 0; i--) {
        memory[i + 1] = memory[i];
      }
      memory[0] = element;
    } else {
      memory.pop();
      memory.unshift(x);
    }
    console.log(memory);
  }
  return memory;
}
// console.log(solution_2(5, 9));s

/**
 * 배열내 장렬에서 잘못된 index찾기
 */
function solution_3(n, arr = [120, 125, 152, 130, 135, 135, 143, 127, 160]) {
  let answer = [];
  const oriArr = [...arr].sort((a, b) => a - b);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== oriArr[i]) answer.push(i + 1);
  }
  return answer.join(' ');
}
// console.log(solution_3());

function solution_4(
  arr = [
    [1, 4],
    [2, 3],
    [3, 5],
    [4, 6],
    [5, 7],
    // [2, 2],
  ],
) {
  arr.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    return a[0] - b[0];
  });
  let max = 0;
  console.log(arr);
  for (let i = 0; i < arr.length - 1; i++) {
    let cnt = 1;
    let endTime = arr[i][1];
    let j = i + 1;
    while (j < arr.length) {
      if (endTime <= arr[j][0]) {
        // console.log('i', i, arr[j][0]);
        endTime = arr[j][1];
        cnt++;
      }
      j++;
    }
    max = Math.max(max, cnt);
  }
  return max;
}
/**
 * 탐욕알고리즘
 */
function solution_4_1(arr) {
  arr.sort((a, b) => {
    if (a[1] === b[1]) return a[0] - b[0];
    return a[1] - b[1];
  });

  let answer = 0;
  let endTime = 0;
  for (const x of arr) {
    if (endTime <= x[0]) {
      endTime = x[1];
      answer++;
    }
  }
  return answer;
}
// console.log(
//   solution_4_1([
//     [3, 3],
//     [1, 3],
//     [5, 7],
//   ]),
// );

function solution_5(arr) {
  let answer = Number.MIN_SAFE_INTEGER;
  let cnt = 0;
  const tiemLine = [];
  for (const x of arr) {
    tiemLine.push([x[0], 's']);
    tiemLine.push([x[1], 'e']);
  }
  tiemLine.sort((a, b) => {
    if (a[0] === b[0]) return a[1].charCodeAt() - b[1].charCodeAt();
    return a[0] - b[0];
  });

  for (const x of tiemLine) {
    const timeMark = x[1];
    if (timeMark === 's') cnt++;
    else cnt--;
    answer = Math.max(answer, cnt);
  }
  return answer;
}

// console.log(
//   solution_5([
//     [14, 18],
//     [12, 15],
//     [15, 20],
//     [20, 30],
//     [5, 14],
//   ]),
// );

/**
 * 임의의 N개의 숫자가 입력으로 주어집니다. N개의 수를 오름차순으로 정렬한 다음 N개의 수 중
 * 한 개의 수인 M이 주어지면 이분검색으로 M이 정렬된 상태에서 몇 번째에 있는지
 * 구하는 프로그램을 작성하세요. 단 중복값은 존재하지 않습니다.
 */
function solution_6(arr, m) {
  arr.sort((a, b) => a - b);

  let answer;
  let lt = 0;
  let rt = arr.length - 1;
  let middle, curValue;

  while (lt <= rt) {
    middle = Math.floor((lt + rt) / 2);
    curValue = arr[middle];
    if (curValue === m) return middle;
    else if (curValue > m) rt = middle - 1;
    else lt = middle + 1;
  }
  // return middle;
}
// console.log(solution_6([23, 87, 65, 12, 57, 32, 99, 81], 32));

// 결정알고리즘
function solution_7(m, arr) {
  let lt = arr[arr.length - 1];
  let rt = arr.reduce((curr, prev) => curr + prev, 0);
  let middle, answer;

  while (lt <= rt) {
    middle = Math.floor((lt + rt) / 2);
    let cnt = 1;
    let sum = 0;
    for (const x of arr) {
      if (sum + x > middle) {
        cnt++;
        sum = x;
      } else sum += x;
    }

    if (cnt <= m) {
      answer = middle;
      rt = middle - 1;
    } else lt = middle + 1;
  }
  return answer;
}
// console.log(solution_7(3, [1, 2, 3, 4, 5, 6, 7, 8, 9]));

/**
 * C마리의 말을 N개의 마구간에 배치했을 때 가장 가까운 두 말의 거리가 최대가 되는 그 최대 값을 출력하는 프로그램을 작성하세요.
 * 첫 줄에 자연수 N(3<=N<=200,000)과 C(2<=C<=N)이 공백을 사이에 두고 주어집니다.
 * 둘째 줄에 마구간의 좌표 xi(0<=xi<=1,000,000,000)가 차례로 주어집니다.
 */
function solution_8(c, arr) {
  arr.sort((a, b) => a - b);
  let lt = 1;
  let rt = Math.max(...arr);
  let answer, middle;
  while (lt <= rt) {
    middle = Math.floor((lt + rt) / 2);
    let cnt = 1;
    let curX;
    for (const x of arr) {
      if (curX == null) curX = x;
      if (x - curX >= middle) {
        cnt++;
        curX = x;
      }
    }
    // console.log('cnt', cnt, 'm', middle);
    if (cnt >= c) {
      answer = middle;
      lt = middle + 1;
    } else rt = middle - 1;
  }
  return answer;
}
console.log(solution_8(3, [1, 2, 8, 4, 9]));
