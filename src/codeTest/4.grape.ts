export default {};

interface QueueImpl<T> {
  size: number;

  enqueue(item: T): void;

  dequeue(): T | undefined;
}

class Queue<T> implements QueueImpl<T> {
  private data: T[] = [];
  private headIndex: number = 0;

  constructor(init?: T | T[]) {
    if (!init) return;
    if (Array.isArray(init)) {
      this.data = init;
    } else {
      this.data.push(init);
    }
  }

  public get size() {
    return this.data.length - this.headIndex;
  }

  public enqueue(item: T) {
    this.data.push(item);
  }

  public dequeue() {
    if (this.size === 0) return undefined;

    const item = this.data[this.headIndex];
    this.headIndex++;
    return item;
  }
}

const solution1 = (maps: number[][]) => {
  const n = maps.length;
  const m = maps[0].length;

  const moves = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  const nextPositions = (x: number, y: number) => {
    return moves
      .map(([nx, ny]) => [x + nx, y + ny])
      .filter(([nx, ny]) => 0 <= nx && nx < n && 0 <= ny && ny < m);
  };

  const visited = Array.from({ length: n }, (): number[] => Array(m).fill(0));
  const queue = new Queue<[number, number]>([[0, 0]]);
  visited[0][0] = 1;

  while (queue.size) {
    const [x, y] = queue.dequeue()!;
    const currentDist = visited[x][y];

    for (const [nx, ny] of nextPositions(x, y)) {
      if (maps[nx][ny] === 0 || visited[nx][ny] !== 0) continue;
      if (nx === n - 1 && ny === m - 1) return currentDist + 1;
      queue.enqueue([nx, ny]);
      visited[nx][ny] = currentDist + 1;
    }
  }

  return -1;
};

console.log(
  solution1([
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [0, 0, 0, 0, 1],
  ]),
);
