// ============================================
// LESSON 4: Objects and Interfaces
// ============================================

// --- Basic Object with Type Annotation ---
let person: { name: string; age: number } = {
  name: "Alice",
  age: 30,
};
console.log(person);

// --- Interfaces: Define object shapes ---
interface User {
  id: number;
  username: string;
  email: string;
  isActive: boolean;
}

let user1: User = {
  id: 1,
  username: "alice123",
  email: "alice@example.com",
  isActive: true,
};
console.log("User:", user1);

// --- Optional Properties ---
interface Product {
  name: string;
  price: number;
  description?: string; // Optional
}

let laptop: Product = {
  name: "Laptop",
  price: 999,
};

let phone: Product = {
  name: "Phone",
  price: 699,
  description: "Latest smartphone",
};

console.log("Laptop:", laptop);
console.log("Phone:", phone);

// --- Readonly Properties ---
interface Config {
  readonly apiKey: string;
  readonly baseUrl: string;
}

let config: Config = {
  apiKey: "abc123",
  baseUrl: "https://api.example.com",
};
// config.apiKey = "xyz"; // Error! Cannot reassign readonly

// --- Functions in Interfaces ---
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

let calc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};
console.log("10 + 5 =", calc.add(10, 5));

// --- Extending Interfaces ---
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

let myDog: Dog = {
  name: "Buddy",
  age: 3,
  breed: "Golden Retriever",
  bark: () => console.log("Woof!"),
};
console.log("Dog:", myDog.name, myDog.breed);
myDog.bark();

// --- Type Aliases (alternative to interfaces) ---
type Point = {
  x: number;
  y: number;
};

let origin: Point = { x: 0, y: 0 };

// --- Exercise 1 ---
// Create an interface for a Book with:
// - title (string)
// - author (string)
// - pages (number)
// - isRead (boolean, optional)
// Then create a book object

// Your code here:



// --- Exercise 2 ---
// Create an interface for a TodoItem with:
// - id (number)
// - task (string)
// - completed (boolean)
// - dueDate (string, optional)
// Create an array of 3 todo items

// Your code here:



// --- Exercise 3 ---
// Extend the User interface to create an AdminUser
// that also has a 'permissions' property (string array)

// Your code here:



// ============================================
// Run this file: npx ts-node 04-objects-interfaces.ts
// ============================================
