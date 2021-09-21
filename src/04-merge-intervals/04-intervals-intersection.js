import Interval from "../../ds/Interval";

/* Given two lists of intervals, find the intersection of these two lists. Each list consists of disjoint intervals sorted on their start time. */

// T: O(n + m)
// S: O(max(n, m)) --> max(n, m) for the result array.
// where n = # of intervals in intervals1, m = # of intervals in intervals2.

// #1
const intervalsIntersection = (intervals1, intervals2) => {
  const intersections = [];
  let intersectionStart, intersectionEnd;
  let i = 0, j = 0;

  while (i < intervals1.length && j < intervals2.length) {
    let aOverlapsB = intervals1[i].start >= intervals2[j].start && intervals1[i].start <= intervals2[j].end;
    let bOverlapsA = intervals2[j].start >= intervals1[i].start && intervals2[j].start <= intervals1[i].end;

    if (aOverlapsB || bOverlapsA) {
      intersectionStart = Math.max(intervals1[i].start, intervals2[j].start);
      intersectionEnd = Math.min(intervals1[i].end, intervals2[j].end);

      intersections.push(new Interval(intersectionStart, intersectionEnd));
    }

    if (intervals1[i].end < intervals2[j].end) i++;
    else j++;
  }

  return intersections;
}


// #2: Additionally merge the result into exclusive intervals.
const intervalsIntersection2 = (intervals1, intervals2) => {
  const intersections = [];
  let intersectionStart, intersectionEnd;
  let i = 0, j = 0;

  while (i < intervals1.length && j < intervals2.length) {
    let aOverlapsB = intervals1[i].start >= intervals2[j].start && intervals1[i].start <= intervals2[j].end;
    let bOverlapsA = intervals2[j].start >= intervals1[i].start && intervals2[j].start <= intervals1[i].end;

    if (aOverlapsB || bOverlapsA) {
      intersectionStart = Math.max(intervals1[i].start, intervals2[j].start);
      intersectionEnd = Math.min(intervals1[i].end, intervals2[j].end);

      intersections.push(new Interval(intersectionStart, intersectionEnd));
    }

    if (intervals1[i].end < intervals2[j].end) i++;
    else j++;
  }

  return mergeIntersections(intersections);
}

const mergeIntersections = (intersections) => {
  const mergedIntersections = [];
  let start = intersections[0].start;
  let end = intersections[0].end;

  for (let i = 1; i < intersections.length; i++) {
    if (intersections[i].start - end > 1) {
      mergedIntersections.push(new Interval(start, end));
      start = intersections[i].start;
    }

    end = intersections[i].end;
  }

  mergedIntersections.push(new Interval(start, end));

  return mergedIntersections;
}


// TEST
// #1
console.log(intervalsIntersection([new Interval(1, 4), new Interval(7, 9), new Interval(10, 11)], [new Interval(7, 11)]).map(interval => interval.getInterval()));
console.log(intervalsIntersection([new Interval(1, 2), new Interval(3, 4), new Interval(5, 6), new Interval(7, 8)], [new Interval(2, 6)]).map(interval => interval.getInterval()));
console.log(intervalsIntersection([new Interval(1, 2), new Interval(3, 4), new Interval(5, 6), new Interval(7, 8)], [new Interval(2, 3), new Interval(5, 7)]).map(interval => interval.getInterval()));

console.log('------');

// #2
console.log(intervalsIntersection2([new Interval(1, 4), new Interval(7, 9), new Interval(10, 11)], [new Interval(7, 11)]).map(interval => interval.getInterval()));
console.log(intervalsIntersection2([new Interval(1, 2), new Interval(3, 4), new Interval(5, 6), new Interval(7, 8)], [new Interval(2, 6)]).map(interval => interval.getInterval()));
console.log(intervalsIntersection2([new Interval(1, 2), new Interval(3, 4), new Interval(5, 6), new Interval(7, 8)], [new Interval(2, 3), new Interval(5, 7)]).map(interval => interval.getInterval()));
