export {};

/**
 * 회문 문자열
 * 앞에서 읽을 때나 뒤에서 읽을 때나 같은 문자열을 회문 문자열이라고 합니다.
 * 문자열이 입력되면 해당 문자열이 회문 문자열이면 "YES", 회문 문자열이 아니면 “NO"를 출력 하는 프로그램을 작성하세요.
 * 단 회문을 검사할 때 대소문자를 구분하지 않습니다.
 */
const solution1 = (str: string) => {
  const toUpper = (s: string) => s.toUpperCase();

  if (str.length % 2 !== 0) return 'NO';

  const len = str.length;
  const halfLen = len / 2;

  for (let i = 0; i < halfLen; i++) {
    if (toUpper(str[i]) !== toUpper(str[len - (i + 1)])) {
      return 'NO';
    }
  }

  return 'YES';
};

// console.log(solution1('gooG'));

/**
 * 유효한 팰린드롬
 * 앞에서 읽을 때나 뒤에서 읽을 때나 같은 문자열을 팰린드롬이라고 합니다.
 * 문자열이 입력되면 해당 문자열이 팰린드롬이면 "YES", 아니면 “NO"를 출력하는 프로그램을 작성하세요.
 * 단 회문을 검사할 때 알파벳만 가지고 회문을 검사하며, 대소문자를 구분하지 않습니다. 알파벳 이외의 문자들의 무시합니다.
 */
const solution2 = (str: string) => {
  //todo 알파벳만 가지고 회문검사

  const trimmedStr = str.toLowerCase().replace(/[^a-z]/g, '');
  return solution1(trimmedStr);
};

console.log(solution2('found7, time: study; Yduts; emit, 7Dnuof'));
