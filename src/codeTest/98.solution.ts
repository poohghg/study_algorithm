export default {};

const getLottoNums = (fixedNums: number[] = [], count: number = 1) => {
  const getLottoNums = () => {
    const set: Set<number> = new Set(
      fixedNums.filter((num) => num >= 1 && num <= 45),
    );

    while (set.size < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1;
      set.add(randomNumber);
    }

    return Array.from(set).sort((a, b) => a - b);
  };

  const result: number[][] = [];

  for (let i = 0; i < count; i++) {
    result.push(getLottoNums());
  }

  return result;
};

console.log(getLottoNums([2, 22, 44], 5));

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

// console.log(solution1([10, 15, 1, 39, 9, 42]));
