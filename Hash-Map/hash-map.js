

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
  
  class NodeHash {
    constructor (key, value,next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
  }
  
  class HashMap {
    constructor(size) {
      this.bucket = Array(size);
      this.capacity = 0.75;
    }
  
    // return hased index base on the value and arraySize
    hash(key, tableLength = this.bucket.length) {
      function stringToNumber(string) {
        let hashCode = 0;
        for (let i = 0; i < string.length; i++) {
          hashCode += string.charCodeAt(i);
        }
      
        return hashCode;
      }
      return stringToNumber(key) % tableLength;
    }
  
    // set value to specific array index, for more than one value with linkList
    set(key, value) {
      // if(this.checkCapacity() > this.capacity) {
      //   this.bucket = this.resize();
      // };
  
      const indexVal = this.hash(key,this.bucket.length);
      const node = new NodeHash(key,value);
  
      if(this.bucket[indexVal]) {
        let newLinkList =  new linkList();
        newLinkList.append(this.bucket[indexVal]);
        newLinkList.append(node);
        this.bucket[indexVal] = newLinkList;
      }else {
        this.bucket[indexVal] = node;
      }
    }
  
    // double the table size with the existing value
    // resize(array = this.bucket) {
    //   let newArray = Array(this.bucket.length * 2);
    //   for(let i = 0; i < newArray.length ; i++) {
    //     if(array[i]) {
    //       const indexVal = this.hash(array[i].value, newArray.length);
    //       const node = new NodeHash(array[i].key,array[i].value);
    //       newArray[indexVal] = node;
    //     }
    //   }
    //   return newArray;
    // }
  
  
    // check capacity
    checkCapacity() {
      let count = 0;
      this.bucket.forEach((item) => item ? count++ : count);
      
      return count / this.bucket.length;
    }
  
    // get
    get(key) {
      return this.bucket[this.hash(key)];
    }
  
     // has
    has(key) {
      return this.bucket[this.hash(key)] ? true : false;
    }
  
    // remove
    remove(key) {
      return this.bucket[this.hash(key)] ? this.bucket.splice(this.bucket.findIndex((item) => item === this.bucket[this.hash(key)]), 1) : false;
    }
  
    // length
    length() {
      let length = 0;
      this.bucket.forEach((item) => item ? length++ : length);
      return length;
    }
  
    // clear
    clear() {
      return this.bucket = new Array(this.bucket.length + 1);
    }
  
    // keys
    keys() {
      let newArray = [];
      this.bucket.forEach(item => {
        // if simple node
        if(item instanceof NodeHash) {
          newArray.push(item.key);
        }
        // if it's linklist
        if(item instanceof linkList) {
          newArray.push(item.head.value.key);
        } 
      });
  
      return newArray;
    }
  
    // values
    values() {
      let newArray = [];
      let str = '';
      this.bucket.forEach(item => {
        // if simple node
        if(item instanceof NodeHash) {
          newArray.push(item.value);
        }
        // if link list
        if(item instanceof linkList) {
          let pointer = item.head;
          // for all the linklist value, change all want value into str seperated by comma(,)
          while(pointer.next !== null) {
              str += `${pointer.value.value},`;
              pointer = pointer.next;
          }
          str += `${pointer.value.value}`
          // split str with comma push each item to newArray
          str.split(',').forEach(item => newArray.push(item));
        }
      });
      return newArray;
    }
  
    // key,value pair
    entries() {
      let newArray = [];
      this.bucket.forEach(item => {
        // if simple node
        if(item instanceof NodeHash) {
          newArray.push([item.key,item.value]);
        }
        // if it's linklist
        if(item instanceof linkList) {
          let pointer = item.head;
          let tempArray = [];
          let str = '';
          // for all the linklist value, change all want value into str seperated by comma(,)
          while(pointer.next !== null) {
              str += `${pointer.value.value},`;
              pointer = pointer.next;
          }
          str += `${pointer.value.value}`
          // split str with comma push each item to newArray
          str.split(',').forEach(item => tempArray.push(item));
          newArray.push([item.head.value.key,tempArray]);
        } 
      });
      return newArray;
    }
  }
  
  let hashMap = new HashMap(16);
  hashMap.set('batman' ,'bruce wayne');
  hashMap.set('flash' ,'barry allen');
  hashMap.set('flash' ,'barry allen');
  hashMap.set('wonder woman' ,'diana of the smth');
  hashMap.set('aquaman' ,'arthur curry');
  hashMap.set('superman' ,'clark kent');
  hashMap.set('cyborg' ,'victor stone');
  console.log(hashMap);
  console.log(hashMap.get('cyborg'));
  console.log(hashMap.remove('batman')) // you can't remove cuz he is batman.
  console.log(hashMap.has('batman')) // jk, batman has been removed // false
  console.log(hashMap.length()); // 5
  hashMap.set('batman' ,'bruce wayne');
  hashMap.set('batman' ,'thomas wayne');
  console.log(hashMap.keys()); // ['wonder woman', 'aquaman', 'cyborg', 'superman', 'batman', 'flash']
  console.log(hashMap.values()); // ['diana of the smth', 'arthur curry', 'victor stone', 'clark kent', 'bruce wayne', 'thomas wayne', 'bruce wayne', 'thomas waynebarry allen', 'barry allen']
  console.log(hashMap.entries()) // [[key,value],[key,value],...]
  console.log(hashMap.clear()); // clear array
  