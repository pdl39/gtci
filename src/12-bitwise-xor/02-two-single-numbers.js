/* In a non-empty array of numbers, every number appears exactly twice except two numbers that appear only once. Find the two numbers that appear only once. */

// T: O(n)
// S: O(1)
// where n = input array length.

const findTwoSingleNumbers = (arr) => {
  let n1XORn2 = 0;

  arr.forEach(num => n1XORn2 ^= num);
  // n1XORn2 = n1 ^ n2.
  // Since n1 and n2 are two different numbers, they must have at least one different bit, which would be a 1 bit.
  // Let's find the right-most 1bit from n1XORn2.

  let rightMost1bit = 1;
  while ((n1XORn2 & rightMost1bit) === 0) {
    rightMost1bit = rightMost1bit << 1; // left shift until we find the first 1-bit.
  }

  // Now, we will run another round of XOR operations on the arr, but this time using the rightmost 1 bit as a separator. This will divide the arr into 2 groups, one where the particular bit is 1, and another where it is not. Since all other numbers are duplicates and duplicates will belong to the same group, each group will be left with a single number, each of which are the numbers we are looking for - n1 and n2.

  let n1 = 0;
  let n2 = 0;

  arr.forEach((num) => {
    if (num & rightMost1bit) {
      n1 ^= num;
    }
    else {
      n2 ^= num;
    }
  });

  return [n1, n2];
}


// TEST
console.log(findTwoSingleNumbers([1, 7, 5, 9, 9, 12, 8, 5, 1, 7]));
console.log(findTwoSingleNumbers([1, 6, 3, 6, 7, 5, 8, 9, 2, 9, 8, 5, 1, 7]));
console.log(findTwoSingleNumbers([22, 1, 6, 3, 3, 6, 7, 5, 8, 9, 9, 8, 5, 1, 7, 11]));
