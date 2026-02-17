// ============================================
// LESSON 3: Arrays and Loops
// ============================================

// --- Typed Arrays ---
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Carol"];
let flags: boolean[] = [true, false, true];

console.log("Numbers:", numbers);
console.log("Names:", names);

// Alternative syntax using generics
let scores: Array<number> = [95, 87, 92];

// --- Array Methods ---
numbers.push(6);                    // Add to end
console.log("After push:", numbers);

let firstNumber = numbers.shift();  // Remove from start
console.log("Removed:", firstNumber);

let hasAlice = names.includes("Alice");
console.log("Has Alice:", hasAlice);

// --- For Loop ---
console.log("\n--- For Loop ---");
for (let i = 0; i < names.length; i++) {
  console.log(`Index ${i}: ${names[i]}`);
}

// --- For...of Loop (recommended for arrays) ---
console.log("\n--- For...of Loop ---");
for (const name of names) {
  console.log(`Hello, ${name}!`);
}

// --- forEach Method ---
console.log("\n--- forEach ---");
numbers.forEach((num, index) => {
  console.log(`numbers[${index}] = ${num}`);
});

// --- map: Transform each element ---
console.log("\n--- map ---");
let doubled = numbers.map((n) => n * 2);
console.log("Doubled:", doubled);

// --- filter: Keep elements that match condition ---
console.log("\n--- filter ---");
let evenNumbers = numbers.filter((n) => n % 2 === 0);
console.log("Even numbers:", evenNumbers);

// --- reduce: Combine all elements into one value ---
console.log("\n--- reduce ---");
let sum = numbers.reduce((total, n) => total + n, 0);
console.log("Sum:", sum);

// --- Exercise 1 ---
// Create an array of 5 temperatures (numbers)
// Use a for...of loop to print each one

// Your code here:



// --- Exercise 2 ---
// Given an array of prices, use map to add 10% tax to each

// Your code here:
// let prices: number[] = [10, 20, 30, 40];



// --- Exercise 3 ---
// Given an array of ages, use filter to get only adults (18+)

// Your code here:
// let ages: number[] = [12, 25, 17, 30, 16, 21];



// ============================================
// Run this file: npx ts-node 03-arrays-loops.ts
// ============================================
