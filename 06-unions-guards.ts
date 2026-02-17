// ============================================
// LESSON 6: Union Types and Type Guards
// ============================================

// --- Union Types ---
// A value can be one of several types

let id: string | number;
id = "abc123";
console.log("ID:", id);
id = 456;
console.log("ID:", id);

// --- Union with function parameters ---
function printId(id: string | number): void {
  console.log(`Your ID is: ${id}`);
}
printId("user-123");
printId(789);

// --- Type Guards with typeof ---
function formatValue(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else {
    return value.toFixed(2);
  }
}
console.log(formatValue("hello"));
console.log(formatValue(3.14159));

// --- Literal Types ---
type Status = "pending" | "approved" | "rejected";

function setStatus(status: Status): void {
  console.log(`Status set to: ${status}`);
}
setStatus("approved");
// setStatus("invalid"); // Error!

type Direction = "up" | "down" | "left" | "right";

function move(direction: Direction): void {
  console.log(`Moving ${direction}`);
}
move("up");

// --- Discriminated Unions ---
interface Circle {
  kind: "circle";
  radius: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

interface Triangle {
  kind: "triangle";
  base: number;
  height: number;
}

type Shape = Circle | Rectangle | Triangle;

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}

let myCircle: Circle = { kind: "circle", radius: 5 };
let myRect: Rectangle = { kind: "rectangle", width: 10, height: 5 };

console.log("Circle area:", calculateArea(myCircle).toFixed(2));
console.log("Rectangle area:", calculateArea(myRect));

// --- Nullable Types ---
function findUser(id: number): string | null {
  if (id === 1) return "Alice";
  if (id === 2) return "Bob";
  return null;
}

let user = findUser(1);
if (user !== null) {
  console.log("Found user:", user.toUpperCase());
}

// --- Optional Chaining ---
interface Company {
  name: string;
  address?: {
    street: string;
    city: string;
  };
}

let company1: Company = { name: "TechCorp" };
let company2: Company = {
  name: "StartupXYZ",
  address: { street: "123 Main St", city: "Boston" },
};

console.log("Company 1 city:", company1.address?.city ?? "Unknown");
console.log("Company 2 city:", company2.address?.city ?? "Unknown");

// --- Nullish Coalescing (??) ---
let input: string | null = null;
let defaultValue = input ?? "default";
console.log("Value:", defaultValue);

// --- Exercise 1 ---
// Create a function that accepts string | number | boolean
// Return "string", "number", or "boolean" based on the type

// Your code here:



// --- Exercise 2 ---
// Create a type for HttpStatus: 200 | 400 | 404 | 500
// Create a function that returns a message for each status

// Your code here:



// --- Exercise 3 ---
// Create discriminated unions for different payment methods:
// - CreditCard (kind, cardNumber, expiry)
// - PayPal (kind, email)
// - BankTransfer (kind, accountNumber, routingNumber)
// Create a function to process a payment

// Your code here:



// ============================================
// Run this file: npx ts-node 06-unions-guards.ts
// ============================================
