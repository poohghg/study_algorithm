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
}

const grape = new Grape();
grape.addVertex('a');
grape.addVertex('b');
grape.addVertex('c');
grape.addVertex('d');
grape.addEdge('a', 'b');
grape.addEdge('a', 'c');
// grape.addEdge('a', 'd');
grape.addEdge('b', 'd');
grape.addEdge('c', 'd');
console.log(grape);
grape.removeVertex('d');
console.log(grape);
