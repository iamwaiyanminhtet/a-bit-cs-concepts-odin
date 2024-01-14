class Node {
    constructor (value = null,next = null) {
        this.value = value;
        this.next = next;
    }
}

class linkList {
    head = null;
    size = 0;

    // add new value 
    append(value) {
        let node = new Node(value);
        // if no node, create first node
        if(this.head === null) {
            this.head = node;
        }else {
            // find the next value of the last node
           let pointer = this.head;
           while(pointer.next !== null) {
                pointer = pointer.next
           }
           pointer.next = node;
        }
        this.size++;
    }

    // add from the front
    prepend (value) {
        let node = new Node(value,this.head);
        this.head = node;
        this.size++;
    }

    // tail
    tail() {
        let pointer = this.head;
        while(pointer.next !== null) {
            pointer = pointer.next;
        }
        return pointer;
    }

    // access by index
    at(index) {
        // check size is less than given index
        if(this.size <= index) {
            return 'invalid index';
        }else {
            let curIndex = 0;
            let pointer = this.head;
            // loop as long as given index is smaller than curIndex
            while(curIndex < index) {
                pointer = pointer?.next;
                curIndex++;
            }
            return pointer;
        }
    }

    // delete last element
    pop() {
        let pointer = this.head;
        while(pointer.next.next) {
            pointer = pointer.next;
        }
        pointer.next = null;
        this.size--;
    }

    // contains
    contains(value) {
        let pointer = this.head;
        while (pointer !== null) {
            if (pointer.value === value) {
                return true; 
            }
            pointer = pointer.next;
        }
        return false; 
    }

     // find
     find(value) {
        let pointer = this.head;
        while (pointer !== null) {
            if (pointer.value === value) {
                return pointer; 
            }
            pointer = pointer.next;
        }
        return null; 
    }

    // transform into string
    toString() {
        let pointer = this.head;
        let str = ''; 
        while(pointer.next !== null) {
            str += `${pointer.value} -> `;
            pointer = pointer.next;
        }

        return str += `${pointer.value} -> null`;
    }

}

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

