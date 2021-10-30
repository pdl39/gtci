/* Topological Sort of a directed graph (a graph with unidirectional edges) is a linear ordering of its vertices such that for every directed edge (U, V) from vertex U to vertex V, U comes before V in the ordering.

Given a directed graph, find the topological ordering of its vertices.

Example 1:

Input: Vertices=4, Edges=[3, 2], [3, 0], [2, 0], [2, 1]
Output: Following are the two valid topological sorts for the given graph:
1) 3, 2, 0, 1
2) 3, 2, 1, 0

Example 2:

Input: Vertices=5, Edges=[4, 2], [4, 3], [2, 0], [2, 1], [3, 1]
Output: Following are all valid topological sorts for the given graph:
1) 4, 2, 3, 0, 1
2) 4, 3, 2, 0, 1
3) 4, 3, 2, 1, 0
4) 4, 2, 3, 1, 0
5) 4, 2, 0, 3, 1

Example 3:

Input: Vertices=7, Edges=[6, 4], [6, 2], [5, 3], [5, 4], [3, 0], [3, 1], [3, 2], [4, 1]
Output: Following are all valid topological sorts for the given graph:
1) 5, 6, 3, 4, 0, 1, 2
2) 6, 5, 3, 4, 0, 1, 2
3) 5, 6, 4, 3, 0, 2, 1
4) 6, 5, 4, 3, 0, 1, 2
5) 5, 6, 3, 4, 0, 2, 1
6) 5, 6, 3, 4, 1, 2, 0

There are other valid topological ordering of the graph too. */


// T: O(v + e)
// S: O(v + e) --> v + e for adjacency list, v for in-degree map, v for sources queue, v for output array.
// where v = total # of vertices, e = total # of edges

/* LOGIC
Initialize:
- Sources: vertices with in-degree 0
- Sink: vertices with out-degree 0
- Sources will be first, sinks will be last, and others in the middle in order of dependancy
- Topological ordering is only possible for directed graphs with no cycle. DAGs (Directed Acyclical Graph)

Steps:
- Prepare edges into an adjacency list
- Keep track of all vertices in a hash map with its in-degree value
- Add all vertices with in-degree 0 (from looking up the hash map) to a separate sources queue
- Pop off and add the first source vertex from the queue to an output array
- For each vertex directed to by the source vertex, decrease its in-degree by 1 in the hash map - if the updated in-degree is 0, the vertex is now a source and we will push to the sources queue.
- Repeat the process until sources queue is empty.
- Return the outpit array.
*/

const topologicalSort = (vertices, edges) => {
  const sortedOrder = [];
  const [graph, inDegreeMap] = generateAdjListAndInDegMap(edges); // O(v)

  const Queue = require('../../ds/Queue');
  const sourcesQueue = new Queue();

  for (const vertex in graph) { // O(v)
    if (inDegreeMap[vertex] === 0) {
      sourcesQueue.add(vertex);
    }
  }

  while (sourcesQueue.length > 0) { // O(v + e)
    const currentSource = sourcesQueue.dequeue().value;
    sortedOrder.push(+currentSource);

    for (const vertex of graph[currentSource]) {
      if (inDegreeMap[vertex] > 0) {
        inDegreeMap[vertex]--;
      }
      if (inDegreeMap[vertex] === 0) {
        sourcesQueue.add(vertex);
      }
    }
  }

  if (sortedOrder.length !== vertices) {
    return [];
  }

  return sortedOrder;
}

const generateAdjListAndInDegMap = (edges) => {
  const adjList = {};
  const inDegreeMap = {};

  for (let i = 0; i < edges.length; i++) { // O(v)
    if (!(edges[i][0] in adjList)) adjList[edges[i][0]] = [];
    if (!(edges[i][1] in adjList)) adjList[edges[i][1]] = [];
    adjList[edges[i][0]].push(edges[i][1]);

    if (!(edges[i][0] in inDegreeMap)) inDegreeMap[edges[i][0]] = 0;
    if (!(edges[i][1] in inDegreeMap)) inDegreeMap[edges[i][1]] = 0;
    inDegreeMap[edges[i][1]]++;
  }

  return [adjList, inDegreeMap];
}


// TEST
console.log(topologicalSort(4, [[3, 2], [3, 0], [2, 0], [2, 1]]));
console.log(topologicalSort(8, [[1, 3], [2, 3], [2, 5], [3, 4], [4, 6], [4, 7], [4, 8]]));
console.log(topologicalSort(0, []));
console.log(topologicalSort(4, [[1, 2], [1, 3], [2, 5], [3, 5], [5, 1]]));
console.log(topologicalSort(4, [[1, 2], [1, 3], [2, 5], [3, 5], [5, 2]]));
