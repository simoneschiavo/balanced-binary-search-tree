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
}
