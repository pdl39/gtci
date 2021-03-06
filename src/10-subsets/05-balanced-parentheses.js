/* For a given number āNā, write a function to generate all combination of āNā pairs of balanced parentheses.

Example 1:

Input: N=2
Output: (()), ()()
Example 2:

Input: N=3
Output: ((())), (()()), (())(), ()(()), ()()() */

const Queue = require("../../ds/Queue");

// T: O(n * 2^n) --> in the worst case, there will be 2^n combinations - this will occur if we assume that the order of open and close parentheses doesn't matter, so that for every exisiting combination we will add both ) and (, doubling the number of combinations every time. However, since order does matter and we can add ) only when a matching ( exists, we know the overall time required would be less than 2^n. For each combination string, we need to append an extra open and/or close parenthesis, which is an O(n) operation. Thus, for interview purposes, it will suffice to say that the time complexity will be less than O(n * 2^n). To be exact, it will be O(4^n/(n^(1/2))), which is bounded by the Catalan number.
// S: O(n * 2^n) --> we can have up to 2^n combinations of balanced parentheses, and each combination will have a length of n/2.
// where n = # of pairs of balanced parentheses.

class ParenStr {
  constructor(str, openCount, closeCount) {
    this.str = str;
    this.openCount = openCount;
    this.closeCount = closeCount;
  }
}

// #1
const findAllBalancedParenCombintations = (n) => {
  const balancedParens = [];
  const combinations = new Queue(new ParenStr('', 0, 0));

  while (combinations.length > 0) {
    const combStr = combinations.dequeue().value;

    if (combStr.openCount === n && combStr.closeCount === n) {
      balancedParens.push(combStr.str);
    }
    else {
      if (combStr.openCount < n) {
        combinations.add(new ParenStr(`${combStr.str}(`, combStr.openCount + 1, combStr.closeCount));
      }
      if (combStr.openCount > combStr.closeCount) {
        combinations.add(new ParenStr(`${combStr.str})`, combStr.openCount, combStr.closeCount + 1));
      }
    }
  }

  return balancedParens;
}

// #2: Recursive Approach
const findAllBalancedParenCombintations2 = (n) => {
  const balancedParens = [];
  findAllBalancedParenCombintationsRecursive(new ParenStr('', 0, 0), n, balancedParens);
  return balancedParens;
}

const findAllBalancedParenCombintationsRecursive = (newComb, n,balancedParens) => {
  // base case
  if (newComb.openCount === n && newComb.closeCount === n) {
    balancedParens.push(newComb.str);
    return;
  }

  // recursive case
  if (newComb.openCount < n) {
    findAllBalancedParenCombintationsRecursive(new ParenStr(`${newComb.str}(`, newComb.openCount + 1, newComb.closeCount), n, balancedParens);
  }
  if (newComb.openCount > newComb.closeCount) {
    findAllBalancedParenCombintationsRecursive(new ParenStr(`${newComb.str})`, newComb.openCount, newComb.closeCount + 1), n, balancedParens);
  }

  return;
};


// TEST
console.log(findAllBalancedParenCombintations(1));
console.log(findAllBalancedParenCombintations(2));
console.log(findAllBalancedParenCombintations(3));
console.log(findAllBalancedParenCombintations(4));

console.log('--------');

console.log(findAllBalancedParenCombintations2(1));
console.log(findAllBalancedParenCombintations2(2));
console.log(findAllBalancedParenCombintations2(3));
console.log(findAllBalancedParenCombintations2(4));
