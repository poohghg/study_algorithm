export default {};

const solution1 = (num: number = 11) => {
  let result: string = '';

  const dfs = (rest: number) => {
    if (rest / 2 === 0) return;
    result += (rest % 2).toString();
    rest = Math.floor(rest / 2);

    dfs(rest);
  };

  dfs(num);
  return result;
};

// console.log(solution1());

const solution2 = (nums: number[]) => {
  const result: number[] = [];

  const dfs = (index: number) => {
    if (index >= nums.length) return;

    result.push(nums[index]);
    dfs(index * 2 + 1);
    dfs(index * 2 + 2);
  };

  dfs(0);
  return result;
};

// console.log(solution2([1, 2, 3, 4, 5, 6, 7]));

/**
 * 자연수 N이 주어지면 1부터 N까지의 원소를 갖는 집합의
 * 부분집합을 모두 출력하는 프로그램을 작성하세요.
 */

// 참여/미참여로 구분
//        0
//    1       1
//  2   2   2   2
// 3 3 3 3 3 3 3 3

const solution3 = (num: number) => {
  const ch = Array.from({ length: num + 1 }).fill(0);
  const result: number[] = [];

  const dfs = (level: number) => {
    if (level === num + 1) {
      console.log(ch);
      return;
    }

    // 참여
    ch[level] = 1;
    dfs(level + 1);
    // 미참여
    ch[level] = 0;
    dfs(level + 1);
  };

  dfs(1);
};

console.log(solution3(3));
