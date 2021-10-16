/* Given an array of points in a 2D2D plane, find ‘K’ closest points to the origin.

Example 1:

Input: points = [[1,2],[1,3]], K = 1
Output: [[1,2]]
Explanation: The Euclidean distance between (1, 2) and the origin is sqrt(5).
The Euclidean distance between (1, 3) and the origin is sqrt(10).
Since sqrt(5) < sqrt(10), therefore (1, 2) is closer to the origin.
Example 2:

Input: point = [[1, 3], [3, 4], [2, -1]], K = 2
Output: [[1, 3], [2, -1]] */

const Heap = require('../../ds/PriorityQueue');

// #1: Using max heap.
// T: O(n * logk)
// S: O(k)
// where n = input array length, k = # of closest points to find.

const findKClosestPoints = (arr, k) => {
  const kClosestPoints = new Array(k);

  const maxHeap = new Heap((a, b) => euclideanDistance(a) > euclideanDistance(b));
  for (let i = 0; i < k; i++) { // k
    maxHeap.add(arr[i]); // logk
  }

  for (let i = k; i < arr.length; i++) { // O(n - k)
    const dist = euclideanDistance(arr[i]);
    const currentMaxDist = euclideanDistance(maxHeap.peek());
    if (dist < currentMaxDist) {
      maxHeap.poll(); // logk
      maxHeap.add(arr[i]); // logk
    }
  }

  for (let i = k - 1; i >= 0; i--) { // k
    kClosestPoints[i] = maxHeap.poll(); // logk
  }

  return kClosestPoints;
}

// #2: Using min heap.
// T: O(n + klogn) --> Initializing the min heap with all n numbers takes n time, when using heapify algorithm. Extracting k points from the min heap with n elements takes k * logn time.
// S: O(n) --> we keep all n points in the heap.
// where n = input array length, k = # of closest points to find.

const findKClosestPoints2 = (arr, k) => {
  const kClosestPoints = [];

  const minHeap = new Heap((a, b) => euclideanDistance(a) < euclideanDistance(b));
  minHeap.build(arr); // O(n)

  // Extract k points from min heap.
  for (let i = 0; i < k; i++) { // O(k)
    kClosestPoints.push(minHeap.poll()); // O(logn)
  }

  return kClosestPoints;
}

// helper function to get the euclidean distance between two points. In this case, we'll use it to get the distance between the given point and the origin.
const euclideanDistance = (point1, point2 = [0, 0]) => {
  return Math.sqrt(Math.abs(point1[0] - point2[0])**2 + Math.abs(point1[1] - point2[1])**2);
}


// TEST
console.log(findKClosestPoints([[1,2], [3, 4], [-1, -2], [1, -3], [5, 2], [0, 1]], 3));
console.log(findKClosestPoints([[1,2], [3, 4], [-1, -2], [0, 0], [1, -3], [5, 2], [0, 1]], 5));

console.log('-----------------');

console.log(findKClosestPoints2([[1,2], [3, 4], [-1, -2], [1, -3], [5, 2], [0, 1]], 3));
console.log(findKClosestPoints2([[1,2], [3, 4], [-1, -2], [0, 0], [1, -3], [5, 2], [0, 1]], 5));
