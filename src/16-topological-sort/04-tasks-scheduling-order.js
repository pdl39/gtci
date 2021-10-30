/* There are ‘N’ tasks, labeled from ‘0’ to ‘N-1’. Each task can have some prerequisite tasks which need to be completed before it can be scheduled. Given the number of tasks and a list of prerequisite pairs, write a method to find the ordering of tasks we should pick to finish all tasks.

Example 1:

Input: Tasks=3, Prerequisites=[0, 1], [1, 2]
Output: [0, 1, 2]
Explanation: To execute task '1', task '0' needs to finish first. Similarly, task '1' needs
to finish before '2' can be scheduled. A possible scheduling of tasks is: [0, 1, 2]
Example 2:

Input: Tasks=3, Prerequisites=[0, 1], [1, 2], [2, 0]
Output: []
Explanation: The tasks have a cyclic dependency, therefore they cannot be scheduled.
Example 3:

Input: Tasks=6, Prerequisites=[2, 5], [0, 5], [0, 4], [1, 4], [3, 2], [1, 3]
Output: [0 1 4 3 2 5]
Explanation: A possible scheduling of tasks is: [0 1 4 3 2 5] */


// This question is exactly the same as 01-topological-sort - tasks are vertices and prerequisite pairs are the edges.


// T: O(v + e)
// S: O(v + e)
// where v = total # of vertices, e = total # of edges

const taskSchedulingOrder = (tasks, prerequisites) => {
  return topologicalSort(prerequisites);
}

const topologicalSort = (edges) => {
  const sortedOrder = [];
  const [graph, inDegreeMap] = generateGraphAndInDegMap(edges);

  const Queue = require('../../ds/Queue');
  const sources = new Queue;

  for (const vertex in graph) {
    if (inDegreeMap[vertex] === 0) {
      sources.add(vertex);
    }
  }

  while (sources.length > 0) {
    const currentSource = +sources.dequeue().value;
    sortedOrder.push(currentSource);

    for (const vertex of graph[currentSource]) {
      if (inDegreeMap[vertex] > 0) {
        inDegreeMap[vertex]--;
      }
      if (inDegreeMap[vertex] === 0) {
        sources.add(vertex);
      }
    }
  }

  return sortedOrder;
}

const generateGraphAndInDegMap = (edges) => {
  const graph = {};
  const inDegreeMap = {};

  for (let i = 0; i < edges.length; i++) {
    if (!(edges[i][0] in graph)) graph[edges[i][0]] = [];
    if (!(edges[i][1] in graph)) graph[edges[i][1]] = [];
    graph[edges[i][0]].push(edges[i][1]);

    if (!(edges[i][0] in inDegreeMap)) inDegreeMap[edges[i][0]] = 0;
    if (!(edges[i][1] in inDegreeMap)) inDegreeMap[edges[i][1]] = 0;
    inDegreeMap[edges[i][1]]++;
  }

  return [graph, inDegreeMap];
}


// TEST
console.log(taskSchedulingOrder(4, [[3, 2], [3, 0], [2, 0], [2, 1]]));
console.log(taskSchedulingOrder(8, [[1, 3], [2, 3], [2, 5], [3, 4], [4, 6], [4, 7], [4, 8]]));
console.log(taskSchedulingOrder(0, []));
console.log(taskSchedulingOrder(4, [[1, 2], [1, 3], [2, 5], [3, 5], [5, 1]]));
console.log(taskSchedulingOrder(4, [[1, 2], [1, 3], [2, 5], [3, 5], [5, 2]]));
console.log(taskSchedulingOrder(6, [[2, 5], [0, 5], [0, 4], [1, 4], [3, 2], [1, 3]]));
console.log(taskSchedulingOrder(3, [[0, 1], [1, 2], [2, 0]]));
