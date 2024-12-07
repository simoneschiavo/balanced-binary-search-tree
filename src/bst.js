class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  _removeDuplicates(array) {
    return array.filter((value, index) => array.indexOf(value) === index);
  }

  _sortArray(array) {
    return array.sort((a, b) => a - b);
  }

  _sortedArrayToBST(sortedArray, start, end) {
    if (start > end) {
      return null;
    }

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(sortedArray[mid]);

    root.left = this._sortedArrayToBST(sortedArray, start, mid - 1);
    root.right = this._sortedArrayToBST(sortedArray, mid + 1, end);

    return root;
  }

  buildTree(array) {
    const uniqueValuesArray = this._removeDuplicates(array);
    const sortedArray = this._sortArray(uniqueValuesArray);
    return this._sortedArrayToBST(sortedArray, 0, sortedArray.length - 1);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(currentNode = this.root, value) {
    if (currentNode === null) {
      return new Node(value);
    }

    if (currentNode.data === value) {
      return currentNode;
    }

    if (value < currentNode.data) {
      currentNode.left = this.insert(currentNode.left, value);
    } else if (value > currentNode.data) {
      currentNode.right = this.insert(currentNode.right, value);
    }
    return currentNode;
  }

  delete(currentNode = this.root, value) {
    if (currentNode === null) {
      return null;
    }

    if (value < currentNode.data) {
      currentNode.left = this.delete(currentNode.left, value);
    } else if (value > currentNode.data) {
      currentNode.right = this.delete(currentNode.right, value);
    } else {
      // This is the case where  value === currentNode.data
      // When root has 0 children or only right child
      if (currentNode.left === null) {
        return currentNode.right;
      }
      // When root has only left child
      if (currentNode.right === null) {
        return currentNode.left;
      }
      // When both children are there
      const successorNode = this._getSuccessor(currentNode);
      currentNode.data = successorNode.data;
      currentNode.right = this.delete(currentNode.right, successorNode.data);
    }
    return currentNode;
  }

  _getSuccessor(node) {
    node = node.right;
    while (node !== null && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  find(value, currentNode = this.root) {
    if (currentNode === null) {
      return null;
    }
    if (value < currentNode.data) {
      return this.find(value, currentNode.left);
    } else if (value > currentNode.data) {
      return this.find(value, currentNode.right);
    } else {
      return currentNode;
    }
  }

  levelOrder(callback, queue = [this.root], currentNode = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback is required, and it must be a function");
    }

    if (currentNode === null) {
      return null;
    }

    while (queue.length > 0) {
      currentNode = queue.shift();
      callback(currentNode);
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }

  preOrder(callback, currentNode = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback is required, and it must be a function");
    }
    if (currentNode === null) {
      return;
    }
    callback(currentNode);
    this.preOrder(callback, currentNode.left);
    this.preOrder(callback, currentNode.right);
  }

  inOrder(callback, currentNode = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback is required, and it must be a function");
    }
    if (currentNode === null) {
      return;
    }
    this.inOrder(callback, currentNode.left);
    callback(currentNode);
    this.inOrder(callback, currentNode.right);
  }

  postOrder(callback, currentNode = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback is required, and it must be a function");
    }
    if (currentNode === null) {
      return;
    }
    this.postOrder(callback, currentNode.left);
    this.postOrder(callback, currentNode.right);
    callback(currentNode);
  }

  height(node, currentNode = this.find(node.data)) {
    if (currentNode === null) {
      return -1;
    }
    const leftHeight = this.height(node, currentNode.left);
    const rightHeight = this.height(node, currentNode.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node, currentNode = this.root) {
    if (currentNode === null) {
      return -1;
    }
    if (currentNode === node) {
      return 0;
    }
    if (node.value < currentNode.value) {
      return this.depth(node, currentNode.left) + 1;
    } else {
      return this.depth(node, currentNode.right) + 1;
    }
  }

  isBalanced(currentNode = this.root) {
    function checkBalance(node) {
      if (node === null) {
        return { isBalanced: true, height: -1 };
      }
      const leftNode = checkBalance(node.left);
      const rightNode = checkBalance(node.right);

      const balanced =
        leftNode.isBalanced &&
        rightNode.isBalanced &&
        Math.abs(leftNode.height - rightNode.height) <= 1;
      const height = Math.max(leftNode.height, rightNode.height);
      return { isBalanced: balanced, height: height };
    }

    const isBalanced = checkBalance(currentNode).isBalanced;
    return isBalanced;
  }
    
    rebalance() {
        const sortedNodesData = [];
        this.inOrder((node) => {
            sortedNodesData.push(node.data);
        })
        this.root = this.buildTree(sortedNodesData);
    }
}
