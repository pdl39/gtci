/* Given a list of intervals, merge all the overlapping intervals to produce a list that has only mutually exclusive intervals. */

// T: O(nlogn) --> nlogn for sorting, although iteration is linear.
// S: O(n) --> n for the output array as well as for sorted array.
// where

const mergeIntervals = (intervals) => {
  if (intervals.length < 2) return intervals;
  const sortedIntervals = intervals.sort((a, b) => a.start - b.start);

  const merged = [];

  for (let i = 1; i < sortedIntervals.length; i++) {
    let current = i > 1 ? merged.pop() : sortedIntervals[0];
    let next = sortedIntervals[i];

    if (next.start > current.end) { // no overlap
      merged.push(current, next);
    }
    // since we sorted the intervals array, next.start will always be >= current.start.
    else if (next.end > current.end) { // next ends after current
      merged.push(new Interval(current.start, next.end));
    }
    else  { // current completely overlaps next (next.end <= current.end)
      merged.push(current);
    }
  }

  return merged;
};


// TEST
class Interval {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  getInterval() {
    return [this.start, this.end];
  }
}

const mergedIntervals1 = mergeIntervals([new Interval(1, 4), new Interval(2, 5), new Interval(7, 9)]);
let result1 = mergedIntervals1.map(interval => interval.getInterval());
console.log(result1);

const mergedIntervals2 = mergeIntervals([new Interval(6, 7), new Interval(2, 4), new Interval(5, 9)]);
let result2 = mergedIntervals2.map(interval => interval.getInterval());
console.log(result2);

const mergedIntervals3 = mergeIntervals([new Interval(1, 4), new Interval(2, 6), new Interval(3, 5)]);
let result3 = mergedIntervals3.map(interval => interval.getInterval());
console.log(result3);
