/* Given an array of intervals representing ‘N’ appointments, find out if a person can attend all the appointments. */

// T: O(nlogn)
// S:m O(n) --> for the sorted array.
// where n = # of intervals

// We simply need to first sort the intervals by start time, and then find any instances of overlap, in which case we can return false.

const canAttendAllAppointments = (intervals) => {
  const sortedIntervals = intervals.sort((a, b) => a.start - b.start);

  for (let i = 0; i < sortedIntervals.length - 1; i++) {
    // Note, the comparison is exclusive (> vs. >=), because when the start time of the next appointment is the same as the end time of the preceiding appointment, we assume you can still attend the next appointment immediately after your preceding appointment ends.
    if (sortedIntervals[i].end > sortedIntervals[i + 1].start) {
      return false;
    }
  }

  return true;
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

console.log(canAttendAllAppointments([new Interval(1, 4), new Interval(2, 5), new Interval(7, 9)]));
console.log(canAttendAllAppointments([new Interval(6, 7), new Interval(2, 4), new Interval(5, 6)]));
console.log(canAttendAllAppointments([new Interval(1, 4), new Interval(2, 6), new Interval(3, 5)]));
console.log(canAttendAllAppointments([new Interval(1, 3), new Interval(0, 1), new Interval(4, 5), new Interval(8, 9), new Interval(10, 17)]));
console.log(canAttendAllAppointments([new Interval(2, 3), new Interval(0, 1), new Interval(4, 5), new Interval(8, 9), new Interval(12, 17), new Interval(10, 12)]));
