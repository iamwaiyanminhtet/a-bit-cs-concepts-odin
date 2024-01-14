# Common DSA from odin javascript course
this course only touch the iceberg of DSA.

### Resursion
###### fibonacci sequence function with loop and recursive 
methods return fib sequence for given number
- console.log-(fibRec(10));// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

###### Mergesort
sort unsorted array 
- console.log(mergeSort([2, 1, 3, 5, 7, 4, 6, 10, 8, 9])); // Outputs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

### Link list
link-list is one of the data structures which usage might not need in normal works (because of array?), but what it's essentially is each node has a value or pointer to next node.

example link list of my implementation : 

```javascript
let link = new linkList();
link.append(2);
link.append(3);
link.prepend(1);

console.log(link.size); // 3
console.log(link.head); // node of 1
console.log(link.tail()); // node of 3
console.log(link.at(0)) ;// node of 1, index starts from 0
link.pop(); // remove last element
console.log(link.contains(1)); // true
console.log(link.contains(3)); // false, cuz we removed
console.log(link.find(1)); // return node of 1
console.log(link.toString()); // return string : 1 -> 2 -> null
```

