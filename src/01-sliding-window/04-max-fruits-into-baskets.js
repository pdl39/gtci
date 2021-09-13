/* Given an array of characters where each character represents a fruit tree, you are given two baskets, and your goal is to put maximum number of fruits in each basket. The only restriction is that each basket can have only one type of fruit.

You can start with any tree, but you can’t skip a tree once you have started. You will pick one fruit from each tree until you cannot, i.e., you will stop when you have to pick from a third fruit type.

Write a function to return the maximum number of fruits in both baskets.
*/

// T: O(n) --> Outer for loop runs for all elements, inner while loop processes each element only once > O(n + n) > O(n)
// S: O(k) --> hashmap stores max k + 1 characters at any time
// where n = array length, k = # distinct characters

// This question is essentially same as 03-longest-substring-with-max-k-distinct-chars, except that k = 2.

const maxFruitsIntoBaskets = (fruits) => {
  let maxNumFruits = 0;
  let windowStart = 0;
  const baskets = {};

  for (let windowEnd = 0; windowEnd < fruits.length; windowEnd++) {
    if (baskets[fruits[windowEnd]]) baskets[fruits[windowEnd]]++;
    else baskets[fruits[windowEnd]] = 1;

    while (Object.keys(baskets).length > 2) {
      if (baskets[fruits[windowStart]] > 1) baskets[fruits[windowStart]]--;
      else delete baskets[fruits[windowStart]];
      windowStart++;
    }

    maxNumFruits = Math.max(maxNumFruits, windowEnd - windowStart + 1);

    // let windowNumFruits = 0;
    // Object.values(baskets).forEach(numFruit => windowNumFruits += numFruit);
    // maxNumFruits = Math.max(maxNumFruits, windowNumFruits);
  }

  return maxNumFruits;
};

console.log(maxFruitsIntoBaskets(['A', 'D', 'B', 'B', 'D', 'D', 'A', 'D', 'A', 'B']));
