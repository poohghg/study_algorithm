function basicFibo(n) {
  if (n <= 2) return 1;
  return basicFibo(n - 1) + basicFibo(n - 2);
}
function DPFibo(n, memo = {}) {
  // memo라는 변수에 계산된 결과값을 저정한다.
  if (n <= 2) return 1;
  if (memo[n]) return memo[n];
  const res = DPFibo(n - 1, memo) + DPFibo(n - 2, memo);
  memo[n] = res;
  return res;
}

const t1 = new Date();
console.log(DPFibo(7));
console.log(new Date().getTime() - t1.getTime());

// 바텀 업 방식
// 가장 하위 문제부터시작하여 가장상의 문제의 정답을 도출한다.
// 기본적인 재귀는 공간복잡도에서 좋지 않기에 하나의 배열을 사용하는 이점이 있다.
function TabulatedFibo(n) {
  if (n <= 2) return 1;
  const fibNums = [0, 1, 1];
  for (let i = 3; i <= n; i++) {
    fibNums[i] = fibNums[i - 1] + fibNums[i - 2];
  }
  return fibNums[n];
}
