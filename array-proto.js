Array.prototype.square = function () {
    const arr = [...this];
    return arr.map((item) => item * item);
};

Array.prototype.cube = function () {
    const arr = [...this];
    return arr.map((item) => item * item * item);
};

Array.prototype.average = function () {
    const arr = [...this];
    if (arr.length === 0) return NaN;

    return arr.reduce((item, acc) => acc + item, 0) / arr.length;
};

Array.prototype.sum = function () {
    const arr = [...this];
    if (arr.length === 0) return NaN;

    return arr.reduce((item, acc) => acc + item, 0);
};

Array.prototype.even = function () {
    const arr = [...this];

    return arr.filter((item) => item % 2 === 0);
};

Array.prototype.odd = function () {
    const arr = [...this];

    return arr.filter((item) => item % 2 !== 0);
};

const res = [1, 2, 3].odd();

console.log(res);
