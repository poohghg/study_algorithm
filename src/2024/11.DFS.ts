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

// console.log(solution3(3));

/**
 * 두 부분집합의 원소의 합이 서로 같은 경우가 존재하면 “YES"를 출력하고, 그렇지 않으면
 * ”NO"를 출력하는 프로그램을 작성하세요.
 */

const solution4 = (nums: number[]) => {
  let result = false;
  const totalSum = nums.reduce((a, b) => a + b);

  const dfs = (level: number, sum: number = 0) => {
    if (result) return;

    if (level === nums.length) {
      if (totalSum - sum === sum) result = true;
      return;
    }
    // 있는 경우
    dfs(level + 1, sum + nums[level]);
    // 없는 경우
    dfs(level + 1, sum);
  };

  dfs(0);
  return result;
};

// console.log(solution4([1, 3, 5, 6, 7, 10]));

/**
 * 철수는 C를 넘지 않으면서 그의 바둑이들을 가장 무겁게 태우고 싶다.
 * N마리의 바둑이와 각 바둑이의 무게 W가 주어지면, 철수가 트럭C에 태울 수 있는 가장 무거운
 * 무게를 구하는 프로그램을 작성하세요.
 */

const solution5 = (weight: number, dogs: number[]) => {
  let result: number = 0;

  const dfs = (level: number, sumOfWeight: number) => {
    if (sumOfWeight > weight) return;

    if (level === dogs.length) {
      result = Math.max(result, sumOfWeight);
      return;
    }

    // 무게 포함
    dfs(level + 1, sumOfWeight + dogs[level]);
    // 미포함
    dfs(level + 1, sumOfWeight);
  };

  dfs(0, 0);
  return result;
};

console.log(solution5(259, [81, 58, 42, 33, 61]));
