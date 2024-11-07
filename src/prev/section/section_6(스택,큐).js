class Node {
  #next = null;
  #val;
  constructor(val) {
    this.#val = val;
  }

  get val() {
    return this.#val;
  }
  set val(value) {
    if (value == null) return;
    this.#val = value;
  }
  get next() {
    return this.#next;
  }
  set next(node) {
    if (!node instanceof Node) throw Error('node변수의 타입을 확인하세요');
    this.#next = node;
  }
}
class Stack {
  #first;
  #last;
  #size = 0;

  get size() {
    return this.#size;
  }

  push(val) {
    const newNode = new Node(val);
    if (!this.#first) {
      this.#first = newNode;
      this.#last = newNode;
    } else {
      newNode.next = this.#first;
      this.#first = newNode;
    }
    this.#size++;
  }

  pop() {
    if (!this.#first) return;
    const popNode = this.#first;
    if (this.#size === 1) this.#last = null;
    this.#first = popNode.next;
    this.#size--;
    return popNode.val;
  }

  get(index) {
    if (index >= this.#size || isNaN(index)) return;
    let cnt = 0;
    let node = this.#first;
    while (true) {
      if (cnt === index) return node.val;
      node = node.next;
      cnt++;
    }
  }
}
// const stack = new Stack();

/**
 * 괄호가 입력되면 올바른 괄호이면 “YES", 올바르지 않으면 ”NO"를 출력합니다.
 * (())() 이것은 괄호의 쌍이 올바르게 위치하는 거지만, (()()))은 올바른 괄호가 아니다.
 */
function solution_1(str) {
  if (str.length % 2 !== 0) return false;
  const stack = new Stack();
  for (let i = 0; i < str.length; i++) {
    const element = str[i];
    if (element === '(') stack.push(element);
    else if (element === ')') {
      if (stack.pop() === undefined) return false;
    } else return false;
  }
  return stack.size === 0 ? true : false;
}

// console.log(solution_1('(())()()'));
// console.log(solution_1('()))'));

/**
 * 입력된 문자열에서 소괄호 ( ) 사이에 존재하는 모든 문자를 제거하고
 * 남은 문자만 출력하는 프로그램을 작성하세요.
 */
function solution_2(str) {
  let answer = '';
  const stack = new Stack();
  for (let i = 0; i < str.length; i++) {
    const element = str[i];
    if (element === '(') stack.push(element);
    else if (element === ')') stack.pop();
    else if (stack.size === 0) answer += element;
  }
  return answer;
}
// console.log(solution_2('(A(BC)D)EF(G(H)(IJ)K)LM(N)(123))()123'));

function solution_3(arr, moves) {
  let answer = 0;
  const stack = new Stack();
  for (const pos of moves) {
    const col = pos - 1;
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i][col];
      if (element === 0) continue;
      else {
        if (element === stack.get(0)) {
          stack.pop();
          answer += 2;
        } else {
          stack.push(element);
        }
        arr[i][col] = 0;
        break;
      }
    }
  }
  return answer;
}
// console.log(
//   solution_3(
//     [
//       [0, 0, 0, 0, 0],
//       [0, 0, 1, 0, 3],
//       [0, 2, 5, 0, 1],
//       [4, 2, 4, 4, 2],
//       [3, 5, 1, 3, 1],
//     ],
//     [1, 5, 3, 5, 1, 2, 1, 4],
//   ),
// );

/**
 * 후위표기법
 * 연산자를 만나면 앞두수를 연산한다.
 * https://velog.io/@bn-tw/%ED%9B%84%EC%9C%84%ED%91%9C%EA%B8%B0%EB%B2%95Postfix-expression-%EA%B3%84%EC%82%B0%EB%B2%95
 * 후위연산식이 주어지면 연산한 결과를 출력하는 프로그램을 작성하세요.
 * 만약 3*(5+2)-9 을 후위연산식으로 표현하면 352+*9- 로 표현되며 그 결과는 12입니다.
 */
function solution_4(str) {
  const stack = new Stack();
  let lt, rt, temp;
  for (let i = 0; i < str.length; i++) {
    const element = str[i];
    if (!isNaN(element)) stack.push(Number(element));
    else {
      rt = stack.pop();
      lt = stack.pop();
      switch (element) {
        case '+':
          temp = lt + rt;
          break;
        case '-':
          temp = lt - rt;
          break;
        case '*':
          temp = lt * rt;
          break;
        case ' /':
          temp = lt / rt;
          break;
        default:
          break;
      }
      stack.push(Number(temp));
    }
  }
  return stack.pop();
}

// console.log(solution_4('352+*9-'));

/**
 * 쇠파이프 절단문제
 */
function solution_5(s) {
  const stack = new Stack();
  let answer = 0;
  for (let i = 0; i < s.length; i++) {
    const element = s[i];
    if (element === '(') {
      stack.push(element);
    } else {
      stack.pop();
      // 레이저일 경우
      if (s[i - 1] === '(') answer += stack.size;
      // 마지막 조각
      else answer += 1;
    }
  }
  return answer;
}
// console.log(solution_5('()(((()())(())()))(())'));
/**
 * 큐 순회
 * @returns
 */
function solution_6(n, k) {
  const s = Array.from({ length: n }).map((_, index) => index + 1);
  // let cnt = 1;
  while (true) {
    for (let i = 1; i < k; i++) {
      s.push(s.shift());
    }
    s.shift();
    if (s.length === 1) return s[0];

    // const element = s.shift();
    // if (cnt === k) {
    //   cnt = 1;
    // } else {
    //   s.push(element);
    //   cnt++;
    // }
  }
}
// console.log(solution_6(8, 3));

/**
 * 수업섥계문제
 */

function solution_7(sub, str) {
  const subArr = Array.from(sub);
  for (let i = 0; i < str.length; i++) {
    const element = str[i];
    if (subArr.includes(element)) {
      if (element !== subArr.shift()) return false;
      if (subArr.length === 0) return true;
    }
  }
  return false;
}
console.log(solution_7('CBA', 'CABA'));
// console.log(solution_7('CBA', 'CBDBGAE'));

//
