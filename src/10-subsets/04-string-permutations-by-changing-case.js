/* Given a string, find all of its permutations preserving the character sequence but changing case.

Example 1:

Input: "ad52"
Output: "ad52", "Ad52", "aD52", "AD52"
Example 2:

Input: "ab7c"
Output: "ab7c", "Ab7c", "aB7c", "AB7c", "ab7C", "Ab7C", "aB7C", "AB7C" */

// T: O(n * 2^n) --> For each char in the string, we copy (with just the current char converted to upper case) all existing permutation strings, which requires o(n) time. In total, we do 2^k operations, since for each char of the string, the number of exisiting permutation strings doubles, and after the last char, we will have looked at k chars, for a total of 2^k permutations. In the worst case, k = n, so the overall time complexity will be O(n * 2^n).
// S: O(n * 2^n) --> 2^k for the output permutations array. Each permutation string will have n charcters. In the worst case, k = n, so overall space required will be O(n * 2^n).
// where n = string length, k = # of alphabet characters in the input string.

const findAllStrPermutations = (str) => {
  const permutations = [str];

  for (let i = 0; i < str.length; i++) {
    if (!isNaN(str[i])) continue;
    const permutationsLen = permutations.length;

    for (let j = 0; j < permutationsLen; j++) {
      // copy each permutation string (as an array).
      const permutationStr = permutations[j].split('');

      // if the char at i is in lowercase, make it uppercase.
      // if the char at i is in uppercase, make it lowercase.
      if (permutationStr[i] === permutationStr[i].toLowerCase()) {
        permutationStr[i] = permutationStr[i].toUpperCase();
      }
      else {
        permutationStr[i] = permutationStr[i].toLowerCase();
      }
      const newPermStr = permutationStr.join('');

      // add to the result array.
      permutations.push(newPermStr);
    }
  }

  return permutations;
}


// TEST
console.log(findAllStrPermutations('0b8cd'));
console.log(findAllStrPermutations('0b8Cd'));
console.log(findAllStrPermutations('ab89cd'));
console.log(findAllStrPermutations('ab89Cd'));
