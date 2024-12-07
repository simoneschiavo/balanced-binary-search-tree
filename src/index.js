import "./styles.css";
import { Tree } from "./bst";

function getRandomArray(size, max) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

const randomNumbers = getRandomArray(10, 100); 
const tree = new Tree(randomNumbers);

console.log("Random Numbers:", randomNumbers);
tree.prettyPrint();

console.log("Is the tree balanced?", tree.isBalanced());

console.log("Level Order:");
tree.levelOrder((node) => console.log(node.data));

console.log("Pre-Order:");
tree.preOrder((node) => console.log(node.data));

console.log("Post-Order:");
tree.postOrder((node) => console.log(node.data));

console.log("In-Order:");
tree.inOrder((node) => console.log(node.data));

const unbalancingNumbers = [150, 200, 250, 300];
console.log("Adding numbers to unbalance the tree:", unbalancingNumbers);
unbalancingNumbers.forEach((num) => tree.insert(tree.root, num));
tree.prettyPrint();

console.log("Is the tree balanced after unbalancing?", tree.isBalanced());

console.log("Rebalancing the tree...");
tree.rebalance();
tree.prettyPrint();

console.log("Is the tree balanced after rebalancing?", tree.isBalanced());

console.log("Level Order:");
tree.levelOrder((node) => console.log(node.data));

console.log("Pre-Order:");
tree.preOrder((node) => console.log(node.data));

console.log("Post-Order:");
tree.postOrder((node) => console.log(node.data));

console.log("In-Order:");
tree.inOrder((node) => console.log(node.data));