/* Given a sorted array of numbers, find if a given number ‘key’ is present in the array. Though we know that the array is sorted, we don’t know if it’s sorted in ascending or descending order. You should assume that the array can have duplicates.

Write a function to return the index of the ‘key’ if it is present in the array, otherwise return -1. */


// #2: Iterative Solution
// T: O(logn) --> binary search takes logn operations.
// S: O(1)
// where n = input array length.

const orderAgnosticBinarySearch2 = (arr, key) => {
  if (!arr.length) return -1;

  let low = 0;
  let high = arr.length - 1;
  const isAscending = arr[high] >= arr[low];

  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);

    if (arr[mid] === key) return mid;

    if (isAscending && arr[mid] > key || !isAscending && arr[mid] < key) {
      high = mid - 1;
    }
    else {
      low = mid + 1;
    }
  }

  return -1;
}

// #1: Recursive Solution
// T: O(logn) --> since array is sorted, using binary search looks at only 1/2 number of elements in each subsequent iteration, requiring just logn operations.
// S: O(logn) --> the binary search will require logn recursion stack space.
// where n = input array length.

const orderAgnosticBinarySearch = (arr, key) => {
  if (!arr.length) return -1;

  let isAscending = arr[arr.length - 1] >= arr[0];

  return orderAgnosticBinarySearchRecursive(arr, 0, arr.length, isAscending, key);
}

const orderAgnosticBinarySearchRecursive = (arr, low, high, isAscending, key) => {
  const mid = Math.floor((low + high) / 2); // this method of finding the middle number may not work in some other languages - e.g. Java, C++ - if the values low or high is bigger than the max integer value, leading to integer overflow. Below method is the safer method to use:
  // const mid = low + Math.floor((high - low) / 2);

  // base cases
  if (low > high) return -1;
  if (arr[mid] === key) return mid;

  // recursive case
  if (arr[mid] < key && isAscending || arr[mid] > key && !isAscending) {
    return orderAgnosticBinarySearchRecursive(arr, mid + 1, high, isAscending, key);
  }
  else {
    return orderAgnosticBinarySearchRecursive(arr, low, mid - 1, isAscending, key);
  }
}


// TEST
// #2
console.log(orderAgnosticBinarySearch2([10, 8, 6, 4, 3, 2, 1], 6));
console.log(orderAgnosticBinarySearch2([10, 8, 6, 4, 3, 2, 1], 7));
console.log(orderAgnosticBinarySearch2([0, 1, 2, 3, 4, 5, 7, 8, 9, 15, 16, 20], 7));
console.log(orderAgnosticBinarySearch2([0, 1, 2, 3, 4, 5, 7, 8, 9, 15, 16, 20], 6));
console.log(orderAgnosticBinarySearch2([4, 6, 10], 10));
console.log(orderAgnosticBinarySearch2([1, 2, 3, 4, 5, 6, 7], 5));
console.log(orderAgnosticBinarySearch2([10, 6, 4], 10));
console.log(orderAgnosticBinarySearch2([10, 6, 4], 4));
console.log(orderAgnosticBinarySearch2([3], 3));
console.log(orderAgnosticBinarySearch2([3], 1));
console.log(orderAgnosticBinarySearch2([], 1));

console.log('-----------');

// #1
console.log(orderAgnosticBinarySearch([10, 8, 6, 4, 3, 2, 1], 6));
console.log(orderAgnosticBinarySearch([10, 8, 6, 4, 3, 2, 1], 7));
console.log(orderAgnosticBinarySearch([0, 1, 2, 3, 4, 5, 7, 8, 9, 15, 16, 20], 7));
console.log(orderAgnosticBinarySearch([0, 1, 2, 3, 4, 5, 7, 8, 9, 15, 16, 20], 6));
console.log(orderAgnosticBinarySearch([4, 6, 10], 10));
console.log(orderAgnosticBinarySearch([1, 2, 3, 4, 5, 6, 7], 5));
console.log(orderAgnosticBinarySearch([10, 6, 4], 10));
console.log(orderAgnosticBinarySearch([10, 6, 4], 4));
console.log(orderAgnosticBinarySearch([3], 3));
console.log(orderAgnosticBinarySearch([3], 1));
console.log(orderAgnosticBinarySearch([], 1));
