export default {};

const solution1 = (nums: number[]) => {
  const result: number[][] = Array.from({ length: 6 }, (): number[] =>
    Array(6).fill(0),
  );

  const isSameCol = (col: number, num: number) => {
    for (let i = 0; i < 6; i++) {
      if (result[i][col] === 0) return false;
      if (result[i][col] === num) return true;
    }

    return false;
  };

  const getLottoNums = (index: number) => {
    const set: Set<number> = new Set();

    while (set.size < 6) {
      const randomNumberIdx = Math.floor(Math.random() * nums.length);
      const number = nums[randomNumberIdx];

      if (isSameCol(set.size, number) || set.has(number)) continue;

      set.add(number);
    }
    result[index] = Array.from(set);
  };

  for (let i = 0; i < 6; i++) {
    getLottoNums(i);
  }

  return result;
};

console.log(solution1([3, 7, 12, 19, 23, 28, 34, 38, 41, 44, 2, 17, 30]));
