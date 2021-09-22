/* We are given a list of Jobs. Each job has a Start time, an End time, and a CPU load when it is running. Our goal is to find the maximum CPU load at any time if all the jobs are running on the same machine. */

/* Ex.
Jobs: [[1,4,3], [2,5,4], [7,9,6]]
Output: 7
Explanation: Since [1,4,3] and [2,5,4] overlap, their maximum CPU load (3+4=7) will be when both the
jobs are running at the same time i.e., during the time interval (2,4). */

// T: O(nlogn)
// S: O(n)
// where n = # of jobs in the jobs array.

// This question is very similar to 07-min-meeting-rooms, except that we are using a slightly different data structure (Job instead of Interval), which has one more element (CPU load). Also, instead of keeping a running count of the max # of active/overlapping meetings at a time, we must keep a running count of the max sum of cpu load for overlapping jobs.

const Job = require('../../ds/Job');
const MinIntervalEndHeap = require('../../ds/MinIntervalEndHeap');

const findMaxCPULoad = (jobs) => {
  const sortedJobs = jobs.sort((a, b) => a.start - b.start);
  const activeJobs = new MinIntervalEndHeap();

  let maxCPULoad = 0;
  let overlappingCPULoadSum = 0;

  for (let i = 0; i < sortedJobs.length; i++) {
    while (activeJobs.size && activeJobs.peek().end <= sortedJobs[i].start) {
      const finishedCPULoad = activeJobs.peek().cpuLoad;
      activeJobs.poll();
      overlappingCPULoadSum -= finishedCPULoad;
    }
    activeJobs.add(sortedJobs[i]);
    const newCPULoad = sortedJobs[i].cpuLoad;
    overlappingCPULoadSum += newCPULoad;

    maxCPULoad = Math.max(maxCPULoad, overlappingCPULoadSum);
  }

  return maxCPULoad;
}


// TEST
console.log(findMaxCPULoad([new Job(1, 4, 3), new Job(2, 5, 4), new Job(7, 9, 5)]));
console.log(findMaxCPULoad([new Job(6, 7, 3), new Job(2, 4, 5), new Job(5, 6, 7)]));
console.log(findMaxCPULoad([new Job(1, 4, 3), new Job(2, 6, 5), new Job(3, 5, 7)]));
console.log(findMaxCPULoad([new Job(1, 4, 3), new Job(4, 6, 5), new Job(3, 5, 7)]));
console.log(findMaxCPULoad([new Job(1, 3, 3), new Job(0, 1, 5), new Job(4, 5, 7), new Job(8, 9, 9), new Job(10, 17, 11)]));
console.log(findMaxCPULoad([new Job(2, 3, 3), new Job(0, 1, 5), new Job(4, 5, 7), new Job(8, 9, 7), new Job(12, 17, 6), new Job(10, 12, 8)]));
console.log(findMaxCPULoad([new Job(1, 2, 7), new Job(3, 5, 4), new Job(3, 6, 3), new Job(2, 4, 2), new Job(3, 6, 7), new Job(10, 12, 9)]));
console.log(findMaxCPULoad([new Job(1, 2, 5), new Job(3, 5, 9), new Job(3, 6, 8), new Job(2, 4, 4), new Job(3, 6, 2), new Job(10, 12, 5), new Job(10, 12, 1)]));
console.log(findMaxCPULoad([new Job(1, 2, 1), new Job(3, 5, 4), new Job(3, 6, 4), new Job(2, 4, 4), new Job(3, 6, 4), new Job(10, 12, 1), new Job(10, 12, 2), new Job(11, 13, 8), new Job(11, 12, 6)]));
console.log(findMaxCPULoad([new Job(1, 2, 1), new Job(3, 5, 5), new Job(3, 6, 5), new Job(2, 4, 5), new Job(3, 6, 5), new Job(10, 12, 1), new Job(10, 12, 2), new Job(11, 13, 8), new Job(11, 12, 6)]));
console.log(findMaxCPULoad([new Job(1, 2, 8), new Job(3, 5, 9), new Job(3, 6, 7), new Job(2, 4, 6), new Job(3, 6, 5), new Job(10, 12, 1), new Job(10, 12, 2), new Job(11, 13, 3), new Job(11, 12, 4), new Job(10, 15, 3)]));
