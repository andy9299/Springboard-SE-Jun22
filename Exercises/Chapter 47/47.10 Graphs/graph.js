class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let ver of vertexArray) {
      this.addVertex(ver);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of this.nodes) {
      this.removeEdge(node, vertex);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let visited = new Set();
    let result = [];

    function traverse(vertex) {
      if (!vertex) null;
      visited.add(vertex);
      result.push(vertex.value);

      vertex.adjacent.forEach(n => {
        if (!visited.has(n)) traverse(n);
      });
    }

    traverse(start);
    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let visited = new Set();
    visited.add(start);
    let result = [];
    let queue = [start];
    let curr;
    while (queue.length) {
      curr = queue.shift();
      result.push(curr.value);

      curr.adjacent.forEach(n => {
        if (!visited.has(n)) {
          visited.add(n);
          queue.push(n);
        }
      });
    }


    return result;

  }
}

module.exports = { Graph, Node };