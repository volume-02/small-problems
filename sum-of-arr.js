// find sum of nested array
// convert value to number if it can be converted
// not all values are valid

const arr = [1, "2", "3m", [4, "zcx", [1]]];

const sum = (arr) => {
    let res = 0;

    for (let i = 0; i < arr.length; i++) {
        const elem = arr[i];

        if (Array.isArray(elem)) {
            res += sum(elem);
            continue;
        }

        const maybeNumber = Number(elem);

        if (typeof maybeNumber === "number" && !Number.isNaN(maybeNumber)) {
            res += maybeNumber;
        }
    }

    return res;
};

console.log(sum(arr)); // 8
