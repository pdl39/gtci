/* Given a set with distinct elements, find all of its distinct subsets. */

// T: O(2^n * n) --> In total, we need operations on the entire subsets that get created, which is 2^n - for each subsequent number from the input array of size n, we get 2 times more subsets vs. previous number, meaning the number of subsets required doubles for each subsequent number. And for each subset, we need to copy the subset, which takes n operations in the worst case. Thus overall it takes 2^n * n operations.
// S: O(2^n  * n) --> 2^n for the output subsets, and each subset can have up to n numbers in it, so the space required will be 2^n * n.
// where n = # of distinct numbers, or the input array length.

const findAllSubsets = (distinctNums) => {
  const subsets = [[]]; // begin with an empty subset.

  for (let i = 0; i < distinctNums.length; i++) {
    const subsetsLen = subsets.length;

    for (let j = 0; j < subsetsLen; j++) {
      const subsetCopy = [...subsets[j]];
      subsetCopy.push(distinctNums[i]);
      subsets.push(subsetCopy);
    }
  }

  return subsets;
}


// TEST
const ex1 = [0, 1, 2, 5, 4, 3, 6, 8, 11];
console.log(findAllSubsets(ex1));
