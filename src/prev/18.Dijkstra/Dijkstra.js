class PriorityQueue {
  #value = [];

  get value() {
    return this.#value;
  }

  #sort() {
    this.value.sort((a, b) => a.priority - b.priority);
  }

  enqueue(val, priority) {
    if ((!val && val !== 0) || isNaN(priority)) return;
    this.#value.push({ val, priority });
    this.#sort();
  }

  dequeue() {
    if (!this.#value.length) return undefined;
    return this.#value.shift();
  }
}

class WeightedGraph {
  #list = {};

  get list() {
    return this.#list;
  }

  addVertex(vertex) {
    if (!vertex && vertex !== 0) return;
    if (!this.#list[vertex]) this.#list[vertex] = [];
  }

  // weigth눈 두 버텍스사이의 거리이다.
  addEdge(vertex1, vertex2, weigth) {
    if (!this.#list[vertex1] || !this.#list[vertex2] || isNaN(weigth)) return;

    this.#list[vertex1].push({ node: vertex2, weigth });
    this.#list[vertex2].push({ node: vertex1, weigth });
  }

  Dijkstra(start, end) {
    if (!this.#list[start] || !this.#list[end]) return;
    // 우선순위큐 방문해야할 버텍스중 가장가까운 다음 노드.
    const nodes = new PriorityQueue();
    // 시작점부터의 각노드의 거리를 표기한다.
    const distances = {};
    // 최적의 경로를 표기한다.
    const previous = {};

    // 초기값 세팅
    for (const vertex in this.#list) {
      if (start === vertex) {
        // 시작점과 같은장소
        distances[vertex] = 0;
        nodes.enqueue(start, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }

    let shortest;

    while (nodes.value.length) {
      shortest = nodes.dequeue().val;

      if (shortest === end) {
        let path = [];
        while (shortest && distances[shortest] !== Infinity) {
          path.unshift(shortest);
          shortest = previous[shortest];
        }
        return { path, distance: distances[end] };
      }

      if (shortest && distances[shortest] !== Infinity) {
        // const nodeDist = distances[shortest];
        this.#list[shortest].forEach((neighbor) => {
          const { node, weigth } = neighbor;
          const curDist = distances[shortest] + weigth;
          // 기존 거리보다 해당간선으로 가는 거리가 짧다면 업데이트.
          if (distances[node] > curDist) {
            // 거리 객체 업데이트
            distances[node] = curDist;
            // 경로업데이트
            previous[node] = shortest;
            // 다음에 가야할 가장짧은거리 업데이트
            nodes.enqueue(node, curDist);
          }
        });
      }
    }
    return undefined;
  }
}

const graph = new WeightedGraph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addVertex('G');

graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'E', 3);
graph.addEdge('C', 'D', 2);
graph.addEdge('C', 'F', 4);
graph.addEdge('D', 'E', 3);
graph.addEdge('D', 'F', 1);
graph.addEdge('E', 'F', 1);

// console.log(graph.list);

console.log(graph.Dijkstra('A', 'E'));
