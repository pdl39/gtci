/* Given an array of sorted numbers, remove all duplicates from it. You should not use any extra space; after removing the duplicates in-place return the length of the subarray that has no duplicate in it. */

// T: O(n)
// S: O(1)
// where n = array length

const removeDuplicates = (arr) => {
  let nextNonDuplicate = 1;

  for (let next = 1; next < arr.length; next++) {
    if (arr[nextNonDuplicate - 1] !== arr[next]) {
      arr[nextNonDuplicate++] = arr[next];
    }
  }

  return nextNonDuplicate;
};


// TEST
console.log(removeDuplicates([1, 1, 3, 4, 5, 5, 5, 7, 9, 12, 12, 15]));
