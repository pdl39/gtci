import Interval from "../../ds/Interval";

/* Given a set of intervals, find out if any two intervals overlap. */

// T: O(nlogn)
// S: O(n) --> for sorted array, assuming no in-place sorting.
// where n = array length (# of intervals)

const intervalHasOverlap = (intervals) => {
  if (intervals.length < 2) return false;
  const sortedIntervals = intervals.sort((a, b) => a.start - b.start);

  for (let i = 0; i < sortedIntervals.length - 1; i++) {
    if (sortedIntervals[i + 1].start <= sortedIntervals[i].end) {
      return true;
    }
  }

  return false;
}


// TEST
console.log(intervalHasOverlap([new Interval(1, 4), new Interval(2, 5), new Interval(7, 9)]));
console.log(intervalHasOverlap([new Interval(6, 7), new Interval(2, 4), new Interval(5, 9)]));
console.log(intervalHasOverlap([new Interval(1, 4), new Interval(2, 6), new Interval(3, 5)]));
console.log(intervalHasOverlap([new Interval(1, 3), new Interval(-1, 0), new Interval(4, 5), new Interval(8, 9), new Interval(6, 7)]));
