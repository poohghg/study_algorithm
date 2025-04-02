function solution(answers) {
  const score = [0, 0, 0];

  const p = [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
  ];

  for (const [i, answer] of answers.entries()) {
    for (const [j, arr] of p.entries()) {
      if (answer === arr[i % arr.length]) {
        score[j] += 1;
      }
    }
  }

  return score;
}

console.log(solution([1, 4, 2, 4, 2]));
