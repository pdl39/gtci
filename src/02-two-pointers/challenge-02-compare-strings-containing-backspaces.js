/* Given two strings containing backspaces (identified by the character ‘#’), check if the two strings are equal. */

// #1: Optimal solution
// T: O(n + m)
// S: O(1)
// where n = str1 length, m = str2 length

const backspaceCompare = (str1, str2) => {
  let idx1 = str1.length - 1;
  let idx2 = str2.length - 1;

  while (idx1 >= 0 || idx2 >= 0) {
    let i1 = getNextValidCharIndex(str1, idx1);
    let i2 = getNextValidCharIndex(str2, idx2);

    // if both string have been exhausted at the same time, they are same.
    if (i1 < 0 && i2 < 0) return true;
    // if one string was exhausted first, they are different.
    if (i1 < 0 || i2 < 0) return false;
    // At any point, if the current valid char after accounting for all backspaces to the right for str1 is different from that of str2, they are different.
    if (str1[i1] !== str2[i2]) return false;

    idx1 = i1 - 1;
    idx2 = i2 - 1;
  }

  return true;
}

const getNextValidCharIndex = (str, idx) => {
  let backspaceCount = 0;
  let nextValidCharIdx = idx;
  while (nextValidCharIdx >= 0) {
    if (str[nextValidCharIdx] === '#') backspaceCount++;
    else {
      // if current char is not '#', break out of loop only if backspace count = 0. If not, decrement backspace count.
      if (backspaceCount > 0) backspaceCount--;
      else break;
    }
    nextValidCharIdx--;
  }

  return nextValidCharIdx;
}

// #2: simpler, but with worse space complexity
// T: O(n + m) --> to be exact, it will take 4 * (n + m), one for str split into array, one for the two pointer traversal, one for slice to get only the desired portion of the altered array, and one to re-join into string
// S: O(n + m) --> we need O(n + m) space for the new strings
// where n = str1 length, m = str2 length.

// This solution doesn't account for the edge case where the first character of a string is '#'.

const backspaceCompare2 = (str1, str2) => {
  return getResultStr(str1) === getResultStr(str2);
};

const getResultStr = (str) => {
  const strArr = str.split('');
  let lp = 0;

  for (let rp = 0; rp < strArr.length; rp++) {
    if (strArr[rp] === '#') lp--;
    else strArr[lp++] = strArr[rp];
  }

  return strArr.slice(0, lp).join('');
}


// TEST
console.log(backspaceCompare("ab#cde#i", "acdii#"));
console.log(backspaceCompare("ab#cde#i", "acdii##"));
console.log(backspaceCompare2("ab#cde#i", "acdii#"));
console.log(backspaceCompare2("ab#cde#i", "acdii##"));
