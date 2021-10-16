/* You are given a list of tasks that need to be run, in any order, on a server. Each task will take one CPU interval to execute but once a task has finished, it has a cooling period during which it can’t be run again. If the cooling period for all tasks is ‘K’ intervals, find the minimum number of CPU intervals that the server needs to finish all tasks.

If at any time the server can’t execute any task then it must stay idle.

Example 1:

Input: [a, a, a, b, c, c], K=2
Output: 7
Explanation: a -> c -> b -> a -> c -> idle -> a
Example 2:

Input: [a, b, a], K=3
Output: 5
Explanation: a -> b -> idle -> idle -> a */

const Heap = require('../../ds/PriorityQueue');
const Queue = require('../../ds/Queue');

// T: O(nlogn) --> n to build frequency map, n to build frequency array from the map, n to build the max heap from the frequency array, nlogn for poll/add operations on the max heap n times.
// S: O(n) --> n for frequency map, n for frequency array, n for max heap.
// where n = input string length.

const schedulingTasks = (tasks, k) => {
  const frequencyMap = {};

  for (let i = 0; i < tasks.length; i++) { // O(n)
    if (frequencyMap[tasks[i]]) frequencyMap[tasks[i]]++;
    else frequencyMap[tasks[i]] = 1;
  }

  const frequencyArr = [];
  Object.entries(frequencyMap).forEach(el => frequencyArr.push(el)); // O(n)

  const maxHeap = new Heap((a, b) => a[1] > b[1]);
  maxHeap.build(frequencyArr); // O(n)

  const schedule = [];

  while (maxHeap.size) { // O(n)
    const coolingTasks = [];
    let waitInterval = k + 1;

    while (waitInterval > 0 && maxHeap.size) { // O(k)
      const task = maxHeap.poll(); // O(logn)
      schedule.push(task[0]);
      task[1]--;

      if (task[1] > 0) {
        coolingTasks.push(task);
      }

      waitInterval--;
    }

    coolingTasks.forEach(task => maxHeap.add(task)); // klogn

    if (maxHeap.size > 0) {
      for (let i = waitInterval; i > 0; i--) { // O(k)
        schedule.push('IDLE');
      }
    }
  }

  return [schedule.length, schedule.join(' -> ')];
}


// TEST
console.log(schedulingTasks(['a', 'a', 'b', 'c', 'a', 'a', 'a'], 3));
console.log(schedulingTasks(['a', 'a', 'b', 'c', 'a'], 2));
console.log(schedulingTasks(['a', 'a', 'b', 'c', 'a', 'c'], 2));
console.log(schedulingTasks(['a', 'a', 'b'], 3));
