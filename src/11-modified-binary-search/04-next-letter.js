/* Given an array of lowercase letters sorted in ascending order, find the smallest letter in the given array greater than a given ‘key’.

Assume the given array is a circular list, which means that the last letter is assumed to be connected with the first letter. This also means that the smallest letter in the given array is greater than the last letter of the array and is also the first letter of the array.

Write a function to return the next letter of the given ‘key’.

Example 1:

Input: ['a', 'c', 'f', 'h'], key = 'f'
Output: 'h'
Explanation: The smallest letter greater than 'f' is 'h' in the given array.
Example 2:

Input: ['a', 'c', 'f', 'h'], key = 'b'
Output: 'c'
Explanation: The smallest letter greater than 'b' is 'c'.
Example 3:

Input: ['a', 'c', 'f', 'h'], key = 'm'
Output: 'a'
Explanation: As the array is assumed to be circular, the smallest letter greater than 'm' is 'a'.
Example 4:

Input: ['a', 'c', 'f', 'h'], key = 'h'
Output: 'a'
Explanation: As the array is assumed to be circular, the smallest letter greater than 'h' is 'a'.
 */

// T: O()
// S: O()
// where

// This question is very similar to 02-ceil-of-a-number, but with a couple of teaks: 1) we are looking the smallest number > key, NOT >= key. 2) the arr is assumed to be cirular, meaning we won't every return -1 for no ceiling found, but there will always be a result, which in the case where the last element of arr is < key, we will just return the first element of the arr.

const nextLetter = (arr, key) => {
  let low = 0, high = arr.length - 1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);

    if (arr[mid] <= key) { // look at right half also when arr[mid] === key.
      low = mid + 1;
    }
    else {
      high = mid - 1;
    }
  }

  return arr[low % arr.length] // this will return arr[0] if low is out of bounds.
}


// TEST
console.log(nextLetter(['a', 'c', 'd', 'g', 't', 'w', 'y'], 'f'));
console.log(nextLetter(['a', 'c', 'd', 'g', 't', 'w', 'y'], 'b'));
console.log(nextLetter(['a', 'c', 'd', 'g', 't', 'w', 'y'], 'x'));
console.log(nextLetter(['a', 'c', 'd', 'g', 't', 'w', 'y'], 'z'));
console.log(nextLetter(['a', 'c', 'd', 'g', 'm', 't', 'w', 'y'], 'a'));
console.log(nextLetter(['a', 'c', 'd', 'g', 'm', 't', 'w', 'y'], 'y'));
console.log(nextLetter(['a', 'c', 'd', 'g', 'm', 't', 'w', 'y'], 'e'));
console.log(nextLetter(['a', 'c', 'd'], 'e'));
console.log(nextLetter(['a', 'c', 'd'], 'b'));
console.log(nextLetter(['a', 'c', 'd'], 'c'));
console.log(nextLetter(['a', 'c'], 'c'));
console.log(nextLetter(['a', 'c'], 'b'));
console.log(nextLetter(['c'], 'a'));
console.log(nextLetter(['c'], 'g'));
console.log(nextLetter([], 'g'));
