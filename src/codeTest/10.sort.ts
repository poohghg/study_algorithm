export default {};

const radixSort = (arr: number[]) => {
  const getDigit = (num: number, place: number) => {
    return Math.floor((Math.abs(num) / 10 ** place) % 10);
  };

  const digitCount = (num: number) => {
    if (num === 0) return 1;
    return Math.floor(Math.log10(num)) + 1;
  };

  const maxDigit = (arr: number[]) => {
    let max = 0;
    for (const number of arr) max = Math.max(digitCount(number), max);
    return max;
  };

  const maxK = maxDigit(arr);
  let sortArr = arr.slice();

  for (let i = 0; i <= maxK; i++) {
    const buckets = Array.from({ length: 10 }, (): number[] => []);
    for (const number of sortArr) {
      const digitOfNum = getDigit(number, i);
      buckets[digitOfNum].push(number);
    }
    sortArr = buckets.flat();
  }

  return sortArr;
};

// console.log(radixSort([11, 321, 12, 5, 3, 27, 1, 0]));

// https://school.programmers.co.kr/learn/courses/30/lessons/42746
// 가장 큰수
const maxNum = (numbers: number[]) => {
  const toNum = (s: string) => parseInt(s, 10);
  numbers.sort((a, b) => {
    const astr = a.toString();
    const bstr = b.toString();
    return toNum(bstr + astr) - toNum(astr + bstr);
  });

  return numbers[0] === 0 ? '0' : numbers.join('');
};

console.log(maxNum([0]));
