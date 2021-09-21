import MinHeap from "./MinHeap";

export default class MinIntervalEndHeap extends MinHeap {
  constructor() {
    super();
  }

  heapifyUp(index = this.size - 1) {
    while (this.#hasParent(index) && this.items[index].end < this.#parent(index).end) {
      this.#swap(index, this.#getParentIndex(index));
      index = this.#getParentIndex(index);
    }
  }

  heapifyDown(index = 0) {
    // we only need to check if there is a left child, since if there is no left child, there will be no right child.
    while (this.#hasLeftChild(index)) {
      let smallerChildIndex = this.#getLeftChildIndex(index);
      if (this.#hasRightChild(index) && this.#rightChild(index).end < this.#leftChild(index).end) {
        smallerChildIndex = this.#getRightChildIndex(index);
      }

      if (this.items[smallerChildIndex].end < this.items[index].end) {
        this.#swap(smallerChildIndex, index);
        index = smallerChildIndex;
      }
      else break;
    }
  }
}
