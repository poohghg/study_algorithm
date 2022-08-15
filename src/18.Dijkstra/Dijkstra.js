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
  // 안녕하세요
  // weigth눈 두 버텍스사이의 거리이다.
  addEdge(vertex1, vertex2, weigth) {
    if (!this.#list[vertex1] || !this.#list[vertex2] || isNaN(weigth)) return;
    this.#list[vertex1].push({ node: vertex2, weigth });
    this.#list[vertex2].push({ node: vertex1, weigth });
  }

  Dijkstra(start, end) {
    if (!this.#list[start] || !this.#list[end]) return false;
    // 우선순위큐 방문해야할 버텍스중 가장가까운값.
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    // 초기값 세팅
    for (let vertex in this.#list) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }
    let smallest;
    while (nodes.value.length) {
      smallest = nodes.dequeue().val;
      if (smallest === end) {
        let path = [];
        while (previous[smallest]) {
          path.unshift(smallest);
          smallest = previous[smallest];
        }
        return [smallest, ...path];
      }
      if (smallest || distances[smallest] === Infinity) {
        this.#list[smallest].forEach((neighbor) => {
          let cadidate = distances[smallest] + neighbor.weigth;
          // 최단거리 객체를 업데이트
          if (cadidate < distances[neighbor.node]) {
            distances[neighbor.node] = cadidate;
            // 최단거리를 업데이트 했으면 연결된 최단경로도 업데이트 해야한다.
            previous[neighbor.node] = smallest;
            nodes.enqueue(neighbor.node, cadidate);
          }
        });
      }
    }
    console.log(distances);
  }
}

const graph = new WeightedGraph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');

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
