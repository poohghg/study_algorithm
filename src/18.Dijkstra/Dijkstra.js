class WeightedGrape {
  list = {};

  addVertex(vertex) {
    if (!vertex && vertex !== 0) return;
    if (!this.list[vertex]) this.list[vertex] = [];
  }

  // weigth눈 두 버텍스사이의 거리이다.
  addEdge(vertex1, vertex2, weigth = 0) {
    if (!this.list[vertex1] || !this.list[vertex2]) return;
    if (isNaN(weigth)) return;
    this.list[vertex1].push({ node: vertex2, weigth });
    this.list[vertex2].push({ node: vertex1, weigth });
  }
}

const wg = new WeightedGrape();
wg.addVertex('A');
wg.addVertex('B');
wg.addEdge('A', 'B', 3);
// console.log(wg.list['B']);

// g.

//          A
//        /   \
//       B     C
//       |     |
//       D --- E
//        \   /
//          F
