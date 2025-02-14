// https://coding-factory.tistory.com/606
class Node {
  left = null;
  rigth = null;
  count = 1;

  constructor(val) {
    this.val = val;
  }
}

class BST {
  root = null;

  insert(val) {
    const newNodw = new Node(val);
    if (!this.root) {
      this.root = newNodw;
      return this;
    } else {
      let curNode = this.root;
      while (true) {
        if (val < curNode.val) {
          if (!curNode.left) {
            curNode.left = newNodw;
            return this;
          }
          curNode = curNode.left;
        } else if (val > curNode.val) {
          if (!curNode.rigth) {
            curNode.rigth = newNodw;
            return this;
          }
          curNode = curNode.rigth;
        } else {
          curNode.count++;
          return this;
        }
      }
    }
  }

  find(val) {
    let curNode = this.root;
    while (curNode) {
      if (curNode.val === val) return curNode;
      else if (curNode.val > val) curNode = curNode.left;
      else curNode = curNode.rigth;
    }
  }

  // 전위우선순위
  /**
   * 전위 순회
   * 부모노드 -> 왼쪽 자식 노드 -> 오른쪽 자식 노드
   */
  preOrder() {
    const data = [];
    if (!this.root) return data;

    function travers(node) {
      data.push(node.val);
      if (node.left) travers(node.left);
      if (node.rigth) travers(node.rigth);
    }

    travers(this.root);
    return data;
  }

  /**
   * 중위순위
   * 왼쪽 자식 노드  -> 부모노드 -> 오른쪽 자식 노드
   */
  inOrder() {
    const data = [];
    if (!this.root) return data;

    function travers(node) {
      if (node.left) travers(node.left);
      data.push(node.val);
      if (node.rigth) travers(node.rigth);
    }

    travers(this.root);
    return data;
  }

  /**
   * 후위순위
   * 왼쪽 자식 노드 -> 오른쪽 자식 노드 -> 부모노드
   */
  postOrder() {
    const data = [];
    if (!this.root) return data;

    function travers(node) {
      if (node.left) travers(node.left);
      if (node.rigth) travers(node.rigth);
      data.push(node.val);
    }

    travers(this.root);
    return data;
  }
}

//     10
//   6      15
// 3  8   12   17
const tree = new BST();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(12);
tree.insert(17);
// console.log(tree.preOrder());
// console.log(tree.inOrder());
// console.log(tree.postOrder());

// https://rond-o.tistory.com/304
/**
 * 자연수 N이 입력되면 재귀함수를 이용하여 1부터 N까지를 출력하는 프로그램을 작성하세요.
 */
function solution_1(n) {
  if (n === 0) return 0;
  solution_1(n - 1);
  console.log(n);
}

// console.log(solution_1(3));

/**
 * 10진수 N이 입력되면 2진수로 변환하여 출력하는 프로그램을 작성하세요.
 * 단 재귀함수를 이용 해서 출력해야 합니다.
 */
function solution_2(n) {
  if (Math.floor(n / 2) <= 1)
    return Math.floor(n / 2).toString() + (n % 2).toString();
  let answer = solution_2(Math.floor(n / 2));
  return answer.toString() + (n % 2);
}

// console.log(solution_2(27));

/**
 * 자연수 N이 주어지면 1부터 N까지의 원소를 갖는 집합의 부분집합을 모두 출력하는 프로그램 을 작성하세요.
 */
function solution_3(n) {
  const ch = Array.from({ length: n + 1 }).map(() => 0);
  const answer = [];

  function travers(v) {
    if (v === n + 1) {
      let tmp = '';
      for (let i = 1; i <= ch.length; i++) {
        if (ch[i] === 1) tmp += ` ${i}`;
      }
      if (tmp.length) answer.push(tmp.trimStart());
      return;
    }
    ch[v] = 1;
    travers(v + 1);
    ch[v] = 0;
    travers(v + 1);
  }

  travers(1);
  return answer.join('\n');
  //        0
  //    1       1
  //  2   2   2   2
  // 3 3 3 3 3 3 3 3
  // travers(1);
  // return;
}

// console.log(solution_3(3));
/**
 * 철수는 그의 바둑이들을 데리고 시장에 가려고 한다. 그런데 그의 트럭은 C킬로그램 넘게 태 울수가 없다. 철수는 C를 넘지 않으면서 그의 바둑이들을 가장 무겁게 태우고 싶다.
 * N마리의 바둑이와 각 바둑이의 무게 W가 주어지면, 철수가 트럭에 태울 수 있는 가장 무거운 무게를 구하는 프로그램을 작성하세요.
 */
function solution_4(c, n, arr) {
  let max = Number.MIN_SAFE_INTEGER;

  // console.log(copy);
  function travers(l, sum) {
    if (sum > c) return;
    if (l === n) {
      max = Math.max(sum, max);
      return;
    }
    travers(l + 1, sum + arr[l]);
    travers(l + 1, sum);
  }

  travers(0, 0);
  return max;
}

// console.log(solution_4(259, 3, [81, 58, 42]));
/**
 * N개의 원소로 구성된 자연수 집합이 주어지면, 이 집합을 두 개의 부분집합으로 나누었을 때 두 부분집합의 원소의 합이 서로 같은 경우가 존재하면 “YES"를 출력하고, 그렇지 않으면 ”NO"를 출력하는 프로그램을 작성하세요.
 * 둘로 나뉘는 두 부분집합은 서로소 집합이며, 두 부분집합을 합하면 입력으로 주어진 원래의 집합이 되어 합니다.
 */
function solution_5(n, arr) {
  const halfSum = arr.reduce((a, b) => a + b, 0) / 2;
  // console.log(halfSum);
  let answer = 'NO';

  function travers(L, sum) {
    if (answer === 'YES') return;
    if (L === n) {
      if (halfSum === sum) answer = 'YES';
      return;
    }
    travers(L + 1, sum + arr[L]);
    travers(L + 1, sum);
  }

  travers(0, 0);
  return answer;
}

// console.log(solution_5(6, [1, 3, 5, 6, 7, 10]));
function solution_6(n, m, arr) {
  let max = Number.MIN_SAFE_INTEGER;

  function travers(L, sum, time) {
    if (time > m) return;
    if (L === n) {
      console.log('sum', sum, 'time', time);
      max = Math.max(max, sum);
      return;
    }
    travers(L + 1, sum + arr[L][0], time + arr[L][1]);
    travers(L + 1, sum, time);
  }

  travers(0, 0, 0);
  return max;
}

// console.log(
//   solution_6(5, 20, [
//     [10, 5],
//     [25, 12],
//     [15, 8],
//     [6, 3],
//     [7, 4],
//   ]),
// );
/**
 * 1부터 N까지 번호가 적힌 구슬이 있습니다.
 * 이 중 중복을 허락하여 M번을 뽑아 일렬로 나열 하는 방법을 모두 출력합니다.
 */
function solution_7(n, m) {
  const answer = [];
  const oriArr = Array.from({ length: n }).map((_, i) => i + 1);
  // 123   2   3 5
  // 123 123 123 5
  // 123         5
  // 5
  // 5
  // 65
  function travers(L, arr) {
    if (L === m) return answer.push(arr);
    for (let i = 0; i < oriArr.length; i++) {
      travers(L + 1, arr.concat(oriArr[i]));
    }
  }

  travers(0, []);
  console.log(answer.join('\n'));
  console.log(answer.length);
}

// console.log(solution_7(3, 2));

/**
 * 다음과 같이 여러 단위의 동전들이 주어져 있을때 거스름돈을 가장 적은 수의 동전으로 교환 해주려면 어떻게 주면 되는가?
 * 각 단위의 동전은 무한정 쓸 수 있다.
 */
function solution_8(n, k, m) {
  let min = Number.MAX_SAFE_INTEGER;

  function travers(L, sum) {
    if (L > min) return;
    if (sum >= m) {
      if (sum === m) {
        min = Math.min(min, L);
      }
      return;
    }
    for (const x of k) {
      travers(L + 1, sum + x);
    }
  }

  travers(0, 0);
  return min;
}

// console.log(solution_8(3, [1, 2, 5], 15));

/**
 * 순열문제
 * 10이하의 N개의 자연수가 주어지면
 * 이 중 M개를 뽑아 일렬로 나열하는 방법을 모두 출력합 니다.
 */
function solution_9(n, m, arr) {
  const answer = [];
  const ch = Array.from({ length: n }).map(() => 0);
  const tmp = Array.from({ length: m }).map(() => 0);

  function travers(L) {
    if (L === m) return answer.push([...tmp]);

    for (let i = 0; i < arr.length; i++) {
      if (ch[i] === 0) {
        ch[i] = 1;
        tmp[L] = arr[i];
        travers(L + 1);
        ch[i] = 0;
      }
    }
  }

  travers(0);
  console.log(answer);
}

// console.log(solution_9(3, 3, [3, 6, 9]));

function solution_10(n) {
  if (n === 1) return 1;
  return n * solution_10(n - 1);
}

// console.log(solution_10(3));
/**
 * 조합
 * nCr = n!/(n-r)!r!
 * 4C3 => 4! / 1!3!
 * 24/6
 */

function combination(n, r) {
  if (n === r || r === 0) return 1;
  // 뽑히는 경우와 뽑히지 않는경우를 더한다.
  return combination(n - 1, r - 1) + combination(n - 1, r);
}

// console.log(combination(5, 3));
/**
 * N개의 정수가 주어지면 그 숫자들 중 K개를 뽑는 조합의 합이
 * 임의의 정수 M의 배수인 개수 는 몇 개가 있는지 출력하는 프로그램을 작성하세요.
 */
// 123  3c2
//  6/2
// 12 13 23
function solution_11(n, k, arr, m) {
  // const ch = Array.from({ length: n }).map(() => 0);
  let answer = [];
  const tmp = Array.from({ length: k });

  function travers(L, index) {
    console.log(tmp);
    if (L === k) {
      if (tmp.reduce((a, b) => a + b, 0) % m === 0) answer.push(tmp.slice());
      return;
    }
    for (let i = index; i < arr.length; i++) {
      tmp[L] = arr[i];
      travers(L + 1, i + 1);
    }
  }

  travers(0, 0);
  return answer;
}

// console.log(solution_11(5, 3, [2, 4, 5, 8, 12], 6));

/**
 * 가장 윗줄에 1부터 N까지의 숫자가 한 개씩 적혀 있다.
 * 그리고 둘째 줄부터 차례대로 파스칼 의 삼각형처럼 위의 두개를 더한 값이 저장되게 된다.
 * 예를 들어 N이 4 이고 가장 윗 줄에 3 1 2 4 가 있다고 했을 때, 다음과 같은 삼각형이 그려진다.
 3 1 2 4
 4 3 6
 7 9
 16
 */
function solution_12(n, f) {
  // 4c2
  function makeCombiArr(arr) {
    function combination(N, R) {
      if (N === R || R === 0) return 1;
      return combination(N - 1, R - 1) + combination(N - 1, R);
    }

    for (let i = 0; i < n; i++) {
      arr[i] = combination(n - 1, i);
    }
    return arr;
  }

  // console.log(combiArr);
  const combiArr = makeCombiArr(Array.from({ length: n }).fill(0));
  // 체크배열
  const ch = Array.from({ length: n }).fill(0);
  // 사용배열
  const tmp = Array.from({ length: n }).fill(0);
  // 입력값
  const arr = Array.from({ length: n }).map((_, i) => i + 1);
  let flage = false;
  // 1,2,3,4
  console.log('combiArr', combiArr);

  function travers(L) {
    // if (flage) return;
    if (L === n) {
      let sum = 0;
      for (let i = 0; i < tmp.length; i++) {
        sum += tmp[i] * combiArr[i];
      }
      if (sum === f) flage = tree;
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (ch[i] === 0 && !flage) {
        ch[i] = 1;
        tmp[L] = arr[i];
        travers(L + 1);
        ch[i] = 0;
      }
    }
  }

  travers(0);
  return tmp;
}

// console.log(solution_12(4, 16));
/**
 * 조합구하기
 * 1부터 N까지 번호가 적힌 구슬이 있습니다.
 * 이중 M개를 뽑는 방법의수를 출력하는프로그램을 작성하세요.
 */
function solution_13(n, m) {
  const answer = [];
  const tmp = [];

  function travers(L, s) {
    if (L === m) {
      console.log(tmp);
      answer.push(tmp.slice());
      return;
    }
    for (let i = s; i <= n; i++) {
      tmp[L] = i;
      travers(L + 1, i + 1);
    }
  }

  travers(0, 1);
  console.log(answer);
}

console.log(solution_13(4, 2));
