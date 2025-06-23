export default {};

// https://school.programmers.co.kr/learn/courses/30/lessons/12980
const solution1 = (n: number) => {
  //6 -> 3 -> 2 -> 1 -> -1
  let count = 0;
  while (1 <= n) {
    if (n % 2 === 0) {
      n = n / 2;
    } else {
      count++;
      n = n - 1;
    }
  }

  return count;
};

console.log(solution1(6));
