const Interval = require('./Interval');

class Job extends Interval {
  constructor(start, end, cpuLoad) {
    super(start, end);
    this.cpuLoad = cpuLoad;
  }

  getJob() {
    return [this.start, this.end, this.cpuLoad];
  }
}

module.exports = Job;
