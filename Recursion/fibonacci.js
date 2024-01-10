// with loops
function fib(n) {
    let array = [0,1];
    if(n <= 0) return `Invalid Sequence`;
    if(n === 1) return [0];
    if(n === 2) return array;
    else {
        n = n - 2;
        for (let i = 0; i < n; i++) {
            array.push(array[i] + array[i+1]);
        }
        return array;
    }
}

console.log(fib(0)); // Invalid Sequence
console.log(fib(1)); // [0]
console.log(fib(2)); // [0,1]
console.log(fib(10));// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// with recursion
function fibRec(n, array = [0,1]) {
    if(n === 2) return array;
    if(n === 1) return [0];
    if(n <= 0) return `Invalid Sequence`;

    array.push(array[array.length - 1] + array[array.length - 2])
    return fibRec(n - 1, array);
}
console.log(fibRec(0)); // Invalid Sequence
console.log(fibRec(1)); // [0]
console.log(fibRec(2)); // [0,1]
console.log(fibRec(10));// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
