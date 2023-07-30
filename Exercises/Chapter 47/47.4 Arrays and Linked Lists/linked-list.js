/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** _get(idx): retrieve node at idx. */

  _get(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    let curr = this.head;
    let count = 0;

    while (curr !== null && count != idx) {
      count += 1;
      curr = curr.next;
    }

    return curr;
  }


  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);
    if (this.tail) {
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      this.head = newNode;
      this.tail = this.head;
    }
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);
    if (this.head) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }
    this.length += 1;

  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    return this._get(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    this._get(idx).val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    let curr = this._get(idx - 1);
    let newNode = new Node(val);
    newNode.next = curr.next;
    curr.next = newNode;
    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx >= this.length || idx < 0) throw new Error("Invalid Index");

    if (idx === 0) {
      let returnVal = this.head.val;
      this.head = this.head.next;
      this.length -= 1;
      if (this.length <= 1) this.tail = this.head;
      return returnVal;
    }

    let prev = this._get(idx - 1);

    if (idx === this.length - 1) {
      let returnVal = this.tail.val;
      prev.next = null;
      this.tail = prev;
      this.length -= 1;
      return returnVal;
    }

    let returnVal = prev.next.val;
    prev.next = prev.next.next;
    this.length -= 1;
    return returnVal;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;

    let sum = 0;
    let curr = this.head;

    while (curr) {
      sum += curr.val;
      curr = curr.next;
    }

    return sum / this.length;
  }
}

module.exports = LinkedList;
