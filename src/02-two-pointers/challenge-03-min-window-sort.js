/* Given an array, find the length of the smallest subarray in it which when sorted will sort the whole array. */

// T: O(n)
// S: O(1)
// where n = array length.

const minWindowSort = function(arr) {
  // we will keep track of the low and high range that needs to be sorted.
  let low = 0;
  let high = arr.length - 1;

  // as long as current el < next el, increment low bound.
  while (low < arr.length - 1 && arr[low] <= arr[low + 1]) {
    low++;
  }

  // if we have increased low until the end of arr, all elements are already sorted.
  if (low === arr.length - 1) return 0;

  // same with high bound, as long as current el > prev el, decrement high bound.
  while (high > 0 && arr[high] >= arr[high - 1]) {
    high--;
  }

  // we are not done. since elements to the right of the current high bound can still have elements that are still less than a number in the current range that haven't yet seen from the high side.
  // same with the left of the current low bound, which can still have elements that are bigger than a number in the current range.
  // we need to find the max and min of the current range and extend the range to include any number to the right that is less than the subarray's max and any number to the left that is greater than the subarray's min.

  // find max, min of the subarray.
  let subarrMax = -Infinity;
  let subarrMin = Infinity;
  for (let i = low; i < high + 1; i++) {
    subarrMax = Math.max(subarrMax, arr[i]);
    subarrMin = Math.min(subarrMin, arr[i]);
  }

  while (low > 0 && arr[low - 1] > subarrMin) {
    low--;
  }

  while (high < arr.length - 1 && arr[high + 1] < subarrMax) {
    high++;
  }

  return high - low + 1;
};


// TEST
console.log(minWindowSort([2, 4, 8, 3, 1, 6, 15]));
console.log(minWindowSort([2, 5, 3, 3, 4, 10, 11, 15]));
console.log(minWindowSort([2, 4, 8, 6, 4, 11, 15]));
console.log(minWindowSort([2, 4, 8, 9, 10, 11, 15]));
console.log(minWindowSort([1, 2, 3, 1, 2, 3, 1, 2, 2]));
console.log(minWindowSort([8, 7, 6, 5, 4, 3, 2, 1, 0]));
console.log(minWindowSort([-1, 8, 7, 6, 5, 4, 3, 2, 1, 0, 10]));
