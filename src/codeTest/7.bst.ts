export default {};

function solution1(n: number, a: number, b: number) {
  const m = Math.log2(n);

  let aNum = a;
  let bNum = b;

  for (let i = 1; i <= m; i++) {
    aNum = Math.ceil(aNum / 2);
    bNum = Math.ceil(bNum / 2);
    if (aNum === bNum) return i;
  }

  // [실행] 버튼을 누르면 출력 값을 볼 수 있습니다.
  // 1 2 3 4 5 6 7 8 1
  //  1   2   3   4  2
  //    1       2    3
  //        1        4
}

// console.log(solution1(8, 4, 7));
// console.log(solution1(8, 3, 4));
// console.log(solution1(8, 4, 7));

function solution2(
  enroll: string[],
  referral: string[],
  seller: string[],
  amount: number[],
) {
  const n = enroll.length;
  const tree = {} as Record<
    string,
    {
      parent: string;
      result: number;
    }
  >;

  for (let i = 0; i < n; i++) {
    const parent = referral[i];
    const children = enroll[i];
    tree[children] = {
      parent: parent,
      result: 0,
    };
  }

  for (let i = 0; i < seller.length; i++) {
    let money = amount[i] * 100;
    let currentName = seller[i];

    while (1 <= money && currentName !== '-') {
      tree[currentName].result += money - Math.floor(money / 10);
      currentName = tree[currentName].parent;
      money = Math.floor(money / 10);
    }
  }

  return Object.values(tree).map((v) => v.result);
}

// console.log(
//   solution2(
//     ['john', 'mary', 'edward', 'sam', 'emily', 'jaimie', 'tod', 'young'],
//     ['-', '-', 'mary', 'edward', 'mary', 'mary', 'jaimie', 'edward'],
//     ['young', 'john', 'tod', 'emily', 'mary'],
//     [12, 4, 2, 5, 10],
//   ),
// );

// ["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"]	["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"]	["sam", "emily", "jaimie", "edward"]	[2, 3, 5, 4]	[0, 110, 378, 180, 270, 450, 0, 0]

// console.log(
//   solution2(
//     ['john', 'mary', 'edward', 'sam', 'emily', 'jaimie', 'tod', 'young'],
//     ['-', '-', 'mary', 'edward', 'mary', 'mary', 'jaimie', 'edward'],
//     ['sam', 'emily', 'jaimie', 'edward'],
//     [2, 3, 5, 4],
//   ),
// );

function power(m: number, n: number): number {
  if (n === 0) return 1;
  return power(m, n - 1) * 2;
}

// power(2,0) // 1
// power(2,2) // 4
// power(2,4) // 16
// console.log(power(2, 0));
// console.log(power(2, 2));
// console.log(power(2, 4));

function fib(n: number, dp: number[] = []): number {
  if (dp[n]) return dp[n];
  if (n <= 2) {
    dp[n] = 1;
    return 1;
  }

  dp[n] = fib(n - 1, dp) + fib(n - 2, dp);
  return dp[n];
}

// fib(4) // 3
// fib(10) // 55
// fib(28) // 317811
// fib(35) // 9227465
console.log(fib(4));
// console.log(fib(10));
// console.log(fib(28));

// 0 1 1 2 3 5
