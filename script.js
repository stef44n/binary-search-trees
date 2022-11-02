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
                console.log(`mid Value = ${midValue}`);

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
}

arr1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// console.log(buildTree(arr1));

let aTree = new Tree(arr1);
console.log(aTree);

// let aNode = new Node(arr1);

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

// aTree.insert(8);
aTree.insert(15);
prettyPrint(aTree.root);
// aTree.delete(8);
aTree.delete(9);
prettyPrint(aTree.root);
