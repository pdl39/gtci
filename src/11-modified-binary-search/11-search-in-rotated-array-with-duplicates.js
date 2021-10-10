/* How do we search in a sorted and rotated array that also has duplicates? */

// T: O(n) --> in the worst case where all numbers in the array are duplicates, we have to move low and high by 1 every time instead of removing elements to check by half every time.
// S: O(1)
// where n = input array length.

// This question is very similar to 10-search-in-rotated--array, with a twist that there can be duplicates. When there are duplicates, particularly when low, mid, and high el are all duplicates, there is no way to determine which side is sorted. Thus, in such case, we can only move both low and high by 1: low++, high--, until not all three are the same.

const searchInRotatedArrWithDups = (arr, key) => {
  let low =  0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = (low + Math.floor((high - low) / 2));

    if (key === arr[mid]) return mid;

    if (arr[low] === arr[mid] && arr[mid] === arr[high]) {
      low++, high--;
    }
    else if (arr[low] <= arr[mid]) { // we know the left side (low ~ mid) is sorted.
      if (key >= arr[low] && key < arr[mid]) { // if key is in the range (low ~ mid), look at this half.
        high = mid - 1;
      }
      else { // if not in range, look at the right half.
        low = mid + 1;
      }
    }
    else { // we know the right side is sorted
      if (key > arr[mid] && key <= arr[high]) { // if key is in the range (mid ~ high), look at this half.
        low = mid + 1;
      }
      else { // if not in range, look at the left half.
        high = mid - 1;
      }
    }
  }

  return -1;
}


// TEST
console.log(searchInRotatedArrWithDups([6, 7, 2, 3, 5, 6, 6, 6, 6, 6, 6, 6], 3))
console.log(searchInRotatedArrWithDups([6, 7, 2, 3, 5, 6, 6, 6, 6, 6, 6, 6], 2))
console.log(searchInRotatedArrWithDups([6, 7, 2, 3, 6, 6, 6, 6, 6, 6, 6], 11))
console.log(searchInRotatedArrWithDups([9, 9, 9, 9, 9, 9, 11, 15, 2, 9], 11))
console.log(searchInRotatedArrWithDups([8, 9, 7, 8, 8, 8, 8], 9));
console.log(searchInRotatedArrWithDups([8, 9, 7, 8, 8, 8, 8], 2));
