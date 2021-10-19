/* Given two integer arrays to represent weights and profits of ‘N’ items, we need to find a subset of these items which will give us maximum profit such that their cumulative weight is not more than a given number ‘C.’ Each item can only be selected once, which means either we put an item in the knapsack or we skip it.

Given the weights and profits of ‘N’ items, we are asked to put these items in a knapsack with a capacity ‘C.’ The goal is to get the maximum profit out of the knapsack items. Each item can only be selected once, as we don’t have multiple quantities of any item.

Let’s take Merry’s example, who wants to carry some fruits in the knapsack to get maximum profit. Here are the weights and profits of the fruits:

Items: { Apple, Orange, Banana, Melon }
Weights: { 2, 3, 1, 4 }
Profits: { 4, 5, 3, 7 }
Knapsack capacity: 5

Let’s try to put various combinations of fruits in the knapsack, such that their total weight is not more than 5:

Apple + Orange (total weight 5) => 9 profit
Apple + Banana (total weight 3) => 7 profit
Orange + Banana (total weight 4) => 8 profit
Banana + Melon (total weight 5) => 10 profit

This shows that Banana + Melon is the best combination as it gives us the maximum profit, and the total weight does not exceed the capacity.
*/


// #1: Brute force.
// T: O(2^n)
// S: O(n) --> the recursive stack will need n space at any point, corresponding to the height of the recursion tree.
// where n = number of items (length of either weights or profits array).

const zeroOneKnapsackBruteForce = (weights, profits, capacity) => {
  return zeroOneKnapsackBruteForceRecursive(weights, profits, capacity, 0);
};

const zeroOneKnapsackBruteForceRecursive = (weights, profits, remainingCapacity, currentIdx) => {
  if (remainingCapacity <= 0 || currentIdx >= profits.length) return 0;

  // Find the total profit of items in the path that includes the current item.
  // Only keep count of the profit if the weight of the current items doesn't exceed the remaining capacity.
  let profit1 = 0;
  if (weights[currentIdx] <= remainingCapacity) {
    profit1 = profits[currentIdx] + zeroOneKnapsackBruteForceRecursive(weights, profits, remainingCapacity - weights[currentIdx], currentIdx + 1);
  }

  // Find the total profit of items in the path that skips the current item.
  const profit2 = zeroOneKnapsackBruteForceRecursive(weights, profits, remainingCapacity, currentIdx + 1);

  return Math.max(profit1, profit2);
}


// TEST
const weights1 = [3, 2, 7, 5, 1, 2];
const profits1 = [6, 5, 6, 3, 2, 3];
const weights2 = [1, 2, 3, 5];
const profits2 = [1, 6, 10, 16];
const weights3 = [];
const profits3 = [];

console.log(zeroOneKnapsackBruteForce(weights1, profits1, 8));
console.log(zeroOneKnapsackBruteForce(weights1, profits1, 7));
console.log(zeroOneKnapsackBruteForce(weights1, profits1, 5));
console.log(zeroOneKnapsackBruteForce(weights2, profits2, 7));
console.log(zeroOneKnapsackBruteForce(weights2, profits2, 6));

