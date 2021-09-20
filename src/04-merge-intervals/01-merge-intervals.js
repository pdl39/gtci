/* Given a list of intervals, merge all the overlapping intervals to produce a list that has only mutually exclusive intervals. */

// #1
// T: O(nlogn) --> nlogn for sorting, although iteration is linear.
// S: O(n) --> n for the output array as well as for sorted array.
// where n = array length (# of intervals).

const mergeIntervals = (intervals) => {
  if (intervals.length < 2) return intervals;
  const sortedIntervals = intervals.sort((a, b) => a.start - b.start);

  const merged = [];

  for (let i = 1; i < sortedIntervals.length; i++) {
    let current = i > 1 ? merged.pop() : sortedIntervals[0];
    let next = sortedIntervals[i];

    if (next.start > current.end) { // no overlap
      merged.push(current, next); // include both current & next as is.
    }
    // since we sorted the intervals array, next.start will always be >= current.start.
    else if (next.end > current.end) { // next ends after current
      merged.push(new Interval(current.start, next.end)); // merge.
    }
    else  { // current completely overlaps next (next.end <= current.end)
      merged.push(current); // ignore next.
    }
  }

  return merged;
};

// #2: Alternate solution -> just two cases: overlap OR no overlap
const mergeIntervals2 = (intervals) => {
  if (intervals.length < 2) return intervals;
  const sortedIntervals = intervals.sort((a, b) => a.start - b.start);

  const merged = [];

  for (let i = 1; i < sortedIntervals.length; i++) {
    let current = i > 1 ? merged.pop() : sortedIntervals[0];
    let next = sortedIntervals[i];

    if (next.start > current.end) { // no overlap
      merged.push(current, next); // include both current & next as is.
    }
    else { // overlap. (either next ends after current or current completely overlaps next). In either case, since we sorted the intervals array, next.start >= current.start. We only need to know which end value to take --> max(current.end, next.end).
      const end = Math.max(current.end, next.end);
      merged.push(new Interval(current.start, end)); // merge.
    }
  }

  return merged;
};

// #3: Alternate solution -> updating start & end, instead of using current & next.
const mergeIntervals3 = (intervals) => {
  if (intervals.length < 2) return intervals;
  const sortedIntervals = intervals.sort((a, b) => a.start - b.start);

  const merged = [];
  let start = intervals[0].start;
  let end = intervals[0].end;

  for (let i = 1; i < sortedIntervals.length; i++) {
    if (sortedIntervals[i].start > end) { // no overlap
      merged.push(new Interval(start, end));
      start = sortedIntervals[i].start;
      end = sortedIntervals[i].end;
    }
    else { // overlap
      end = Math.max(end, sortedIntervals[i].end);
    }
  }

  // add the last interval.
  merged.push(new Interval(start, end));
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
console.log(mergeIntervals([new Interval(1, 4), new Interval(2, 5), new Interval(7, 9)]).map(interval => interval.getInterval()));
console.log(mergeIntervals([new Interval(6, 7), new Interval(2, 4), new Interval(5, 9)]).map(interval => interval.getInterval()));
console.log(mergeIntervals([new Interval(1, 4), new Interval(2, 6), new Interval(3, 5)]).map(interval => interval.getInterval()));

// #2
console.log(mergeIntervals2([new Interval(1, 4), new Interval(2, 5), new Interval(7, 9)]).map(interval => interval.getInterval()));
console.log(mergeIntervals2([new Interval(6, 7), new Interval(2, 4), new Interval(5, 9)]).map(interval => interval.getInterval()));
console.log(mergeIntervals2([new Interval(1, 4), new Interval(2, 6), new Interval(3, 5)]).map(interval => interval.getInterval()));

// #3
console.log(mergeIntervals3([new Interval(1, 4), new Interval(2, 5), new Interval(7, 9)]).map(interval => interval.getInterval()));
console.log(mergeIntervals3([new Interval(6, 7), new Interval(2, 4), new Interval(5, 9)]).map(interval => interval.getInterval()));
console.log(mergeIntervals3([new Interval(1, 4), new Interval(2, 6), new Interval(3, 5)]).map(interval => interval.getInterval()));
