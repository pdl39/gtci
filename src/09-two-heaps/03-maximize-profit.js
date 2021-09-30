/* Given a set of investment projects with their respective profits, we need to find the most profitable projects. We are given an initial capital and are allowed to invest only in a fixed number of projects. Our goal is to choose projects that give us the maximum profit. Write a function that returns the maximum total capital after selecting the most profitable projects.

We can start an investment project only when we have the required capital. Once a project is selected, we can assume that its profit has become our capital.

Example 1:

Input: Project Capitals=[0,1,2], Project Profits=[1,2,3], Initial Capital=1, Number of Projects=2
Output: 6
Explanation:

With initial capital of ‘1’, we will start the second project which will give us profit of ‘2’. Once we selected our first project, our total capital will become 3 (profit + initial capital).
With ‘3’ capital, we will select the third project, which will give us ‘3’ profit.
After the completion of the two projects, our total capital will be 6 (1+2+3).

Example 2:

Input: Project Capitals=[0,1,2,3], Project Profits=[1,2,3,5], Initial Capital=0, Number of Projects=3
Output: 8
Explanation:

With ‘0’ capital, we can only select the first project, bringing out capital to 1.
Next, we will select the second project, which will bring our capital to 3.
Next, we will select the fourth project, giving us a profit of 5.
After selecting the three projects, our total capital will be 8 (1+2+5).
*/

const Heap = require('../../ds/PriorityQueue');

// T: O(nlogn) --> we traverse each project (costs array) once and for each, we add to the min heap, which takes logn operations in the worst case, so the whole process takes O(nlogn) time. For k, we also need to pop from minHeap and add to the maxHeap - which are logn operations - as long as the top project from minHeap has cost <= available capital. The time from this process would be nlogn in the worst case - if all remaining projects have costs within available capital before we have chosen the remaining k projects, in which case we would have done nlogn operations in total - or klogn in the best case - if there is only 1 choosable project for each remaining k. O(2 * nlogn) -> O(nlogn).
// S: O(n) --> we need space for all projects in the heaps.
// where n = # of projects, k = number of projects to choose.

const maximizeProfits = (costs, profits, numProjects, initialCapital) => {
  const minHeap = new Heap((project1, project2) => project1[0] < project2[0]); // project = [costs[i], i]

  // add all projects to a minheap based on the cost. When we add to the heap, we will add a 2-item array for each project, where index 0 is the cost and index 1 is its index in the costs array.
  for (let i = 0; i < costs.length; i++) {
    minHeap.add([costs[i], i]);
  }

  let availableCapital = initialCapital;
  let remainingProjects = numProjects;

  const maxHeap = new Heap((project1, project2) => project1[0] > project2[0]); // project = [profits[i], i]

  // from the min heap, as long as top project cost is within the available capital, pop it off and add to a max heap for profits. This will essentially keep a max heap of projects based on profits out of affordable projects.
  while (remainingProjects > 0) {
    while (minHeap.size && availableCapital >= minHeap.peek()[0]) {
      const projectIdx = minHeap.poll()[1];
      maxHeap.add([profits[projectIdx], projectIdx]);
    }

    // increment available capital by the chosen project's profit and decrement the remaining number of projects that can be chosen.
    console.log(maxHeap.peek());
    availableCapital += maxHeap.poll()[0];
    remainingProjects--;
  }

  return availableCapital;
}


// TEST
const costs1 = [0, 1, 2, 3, 4, 5, 10, 4, 2, 9, 15, 13];
const profits1 = [1, 2, 1, 3, 1, 4, 5, 8, 9, 1, 2, 3];

console.log(maximizeProfits(costs1, profits1, 5, 0));
