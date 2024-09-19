function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

const arrayToTree = function (arr) {
    if (!arr.length) return null;

    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;

    while (i < arr.length) {
        const current = queue.shift();

        if (arr[i] !== null) {
            current.left = new TreeNode(arr[i]);
            queue.push(current.left);
        }

        i++;

        if (i < arr.length && arr[i] !== null) {
            current.right = new TreeNode(arr[i]);
            queue.push(current.right);
        }

        i++;
    }

    return root;
};

const inputArray = [2, 8, 4, 3, 7, null, 1, null, null, null, null, 6];
const binaryTree = arrayToTree(inputArray);

console.log(binaryTree);
