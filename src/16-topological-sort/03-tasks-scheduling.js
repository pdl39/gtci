/* There are ‘N’ tasks, labeled from ‘0’ to ‘N-1’. Each task can have some prerequisite tasks which need to be completed before it can be scheduled. Given the number of tasks and a list of prerequisite pairs, find out if it is possible to schedule all the tasks.

Example 1:

Input: Tasks=3, Prerequisites=[0, 1], [1, 2]
Output: true
Explanation: To execute task '1', task '0' needs to finish first. Similarly, task '1' needs
to finish before '2' can be scheduled. One possible scheduling of tasks is: [0, 1, 2]
Example 2:

Input: Tasks=3, Prerequisites=[0, 1], [1, 2], [2, 0]
Output: false
Explanation: The tasks have a cyclic dependency, therefore they cannot be scheduled.
Example 3:

Input: Tasks=6, Prerequisites=[2, 5], [0, 5], [0, 4], [1, 4], [3, 2], [1, 3]
Output: true
Explanation: A possible scheduling of tasks is: [0 1 4 3 2 5] */


// This question is essentially the same as 02-find-if-directed-graph-has-cycle using topological sort - tasks are vertices and prerequisite pairs are the edges.


// T: O(v + e)
// S: O(v + e)
// where v = total # of vertices, e = total # of edges

const taskScheduling = (tasks, prerequisites) => {
  const tasksOrder = topologicalSort(prerequisites);
  return tasksOrder.length === tasks;
}

const topologicalSort = (edges) => {
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
console.log(taskScheduling(4, [[3, 2], [3, 0], [2, 0], [2, 1]]));
console.log(taskScheduling(8, [[1, 3], [2, 3], [2, 5], [3, 4], [4, 6], [4, 7], [4, 8]]));
console.log(taskScheduling(0, []));
console.log(taskScheduling(4, [[1, 2], [1, 3], [2, 5], [3, 5], [5, 1]]));
console.log(taskScheduling(4, [[1, 2], [1, 3], [2, 5], [3, 5], [5, 2]]));
console.log(taskScheduling(6, [[2, 5], [0, 5], [0, 4], [1, 4], [3, 2], [1, 3]]));
console.log(taskScheduling(3, [[0, 1], [1, 2], [2, 0]]));

