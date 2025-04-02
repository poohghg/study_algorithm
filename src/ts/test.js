// function solution(X, Y, A) {
//   let countX = 0;
//   let countY = 0;
//   let result = -1;
//
//   for (let i = 0; i < A.length; i++) {
//     if (A[i] === X) countX++;
//     if (A[i] === Y) countY++;
//     if (countX === countY) result = i;
//   }
//
//   return result;
// }
//
// console.log(solution(7, 42, [6, 42, 11, 7, 1, 42]));
// console.log(solution(3, 5, [3, 3, 5, 5, 3, 5]));
// console.log(solution(1, 2, [1, 2, 1, 2, 1, 1]));

/**
 * You are given a string S, consisting of N digits, that represents a number. You can change at most one digit in the string to any other digit. How many different numbers divisible by 3 can be obtained in this way?
 * Write a function:
 * function solution(S) ;
 * that, given a string S of length N, returns an integer specifying how many numbers divisible by 3 can be obtained with at most one change of a digit.
 * Examples:
 * 1. Given S = "23",
 * ", the function should return 7. All numbers divisible by 3 that can be obtained after at most one change
 * are: "03", "21", "24", "27", "33", "63" and "93".
 * 2. Given S = "0081", the function should return 11. All numbers divisible by 3 that can be obtained with at most one
 * change are: "0021", "0051", "0081", "0084", "0087", "0381", "0681", "0981", "3081", "6081" and "9081"
 * 3. Given S = "022", the function should return 9. All numbers divisible by 3 that can be obtained with at most one change
 * are: "012", "021", "024", "027", "042", "072", "222", "522" and "822". |
 * Write an efficient algorithm for the following assumptions:
 * • N is an integer within the range [1.100,000);
 * • string S is made only of digits (0-9).
 * Remember, all submissions are being checked for plagiarism. Your recruiter will be informed in case suspicious activity is detected.
 * Copyright 2009-2025 by Codility Limited. All Rights Reserved. Unauthorized copying, publication or disclosure prohibited.
 */

// function solution(S) {
//   const size = S.length;
//   const sum = S.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
//   const set = new Set();
//
//   if (sum % 3 === 0) set.add(S);
//
//   for (let i = 0; i < size; i++) {
//     for (let newDigit = 0; newDigit <= 9; newDigit++) {
//       const newDigitStr = newDigit.toString();
//       const originalStr = S[i];
//
//       if (newDigitStr === originalStr) continue;
//
//       const newSum = sum - parseInt(originalStr) + newDigit;
//
//       if (newSum % 3 === 0) {
//         const newNumber = S.slice(0, i) + newDigitStr + S.slice(i + 1);
//         set.add(newNumber);
//       }
//     }
//   }
//
//   return set.size;
// }

function solution(S) {
  const size = S.length;
  const set = new Set();

  if (Number(S) % 3 === 0) set.add(S);

  for (let i = 0; i < size; i++) {
    const originalStr = S[i];

    for (let j = 0; j < 10; j++) {
      const toStr = j.toString();

      if (originalStr === toStr) continue;
      const newStr = S.slice(0, i) + toStr + S.slice(i + 1);

      if (Number(newStr) % 3 === 0) set.add(newStr);
    }
  }

  return set.size;
}

console.log(solution('23'));
console.log(solution('0081'));
console.log(solution('022'));
