/* Find if a given Directed Graph has a cycle in it or not. */

// This question is essentially the same as topological sort, as topological sort is only possible for a directed graph if it DOESN'T have a cycle. So if the sorted output length is not the same as the total # of vertices in the grapgh, we know topological sort didn't work and thus cycle exists in the graph.

const doesDirectedGraphHaveCycle = (vertices, edges) => {
  const sortedOrder = topologicalSort(vertices, edges);
  return sortedOrder.length !== vertices;
}


const topologicalSort = (vertices, edges) => {
  const sortedOrder = [];
  const [graph, inDegreeMap] = generateAdjListAndInDegMap(vertices, edges); // O(v)

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

  return sortedOrder;
}

const generateAdjListAndInDegMap = (vertices, edges) => {
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
console.log(doesDirectedGraphHaveCycle(4, [[3, 2], [3, 0], [2, 0], [2, 1]]));
console.log(doesDirectedGraphHaveCycle(8, [[1, 3], [2, 3], [2, 5], [3, 4], [4, 6], [4, 7], [4, 8]]));
console.log(doesDirectedGraphHaveCycle(0, []));
console.log(doesDirectedGraphHaveCycle(4, [[1, 2], [1, 3], [2, 5], [3, 5], [5, 1]]));
console.log(doesDirectedGraphHaveCycle(4, [[1, 2], [1, 3], [2, 5], [3, 5], [5, 2]]));
