/* Given a set of distinct numbers, find all of its permutations.

Permutation is defined as the re-arranging of the elements of the set. For example, {1, 2, 3} has the following six permutations:

{1, 2, 3}
{1, 3, 2}
{2, 1, 3}
{2, 3, 1}
{3, 1, 2}
{3, 2, 1}
If a set has ānā distinct elements it will have n! permutations. */

const Queue = require('../../ds/Queue');

// T: O(n * n!) --> we are essentially doing n! operations to get all the permutations. For each permutation, we need to copy it. Also, inserting the current number into each permutation takes O(n). So we need n operations overall for each permutation, resulting in O(n * n!) operations.
// S: O(n * n!) --> n! for the result permutations. Each permutation in the result permutations will contain n numbers, so the overall space required will be O(n * n!)
// where n = # of distinct numbers, or the input array length.


// #1
const findAllPermutations = (nums) => {
  const result = [];
  const permutations = new Queue([]);

  for (let i = 0; i < nums.length; i++) {
    const permutationsLen = permutations.length;

    for (let j = 0; j < permutationsLen; j++) {
      const prevPermutation = permutations.dequeue().value;

      for (let k = 0; k < prevPermutation.length + 1; k++) {
        const newPermutation = [...prevPermutation];
        newPermutation.splice(k, 0, nums[i]);

        if (newPermutation.length === nums.length) { // if newPermutation length is equal to nums length, it means we are at the last number, so we can now add to the final result array.
          result.push(newPermutation);
        }
        else { // before we are at the last number, we need to keep updating the permutations list with the permutations containing the newly added number.
          permutations.add(newPermutation);
        }
      }
    }
  }

  return result;
}


// #2: Recursive solution
const findAllPermutations2 = (nums) => {
  const result = [];
  findAllPermutationsRecursive(nums, 0, [], result);
  return result;
}

const findAllPermutationsRecursive = (nums, index, currentPermutation, result) => {
  if (index === nums.length) {
    result.push(currentPermutation);
  }
  else {
    for (let i = 0; i < currentPermutation.length + 1; i++) {
      const newPermutation = [...currentPermutation];
      newPermutation.splice(i, 0, nums[index]);

      findAllPermutationsRecursive(nums, index + 1, newPermutation, result);
    }
  }
}


// TEST
const ex1 = [1];
const ex2 = [1, 2];
const ex3 = [1, 2, 3];
const ex4 = [1, 2, 3, 4];
const ex5 = [1, 2, 3, 4, 5];
console.log(findAllPermutations(ex1));
console.log(findAllPermutations(ex2));
console.log(findAllPermutations(ex3));
console.log(findAllPermutations(ex4));
console.log(findAllPermutations(ex5));
console.log(findAllPermutations2(ex1));
console.log(findAllPermutations2(ex2));
console.log(findAllPermutations2(ex3));
console.log(findAllPermutations2(ex4));
console.log(findAllPermutations2(ex5));
