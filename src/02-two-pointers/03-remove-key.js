/* Given an unsorted array of numbers and a target ‘key’, remove all instances of ‘key’ in-place and return the new length of the array. */

// T: O(n)
// S: O(1)
// where n = array length

// This question is very similar to 02-remove-duplicates, except that instead of removing duplicates, we are removing all instances of a specific element designated by the key.

const removeKey = (arr, key) => {
  let nextNonKey = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== key) {
      arr[nextNonKey++] = arr[i];
    }
  }

  return nextNonKey;
}


// TEST
console.log(removeKey([1, 2, 2, 3, 5, 3, 3, 6, 8, 2, 3, 3, 2], 3));
console.log(removeKey([3, 3, 3, 3, 3, 6, 3, 3, 3, 3, 3], 3));
console.log(removeKey([3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 3));
