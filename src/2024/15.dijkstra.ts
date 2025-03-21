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

console.log(
  solution1(
    5,
    [
      [1, 2, 1],
      [2, 3, 3],
      [5, 2, 2],
      [1, 4, 2],
      [5, 3, 1],
      [5, 4, 2],
    ],
    3,
  ),
);
