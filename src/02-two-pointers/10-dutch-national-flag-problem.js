/* Given an array containing 0s, 1s and 2s, sort the array in-place. You should treat numbers of the array as objects, hence, we can’t count 0s, 1s, and 2s to recreate the array.

The flag of the Netherlands consists of three colors: red, white and blue; and since our input array also consists of three different numbers that is why it is called Dutch National Flag problem. */

// T: O(n)
// S: O(1)
// where n = array length.

const dutchFlagSort = (arr) => {
  // using two pointers, low and high, we will keep all 0's below low, all 2's above high, and all 1's between low and high.
  let low = 0, high = arr.length - 1;
  let i = 0;

  while (i <= high) {
    if (arr[i] === 0) {
      [arr[i], arr[low]] = [arr[low], arr[i]]; // swap
      i++, low++;
    }
    else if (arr[i] === 1) {
      i++;
    }
    else {
      [arr[i], arr[high]] = [arr[high], arr[i]] //swap
      high--;
    }
  }

  return arr;
};


// TEST
console.log(dutchFlagSort([2, 2, 0, 1, 0, 2, 1, 1, 0, 0, 1, 2]));
console.log(dutchFlagSort([1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1]));
console.log(dutchFlagSort([1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1]));
console.log(dutchFlagSort([2, 0, 2, 2, 0, 2, 0, 0, 2, 2]));
console.log(dutchFlagSort([0, 0, 2, 2, 0, 2, 0, 0, 2, 1, 1, 1, 0]));
