export default {};

// 거스름돈 문제
const checkAmount = (amount: number) => {
  const coins = [100, 50, 10, 1];
  const charges: number[] = [];

  for (const coin of coins) {
    while (amount >= coin) {
      amount -= coin;
      charges.push(coin);
    }
  }

  return charges;
};

// console.log(checkAmount(123));
// console.log(checkAmount(350));

const getBudget = (d: number[], budget: number) => {
  d.sort((a, b) => a - b);
  let result = 0;

  for (const v of d) {
    if (v > budget) break;
    result++;
    budget -= v;
  }

  return result;
};

// console.log(getBudget([1, 3, 2, 5, 4], 9));

// https://school.programmers.co.kr/learn/courses/30/lessons/42885
const getPeople = (people: number[], limit: number) => {
  people.sort((a, b) => a - b);
  let l = 0;
  let r = people.length - 1;
  let count = 0;

  while (l <= r) {
    if (people[l] + people[r] <= limit && l < r) {
      l++;
    }
    r--;
    count++;
  }

  return count;
};

// console.log(getPeople([20, 50, 50, 80], 100));
// console.log(getPeople([70, 50, 50, 80], 100));
// console.log(getPeople([70, 80, 100], 100));
// console.log(getPeople([10, 10, 70, 100], 100));
// console.log(getPeople([100, 50, 40, 40, 40, 40], 240));

//https://school.programmers.co.kr/learn/courses/30/lessons/138476
// 귤 k개를 고를 때 크기가 서로 다른 종류의 수의 최솟값
const pickingTangerines = (k: number, tangerine: number[]) => {
  const max = Math.max(...tangerine);
  const count = Array.from({ length: max + 1 }, () => 0);

  for (const number of tangerine) {
    count[number] = count[number] + 1;
  }

  const sortedCount = count.sort((a, b) => b - a);
  let result = 0;

  for (const number of sortedCount) {
    if (number === 0 || k <= 0) break;
    k -= number;
    result++;
  }

  return result;
};

// console.log(pickingTangerines(6, [1, 3, 2, 5, 4, 5, 2, 3]));

//https://school.programmers.co.kr/learn/courses/30/lessons/12979?language=javascript
const installStation = (n: number, stations: number[], w: number) => {
  let count = 0;
  let loc = 1;
  let idx = 0;

  while (loc <= n) {
    if (idx < stations.length && stations[idx] - w <= loc) {
      loc = stations[idx] + w + 1;
      idx += 1;
    } else {
      loc += 2 * w + 1;
      count += 1;
    }
  }
  return count;
};

// 1 + 3 4
console.log(installStation(11, [4, 11], 1));
// console.log(installStation(16, [9], 2));
