/* In a non-empty array of integers, every number appears twice except for one, find that single number. */

// T: O(n)
// S: O(1)
// where n = input array length.

const findSingleNumber = (arr) => {
  let x = arr[0];

  for (let i = 1; i < arr.length; i++) {
    x = x ^ arr[i];
  }

  return x;
}


// TEST
console.log(findSingleNumber([1, 7, 5, 9, 9, 8, 5, 1, 7]));
console.log(findSingleNumber([1, 6, 3, 6, 7, 5, 8, 9, 9, 8, 5, 1, 7]));
console.log(findSingleNumber([1, 6, 3, 3, 6, 7, 5, 8, 9, 9, 8, 5, 1, 7, 11]));
