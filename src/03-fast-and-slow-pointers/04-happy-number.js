/* Any number will be called a happy number if, after repeatedly replacing it with a number equal to the sum of the square of all of its digits, leads us to number ‘1’. All other (not-happy) numbers will never reach ‘1’. Instead, they will be stuck in a cycle of numbers which does not include ‘1’.

For example,
ex1) 23 is a happy number as follows:
2^2 + 3^2 = 4 + 9 = 13
1^2 + 3^2 = 1 + 9 = 10
1^2 + 0^2 = 1 + 0 = 1
after reaching 1, if we continue, it will be a continuous cycle of 1.

ex2) 12 is NOT a happy number as follows:
1^2 + 2^2 = 1 + 4 = 5
5^2 = 25
2^2 + 5^2 = 4 + 25 = 29
2^2 + 9^2 = 4 + 81 = 85
8^2 + 5^2 = 64 + 25 = 89
8^2 + 9^2 = 64 + 81 = 145
1^2 + 4^2 + 5^2 = 1 + 16 + 25 = 42
4^2 + 2^2 = 16 + 4 = 20
2^2 + 0^2 = 4 + 0 = 4
4^2 = 16
1^2 + 6^2 = 1 + 36 = 37
3^2 + 7^2 = 9 + 49 = 58
5^2 + 8^2 = 25 + 64 = 89
... we have already seen 89, so here we have a cycle that goes around 89 without ever reaching 1.
*/

// T: O(logn) -->
/* the time complexity is quite difficult to calculate. When we have a number n with m digits and the next number is n1, the max square sum we can get is 9^2 * m, or 81m (this happens when all digits of a number n are 9). Since the next number (n1) is the square sum of n, this means n1 <= 81m. Since we know m = ceil(log(n)), we can say:
n1 < 81 * log(n), and thus
n1 = O(log(n)) */
// S: O(1)
// where n = the given number.

const findHappyNumber = function(num) {
  let slow = num, fast = num;

  while (num) {
    slow = squareSum(slow);
    fast = squareSum(squareSum(fast));

    if (slow === fast) break;
  }

  return slow === 1; // if the cycle is stuck at 1, the num is a happy number.
};

const squareSum = (num) => {
  let sum = 0;

  while (num > 0) {
    let digit = num % 10;
    sum += digit ** 2;
    num = Math.floor(num / 10);
  }

  return sum;
}


// TEST
console.log(findHappyNumber(23));
console.log(findHappyNumber(12));
console.log(findHappyNumber(1000001));
console.log(findHappyNumber(100000));
