// ============================================
// LESSON 2: Functions in TypeScript
// ============================================

// Functions with typed parameters and return types

// --- Basic Function ---
function add(a: number, b: number): number {
  return a + b;
}
console.log("5 + 3 =", add(5, 3));

// --- Function with no return value (void) ---
function logMessage(message: string): void {
  console.log("LOG:", message);
}
logMessage("This function returns nothing");

// --- Optional Parameters ---
function greet(name: string, title?: string): string {
  if (title) {
    return `Hello, ${title} ${name}!`;
  }
  return `Hello, ${name}!`;
}
console.log(greet("Alice"));
console.log(greet("Smith", "Dr."));

// --- Default Parameters ---
function createUser(name: string, role: string = "guest"): string {
  return `${name} is a ${role}`;
}
console.log(createUser("Bob"));
console.log(createUser("Carol", "admin"));

// --- Arrow Functions ---
const multiply = (a: number, b: number): number => a * b;
console.log("4 * 7 =", multiply(4, 7));

const square = (n: number): number => n * n;
console.log("9 squared =", square(9));

// --- Exercise 1 ---
// Create a function called 'subtract' that takes two numbers
// and returns their difference

// Your code here:



// --- Exercise 2 ---
// Create a function called 'formatPrice' that:
// - Takes a price (number) and currency (string, default "$")
// - Returns a formatted string like "$19.99"

// Your code here:



// --- Exercise 3 ---
// Create an arrow function called 'isEven' that:
// - Takes a number
// - Returns true if even, false if odd

// Your code here:



// ============================================
// Run this file: npx ts-node 02-functions.ts
// ============================================
