/* Given two strings containing backspaces (identified by the character ‘#’), check if the two strings are equal. */

// T: O(n + m) --> to be exact, it will take 4 * (n + m), one for str split into array, one for the two pointer traversal, one for slice to get only the desired portion of the altered array, and one to re-join into string
// S: O(n + m) --> we need O(n + m) space for the new strings
// where n = str1 length, m = str2 length

const backspaceCompare = (str1, str2) => {
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
