class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.array = buildTree(array);
    }
}

function buildTree(anArray) {
    // console.log(anArray);
    let mainNode = new Node(anArray); // make this root/0? add subnodes??
    if (anArray.length === 0) {
        return null;
    } else {
        let uniqueChars = [...new Set(anArray)];
        // console.log(uniqueChars);
        let ordered = uniqueChars.sort((a, b) => a - b);
        // console.log(ordered);
        if (ordered.length === 1) {
            mainNode.data = ordered;
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
            mainNode.left = buildTree(leftNode.data);
            // buildTree(leftNode.data);

            let rightNode = new Node(rightArr);
            rightNode.data = rightArr;
            mainNode.right = buildTree(rightNode.data);
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

arr1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// console.log(buildTree(arr1));

let aTree = new Tree(arr1);
console.log(aTree);

let aNode = new Node(arr1);

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

prettyPrint(aTree.array);
