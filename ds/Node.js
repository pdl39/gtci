class Node {
  constructor(value, next = null){
    this.value = value;
    this.next = next;
  }

  printList() {
    const list = [];
    let current = this;

    while (current) {
      list.push(current.value);
      current = current.next;
    }

    return list;
  }

  printDiagram() {
    const list = [];
    let current = this;

    while (current) {
      list.push(current.value);
      current = current.next;
    }

    return list.join(' -> ');
  }
}

module.exports = Node;
