/* For ‘K’ employees, we are given a list of intervals representing the working hours of each employee. Our goal is to find out if there is a free interval that is common to all employees. You can assume that each list of employee working hours is sorted on the start time. */

const Interval = require('../../ds/Interval');
const EmployeeInterval = require('../../ds/EmployeeInterval');
const PriorityQueue = require('../../ds/PriorityQueue');

// #2 Optimal solution: Since each employee's schedles are sorted by start time, we can use the Heap to keep track of the earliest schedule among all employees at any given time, instead of combining and sorting all schedules by ordering the heap by schedule interval start. Since an employee will have no overlapping schedule intervals for himself, we can simply check whether common free times exist among employees by keeping only the earliest schedule interval for each employee in the heap at a time and comparing the first and the next intervals. Note that if there are any overlapping intervals for a single employee, this method will not work.

// T: O(nlogk) --> O(n) for iterating through all intervals. At each interval, we need O(logk) operations since at any given time, the heap has k elements and removing/adding in the heap requires in the worst case logk (depth of heap) operations.
// S: O(k) --> At any given time, the heap only has k elements.
// where k = # of employees (length of the employeeSchedules array, as apposed to n, which represents all schedule intervals across all employees).

const findCommonEmployeeFreeTime2 = (employeeSchedules) => {
  if (!employeeSchedules || !employeeSchedules.length) return [];

  const freeTimes = [];
  const schedulesHeap = new PriorityQueue((a, b) => a.interval.start < b.interval.start);

  // Add the first schedule interval for each employee to the heap for total k employees. This will add only one interval per employee to the heap, and the heap will make sure the schedule with the lowest start time goes at the top. This reordering of the heap will take O(logk).
  for (let i = 0; i < employeeSchedules.length; i++) {
    schedulesHeap.add(new EmployeeInterval(employeeSchedules[i][0], 0, i));
  }

  // As long as the heap isn't empty, compare the first two schedule intervals and add to free times if they don't overlap.
  let topInterval = schedulesHeap.peek().interval;
  while (schedulesHeap.size) {
    const nextSchedule = schedulesHeap.poll();

    // When we encounter non-overlapping intervals, add the non-overlapping time interval to the free times result array.
    if (topInterval.end < nextSchedule.interval.start) {
      freeTimes.push(new Interval(topInterval.end, nextSchedule.interval.start));
      topInterval = nextSchedule.interval;
    }
    else {
      // we don't update the topInterval if topInterval's end time is bigger than or equal to the next interval's end time.
      if (topInterval.end < nextSchedule.interval.end) {
        topInterval = nextSchedule.interval;
      }
    }

    // If available, add to the heap the next schedule interval for the employee whose interval has been popped off the heap.
    const employeeSchedule = employeeSchedules[nextSchedule.employeeIndex];
    if (employeeSchedule.length > nextSchedule.intervalIndex + 1) {
      schedulesHeap.add(new EmployeeInterval(employeeSchedule[nextSchedule.intervalIndex + 1], nextSchedule.intervalIndex + 1, nextSchedule.employeeIndex));
    }
  }

  return freeTimes;
}

// #1

// T: O(nlogn)
// S: O(n) --> O(4n): n for the combined array, n for the sorted array, n for the heap, n for the result array.
// where n = # of employee schedule intervals (each employeeSchedule array represents all the schedule intervals for an employee)

const findCommonEmployeeFreeTime = (employeeSchedules) => {
  const combinedSchedules = [];
  for (let i = 0; i < employeeSchedules.length; i++) {
    const currentEmployeeSchedule = employeeSchedules[i];
    for (let j = 0; j < currentEmployeeSchedule.length; j++) {
      combinedSchedules.push(currentEmployeeSchedule[j]);
    }
  }

  const sortedSchedules = combinedSchedules.sort((a, b) => a.start - b.start);
  const overlappingSchedules = new PriorityQueue((a, b) => a.end < b.end);

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

// #1
console.log(findCommonEmployeeFreeTime([[new Interval(1, 4), new Interval(5, 6)], [new Interval(7, 9)]]));
console.log(findCommonEmployeeFreeTime([[new Interval(2, 4), new Interval(6, 7)], [new Interval(5, 6)]]));
console.log(findCommonEmployeeFreeTime([[new Interval(1, 2), new Interval(3, 6)], [new Interval(3, 5)]]));
console.log(findCommonEmployeeFreeTime([[new Interval(1, 3), new Interval(4, 6)], [new Interval(3, 5)]]));
console.log(findCommonEmployeeFreeTime([[new Interval(0, 1), new Interval(1, 3)], [new Interval(4, 5), new Interval(8, 9), new Interval(10, 17)]]));
console.log(findCommonEmployeeFreeTime([[new Interval(0, 1), new Interval(2, 3)], [new Interval(4, 5), new Interval(8, 9)], [new Interval(10, 11), new Interval(12, 17)]]));
console.log(findCommonEmployeeFreeTime([[new Interval(1, 2), new Interval(3, 5), new Interval(7, 8)], [new Interval(2, 4), new Interval(5, 6), new Interval(10, 12)]]));
console.log(findCommonEmployeeFreeTime([[new Interval(1, 2), new Interval(3, 5), new Interval(7, 8), new Interval(11, 12)], [new Interval(3, 6)], [new Interval(10, 12), new Interval(13, 14)]]));
console.log(findCommonEmployeeFreeTime([[new Interval(1, 2), new Interval(3, 5), new Interval(7, 8), new Interval(11, 12)], [new Interval(3, 6), new Interval(14, 15)], [new Interval(10, 12), new Interval(13, 14)]]));
console.log(findCommonEmployeeFreeTime([[new Interval(0, 1), new Interval(1, 2), new Interval(3, 5)], [new Interval(10, 11), new Interval(13, 14)], [new Interval(3, 6), new Interval(5, 7), new Interval(8, 9), new Interval(10, 12)]]));
console.log(findCommonEmployeeFreeTime([[new Interval(0, 1), new Interval(1, 2), new Interval(4, 5)], [new Interval(10, 11), new Interval(13, 14)], [new Interval(3, 6), new Interval(5, 7), new Interval(8, 9), new Interval(10, 12), new Interval(15, 16)]]));

console.log('-----')

// #2
console.log(findCommonEmployeeFreeTime2([[new Interval(1, 4), new Interval(5, 6)], [new Interval(7, 9)]]));
console.log(findCommonEmployeeFreeTime2([[new Interval(2, 4), new Interval(6, 7)], [new Interval(5, 6)]]));
console.log(findCommonEmployeeFreeTime2([[new Interval(1, 2), new Interval(3, 6)], [new Interval(3, 5)]]));
console.log(findCommonEmployeeFreeTime2([[new Interval(1, 3), new Interval(4, 6)], [new Interval(3, 5)]]));
console.log(findCommonEmployeeFreeTime2([[new Interval(0, 1), new Interval(1, 3)], [new Interval(4, 5), new Interval(8, 9), new Interval(10, 17)]]));
console.log(findCommonEmployeeFreeTime2([[new Interval(0, 1), new Interval(2, 3)], [new Interval(4, 5), new Interval(8, 9)], [new Interval(10, 11), new Interval(12, 17)]]));
console.log(findCommonEmployeeFreeTime2([[new Interval(1, 2), new Interval(3, 5), new Interval(7, 8)], [new Interval(2, 4), new Interval(5, 6), new Interval(10, 12)]]));
console.log(findCommonEmployeeFreeTime2([[new Interval(1, 2), new Interval(3, 5), new Interval(7, 8), new Interval(11, 12)], [new Interval(3, 6)], [new Interval(10, 12), new Interval(13, 14)]]));
console.log(findCommonEmployeeFreeTime2([[new Interval(1, 2), new Interval(3, 5), new Interval(7, 8), new Interval(11, 12)], [new Interval(3, 6), new Interval(14, 15)], [new Interval(10, 12), new Interval(13, 14)]]));
console.log(findCommonEmployeeFreeTime2([[new Interval(0, 1), new Interval(1, 2), new Interval(3, 5)], [new Interval(10, 11), new Interval(13, 14)], [new Interval(3, 6), new Interval(5, 7), new Interval(8, 9), new Interval(10, 12)]]));
console.log(findCommonEmployeeFreeTime2([[new Interval(0, 1), new Interval(1, 2), new Interval(4, 5)], [new Interval(10, 11), new Interval(13, 14)], [new Interval(3, 6), new Interval(5, 7), new Interval(8, 9), new Interval(10, 12), new Interval(15, 16)]]));
