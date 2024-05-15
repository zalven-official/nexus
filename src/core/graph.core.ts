class Graph {

}

export class GraphBuilder {
  private graph: Graph;

  constructor() {
    this.graph = new Graph();
  }

  addVertex() {

  }


}
// class Graph {
//   private adjacencyList: Map<string, string[]>;

//   constructor() {
//     this.adjacencyList = new Map();
//   }

//   addVertex(vertex: string, callback: () => string): this {
//     if (!this.adjacencyList.has(vertex)) {
//       this.adjacencyList.set(vertex, []);
//     }
//     return this;
//   }

//   addEdge(vertex1: string, vertex2: string): this {
//     if (!this.adjacencyList.has(vertex1)) {
//       this.addVertex(vertex1);
//     }
//     if (!this.adjacencyList.has(vertex2)) {
//       this.addVertex(vertex2);
//     }
//     this.adjacencyList.get(vertex1)!.push(vertex2);
//     this.adjacencyList.get(vertex2)!.push(vertex1); // For undirected graph
//     return this;
//   }

//   build(): Map<string, string[]> {
//     return this.adjacencyList;
//   }
// }

// export class GraphBuilder {
//   private graph: Graph;

//   constructor() {
//     this.graph = new Graph();
//   }

//   vertex(vertex: string): this {
//     this.graph.addVertex(vertex);
//     return this;
//   }

//   edge(vertex1: string, vertex2: string): this {
//     this.graph.addEdge(vertex1, vertex2);
//     return this;
//   }

//   build(): Map<string, string[]> {
//     return this.graph.build();
//   }
// }
