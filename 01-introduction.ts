// ============================================
// LESSON 1: Introduction to TypeScript
// ============================================

// TypeScript is JavaScript with types!
// It helps catch errors before your code runs.

// --- Basic Types ---

// string: for text
let greeting: string = "Hello, TypeScript!";
console.log(greeting);

// number: for all numbers (integers and decimals)
let age: number = 25;
let price: number = 19.99;
console.log("Age:", age, "Price:", price);

// boolean: true or false
let isActive: boolean = true;
let isComplete: boolean = false;
console.log("Active:", isActive, "Complete:", isComplete);

// --- Type Inference ---
// TypeScript can figure out types automatically
let inferredString = "TypeScript guesses this is a string";
let inferredNumber = 42;

// --- Exercise 1 ---
// Create variables for:
// 1. Your name (string)
// 2. Your birth year (number)
// 3. Whether you like coding (boolean)

// Your code here:



// --- Exercise 2 ---
// Fix the type errors below (uncomment to test):

// let username: string = 123;
// let count: number = "ten";
// let isValid: boolean = "true";

// ============================================
// Run this file: npx ts-node 01-introduction.ts
// ============================================
