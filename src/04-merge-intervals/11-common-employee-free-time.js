/* For ‘K’ employees, we are given a list of intervals representing the working hours of each employee. Our goal is to find out if there is a free interval that is common to all employees. You can assume that each list of employee working hours is sorted on the start time. */

// T: O(nlogn)
// S: O(n) --> O(4n): n for the combined array, n for the sorted array, n for the heap, n for the result array.
// where n = # of employee schedule intervals (each employeeSchedule array represents all the schedule intervals for an employee)

const Interval = require('../../ds/Interval');
const MinIntervalEndHeap = require('../../ds/MinIntervalEndHeap');

const findCommonEmployeeFreeTime = (employeeSchedules) => {
  const combinedSchedules = [];
  for (let i = 0; i < employeeSchedules.length; i++) {
    const currentEmployeeSchedule = employeeSchedules[i];
    for (let j = 0; j < currentEmployeeSchedule.length; j++) {
      combinedSchedules.push(currentEmployeeSchedule[j]);
    }
  }

  const sortedSchedules = combinedSchedules.sort((a, b) => a.start - b.start);
  const overlappingSchedules = new MinIntervalEndHeap();

  const freeTimes = [];

  for (let i = 0; i < sortedSchedules.length; i++) {
    while (overlappingSchedules.size && overlappingSchedules.peek().end <= sortedSchedules[i].start) {
      const removedSchedule = overlappingSchedules.poll();

      if (!overlappingSchedules.size && removedSchedule.end < sortedSchedules[i].start) {
        freeTimes.push(new Interval(removedSchedule.end, sortedSchedules[i].start));
      }
    }

    overlappingSchedules.add(sortedSchedules[i]);
  }

  return freeTimes;
}


// TEST
console.log(findCommonEmployeeFreeTime([[new Interval(1, 4), new Interval(2, 5)], [new Interval(7, 9)]]));
console.log(findCommonEmployeeFreeTime([[new Interval(6, 7), new Interval(2, 4)], [new Interval(5, 6)]]));
console.log(findCommonEmployeeFreeTime([[new Interval(1, 4), new Interval(2, 6)], [new Interval(3, 5)]]));
console.log(findCommonEmployeeFreeTime([[new Interval(1, 4), new Interval(4, 6)], [new Interval(3, 5)]]));
console.log(findCommonEmployeeFreeTime([[new Interval(1, 3), new Interval(0, 1)], [new Interval(4, 5), new Interval(8, 9), new Interval(10, 17)]]));
console.log(findCommonEmployeeFreeTime([[new Interval(2, 3), new Interval(0, 1)], [new Interval(4, 5), new Interval(8, 9)], [new Interval(12, 17), new Interval(10, 12)]]));
console.log(findCommonEmployeeFreeTime([[new Interval(1, 2), new Interval(3, 5), new Interval(3, 6)], [new Interval(2, 4), new Interval(3, 6), new Interval(10, 12)]]));
console.log(findCommonEmployeeFreeTime([[new Interval(1, 2), new Interval(3, 5), new Interval(3, 6), new Interval(2, 4)], [new Interval(3, 6)], [new Interval(10, 12), new Interval(10, 12)]]));
console.log(findCommonEmployeeFreeTime([[new Interval(1, 2), new Interval(3, 5)], [new Interval(3, 6), new Interval(2, 4), new Interval(3, 6)], [new Interval(10, 12), new Interval(10, 12), new Interval(11, 13), new Interval(11, 12)]]));
console.log(findCommonEmployeeFreeTime([[new Interval(1, 2), new Interval(3, 5), new Interval(3, 6), new Interval(2, 4)], [new Interval(3, 6)], [new Interval(10, 12), new Interval(10, 12), new Interval(11, 13)], [new Interval(11, 12), new Interval(15, 16)]]));
