/* Given a list of intervals, find the point where the maximum number of intervals overlap. */

// T: O(nlogn)
// S: O(n)
// where n = # of intervals in the intervals array.

// This question is essentially the same as 07-min-meeting-rooms, except that we are returning the point of max overlap, instead of the # of max overlap (the # of minimum required rooms).

const MinIntervalEndHeap = require('../../ds/MinIntervalEndHeap');
const Interval = require('../../ds/Interval');

const findPointOfMaxOverlap = (intervals) => {
  const sortedIntervals = intervals.sort((a, b) => a.start - b.start);
  const overlappingIntervals = new MinIntervalEndHeap();

  let maxOverlap = overlappingIntervals.size;
  let pointOfMaxOverlap = 0;
  overlappingIntervals.add(sortedIntervals[0]);

  for (let i = 1; i < sortedIntervals.length; i++) {
    while (overlappingIntervals.size && overlappingIntervals.peek().end <= sortedIntervals[i].start) {
      overlappingIntervals.poll();
    }

    overlappingIntervals.add(sortedIntervals[i]);

    if (overlappingIntervals.size > 1 && overlappingIntervals.size > maxOverlap) {
      maxOverlap = overlappingIntervals.size;
      pointOfMaxOverlap = i;
    }
  }

  return pointOfMaxOverlap;
}


// TEST
console.log(findPointOfMaxOverlap([new Interval(1, 4), new Interval(2, 5), new Interval(7, 9)]));
console.log(findPointOfMaxOverlap([new Interval(6, 7), new Interval(2, 4), new Interval(5, 6)]));
console.log(findPointOfMaxOverlap([new Interval(1, 4), new Interval(2, 6), new Interval(3, 5)]));
console.log(findPointOfMaxOverlap([new Interval(1, 4), new Interval(4, 6), new Interval(3, 5)]));
console.log(findPointOfMaxOverlap([new Interval(1, 3), new Interval(0, 1), new Interval(4, 5), new Interval(8, 9), new Interval(10, 17)]));
console.log(findPointOfMaxOverlap([new Interval(2, 3), new Interval(0, 1), new Interval(4, 5), new Interval(8, 9), new Interval(12, 17), new Interval(10, 12)]));
console.log(findPointOfMaxOverlap([new Interval(1, 2), new Interval(3, 5), new Interval(3, 6), new Interval(2, 4), new Interval(3, 6), new Interval(10, 12)]));
console.log(findPointOfMaxOverlap([new Interval(1, 2), new Interval(3, 5), new Interval(3, 6), new Interval(2, 4), new Interval(3, 6), new Interval(10, 12), new Interval(10, 12)]));
console.log(findPointOfMaxOverlap([new Interval(1, 2), new Interval(3, 5), new Interval(3, 6), new Interval(2, 4), new Interval(3, 6), new Interval(10, 12), new Interval(10, 12), new Interval(11, 13), new Interval(11, 12)]));
console.log(findPointOfMaxOverlap([new Interval(1, 2), new Interval(3, 5), new Interval(3, 6), new Interval(2, 4), new Interval(3, 6), new Interval(10, 12), new Interval(10, 12), new Interval(11, 13), new Interval(11, 12), new Interval(10, 15)]));
