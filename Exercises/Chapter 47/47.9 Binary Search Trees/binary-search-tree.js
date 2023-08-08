class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }
    let curr = this.root;
    while (curr) {
      if (val < curr.val) {
        if (curr.left === null) {
          curr.left = new Node(val);
          return this;
        }
        curr = curr.left;
      }
      else {
        if (curr.right === null) {
          curr.right = new Node(val);
          return this;
        }
        curr = curr.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, curr = this.root) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }
    if (val < curr.val) {
      if (curr.left === null) {
        curr.left = new Node(val);
        return this;
      }
      this.insertRecursively(val, curr.left);
    }
    else {
      if (curr.right === null) {
        curr.right = new Node(val);
        return this;
      }
      this.insertRecursively(val, curr.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    if (this.root === null) {
      return undefined;
    }
    let curr = this.root;
    while (curr) {
      if (curr.val === val) return curr;
      if (val < curr.val) {
        if (curr.left === null || curr.left.val > val) return undefined;
        else { curr = curr.left; }
      }
      else {
        if (curr.right === null || curr.right.val < val) return undefined;
        else { curr = curr.right; }
      }
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, curr = this.root) {
    if (curr === null) {
      return undefined;
    }
    if (val === curr.val) return curr;
    if (val < curr.val) {
      return this.findRecursively(val, curr.left);
    }
    else {
      return this.findRecursively(val, curr.right);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    if (this.root === null) {
      return undefined;
    }
    let visited = [];

    let traverse = (node) => {
      visited.push(node.val);
      if (node.left) { traverse(node.left); }
      if (node.right) { traverse(node.right); }
    };

    traverse(this.root);
    return visited;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    if (this.root === null) {
      return undefined;
    }
    let visited = [];

    let traverse = (node) => {
      if (node.left) { traverse(node.left); }
      visited.push(node.val);
      if (node.right) { traverse(node.right); }
    };

    traverse(this.root);
    return visited;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    if (this.root === null) {
      return undefined;
    }
    let visited = [];

    let traverse = (node) => {
      if (node.left) { traverse(node.left); }
      if (node.right) { traverse(node.right); }
      visited.push(node.val);
    };

    traverse(this.root);
    return visited;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let curr = this.root;
    let queue = [];
    let visited = [];

    queue.push(curr);
    while (queue.length) {
      curr = queue.shift();
      visited.push(curr.val);
      if (curr.left) {
        queue.push(curr.left);
      }
      if (curr.right) {
        queue.push(curr.right);
      }
    }
    return visited;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {

  }
}

module.exports = BinarySearchTree;
