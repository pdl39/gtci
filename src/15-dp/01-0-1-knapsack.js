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


/* TIPS ON RECOGNIZING DP PROBLEMS:
  1. Is it an optimization problem?
      --> Finding min or max.
  2. Does the problem entail making a sequence of decisions?
      --> Making optimal decisions at every step to come up with the optimal result.
  IF BOTH OF THESE CHECKS ARE TRUE, THE PROBLEM CAN BE SOLVED USING DYNAMIC PROGRAMMING method.
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


// #2: Top Down DP w/ Memoization.
// T: O(n * c) --> Using memoization requires we do operation on an index-capacity combination only once, since any time we encouter the same combination again, we will simply return from the dp for constant time.
// S: O(n * c) --> the dp two-dimensional array requires n * c space to store all possible combinations. Also, we use n space for the recursion stack.
// where n = number of items (length of either weights or profits array), c = max capacity.

const zeroOneKnapsackMemo = (weights, profits, capacity) => {
  const dp = new Array(profits.length).fill(null); // dp is a two dimensional array that stores profits at indices represented by instances of current index and the remaining capacity at that index.
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(capacity + 1).fill(-1);
  }

  return zeroOneKnapsackMemoRecursive(weights, profits, capacity, 0, dp);
};

const zeroOneKnapsackMemoRecursive = (weights, profits, remainingCapacity, currentIdx, dp) => {
  if (remainingCapacity <= 0 || currentIdx >= profits.length) return 0;

  // If the current index and remaining capacity combination have been already visited, return from the dp.
  if (dp[currentIdx][remainingCapacity] > -1) {
    return dp[currentIdx][remainingCapacity];
  }

  // Find the total profit of items in the path that includes the current item.
  // Only keep count of the profit if the weight of the current items doesn't exceed the remaining capacity.
  let profit1 = 0;
  if (weights[currentIdx] <= remainingCapacity) {
    profit1 = profits[currentIdx] + zeroOneKnapsackMemoRecursive(weights, profits, remainingCapacity - weights[currentIdx], currentIdx + 1, dp);
  }

  // Find the total profit of items in the path that skips the current item.
  const profit2 = zeroOneKnapsackMemoRecursive(weights, profits, remainingCapacity, currentIdx + 1, dp);

  dp[currentIdx][remainingCapacity] = Math.max(profit1, profit2);
  return dp[currentIdx][remainingCapacity];
}


// #3: Bottom Up (Iteration)
// T: O(n * c) --> we look at n * c combinations to create a dp matrix with max profits at each slot. If we are also finding the selected items, we do n more operations.
// S: O(n * c) --> we create a n x c dp matrix. (n + 1 x c + 1) to be exact.
// where n = number of items (length of either weights or profits array), c = max capacity.

const zeroOneKnapsackBottomUp = (weights, profits, capacity) => {
  const n = profits.length;

  // prepare (n + 1) x (c * 1) matrix.
  // the rows and columns of our dp matrix will each have 1 more space vs. the total # of items and the max capacity, respectively, since we want the exact index # to match the corresponding order of items and the incremental capacity. In some cases, the weights and profits array will also have 0th index set to empty and start the actual item index from 1, but in this problem, the 0th index item is the 1st item and so forth - an offset by 1 - so when we reference the item from either the weights or profits array using our dp matrix's row index i, we need to get the item at index i - 1.
  const dp = new Array(n + 1)
    .fill([])
    .map(() => new Array(capacity + 1).fill(0));

  // fill up the matrix.
  for (let i = 0; i <= n; i++) {
    for (let c = 0; c <= capacity; c++) {
      if (i === 0 || c === 0) dp[i][c] = 0; // row 0 and column 0 are empty sets for our dp.
      else if (weights[i - 1] > c) { // if the current item weight is bigger than current remaining capacity, we can't add the current item, so we will carry over the max profit of the previous item at the same remaining capacity.
        dp[i][c] = dp[i - 1][c];
      }
      else { // if we can add the current item given the current remaining capacity, we will consider two options: 1) skip current item, 2) include current item. We will take the max profit from these two options. If we skip the current item, the profit will be carried over from the previous item at the current remaining capacity. If we include the current item, the profit will be
        dp[i][c] = Math.max(dp[i - 1][c], profits[i - 1] + dp[i - 1][c - weights[i - 1]]);
      }
    }
  }

  const selectedItems = findSelectedItems(weights, profits, capacity, dp);
  return [dp[n][capacity], selectedItems];
}

// Finding the selected items:
const findSelectedItems = (weights, profits, capacity, dp) => { // O(n)
  let i = profits.length;
  let c = capacity;
  let remainingProfit = dp[i][capacity];
  const selectedItems = new Array(i).fill(0);

  // Since for each item, we can either skip it or include it, we know an item (at the dp row index i) is NOT included if its remaining profit was carried over from the previous item at the same remaining capacity. So we start with the final max profit we have gotten, which will be at dp[n][capacity], and compare against the previous item's max profit at same remaining capacity. If they are NOT the same, we know we have included this item to get the final max profit. After including the item, update the remaining profit by subtracting the profit of the current (included) item and also decrease the remaining capacity by the weight of this item. If they ARE the same, we know this item wasn't included but instead the running max profit was carried over, so we look at the previous item. We will repeat this checking process as long as remaining profit > 0 and the items we check are within the bounds of the dp.
  while (remainingProfit >= 0 && i > 0 && c >= 0) {
    if (remainingProfit !== dp[i - 1][c]) {
      selectedItems[i - 1] = 1;
      remainingProfit -= profits[i - 1];
      c -= weights[i - 1];
    }
    else {
      i--;
    }
  }

  return selectedItems;
}


// TEST
const weights1 = [3, 2, 7, 5, 1, 2];
const profits1 = [6, 5, 6, 3, 2, 3];
const weights2 = [1, 2, 3, 5];
const profits2 = [1, 6, 10, 16];


console.log(zeroOneKnapsackBruteForce(weights1, profits1, 8));
console.log(zeroOneKnapsackBruteForce(weights1, profits1, 7));
console.log(zeroOneKnapsackBruteForce(weights1, profits1, 5));
console.log(zeroOneKnapsackBruteForce(weights2, profits2, 7));
console.log(zeroOneKnapsackBruteForce(weights2, profits2, 6));
console.log(zeroOneKnapsackBruteForce(weights2, profits2, 10));

console.log('---------------------');

console.log(zeroOneKnapsackMemo(weights1, profits1, 8));
console.log(zeroOneKnapsackMemo(weights1, profits1, 7));
console.log(zeroOneKnapsackMemo(weights1, profits1, 5));
console.log(zeroOneKnapsackMemo(weights2, profits2, 7));
console.log(zeroOneKnapsackMemo(weights2, profits2, 6));
console.log(zeroOneKnapsackMemo(weights2, profits2, 10));

console.log('---------------------');

console.log(zeroOneKnapsackBottomUp(weights1, profits1, 8));
console.log(zeroOneKnapsackBottomUp(weights1, profits1, 7));
console.log(zeroOneKnapsackBottomUp(weights1, profits1, 5));
console.log(zeroOneKnapsackBottomUp(weights2, profits2, 7));
console.log(zeroOneKnapsackBottomUp(weights2, profits2, 6));
console.log(zeroOneKnapsackBottomUp(weights2, profits2, 10));
