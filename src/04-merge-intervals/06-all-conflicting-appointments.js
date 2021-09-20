/* Given a list of appointments, find all the conflicting appointments. */

// T: O(nlogn)
// S: O(n) --> for the sorted array and the output array.
// where n = # of intervals

// This question very similar to 05-conflicting-appointments, except that instead of returning false after finding one instance of overlap, every time we find an overlap, we add the overlapping intervals to an array of conflictingAppointments, and return the array at the end.

const findAllConflictingAppointments = (intervals) => {
  const sortedIntervals = intervals.sort((a, b) => a.start - b.start);
  const conflictingAppointments = [];

  for (let i = 0; i < sortedIntervals.length - 1; i++) {
    // Note, the comparison is exclusive (> vs. >=), because when the start time of the next appointment is the same as the end time of the preceiding appointment, we assume you can still attend the next appointment immediately after your preceding appointment ends.
    if (sortedIntervals[i].end > sortedIntervals[i + 1].start) {
      const lastConflictingAppointment = conflictingAppointments.pop();
      // compare the most recently added conflicting appointment with the first conflicting appointment to add in the current iteration, to see if they are duplicates. If not, add back the popped conflicting appointment (the most recently added conflicting appointment).
      if (lastConflictingAppointment &&  sortedIntervals[i] !== lastConflictingAppointment) {
        conflictingAppointments.push(lastConflictingAppointment);
      }

      conflictingAppointments.push(sortedIntervals[i], sortedIntervals[i + 1]);
    }
  }

  return conflictingAppointments;
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

console.log(findAllConflictingAppointments([new Interval(1, 4), new Interval(2, 5), new Interval(7, 9)]));
console.log(findAllConflictingAppointments([new Interval(6, 7), new Interval(2, 4), new Interval(5, 6)]));
console.log(findAllConflictingAppointments([new Interval(1, 4), new Interval(2, 6), new Interval(3, 5)]));
console.log(findAllConflictingAppointments([new Interval(1, 3), new Interval(0, 1), new Interval(4, 5), new Interval(8, 9), new Interval(10, 17)]));
console.log(findAllConflictingAppointments([new Interval(2, 3), new Interval(0, 1), new Interval(4, 5), new Interval(8, 9), new Interval(12, 17), new Interval(10, 12)]));

