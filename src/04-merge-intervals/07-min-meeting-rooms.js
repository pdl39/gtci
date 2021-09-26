const Interval = require("../../ds/Interval");
const MinIntervalEndHeap = require("../../ds/MinIntervalEndHeap");

/* Given a list of intervals representing the start and end time of ‘N’ meetings, find the minimum number of rooms required to hold all the meetings. */

// T: O(nlogn) --> nlogn for sorting & nlogn for heap management (removing/adding in heap takes O(logn) - the depth of the heap tree - and we repeat this n times - for each meeting interval - so overall heap management for the meetings takes O(nlogn))
// S: O(n) --> n for sorted array & n for the heap.
// where n = # of meeting intervals (meetings array length).

const minMeetingRooms = (meetings) => {
  if (!meetings.length) return 0;

  const sortedMeetings = meetings.sort((a, b) => a.start - b.start);
  const activeMeetings = new MinIntervalEndHeap();

  let minRooms = 0;

  for (let i = 0; i < sortedMeetings.length; i++) {
    // Remove any meetings in the active heap that has finished prior to the current meeting.
    while (activeMeetings.size && activeMeetings.peek().end <= sortedMeetings[i].start) {
      activeMeetings.poll();
    }

    // Add the current meeting to the active heap.
    activeMeetings.add(sortedMeetings[i]);

    // Update the minRooms needed if the current active meetings heap size > current minRooms count.
    minRooms = Math.max(minRooms, activeMeetings.size);
  }

  return minRooms;
}


// TEST
console.log(minMeetingRooms([new Interval(1, 4), new Interval(2, 5), new Interval(7, 9)]));
console.log(minMeetingRooms([new Interval(6, 7), new Interval(2, 4), new Interval(5, 6)]));
console.log(minMeetingRooms([new Interval(1, 4), new Interval(2, 6), new Interval(3, 5)]));
console.log(minMeetingRooms([new Interval(1, 4), new Interval(4, 6), new Interval(3, 5)]));
console.log(minMeetingRooms([new Interval(1, 3), new Interval(0, 1), new Interval(4, 5), new Interval(8, 9), new Interval(10, 17)]));
console.log(minMeetingRooms([new Interval(2, 3), new Interval(0, 1), new Interval(4, 5), new Interval(8, 9), new Interval(12, 17), new Interval(10, 12)]));
console.log(minMeetingRooms([new Interval(1, 2), new Interval(3, 5), new Interval(3, 6), new Interval(2, 4), new Interval(3, 6), new Interval(10, 12)]));
console.log(minMeetingRooms([new Interval(1, 2), new Interval(3, 5), new Interval(3, 6), new Interval(2, 4), new Interval(3, 6), new Interval(10, 12), new Interval(10, 12)]));
console.log(minMeetingRooms([new Interval(1, 2), new Interval(3, 5), new Interval(3, 6), new Interval(2, 4), new Interval(3, 6), new Interval(10, 12), new Interval(10, 12), new Interval(11, 13), new Interval(11, 12)]));
