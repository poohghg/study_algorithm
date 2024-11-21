export {};

/**
 * 스택
 * 괄호가 입력되면 올바른 괄호이면 “YES", 올바르지 않으면 ”NO"를 출력합니다.
 * (())() 이것은 괄호의 쌍이 올바르게 위치하는 거지만, (()()))은 올바른 괄호가 아니다.
 */
const solution1 = (str: string) => {
  const stack: string[] = [];

  for (const s of str) {
    if (s === '(') stack.push(s);
    else {
      if (stack.length) return false;
      stack.pop();
    }
  }

  return stack.length === 0;
};

// console.log(solution1('(()(()))(()'));

/**
 * 입력된 문자열에서 소괄호 ( ) 사이에 존재하는 모든 문자를 제거하고 남은 문자만 출력하는 프로그램을 작성하세요.
 */

const solution2 = (str: string) => {
  const stack: string[] = [];

  for (const s of str) {
    if (s !== ')') {
      stack.push(s);
      continue;
    }

    let top: string | undefined = stack.pop();
    while (stack.length && top !== '(') {
      top = stack.pop();
    }
  }

  return stack.join('');
};

// console.log(solution2('(A(BC)D)EF(G(H)(IJ)K)LM(N)'));

/**
 * 크레인 인형뽑기
 */

const solution3 = (boards: number[][], moves: number[]) => {
  const getTopOfColumn = (index: number): number => {
    const y = index - 1;

    for (const board of boards) {
      if (board[y] !== 0) {
        const yValue = board[y];
        board[y] = 0;
        return yValue;
      }
    }

    return 0;
  };

  const stack: number[] = [];
  let result = 0;

  for (let index = 0; index < moves.length; index++) {
    const selectedValue = getTopOfColumn(moves[index]);
    if (selectedValue === 0) continue;

    if (stack[stack.length - 1] === selectedValue) {
      result += 2;
      stack.pop();
    } else {
      stack.push(selectedValue);
    }
  }

  return result;
};

// console.log(
//   solution3(
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
 * 후위 연삭식(https://siyoon210.tistory.com/2)
 * 후위표기식은 피연산자가 먼저쓰이고, 그 뒤로 피연산자가 나오는 형태를 말한다. 예를들어, 4+3의 중위표기식을 후위표기식으로 바꾼다면 4 3 + 으로 표현할 수 있다.
 * 첫 줄에 후위연산식이 주어집니다. 연산식의 길이는 50을 넘지 않습니다. 식은 1~9의 숫자와 +, -, *, / 연산자로만 이루어진다.
 */

type TOperator = '+' | '*' | '-';

type TOperatorMethod = (num1: number, num2: number) => number;

const solution4 = (str: string) => {
  class Operator {
    private static readonly operators = new Set<TOperator>(['+', '*', '-']);

    private static readonly operatorMethod: Record<TOperator, TOperatorMethod> =
      {
        '+': (num1, num2) => num1 + num2,
        '-': (num1, num2) => num1 - num2,
        '*': (num1, num2) => num1 * num2,
      };

    public static isOperator(str: string): str is TOperator {
      return this.operators.has(str as TOperator);
    }

    public static getOperateMethod(operator: TOperator): TOperatorMethod {
      return this.operatorMethod[operator];
    }
  }

  let result = 0;
  const stack: string[] = [];

  for (const s of str) {
    if (Operator.isOperator(s) && stack.length > 1) {
      const num2 = parseInt(stack.pop()!, 10);
      const num1 = parseInt(stack.pop()!, 10);
      stack.push(Operator.getOperateMethod(s)(num1, num2).toString());
    } else {
      stack.push(s);
    }
  }

  return stack[0];
};

// console.log(solution4('352+*9-'));

/**
 * 쇠막대기
 * 1. 레이저는 여는 괄호와 닫는 괄호의 인접한 쌍 ‘( ) ’ 으로 표현된다. 또한, 모든 ‘( ) ’는 반 드시 레이저를 표현한다.
 * 2. 쇠막대기의 왼쪽 끝은 여는 괄호 ‘ ( ’ 로, 오른쪽 끝은 닫힌 괄호 ‘) ’ 로 표현된다.
 */
const solution5 = (str: string) => {
  const stack: string[] = [];
  const isLaser = (s: string) => {
    return stack[stack.length - 1] === '(' && s === ')';
  };

  let result = 0;

  for (const s of str) {
    if (isLaser(s)) {
      // 절단 로직
      stack.pop();
      result += stack.length;
      continue;
    }

    if (s === '(') stack.push(s);
    else if (s === ')') stack.pop();
  }

  return result;
};

console.log(solution5('()(((()())(())()))(())'));
