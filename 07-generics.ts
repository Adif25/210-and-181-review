// ============================================
// LESSON 7: Generics
// ============================================

// Generics let you write reusable code that works with any type

// --- Problem: Without Generics ---
function identityNumber(value: number): number {
  return value;
}

function identityString(value: string): string {
  return value;
}
// We'd need a function for every type!

// --- Solution: Generic Function ---
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("Hello"));
console.log(identity<number>(42));
console.log(identity(true)); // Type inference works too!

// --- Generic with Arrays ---
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log(getFirst([1, 2, 3]));
console.log(getFirst(["a", "b", "c"]));

function getLast<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

console.log(getLast([10, 20, 30]));

// --- Multiple Type Parameters ---
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

console.log(pair("name", "Alice"));
console.log(pair(1, { active: true }));

// --- Generic Interfaces ---
interface Box<T> {
  value: T;
  getValue(): T;
}

let numberBox: Box<number> = {
  value: 100,
  getValue() {
    return this.value;
  },
};
console.log("Box value:", numberBox.getValue());

// --- Generic Classes ---
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

let numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
numberStack.push(30);
console.log("Peek:", numberStack.peek());
console.log("Pop:", numberStack.pop());
console.log("Pop:", numberStack.pop());

// --- Generic Constraints ---
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(`Length: ${item.length}`);
}

logLength("Hello");        // string has length
logLength([1, 2, 3]);      // array has length
logLength({ length: 10 }); // object with length property
// logLength(123);         // Error! number doesn't have length

// --- keyof Constraint ---
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

let person = { name: "Alice", age: 30, city: "NYC" };
console.log(getProperty(person, "name"));
console.log(getProperty(person, "age"));
// getProperty(person, "invalid"); // Error!

// --- Practical Example: API Response ---
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

let userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Alice" },
  status: 200,
  message: "Success",
};
console.log("API Response:", userResponse);

// --- Exercise 1 ---
// Create a generic function 'reverseArray' that takes an array
// of any type and returns it reversed

// Your code here:



// --- Exercise 2 ---
// Create a generic interface 'Result<T, E>' for operations that
// can succeed or fail:
// - success: boolean
// - data?: T (if success)
// - error?: E (if failure)

// Your code here:



// --- Exercise 3 ---
// Create a generic class 'Queue<T>' with:
// - enqueue(item: T)
// - dequeue(): T | undefined
// - peek(): T | undefined
// - size(): number

// Your code here:



// ============================================
// Run this file: npx ts-node 07-generics.ts
// ============================================
