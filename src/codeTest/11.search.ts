export default {};

const gridlandMetro = (
  n: number,
  m: number,
  k: number,
  track: number[][],
): number => {
  let result = n * m;
  const maps: number[][][] = [];

  const isSubset = (pos1: [number, number], pos2: [number, number]) => {
    // 4,6
    const [s1, e1] = pos1;
    //3 ,5
    const [s2, e2] = pos2;
    return (s2 <= s1 && s1 <= e2) || (s1 <= e2 && e1 <= e2);
  };

  for (const trackInfo of track) {
    const [row, c1, c2] = trackInfo;

    if (!maps[row]) maps[row] = [[c1, c2]];
    else {
      const ranges = maps[row];
      const len = ranges.length;
      let isInRanges = false;

      for (let i = 0; i < len; i++) {
        const [s, e] = ranges[i];
        // 현재 있는 애중에 하나라도 범위에 있다면
        if (s) const min = Math.min(c1, s);
        const max = Math.max(c2, e);
        ranges[i] = [min, max];
      }
    }
  }

  console.log(maps);
  maps.forEach((ranges) => {
    if (!ranges) return;

    for (const [s, e] of ranges) {
      // result -= e - s + 1;
      result += e - s - 1;
    }
  });

  return result;
};

// console.log(
//   gridlandMetro(4, 4, 3, [
//     [2, 2, 3],
//     [3, 1, 4],
//     [4, 4, 4],
//   ]),
// );
console.log(
  gridlandMetro(1, 6, 3, [
    [1, 1, 1],
    [1, 4, 5],
    [1, 3, 6],
  ]),
);
