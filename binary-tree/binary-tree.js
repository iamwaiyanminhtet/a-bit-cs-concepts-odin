class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  class Tree {
    constructor() {
      this.root = null;
    }
  
    // remove duplication and sort array
    sortAndRemoveDupli(array) {
      let removeDuplicationValues = this.removeDuplication(array);
      let sortedArr = this.sortArr(removeDuplicationValues);
      return sortedArr;
    }
  
    // buildTree
    buildTree(array) {
      let sortedArr = this.sortAndRemoveDupli(array);
      return this.root = this.sortedArrayToBST(sortedArr, 0, sortedArr.length -1);
    }
  
    // sort array
    sortArr(array) {
      return array.sort((a,b) => a - b);
    }
  
    // remove duplication
    removeDuplication(array) {
      return [...new Set(array)];
    }
  
    // balanced binary tree
    sortedArrayToBST(arr, start, end) {
      if(start > end) {
        return null;
      }
      const mid = parseInt((start+end) / 2, 10);
      
      let node = new Node(arr[mid]);
      node.left = this.sortedArrayToBST(arr, start, mid - 1);
      node.right = this.sortedArrayToBST(arr, mid + 1, end);
      return node;
    }
  
    // insert
    insert(data, tree = this.root) {
      if(tree === null)  {
        return new Node(data); 
      }  
  
      if(data < tree.data)  tree.left = this.insert(data, tree.left);
      if(data > tree.data) tree.right = this.insert(data, tree.right);
  
      return tree;
    }
  
     // delete
     delete(data, tree = this.root) {
      if(tree === null)  return node;
  
      if(data < tree.data)  tree.left = this.delete(data, tree.left)
      else if(data > tree.data) tree.right = this.delete(data, tree.right)
      else { 
  
        // this part is copied from https://github.com/luaroxy/odin-binarySearchTrees/blob/main/tree.js
        // for one child, if we leave in here it remove all of its children
         if (tree.left === null) return tree.right; 
         if (tree.right === null) return tree.left; 
  
         // for two childs node
         function minimun(tree) {
          let minimun = tree.data;
          while(tree.left !== null) {
            minimun = tree.left.data;
            tree = tree.left
          }
          return minimun;
         }
  
         tree.data = minimun(tree.right);
         tree.right = this.delete(tree.data,tree.right)
      }
  
      return tree;
    }
  
    // find
    find(data,tree = this.root) {
      if(data === tree.data) return tree;
      if(data > tree.data) return this.find(data,tree.right);
      if(data < tree.data) return this.find(data,tree.left);
    }
  
    // level order
    // well, i didn;t figure this out by my self, it is from chatGPT and I learned queueing technique tho and I understand the code
    levelOrder(tree = this.root) {
  
      if(tree === null) return;
      let queue = [tree];
  
      let levelOrderTraversalArr = [];
      while(queue.length > 0) {
        const tree = queue.shift();
        levelOrderTraversalArr.push(tree.data);
  
        if(tree.left !== null) {
          queue.push(tree.left)
        }
        if(tree.right !== null) {
          queue.push(tree.right)
        }
      }
  
      return levelOrderTraversalArr;
    }
  
    // preorder
    preOrder(tree = this.root, preOrderArr = []) {
      if(tree === null) return preOrderArr;
      preOrderArr.push(tree.data)
  
      this.preOrder(tree.left, preOrderArr);
      this.preOrder(tree.right, preOrderArr);
      return preOrderArr;
    }
  
    //inorder
    inOrder(tree = this.root, inOrderArr = []) {
      if(tree === null) return inOrderArr;
  
      this.inOrder(tree.left, inOrderArr);
      inOrderArr.push(tree.data);
      this.inOrder(tree.right, inOrderArr);
      return inOrderArr;
    }
  
    //post-order
    postOrder(tree = this.root, postOrderArr = []) {
      if(tree === null) return postOrderArr;
  
      this.postOrder(tree.left, postOrderArr);
      this.postOrder(tree.right, postOrderArr);
      postOrderArr.push(tree.data);
      return postOrderArr;
    }
  
    height(tree = this.root) {
      if (tree === null) return 0;
  
      const leftHeight = this.height(tree.left);
      const rightHeight = this.height(tree.right);
  
      return Math.max(leftHeight, rightHeight) + 1;
    }
  
  }
  
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  
  const binaryTree = new Tree(); 
  prettyPrint(binaryTree.buildTree([100,200,300,400,500,600,700,1000]));
  console.log(binaryTree.levelOrder()); // [400, 200, 600, 100, 300, 500, 700, 1000]
  console.log(binaryTree.preOrder()); // [400, 200, 100, 300, 600, 500, 700, 1000]
  console.log(binaryTree.inOrder()); // [100, 200, 300, 400, 500, 600, 700, 1000]
  console.log(binaryTree.postOrder()); // [100, 300, 200, 500, 1000, 700, 600, 400]
  console.log(binaryTree.height()); // 4