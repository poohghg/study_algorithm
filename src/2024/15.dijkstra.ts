export default {};

/**
 * https://school.programmers.co.kr/learn/courses/30/lessons/12978
 */

const solution1 = (N: number, road: number[][], K: number) => {
  const grape = road.reduce(
    (map, nodeInfo) => {
      const [node1, node2, cost] = nodeInfo;
      map.set(node1, [...(map.get(node1) ?? []), [node2, cost]]);
      map.set(node2, [...(map.get(node2) ?? []), [node1, cost]]);
      return map;
    },
    new Map() as Map<number, [number, number][]>,
  );

  const dijkstra = (start: number) => {
    const unvisited = new Set(grape.keys());
    const dist = new Map([...unvisited].map((node) => [node, Infinity]));
    dist.set(start, 0);

    while (unvisited.size) {
      const shortestNode = [...unvisited].reduce((a, b) =>
        dist.get(a)! < dist.get(b)! ? a : b,
      );

      const currCost = dist.get(shortestNode)!;

      if (currCost === Infinity) break;

      unvisited.delete(shortestNode);

      for (const [next, cost] of grape.get(shortestNode) ?? []) {
        const newCost = currCost + cost;
        if (newCost < (dist.get(next) ?? Infinity)) {
          dist.set(next, newCost);
        }
      }
    }

    return dist;
  };

  const dist = dijkstra(1);
  return [...dist.values()].filter((cost) => cost <= K).length;
};

// console.log(
//   solution1(
//     5,
//     [
//       [1, 2, 1],
//       [2, 3, 3],
//       [5, 2, 2],
//       [1, 4, 2],
//       [5, 3, 1],
//       [5, 4, 2],
//     ],
//     3,
//   ),
// );
/**
 * https://www.acmicpc.net/problem/1504
 */
const solution2 = (N: number, E: number, road: number[][], r: number[]) => {
  const grape = road.reduce(
    (map, nodeInfo) => {
      const [node1, node2, cost] = nodeInfo;
      map.set(node1, [...(map.get(node1) ?? []), [node2, cost]]);
      map.set(node2, [...(map.get(node2) ?? []), [node1, cost]]);
      return map;
    },
    new Map() as Map<number, [number, number][]>,
  );

  const dijkstra = (start: number, end: number) => {
    const unvisited = new Set(grape.keys());
    const dist = new Map([...unvisited].map((node) => [node, Infinity]));

    dist.set(start, 0);

    while (unvisited.size > 0) {
      const shortestNode = [...unvisited].reduce((a, b) => {
        if (dist.has(a) && dist.has(b))
          return dist.get(a)! > dist.get(b)! ? b : a;
        return a;
      });

      const currentCost = dist.get(shortestNode)!;

      if (currentCost === Infinity) break;

      if (shortestNode === end) return dist.get(end);

      unvisited.delete(shortestNode);

      for (const [nextNode, cost] of grape.get(shortestNode)!) {
        const newCost = currentCost + cost;
        if (newCost < dist.get(nextNode)!) {
          dist.set(nextNode, newCost);
        }
      }
    }

    return Infinity;
  };

  const main = () => {
    let result = Number.MAX_SAFE_INTEGER;
    const visited = Array.from({ length: r.length }, () => false);

    const dfs = (level: number, record: number[]) => {
      if (level === 2) {
        const newRoad = [1, ...record, N];
        let sumOfCost = 0;

        for (let i = 0; i < newRoad.length - 1; i++) {
          const cost = dijkstra(newRoad[i], newRoad[i + 1]);
          if (cost === Infinity || cost === undefined) return;
          sumOfCost += cost;
        }

        result = Math.min(result, sumOfCost);
        return;
      }

      for (const n of r) {
        if (visited[n]) continue;

        visited[n] = true;
        record.push(n);

        dfs(level + 1, record);

        record.pop();
        visited[n] = false;
      }
    };

    dfs(0, []);
    return result;
  };

  return main();
};

console.log(
  solution2(
    4,
    6,
    [
      [1, 2, 3],
      [2, 3, 3],
      [3, 4, 1],
      [1, 3, 5],
      [2, 4, 5],
      [1, 4, 4],
    ],
    [2, 3],
  ),
);
