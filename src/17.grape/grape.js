class Grape {
  list = {};

  addVertex(vertex) {
    if (!this.list[vertex]) this.list[vertex] = [];
  }
  // 두개의 버텍스를 연결한다. 양방향연결
  addEdge(vertex1, vertex2) {
    if (!this.list[vertex1] || !this.list[vertex2]) return;
    this.list[vertex1].push(vertex2);
    this.list[vertex2].push(vertex1);
  }
  // 두 버텍스이 간선을 제거한다.
  removeEdge(vertex1, vertex2) {
    if (!this.list[vertex1] || !this.list[vertex2] || vertex1 === vertex2)
      return;
    this.list[vertex1] = this.list[vertex1].filter((v) => v !== vertex2);
    this.list[vertex2] = this.list[vertex2].filter((v) => v !== vertex1);
  }
  // 버텍스를 삭제한다 버텍스를 삭제하기전 해당 버텍스와 연결된 간선을 모두삭제한다.
  removeVertex(vertex) {
    if (!this.list[vertex]) return;
    this.list[vertex].forEach((edge) => {
      this.removeEdge(edge, vertex);
    });
    delete this.list[vertex];
  }
  //하나의 간선노드를 먼저 탐색한다.
  DFS(start) {
    if (!this.list[start]) return;
    const result = [];
    // 넓이 우선탐색에서는 방문했던 버택스를 기록해야한다.
    const visited = {};
    const recursive = (vertex) => {
      console.log('vertex', vertex);
      if (!vertex) return;
      visited[vertex] = true;
      result.push(vertex);
      this.list[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) return recursive(neighbor);
      });
      return undefined;
    };
    recursive(start);
    return result;
  }
}

const g = new Grape();
g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');
g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('B', 'D');
g.addEdge('C', 'E');
g.addEdge('D', 'E');
g.addEdge('D', 'F');
g.addEdge('E', 'F');
g.DFS('A');

//          A
//        /   \
//       B     C
//       |     |
//       D --- E
//        \   /
//          F
