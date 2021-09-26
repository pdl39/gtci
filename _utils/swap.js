const swap = (one, two, arr = null) => {
  // we can swap two indices of an array
  if (arr) {
    [arr[one], arr[two]] = [arr[two], arr[one]];
  }
  // or directly swap two items when no third argument is entered.
  // this will only work when the items to swap are non-primitive data types that are stored by reference (object, array, etc.).
  else {
    [one, two] = [two, one];
  }
}

module.exports = swap;
