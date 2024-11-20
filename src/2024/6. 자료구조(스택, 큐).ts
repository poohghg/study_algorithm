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

console.log(
  solution3(
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 3],
      [0, 2, 5, 0, 1],
      [4, 2, 4, 4, 2],
      [3, 5, 1, 3, 1],
    ],
    [1, 5, 3, 5, 1, 2, 1, 4],
  ),
);
// 4311324;
