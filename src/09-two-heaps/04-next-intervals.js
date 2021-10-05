/* Given an array of intervals, find the next interval of each interval. In a list of intervals, for an interval i its next interval j will have the smallest ‘start’ greater than or equal to the ‘end’ of i.

Write a function to return an array containing indices of the next interval of each input interval. If there is no next interval of a given interval, return -1. It is given that none of the intervals have the same start point.

Example 1:

Input: Intervals [[2,3], [3,4], [5,6]]
Output: [1, 2, -1]
Explanation: The next interval of [2,3] is [3,4] having index ‘1’. Similarly, the next interval of [3,4] is [5,6] having index ‘2’. There is no next interval for [5,6] hence we have ‘-1’.

Example 2:

Input: Intervals [[3,4], [1,5], [4,6]]
Output: [2, -1, -1]
Explanation: The next interval of [3,4] is [4,6] which has index ‘2’. There is no next interval for [1,5] and [4,6]. */

const Heap = require('../../ds/PriorityQueue');
const Interval = require('../../ds/Interval');

// T: O(nlogn) --> 2 * nlogn for adding to max heaps. We then also traverse each interval, and for each, we do logn operations when popping from the heaps.
// S: O(n) --> n for the output array to store indices for all the intervals.
// where n = # of intervals in the intervals array.

const findNextInterval = (intervals) => {
  const nextIntervalIndices = [];
  const maxStartHeap = new Heap((a, b) => a[0] > b[0]); // [start, i]
  const maxEndHeap = new Heap((a, b) => a[0] > b[0]); // [end, i]

  for (let i = 0; i < intervals.length; i++) {
    maxStartHeap.add([intervals[i][0], i]);
    maxEndHeap.add([intervals[i][1], i]);
  }

  // we will begin with the interval with the greatest end time, and try finding the next index from the maxStartHeap.
  while (maxEndHeap.size) {
    const [iEnd, iIndex] = maxEndHeap.poll();
    nextIntervalIndices[iIndex] = -1; // set default as -1.

    let jStart = null, jIndex = null;

    while (maxStartHeap.size && maxStartHeap.peek()[0] >= iEnd) {
      [jStart, jIndex] = maxStartHeap.poll();
    }

    if (jStart) {
      nextIntervalIndices[iIndex] = jIndex;

      // add back interval j, since it may also be the next interval for the next i interval from the maxEndHeap.
      maxStartHeap.add([jStart, jIndex]);
    }
  }

  return nextIntervalIndices;
}


// TEST
console.log(findNextInterval([[1, 2], [2, 4], [3, 5], [5, 6], [4, 7]]));
console.log(findNextInterval([[2, 3], [3, 4], [5, 6]]));
