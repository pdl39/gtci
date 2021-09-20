/* Given a list of non-overlapping intervals sorted by their start time, insert a given interval at the correct position and merge all necessary intervals to produce a list that has only mutually exclusive intervals. */

// T: O(n)
// S: O(n) --> n for the output array
// where n = # of intervals


// #1
const insertInterval = (intervals, newInterval) => {
  let merged = [];
  let newIntervalInserted = false;
  let i = 0;

  while (i < intervals.length) {
    if (!newIntervalInserted && intervals[i].end >= newInterval.start) {
      while (i < intervals.length && intervals[i].start <= newInterval.end) {
        newInterval.start = Math.min(intervals[i].start, newInterval.start);
        newInterval.end = Math.max(intervals[i].end, newInterval.end);
        i++;
      }

      merged.push(newInterval);
      newIntervalInserted = true;
      i--;
    }

    else {
      merged.push(intervals[i]);
    }

    i++;
  }

  if (!newIntervalInserted) merged.push(newInterval);

  return merged;
};


// #2: Alternate solution - using successive while loops
const insertInterval2 = (intervals, newInterval) => {
  const merged = [];
  let i = 0;

  while (i < intervals.length && intervals[i].end < newInterval.start) {
    merged.push(intervals[i]);
    i++;
  }

  while (i < intervals.length && intervals[i].start <= newInterval.end) {
    newInterval.start = Math.min(intervals[i].start, newInterval.start);
    newInterval.end = Math.max(intervals[i].end, newInterval.end);
    i++;
  }

  merged.push(newInterval);

  while (i < intervals.length) {
    merged.push(intervals[i]);
    i++;
  }

  return merged;
}


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

// #1
console.log(insertInterval([new Interval(1, 4), new Interval(7, 9), new Interval(10, 11)], new Interval(5, 6)).map(interval => interval.getInterval()));
console.log(insertInterval([new Interval(1, 4), new Interval(7, 9), new Interval(10, 11)], new Interval(5, 10)).map(interval => interval.getInterval()));
console.log(insertInterval([new Interval(1, 4), new Interval(7, 9), new Interval(10, 11)], new Interval(5, 15)).map(interval => interval.getInterval()));
console.log(insertInterval([new Interval(1, 4), new Interval(7, 9), new Interval(10, 11)], new Interval(12, 15)).map(interval => interval.getInterval()));
console.log(insertInterval([new Interval(1, 4), new Interval(7, 9), new Interval(10, 11)], new Interval(7, 15)).map(interval => interval.getInterval()));
console.log(insertInterval([new Interval(1, 4), new Interval(7, 9), new Interval(10, 11)], new Interval(7, 10)).map(interval => interval.getInterval()));
console.log(insertInterval([new Interval(1, 4), new Interval(7, 9), new Interval(10, 11)], new Interval(7, 8)).map(interval => interval.getInterval()));

console.log('-----');

// #2
console.log(insertInterval2([new Interval(1, 4), new Interval(7, 9), new Interval(10, 11)], new Interval(5, 6)).map(interval => interval.getInterval()));
console.log(insertInterval2([new Interval(1, 4), new Interval(7, 9), new Interval(10, 11)], new Interval(5, 10)).map(interval => interval.getInterval()));
console.log(insertInterval2([new Interval(1, 4), new Interval(7, 9), new Interval(10, 11)], new Interval(5, 15)).map(interval => interval.getInterval()));
console.log(insertInterval2([new Interval(1, 4), new Interval(7, 9), new Interval(10, 11)], new Interval(12, 15)).map(interval => interval.getInterval()));
console.log(insertInterval2([new Interval(1, 4), new Interval(7, 9), new Interval(10, 11)], new Interval(7, 15)).map(interval => interval.getInterval()));
console.log(insertInterval2([new Interval(1, 4), new Interval(7, 9), new Interval(10, 11)], new Interval(7, 10)).map(interval => interval.getInterval()));
console.log(insertInterval2([new Interval(1, 4), new Interval(7, 9), new Interval(10, 11)], new Interval(7, 8)).map(interval => interval.getInterval()));
