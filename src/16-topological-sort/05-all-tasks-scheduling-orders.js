/* There are ‘N’ tasks, labeled from ‘0’ to ‘N-1’. Each task can have some prerequisite tasks which need to be completed before it can be scheduled. Given the number of tasks and a list of prerequisite pairs, write a method to print all possible ordering of tasks meeting all prerequisites.

Example 1:

Input: Tasks=3, Prerequisites=[0, 1], [1, 2]
Output: [0, 1, 2]
Explanation: There is only possible ordering of the tasks.
Example 2:

Input: Tasks=4, Prerequisites=[3, 2], [3, 0], [2, 0], [2, 1]
Output:
1) [3, 2, 0, 1]
2) [3, 2, 1, 0]
Explanation: There are two possible orderings of the tasks meeting all prerequisites.
Example 3:

Input: Tasks=6, Prerequisites=[2, 5], [0, 5], [0, 4], [1, 4], [3, 2], [1, 3]
Output:
1) [0, 1, 4, 3, 2, 5]
2) [0, 1, 3, 4, 2, 5]
3) [0, 1, 3, 2, 4, 5]
4) [0, 1, 3, 2, 5, 4]
5) [1, 0, 3, 4, 2, 5]
6) [1, 0, 3, 2, 4, 5]
7) [1, 0, 3, 2, 5, 4]
8) [1, 0, 4, 3, 2, 5]
9) [1, 3, 0, 2, 4, 5]
10) [1, 3, 0, 2, 5, 4]
11) [1, 3, 0, 4, 2, 5]
12) [1, 3, 2, 0, 5, 4]
13) [1, 3, 2, 0, 4, 5] */


/*
Initialize:
- hash map: graph (from the prerequisites)
- hash map: inDegree (store in-degree counts for each vertex)
- queue: sources (store vertices that have in-degree 0)

Steps:
- Build graph & inDegree hash maps
- Go through all vertices in the inDegree map to store all source vertices into sources queue
- Backtracking: Any time we have more than one source, it means there are multiple ways of ordering the tasks.
  - To consider all sources for any step, we will use backtracking with recursion to print all such ordering combinations.
  - For each source at each step, print the particular ordering. Recursive calls will end up printing all such ordering combinations.
  - Backtracking steps:
      - base case: no source
      - recursive case: for each source, print the ordering recursively, for all sources in
*/

// T: O(v! * e) -> If there were no prerequisite requirements so that all tasks can be arranged in any order, then the total # of permutations for v tasks is v!. Now for each permutation, we remove and add back the edges, which in the worst case will be the total # of edges e. So the overall time complexity will be O(v! * e).
// S: O(v! * e)
// where v = total # of tasks, e = total # of prerequisites

const allTasksSchedulingOrdering = (tasks, prerequisites) => {
  const sortedOrder = [];
  const [graph, inDegreeMap] = generateGraphAndInDegMap(prerequisites); // O(e)

  const sources = [];
  for (const vertex in inDegreeMap) { // O(v)
    if (inDegreeMap[vertex] === 0) {
      sources.push(vertex);
    }
  }

  printAllTaskSchedulingOrders(tasks, graph, inDegreeMap, sources, sortedOrder);
  return 'Done.';
}

const printAllTaskSchedulingOrders = (tasks, graph, inDegreeMap, sources, sortedOrder) => {
  // Base Case.
  if (sources.length === 0) {
    if (sortedOrder.length === tasks) {
      console.log(sortedOrder);
    }
    return;
  }

  // Recursive Case.
  for (let i = 0; i < sources.length; i++) {
    const currentSource = sources[i];
    sortedOrder.push(+currentSource);

    const newSources = [...sources]; // Copy the sources to keep track of a new set of sources to iterate over in the next recursive call.
    newSources.splice(newSources.indexOf(currentSource), 1); // Remove the current source vertex from the new sources for the next recursive call.

    for (const vertex of graph[currentSource]) { // For each edge vertex of the current source, decrement its in-degree count and if it has become a source, add it to the new sources for the next recursive call.
      if (inDegreeMap[vertex] > 0) inDegreeMap[vertex]--;
      if (inDegreeMap[vertex] === 0) newSources.push(vertex);
    }

    // Recursively call the function on the new set of sources.
    printAllTaskSchedulingOrders(tasks, graph, inDegreeMap, newSources, sortedOrder);

    // Remove the current source vertex from
    sortedOrder.splice(sortedOrder.indexOf(currentSource), 1);
    for (const vertex of graph[currentSource]) {
      inDegreeMap[vertex]++;
    }
  }
}

const generateGraphAndInDegMap = (edges) => {
  const graph = {};
  const inDegreeMap = {};

  for (let i = 0; i < edges.length; i++) { // O(e)
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
let qNum = 0;
console.log(`All Possible Tasks Scheduling Q${++qNum}: `);
console.log(allTasksSchedulingOrdering(4, [[3, 2], [3, 0], [2, 0], [2, 1]]));
console.log(`All Possible Tasks Scheduling Q${++qNum}: `);
console.log(allTasksSchedulingOrdering(5, [[1, 3], [2, 3], [2, 5], [3, 4]]));
console.log(`All Possible Tasks Scheduling Q${++qNum}: `);
console.log(allTasksSchedulingOrdering(0, []));
console.log(`All Possible Tasks Scheduling Q${++qNum}: `);
console.log(allTasksSchedulingOrdering(4, [[1, 2], [1, 3], [2, 5], [3, 5], [5, 1]]));
console.log(`All Possible Tasks Scheduling Q${++qNum}: `);
console.log(allTasksSchedulingOrdering(4, [[1, 2], [1, 3], [2, 5], [3, 5], [5, 2]]));
console.log(`All Possible Tasks Scheduling Q${++qNum}: `);
console.log(allTasksSchedulingOrdering(6, [[2, 5], [0, 5], [0, 4], [1, 4], [3, 2], [1, 3]]));
console.log(`All Possible Tasks Scheduling Q${++qNum}: `);
console.log(allTasksSchedulingOrdering(3, [[0, 1], [1, 2], [2, 0]]));

