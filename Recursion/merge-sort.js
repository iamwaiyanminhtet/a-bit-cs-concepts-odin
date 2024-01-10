function mergeSort(arr) {
    if(arr.length < 0 || !(Array.isArray(arr)) ) return `non-array value`;
    if(arr.length <= 1) return arr;

    // spilt into two array
    let left = mergeSort(arr.slice(0, arr.length / 2));
    let right = mergeSort(arr.slice(arr.length / 2));

    // sort two array items
    return merge(left,right);
}

function merge(left, right) {
    let mergedArray = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // compared left array items with right array items and order
    while(leftIndex < left.length && rightIndex < right.length) {
        if(left[leftIndex] < right[rightIndex]) {
            mergedArray.push(left[leftIndex]);
            leftIndex++;
        }else{
            mergedArray.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // if left array has some items left(eng-word left)
    while(leftIndex < left.length) {
        mergedArray.push(left[leftIndex]);
        leftIndex++;
    }

    // if right array has some items left
    while(rightIndex < right.length) {
        mergedArray.push(right[rightIndex]);
        rightIndex++;
    }

    return mergedArray;
}

console.log(mergeSort(1)); // non-array value
console.log(mergeSort([1])); // 1
console.log(mergeSort([2, 1, 3, 5, 7, 4, 6, 10, 8, 9])); // Outputs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]