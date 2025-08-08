export default {};

const solution1 = (k: number, operations: (string | number)[][]) => {
  const find = (parents: number[], x: number) => {
    if (parents[x] === x) return x;
    parents[x] = find(parents, parents[x]);
    return parents[x];
  };

  const union = (parents: number[], x: number, y: number) => {
    const root1 = find(parents, x);
    const root2 = find(parents, y);
    parents[root2] = root1;
  };

  const parents = Array.from({ length: k }, (_, i) => i);
  let n = k; // 집합의 개수를 저장할 변수, 처음에는 모든 노드가 서로 다른 집합에 있으므로 k

  for (const op of operations) {
    console.log(parents);
    // operations 리스트에 있는 연산들을 하나씩 처리
    if (op[0] === 'u') {
      union(parents, op[1] as number, op[2] as number); // op[1]과 op[2]가 속한 집합을 합칩니다.
    } else if (op[0] === 'f') {
      find(parents, op[1] as number);
    }
  }

  // 모든 노드의 루트 노드를 찾아서 집합의 개수를 계산
  n = new Set(
    Array.from({ length: k }, (_, i) => {
      const x = find(parents, i);
      console.log('x', x);
      return x;
    }),
  ).size;

  return n;
};

console.log(
  solution1(3, [
    ['u', 0, 1],
    ['u', 1, 2],
    ['f', 2],
  ]),
); // 반환값 : 1
