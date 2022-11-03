class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    findMin() {
        let current = this;
        while (current.left) current = current.left;
        return current.data;
    }

    delete(data) {
        if (data < this.data && this.left) this.left = this.left.delete(data);
        else if (data > this.data && this.right)
            this.right = this.right.delete(data);
        else {
            if (this.data == data) {
                if (this.right && this.left) {
                    let minVal = this.right.findMin();
                    this.data = minVal;
                    this.right = this.right.delete(minVal);
                } else if (this.left) return this.left;
                else if (this.right) return this.right;
                else return null;
            }
        }
        return this;
    }

    find(data) {
        if (this.data == data) {
            return this;
        } else if (data < this.data && this.left != null) {
            return this.left.find(data);
        } else if (data > this.data && this.right != null) {
            return this.right.find(data);
        }
        return false;
    }

    levelOrderNode(callback) {
        let current = this;
        const queue = [current];
        const result = [];
        while (queue.length > 0) {
            result.push(current);
            queue.splice(0, 1);
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
            current = queue[0];
        }
        if (callback) {
            return callback(result);
        }
        return result;
    }

    displayLevelOrder(array) {
        let nodeData = array.map((node) => node.data);
        return nodeData;
    }

    findHeight(currentNode) {
        if (currentNode == null) {
            return -1;
        }
        let leftHeight = this.findHeight(currentNode.left);
        let rightHeight = this.findHeight(currentNode.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }
}

class Tree {
    constructor(root) {
        this.root = this.buildTree(root);
    }

    buildTree(anArray) {
        // console.log(anArray);
        let mainNode = new Node(anArray);
        if (anArray.length === 0) {
            return null;
        } else {
            let uniqueChars = [...new Set(anArray)];
            // console.log(uniqueChars);
            let ordered = uniqueChars.sort((a, b) => a - b);
            // console.log(ordered);
            if (ordered.length === 1) {
                mainNode.data = ordered[0];
                // console.log(mainNode.data);

                return mainNode;
            } else if (ordered.length > 0) {
                let midIndex = Math.floor(ordered.length / 2);
                // console.log(`mid index: floor.(${ordered.length}/2) = ${midIndex}`);

                let midValue = ordered[midIndex];
                // console.log(`mid Value = ${midValue}`);

                let leftArr = ordered.slice(0, midIndex);
                // console.log(leftArr);

                let rightArr = ordered.slice(midIndex + 1);
                // console.log(rightArr);

                let leftNode = new Node(leftArr);
                leftNode.data = leftArr;
                mainNode.left = this.buildTree(leftNode.data);
                // buildTree(leftNode.data);

                let rightNode = new Node(rightArr);
                rightNode.data = rightArr;
                mainNode.right = this.buildTree(rightNode.data);
                // buildTree(rightNode.data);

                mainNode.data = midValue;

                // console.log(mainNode.data);
                // console.log(leftNode.data);
                // console.log(rightNode.data);
                return mainNode;
            }
        }
        return mainNode;
    }

    insert(value, rootNode = this.root) {
        if (rootNode === null) {
            let node = new Node(value);
            return node;
        }
        if (rootNode.data === value) {
            return;
        }

        if (rootNode.data < value) {
            rootNode.right = this.insert(value, rootNode.right);
        } else {
            rootNode.left = this.insert(value, rootNode.left);
        }
        return rootNode;
    }

    delete(data) {
        if (this.root) {
            this.root = this.root.delete(data);
        }
    }

    find(data) {
        if (this.root) {
            return this.root.find(data);
        }
        return false;
    }

    levelOrder() {
        if (this.root) {
            return this.root.levelOrderNode(this.root.displayLevelOrder);
        }
    }

    inorder(callbackFn, node = this.root, inorderList = []) {
        if (node === null) {
            return;
        }

        this.inorder(callbackFn, node.left, inorderList);
        if (callbackFn) {
            callbackFn(node);
        } else {
            inorderList.push(node.data);
        }
        this.inorder(callbackFn, node.right, inorderList);

        if (inorderList.length > 0) {
            return inorderList;
        }
    }

    preorder(callbackFn, node = this.root, preorderList = []) {
        if (node === null) {
            return;
        }

        if (callbackFn) {
            callbackFn(node);
        } else {
            preorderList.push(node.data);
        }
        this.preorder(callbackFn, node.left, preorderList);
        this.preorder(callbackFn, node.right, preorderList);

        if (preorderList.length > 0) {
            return preorderList;
        }
    }

    postorder(callbackFn, node = this.root, postorderList = []) {
        if (node === null) {
            return;
        }

        this.postorder(callbackFn, node.left, postorderList);
        this.postorder(callbackFn, node.right, postorderList);
        if (callbackFn) {
            callbackFn(node);
        } else {
            postorderList.push(node.data);
        }

        if (postorderList.length > 0) {
            return postorderList;
        }
    }

    findHeight() {
        if (this.root) {
            return this.root.findHeight(this.root);
        }
        return -1;
    }

    depth(nodeValue, node = this.root, edgeCount = 0) {
        if (node === null) {
            return;
        }
        if (node.data === nodeValue) {
            return edgeCount;
        }

        if (node.data < nodeValue) {
            return this.depth(nodeValue, node.right, edgeCount + 1);
        } else {
            return this.depth(nodeValue, node.left, edgeCount + 1);
        }
    }

    isBalanced() {
        return this.#testBalance(this.root) !== -1;
    }

    #testBalance(node) {
        if (node === null) {
            return 0;
        }

        const leftBalance = this.#testBalance(node.left);
        const rightBalance = this.#testBalance(node.right);
        const diff = Math.abs(leftBalance - rightBalance);

        if (leftBalance === -1 || rightBalance === -1 || diff > 1) {
            return -1;
        } else {
            return Math.max(leftBalance, rightBalance) + 1;
        }
    }

    rebalance() {
        const inorderList = this.inorder();
        return (this.root = this.buildTree(inorderList));
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node.right !== null) {
            this.prettyPrint(
                node.right,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true
            );
        }
    }
}

arr1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// console.log(buildTree(arr1));

let aTree = new Tree(arr1);
// console.log(aTree.root);

// let aNode = new Node(arr1);

// aTree.prettyPrint();
// console.log(aTree.isBalanced());

// aTree.insert(88);
// aTree.insert(100);
// aTree.insert(1010);
// aTree.insert(26);
// aTree.insert(15);
// aTree.prettyPrint();
// console.log(aTree.isBalanced());

// aTree.delete(8);
// aTree.delete(9);
// console.log(aTree.find(23)); // logs the node
// console.log(aTree.levelOrder()); // logs array of values (breadth first search)
// console.log(aTree.inorder()); // array of values in the BST in order
// console.log(aTree.preorder());
// console.log(aTree.postorder());
// console.log(aTree.findHeight()); // returns height of the BST
// console.log(aTree.depth(5)); // returns depth of 5 in the BST

// console.log(aTree.rebalance());
// aTree.prettyPrint();
// console.log(aTree.isBalanced());
// aTree.insert(2);
// aTree.prettyPrint();
// console.log(aTree.isBalanced());
// console.log(aTree.rebalance());
// aTree.prettyPrint();
// console.log(aTree.isBalanced());

function driverFunc() {
    let numOfValues = Math.floor(Math.random() * 15) + 15;
    let array = [];
    for (let i = 0; i < numOfValues; i++) {
        let randomVal = Math.floor(Math.random() * 100);
        array.push(randomVal);
    }

    let randomTree = new Tree(array);
    console.log("***** RANDOM TREE CREATED *****");
    randomTree.prettyPrint();
    console.log(
        `%c is BST balanced? - ${randomTree.isBalanced()}`,
        "background: yellow"
    );
    console.log("Level order");
    console.log(randomTree.levelOrder());
    console.log("Pre order");
    console.log(randomTree.preorder());
    console.log("In order");
    console.log(randomTree.inorder());
    console.log("Post order");
    console.log(randomTree.postorder());

    console.log("***** UNBALANCING THE TREE *****");
    randomTree.insert(101);
    randomTree.insert(109);
    randomTree.insert(154);
    randomTree.insert(123);
    randomTree.prettyPrint();
    console.log(
        `%c is BST balanced? - ${randomTree.isBalanced()}`,
        "background: yellow"
    );

    console.log("***** REBALANCING THE TREE *****");
    randomTree.rebalance();
    randomTree.prettyPrint();
    console.log(
        `%c is BST balanced? - ${randomTree.isBalanced()}`,
        "background: yellow"
    );

    console.log("Level order");
    console.log(randomTree.levelOrder());
    console.log("Pre order");
    console.log(randomTree.preorder());
    console.log("In order");
    console.log(randomTree.inorder());
    console.log("Post order");
    console.log(randomTree.postorder());
    return;
}

console.log(driverFunc());
