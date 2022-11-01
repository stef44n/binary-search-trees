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
    let uniqueChars = [...new Set(anArray)];
    // console.log(uniqueChars);
    let ordered = uniqueChars.sort((a, b) => a - b);
    return ordered;
}

arr1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// console.log(buildTree(arr1));

let aTree = new Tree(arr1);

console.log(aTree);
