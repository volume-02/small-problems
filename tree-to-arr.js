const root = {
    value: 1,
    children: [
        {
            value: 2,
            children: [
                { value: 4, children: [] },
                { value: 5, children: [] },
            ],
        },
        {
            value: 3,
            children: [
                { value: 6, children: [] },
                { value: 7, children: [] },
            ],
        },
    ],
};

const copyToArr = (root) => {
    if (!root) return;
    let arr = [];
    let q = [root];

    while (q.length) {
        const node = q.shift();
        if (!node) return;

        const { value, children } = node;
        arr.push(value);

        for (let i = 0; i < children.length; i++) {
            q.push(children[i]);
        }
    }

    return arr;
};

console.log(copyToArr(root)); // [ 1, 2, 3, 4, 5, 6, 7 ]
