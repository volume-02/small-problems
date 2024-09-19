/*
 *  Implement a curry function that will take any
 *  other function as an argument and make it curried.
 */

const sum = (a, b, c) => a * b + c;

const curry = (fn) => {
    let len = fn.length;

    const currier = (...rest) => {
        if (rest.length === len) {
            return fn(...rest);
        }
        return currier.bind(null, ...rest);
    };

    return currier;
};

// const curry = (fn) => {
//     const len = fn.length;
//     const currier = (...args) => {
//         if (args.length >= len) {
//             return fn(...args);
//         }
//         return (...newArgs) => currier(...args, ...newArgs);
//     };
//     return currier;
// };

const currySum = curry(sum)(1);

console.log(currySum(2)(3)); //6
console.log(currySum(3)(4)); //8
