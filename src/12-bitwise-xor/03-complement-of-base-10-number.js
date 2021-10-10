/* Every non-negative integer N has a binary representation, for example, 8 can be represented as “1000” in binary and 7 as “0111” in binary.

The complement of a binary representation is the number in binary that we get when we change every 1 to a 0 and every 0 to a 1. For example, the binary complement of “1010” is “0101”.

For a given positive number N in base-10, return the complement of its binary representation as a base-10 integer.

Example 1:

Input: 8
Output: 7
Explanation: 8 is 1000 in binary, its complement is 0111 in binary, which is 7 in base-10.
Example 2:

Input: 10
Output: 5
Explanation: 10 is 1010 in binary, its complement is 0101 in binary, which is 5 in base-10. */

// T: O(1)
// S: O(1)

const complementOfBase10 = (num) => {
  const bitLen = Math.floor(Math.log2(num)) + 1;
  const all1mask = (1 << bitLen) - 1; // the number that is 1 less than the number that is a 2's power of n, where n is a whole number, has all n - 1 digits set to 1. e.g. 2^4 = 16 = '10000'. 16 - 1 = 15 = '1111'.

  return num ^ all1mask;
}


// TEST
console.log(complementOfBase10(8));
console.log(complementOfBase10(15));
console.log(complementOfBase10(10));
console.log(complementOfBase10(4));
