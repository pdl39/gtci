/* Given an infinite sorted array (or an array with unknown size), find if a given number ‘key’ is present in the array. Write a function to return the index of the ‘key’ if it is present in the array, otherwise return -1.

Since it is not possible to define an array with infinite (unknown) size, you will be provided with an interface ArrayReader to read elements of the array. ArrayReader.get(index) will return the number at index; if the array’s size is smaller than the index, it will return Integer.MAX_VALUE.

Example 1:

Input: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30], key = 16
Output: 6
Explanation: The key is present at index '6' in the array.
Example 2:

Input: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30], key = 11
Output: -1
Explanation: The key is not present in the array.
Example 3:

Input: [1, 3, 8, 10, 15], key = 15
Output: 4
Explanation: The key is present at index '4' in the array.
Example 4:

Input: [1, 3, 8, 10, 15], key = 200
Output: -1
Explanation: The key is not present in the array. */

// T: O(logn) --> we do 2 logn operations, once to find the upper bound, once to find the key.
// S: O(1)
// where n = maximum length of the input array.

class ArrayReader {
  constructor(arr) {
    this.arr = arr;
  }

  get(index) {
    if (index >= this.arr.length) {
      return Infinity;
    }
    return this.arr[index];
  }
}

const searchInSortedInfiniteArr = (arrReader, key) => {
  // we need to first find a workable bound before doing a binary search.
  // This will be a bound that will contain the key (last element >= key). To do this, let's start with a bound of 1 and double the bound until we find the workable bound.

  let low = 0, high = 1;
  while (arrReader.get(high) < key) {
    high *= 2;
  }
  // At the end of this loop, we will have a workable bound.
  // from here, this is just a regular binary search.
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);

    if (arrReader.get(mid) === key) return mid;

    if (arrReader.get(mid) < key) {
      low = mid + 1;
    }
    else {
      high = mid - 1;
    }
  }

  return -1;
}


// TEST
const arrReader1 = new ArrayReader([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 13, 14, 16, 18, 19, 20, 22, 24, 25, 30, 33]);
const arrReader2 = new ArrayReader([1, 2, 3]);

console.log(searchInSortedInfiniteArr(arrReader1, 30));
console.log(searchInSortedInfiniteArr(arrReader1, 2));
console.log(searchInSortedInfiniteArr(arrReader1, 1));
console.log(searchInSortedInfiniteArr(arrReader1, 33));
console.log(searchInSortedInfiniteArr(arrReader1, 32));
console.log(searchInSortedInfiniteArr(arrReader2, 3));
console.log(searchInSortedInfiniteArr(arrReader2, 2));
console.log(searchInSortedInfiniteArr(arrReader2, 0));
