const swap = (one, two, arr = null) => {
  if (arr) {
    [arr[one], arr[two]] = [arr[two], arr[one]];
  }
  else {
    [one, two] = [two, one];
  }
}

module.exports = swap;
