/* Given a list of intervals representing the arrival and departure times of trains to a train station, our goal is to find the minimum number of platforms required for the train station so that no train has to wait. */

// T: O(nlogn)
// S: O(n)
// where n = # of train schedules in the trainsSchedule array.

// This question is essentially the same as 07-min-meeting-rooms.

const MinIntervalEndHeap = require('../../ds/MinIntervalEndHeap');
const Interval = require('../../ds/Interval');

const minPlatformsTrainStation = (trainsSchedule) => {
  const sortedTrainsSchedule = trainsSchedule.sort((a, b) => a.start - b.start);
  const activeTrains = new MinIntervalEndHeap();

  activeTrains.add(sortedTrainsSchedule[0]);
  let minPlatforms = activeTrains.size;

  for (let i = 1; i < sortedTrainsSchedule.length; i++) {
    // remove departed trains.
    while (activeTrains.size && activeTrains.peek().end <= sortedTrainsSchedule[i].start) {
      activeTrains.poll();
    }

    // add the current train schedule.
    activeTrains.add(sortedTrainsSchedule[i]);

    // update minPlatforms.
    minPlatforms = Math.max(minPlatforms, activeTrains.size);
  }

  return minPlatforms;
}


// TEST
console.log(minPlatformsTrainStation([new Interval(1, 4), new Interval(2, 5), new Interval(7, 9)]));
console.log(minPlatformsTrainStation([new Interval(6, 7), new Interval(2, 4), new Interval(5, 6)]));
console.log(minPlatformsTrainStation([new Interval(1, 4), new Interval(2, 6), new Interval(3, 5)]));
console.log(minPlatformsTrainStation([new Interval(1, 4), new Interval(4, 6), new Interval(3, 5)]));
console.log(minPlatformsTrainStation([new Interval(1, 3), new Interval(0, 1), new Interval(4, 5), new Interval(8, 9), new Interval(10, 17)]));
console.log(minPlatformsTrainStation([new Interval(2, 3), new Interval(0, 1), new Interval(4, 5), new Interval(8, 9), new Interval(12, 17), new Interval(10, 12)]));
console.log(minPlatformsTrainStation([new Interval(1, 2), new Interval(3, 5), new Interval(3, 6), new Interval(2, 4), new Interval(3, 6), new Interval(10, 12)]));
console.log(minPlatformsTrainStation([new Interval(1, 2), new Interval(3, 5), new Interval(3, 6), new Interval(2, 4), new Interval(3, 6), new Interval(10, 12), new Interval(10, 12)]));
console.log(minPlatformsTrainStation([new Interval(1, 2), new Interval(3, 5), new Interval(3, 6), new Interval(2, 4), new Interval(3, 6), new Interval(10, 12), new Interval(10, 12), new Interval(11, 13), new Interval(11, 12)]));
