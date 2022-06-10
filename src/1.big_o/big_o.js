function timeComparison() {
  function slow(n) {
    let answer = 0;
    for (let i = 1; i <= n; i++) {
      answer += i;
    }
    return answer;
  }

  function fast(n) {
    return (n * (n + 1)) / 2;
  }

  let time1 = performance.now();
  console.log(slow(10000));
  console.log(`slow F의 걸린시간: ${performance.now() - time1}`);

  time1 = performance.now();
  console.log(fast(10000));
  console.log(`fast F의 걸린시간: ${performance.now() - time1}`);
  // 같은결과값을 출력하지만, 로직에 따른 시간차는 존재한다.
}
// timeComparison();

function o1(n) {
  // n의 크기와 상관업이 3번의 연산만 진행된다.
  // -> 3
  return (n * (n + 1)) / 2;
}

function on(n) {
  // 실행시간은 n의 크기만큼 늘어난다.
  // 2n + 1 -> 실제 2n이든 5n이든 전체적인 큰시간차이는 없다.
  let answer = 0;
  for (let i = 1; i <= n; i++) {
    answer += i;
  }
  for (let i = 1; i <= n; i++) {
    answer += i;
  }
  return answer;
}

function on2(n) {
  // 실행시간은 n의 제곱만큼 늘어난다.
  // n이 커질수록 제곱만큼 실행시간이 늘어남
  // 중첩 for문만큼 제곱이다.
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      console.log(i, j);
    }
  }
}

function o2n(n) {
  if (n <= 1) return n;
  return o2n(n - 1) + o2n(n - 2);
}
console.log(o2n(4));
