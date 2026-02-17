export interface TestCase {
  name: string;
  test: (code: string, output: string[]) => boolean;
  hint: string;
}

export interface Exercise {
  id: string;
  title: string;
  instructions: string;
  starterCode: string;
  solution: string;
  tests: TestCase[];
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  explanation: string;
  exercises: Exercise[];
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "Variables & Types",
    description: "Learn about TypeScript's basic types and how to declare variables.",
    explanation: `
# Variables & Types

TypeScript adds **types** to JavaScript. Types help catch errors before your code runs.

## Basic Types

- \`string\` - for text: \`"Hello"\`
- \`number\` - for numbers: \`42\`, \`3.14\`
- \`boolean\` - for true/false: \`true\`, \`false\`

## Declaring Variables

\`\`\`typescript
let name: string = "Alice";
let age: number = 25;
let isStudent: boolean = true;
\`\`\`

## Type Inference

TypeScript can often figure out the type automatically:

\`\`\`typescript
let city = "New York"; // TypeScript knows this is a string
\`\`\`

## Using console.log

To output values, use \`console.log()\`:

\`\`\`typescript
console.log("Hello, World!");
console.log(age);
\`\`\`
    `,
    exercises: [
      {
        id: "1-1",
        title: "Declare Variables",
        instructions: "Create three variables:\n1. `name` - a string with your name\n2. `age` - a number with your age\n3. `isHappy` - a boolean set to true\n\nThen print each variable using `console.log()`",
        starterCode: `// Declare your variables below
`,
        solution: `let name: string = "Alex";
let age: number = 25;
let isHappy: boolean = true;

console.log(name);
console.log(age);
console.log(isHappy);`,
        tests: [
          {
            name: "Declares a string variable 'name'",
            test: (code) => /let\s+name\s*:\s*string\s*=/.test(code) || /let\s+name\s*=\s*["']/.test(code),
            hint: "Declare a variable called 'name' with type string"
          },
          {
            name: "Declares a number variable 'age'",
            test: (code) => /let\s+age\s*:\s*number\s*=/.test(code) || /let\s+age\s*=\s*\d+/.test(code),
            hint: "Declare a variable called 'age' with type number"
          },
          {
            name: "Declares a boolean variable 'isHappy'",
            test: (code) => /let\s+isHappy\s*:\s*boolean\s*=/.test(code) || /let\s+isHappy\s*=\s*(true|false)/.test(code),
            hint: "Declare a variable called 'isHappy' with type boolean"
          },
          {
            name: "Prints at least 3 values",
            test: (_, output) => output.length >= 3,
            hint: "Use console.log() to print each variable"
          }
        ]
      },
      {
        id: "1-2",
        title: "Type Errors",
        instructions: "Fix the type errors in the code below. Each variable has the wrong type of value assigned to it.",
        starterCode: `// Fix the type errors below
let username: string = 123;
let score: number = "fifty";
let isActive: boolean = "yes";

console.log(username);
console.log(score);
console.log(isActive);`,
        solution: `let username: string = "player1";
let score: number = 50;
let isActive: boolean = true;

console.log(username);
console.log(score);
console.log(isActive);`,
        tests: [
          {
            name: "username is a valid string",
            test: (code) => /let\s+username\s*:\s*string\s*=\s*["']/.test(code),
            hint: "Assign a string value (in quotes) to username"
          },
          {
            name: "score is a valid number",
            test: (code) => /let\s+score\s*:\s*number\s*=\s*\d+/.test(code),
            hint: "Assign a number value (without quotes) to score"
          },
          {
            name: "isActive is a valid boolean",
            test: (code) => /let\s+isActive\s*:\s*boolean\s*=\s*(true|false)/.test(code),
            hint: "Assign true or false (without quotes) to isActive"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Functions",
    description: "Learn how to create and use functions with typed parameters and return values.",
    explanation: `
# Functions

Functions are reusable blocks of code. In TypeScript, we can add types to parameters and return values.

## Basic Function Syntax

\`\`\`typescript
function greet(name: string): string {
  return "Hello, " + name + "!";
}
\`\`\`

- \`name: string\` - the parameter type
- \`: string\` after \`()\` - the return type

## Arrow Functions

A shorter way to write functions:

\`\`\`typescript
const add = (a: number, b: number): number => {
  return a + b;
};

// Even shorter for single expressions:
const multiply = (a: number, b: number): number => a * b;
\`\`\`

## Calling Functions

\`\`\`typescript
const message = greet("Alice");
console.log(message); // "Hello, Alice!"

const sum = add(5, 3);
console.log(sum); // 8
\`\`\`
    `,
    exercises: [
      {
        id: "2-1",
        title: "Create a Greeting Function",
        instructions: "Create a function called `greet` that:\n1. Takes a `name` parameter (string)\n2. Returns a greeting like \"Hello, [name]!\"\n\nThen call the function with your name and print the result.",
        starterCode: `// Create your greet function here

`,
        solution: `function greet(name: string): string {
  return "Hello, " + name + "!";
}

const message = greet("Alex");
console.log(message);`,
        tests: [
          {
            name: "Defines a greet function",
            test: (code) => /function\s+greet\s*\(/.test(code) || /const\s+greet\s*=/.test(code),
            hint: "Define a function called 'greet'"
          },
          {
            name: "Function takes a name parameter",
            test: (code) => /greet\s*\(\s*name\s*:\s*string/.test(code) || /greet\s*=\s*\(\s*name\s*:\s*string/.test(code),
            hint: "Add a 'name' parameter with type string"
          },
          {
            name: "Function returns a greeting",
            test: (code) => /return\s+.*Hello.*name/.test(code) || /return\s+`.*\$\{name\}/.test(code),
            hint: "Return a string that includes 'Hello' and the name"
          },
          {
            name: "Calls the function and prints result",
            test: (_, output) => output.some(line => line.toLowerCase().includes("hello")),
            hint: "Call greet() with a name and use console.log() to print the result"
          }
        ]
      },
      {
        id: "2-2",
        title: "Calculator Functions",
        instructions: "Create two functions:\n1. `add(a, b)` - returns the sum of two numbers\n2. `multiply(a, b)` - returns the product of two numbers\n\nThen test them by printing `add(5, 3)` and `multiply(4, 7)`",
        starterCode: `// Create your calculator functions here

`,
        solution: `function add(a: number, b: number): number {
  return a + b;
}

function multiply(a: number, b: number): number {
  return a * b;
}

console.log(add(5, 3));
console.log(multiply(4, 7));`,
        tests: [
          {
            name: "Defines add function",
            test: (code) => /function\s+add\s*\(|const\s+add\s*=/.test(code),
            hint: "Define a function called 'add'"
          },
          {
            name: "Defines multiply function",
            test: (code) => /function\s+multiply\s*\(|const\s+multiply\s*=/.test(code),
            hint: "Define a function called 'multiply'"
          },
          {
            name: "add(5, 3) returns 8",
            test: (_, output) => output.includes("8"),
            hint: "Make sure add(5, 3) returns 8 and you print it"
          },
          {
            name: "multiply(4, 7) returns 28",
            test: (_, output) => output.includes("28"),
            hint: "Make sure multiply(4, 7) returns 28 and you print it"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Conditionals",
    description: "Learn how to make decisions in your code with if/else statements.",
    explanation: `
# Conditionals

Conditionals let your code make decisions based on conditions.

## If/Else Statements

\`\`\`typescript
const age: number = 18;

if (age >= 18) {
  console.log("You are an adult");
} else {
  console.log("You are a minor");
}
\`\`\`

## Comparison Operators

- \`===\` equal to
- \`!==\` not equal to
- \`>\` greater than
- \`<\` less than
- \`>=\` greater than or equal
- \`<=\` less than or equal

## Else If

For multiple conditions:

\`\`\`typescript
const score: number = 85;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else if (score >= 70) {
  console.log("C");
} else {
  console.log("F");
}
\`\`\`

## Logical Operators

- \`&&\` AND - both must be true
- \`||\` OR - at least one must be true
- \`!\` NOT - flips true/false

\`\`\`typescript
const hasTicket = true;
const age = 15;

if (hasTicket && age >= 13) {
  console.log("Enjoy the movie!");
}
\`\`\`
    `,
    exercises: [
      {
        id: "3-1",
        title: "Age Checker",
        instructions: "Create a variable `age` with a number value.\n\nWrite an if/else statement that:\n- Prints \"You can vote!\" if age is 18 or older\n- Prints \"Too young to vote\" otherwise\n\nTest with age = 20",
        starterCode: `// Create your age checker here
const age: number = 20;

`,
        solution: `const age: number = 20;

if (age >= 18) {
  console.log("You can vote!");
} else {
  console.log("Too young to vote");
}`,
        tests: [
          {
            name: "Uses if statement",
            test: (code) => /if\s*\(/.test(code),
            hint: "Use an if statement to check the condition"
          },
          {
            name: "Checks if age >= 18",
            test: (code) => /age\s*(>=|>)\s*18/.test(code) || /18\s*(<=|<)\s*age/.test(code),
            hint: "Check if age is 18 or older"
          },
          {
            name: "Has else clause",
            test: (code) => /}\s*else\s*{/.test(code),
            hint: "Add an else clause for when the condition is false"
          },
          {
            name: "Prints correct message for age 20",
            test: (_, output) => output.some(line => line.toLowerCase().includes("vote") && !line.toLowerCase().includes("young")),
            hint: "For age 20, it should print 'You can vote!'"
          }
        ]
      },
      {
        id: "3-2",
        title: "Grade Calculator",
        instructions: "Create a `score` variable set to 85.\n\nWrite if/else if/else statements to print the letter grade:\n- 90+ → \"A\"\n- 80-89 → \"B\"\n- 70-79 → \"C\"\n- 60-69 → \"D\"\n- Below 60 → \"F\"",
        starterCode: `const score: number = 85;

// Write your grade calculator here
`,
        solution: `const score: number = 85;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else if (score >= 70) {
  console.log("C");
} else if (score >= 60) {
  console.log("D");
} else {
  console.log("F");
}`,
        tests: [
          {
            name: "Uses if statement",
            test: (code) => /if\s*\(/.test(code),
            hint: "Start with an if statement"
          },
          {
            name: "Uses else if for multiple conditions",
            test: (code) => /else\s+if\s*\(/.test(code),
            hint: "Use 'else if' to check additional conditions"
          },
          {
            name: "Prints 'B' for score 85",
            test: (_, output) => output.includes("B"),
            hint: "Score 85 should print 'B'"
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Arrays & Loops",
    description: "Learn how to work with arrays and iterate through them.",
    explanation: `
# Arrays & Loops

Arrays hold multiple values of the same type.

## Creating Arrays

\`\`\`typescript
const numbers: number[] = [1, 2, 3, 4, 5];
const names: string[] = ["Alice", "Bob", "Charlie"];
\`\`\`

## Accessing Elements

\`\`\`typescript
console.log(names[0]); // "Alice" (first element)
console.log(names[2]); // "Charlie" (third element)
console.log(names.length); // 3
\`\`\`

## For Loop

\`\`\`typescript
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
\`\`\`

## For...of Loop

A cleaner way to iterate:

\`\`\`typescript
for (const name of names) {
  console.log(name);
}
\`\`\`

## Array Methods

\`\`\`typescript
// forEach - do something with each element
numbers.forEach(num => console.log(num));

// map - transform each element
const doubled = numbers.map(num => num * 2);

// filter - keep only matching elements
const big = numbers.filter(num => num > 3);
\`\`\`
    `,
    exercises: [
      {
        id: "4-1",
        title: "Sum Array",
        instructions: "Create an array `numbers` with values [10, 20, 30, 40, 50].\n\nUse a loop to calculate the sum of all numbers, then print the sum.",
        starterCode: `// Create your array and calculate the sum

`,
        solution: `const numbers: number[] = [10, 20, 30, 40, 50];

let sum = 0;
for (const num of numbers) {
  sum += num;
}

console.log(sum);`,
        tests: [
          {
            name: "Creates an array with the correct values",
            test: (code) => /\[\s*10\s*,\s*20\s*,\s*30\s*,\s*40\s*,\s*50\s*\]/.test(code),
            hint: "Create an array with values [10, 20, 30, 40, 50]"
          },
          {
            name: "Uses a loop",
            test: (code) => /for\s*\(|\.forEach\(|while\s*\(/.test(code),
            hint: "Use a for loop, for...of loop, or forEach to iterate"
          },
          {
            name: "Prints the correct sum (150)",
            test: (_, output) => output.includes("150"),
            hint: "The sum of [10, 20, 30, 40, 50] is 150"
          }
        ]
      },
      {
        id: "4-2",
        title: "Filter and Transform",
        instructions: "Create an array `scores` with values [45, 82, 91, 67, 55, 78].\n\n1. Use `filter()` to get only scores >= 70 (passing scores)\n2. Print the passing scores\n3. Print how many students passed",
        starterCode: `const scores: number[] = [45, 82, 91, 67, 55, 78];

// Filter passing scores and print results
`,
        solution: `const scores: number[] = [45, 82, 91, 67, 55, 78];

const passing = scores.filter(score => score >= 70);

console.log(passing);
console.log(passing.length);`,
        tests: [
          {
            name: "Uses filter method",
            test: (code) => /\.filter\s*\(/.test(code),
            hint: "Use the .filter() method to get passing scores"
          },
          {
            name: "Filters scores >= 70",
            test: (code) => />=\s*70|>\s*69/.test(code),
            hint: "Filter for scores that are 70 or above"
          },
          {
            name: "Prints number of passing students (3)",
            test: (_, output) => output.some(line => line.includes("3")),
            hint: "There are 3 passing scores (82, 91, 78)"
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Objects & Interfaces",
    description: "Learn how to structure data with objects and define their shape with interfaces.",
    explanation: `
# Objects & Interfaces

Objects group related data together. Interfaces define the shape of objects.

## Creating Objects

\`\`\`typescript
const person = {
  name: "Alice",
  age: 25,
  isStudent: true
};

console.log(person.name); // "Alice"
\`\`\`

## Interfaces

Interfaces define what properties an object must have:

\`\`\`typescript
interface Person {
  name: string;
  age: number;
  isStudent: boolean;
}

const bob: Person = {
  name: "Bob",
  age: 30,
  isStudent: false
};
\`\`\`

## Optional Properties

Use \`?\` for optional properties:

\`\`\`typescript
interface Product {
  name: string;
  price: number;
  description?: string; // optional
}
\`\`\`

## Arrays of Objects

\`\`\`typescript
const people: Person[] = [
  { name: "Alice", age: 25, isStudent: true },
  { name: "Bob", age: 30, isStudent: false }
];
\`\`\`
    `,
    exercises: [
      {
        id: "5-1",
        title: "Create a Product Interface",
        instructions: "1. Create an interface `Product` with:\n   - `name` (string)\n   - `price` (number)\n   - `inStock` (boolean)\n\n2. Create a product object using this interface\n3. Print the product's name and price",
        starterCode: `// Define your Product interface and create a product

`,
        solution: `interface Product {
  name: string;
  price: number;
  inStock: boolean;
}

const laptop: Product = {
  name: "Laptop",
  price: 999,
  inStock: true
};

console.log(laptop.name);
console.log(laptop.price);`,
        tests: [
          {
            name: "Defines Product interface",
            test: (code) => /interface\s+Product\s*{/.test(code),
            hint: "Define an interface called 'Product'"
          },
          {
            name: "Interface has name, price, and inStock",
            test: (code) => /name\s*:\s*string/.test(code) && /price\s*:\s*number/.test(code) && /inStock\s*:\s*boolean/.test(code),
            hint: "Add name (string), price (number), and inStock (boolean) to the interface"
          },
          {
            name: "Creates a Product object",
            test: (code) => /:\s*Product\s*=\s*{/.test(code),
            hint: "Create a variable with type Product"
          },
          {
            name: "Prints the product name and price",
            test: (_, output) => output.length >= 2,
            hint: "Use console.log to print the name and price"
          }
        ]
      },
      {
        id: "5-2",
        title: "Student Records",
        instructions: "1. Create a `Student` interface with: `name` (string), `grade` (number)\n2. Create an array of 3 students\n3. Loop through and print each student's name and grade",
        starterCode: `// Create Student interface and student records

`,
        solution: `interface Student {
  name: string;
  grade: number;
}

const students: Student[] = [
  { name: "Alice", grade: 95 },
  { name: "Bob", grade: 82 },
  { name: "Charlie", grade: 78 }
];

for (const student of students) {
  console.log(student.name + ": " + student.grade);
}`,
        tests: [
          {
            name: "Defines Student interface",
            test: (code) => /interface\s+Student\s*{/.test(code),
            hint: "Define an interface called 'Student'"
          },
          {
            name: "Creates an array of students",
            test: (code) => /Student\s*\[\s*\]/.test(code) || /:\s*Student\s*\[\s*\]\s*=/.test(code),
            hint: "Create an array with type Student[]"
          },
          {
            name: "Has at least 3 students",
            test: (code) => {
              const matches = code.match(/{\s*name\s*:/g);
              return matches !== null && matches.length >= 3;
            },
            hint: "Add at least 3 student objects to the array"
          },
          {
            name: "Loops and prints student info",
            test: (_, output) => output.length >= 3,
            hint: "Loop through students and print each one's info"
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Classes",
    description: "Learn object-oriented programming with classes in TypeScript.",
    explanation: `
# Classes

Classes are blueprints for creating objects with properties and methods.

## Basic Class

\`\`\`typescript
class Dog {
  name: string;
  breed: string;

  constructor(name: string, breed: string) {
    this.name = name;
    this.breed = breed;
  }

  bark(): void {
    console.log(this.name + " says Woof!");
  }
}

const myDog = new Dog("Buddy", "Golden Retriever");
myDog.bark(); // "Buddy says Woof!"
\`\`\`

## Access Modifiers

- \`public\` - accessible from anywhere (default)
- \`private\` - only accessible within the class
- \`protected\` - accessible within class and subclasses

\`\`\`typescript
class BankAccount {
  private balance: number;

  constructor(initial: number) {
    this.balance = initial;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}
\`\`\`

## Inheritance

Classes can extend other classes:

\`\`\`typescript
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Cat extends Animal {
  meow(): void {
    console.log(this.name + " says Meow!");
  }
}
\`\`\`
    `,
    exercises: [
      {
        id: "6-1",
        title: "Create a Rectangle Class",
        instructions: "Create a `Rectangle` class with:\n1. Properties: `width` and `height` (numbers)\n2. Constructor that sets width and height\n3. Method `getArea()` that returns width * height\n4. Method `getPerimeter()` that returns 2 * (width + height)\n\nCreate a rectangle 5x3 and print its area and perimeter.",
        starterCode: `// Create your Rectangle class here

`,
        solution: `class Rectangle {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

const rect = new Rectangle(5, 3);
console.log(rect.getArea());
console.log(rect.getPerimeter());`,
        tests: [
          {
            name: "Defines Rectangle class",
            test: (code) => /class\s+Rectangle\s*{/.test(code),
            hint: "Define a class called 'Rectangle'"
          },
          {
            name: "Has constructor with width and height",
            test: (code) => /constructor\s*\(\s*width.*height|constructor\s*\(\s*height.*width/.test(code),
            hint: "Add a constructor that takes width and height parameters"
          },
          {
            name: "Has getArea method",
            test: (code) => /getArea\s*\(\s*\)/.test(code),
            hint: "Add a getArea() method"
          },
          {
            name: "Area of 5x3 rectangle is 15",
            test: (_, output) => output.includes("15"),
            hint: "The area of a 5x3 rectangle is 15"
          },
          {
            name: "Perimeter of 5x3 rectangle is 16",
            test: (_, output) => output.includes("16"),
            hint: "The perimeter of a 5x3 rectangle is 16"
          }
        ]
      },
      {
        id: "6-2",
        title: "Counter Class",
        instructions: "Create a `Counter` class with:\n1. A private `count` property starting at 0\n2. `increment()` method that adds 1\n3. `decrement()` method that subtracts 1\n4. `getCount()` method that returns current count\n\nTest by incrementing 3 times, decrementing once, then printing the count.",
        starterCode: `// Create your Counter class here

`,
        solution: `class Counter {
  private count: number = 0;

  increment(): void {
    this.count++;
  }

  decrement(): void {
    this.count--;
  }

  getCount(): number {
    return this.count;
  }
}

const counter = new Counter();
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.getCount());`,
        tests: [
          {
            name: "Defines Counter class",
            test: (code) => /class\s+Counter\s*{/.test(code),
            hint: "Define a class called 'Counter'"
          },
          {
            name: "Has private count property",
            test: (code) => /private\s+count/.test(code),
            hint: "Add a private 'count' property"
          },
          {
            name: "Has increment and decrement methods",
            test: (code) => /increment\s*\(/.test(code) && /decrement\s*\(/.test(code),
            hint: "Add increment() and decrement() methods"
          },
          {
            name: "Final count is 2 (3 increments - 1 decrement)",
            test: (_, output) => output.includes("2"),
            hint: "After 3 increments and 1 decrement, count should be 2"
          }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Generics",
    description: "Learn how to write flexible, reusable code with generics.",
    explanation: `
# Generics

Generics let you write code that works with multiple types while keeping type safety.

## The Problem

Without generics, we'd need different functions for each type:

\`\`\`typescript
function firstNumber(arr: number[]): number {
  return arr[0];
}

function firstString(arr: string[]): string {
  return arr[0];
}
\`\`\`

## Generic Solution

Use \`<T>\` as a type placeholder:

\`\`\`typescript
function first<T>(arr: T[]): T {
  return arr[0];
}

// TypeScript figures out T automatically
const num = first([1, 2, 3]);        // T is number
const str = first(["a", "b", "c"]);  // T is string
\`\`\`

## Generic Interfaces

\`\`\`typescript
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: "hello" };
\`\`\`

## Multiple Type Parameters

\`\`\`typescript
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const result = pair("age", 25); // ["age", 25]
\`\`\`
    `,
    exercises: [
      {
        id: "7-1",
        title: "Generic Last Function",
        instructions: "Create a generic function `last<T>` that:\n1. Takes an array of any type\n2. Returns the last element of the array\n\nTest it with both a number array [1, 2, 3] and a string array [\"a\", \"b\", \"c\"].",
        starterCode: `// Create your generic last function here

`,
        solution: `function last<T>(arr: T[]): T {
  return arr[arr.length - 1];
}

console.log(last([1, 2, 3]));
console.log(last(["a", "b", "c"]));`,
        tests: [
          {
            name: "Defines a generic function",
            test: (code) => /function\s+last\s*<\s*T\s*>|last\s*=\s*<\s*T\s*>/.test(code),
            hint: "Define a function with <T> generic type"
          },
          {
            name: "Takes array parameter T[]",
            test: (code) => /\(\s*\w+\s*:\s*T\s*\[\s*\]\s*\)/.test(code),
            hint: "The parameter should have type T[]"
          },
          {
            name: "Returns 3 for [1, 2, 3]",
            test: (_, output) => output.includes("3"),
            hint: "The last element of [1, 2, 3] is 3"
          },
          {
            name: "Returns 'c' for ['a', 'b', 'c']",
            test: (_, output) => output.includes("c"),
            hint: "The last element of ['a', 'b', 'c'] is 'c'"
          }
        ]
      },
      {
        id: "7-2",
        title: "Generic Box Class",
        instructions: "Create a generic `Box<T>` class that:\n1. Has a private `contents` property of type T\n2. Has a constructor that sets the contents\n3. Has a `getContents()` method that returns the contents\n4. Has a `setContents(newContents)` method\n\nCreate a Box<number> with value 42, then change it to 100 and print it.",
        starterCode: `// Create your generic Box class here

`,
        solution: `class Box<T> {
  private contents: T;

  constructor(contents: T) {
    this.contents = contents;
  }

  getContents(): T {
    return this.contents;
  }

  setContents(newContents: T): void {
    this.contents = newContents;
  }
}

const box = new Box<number>(42);
box.setContents(100);
console.log(box.getContents());`,
        tests: [
          {
            name: "Defines generic Box class",
            test: (code) => /class\s+Box\s*<\s*T\s*>/.test(code),
            hint: "Define a class Box<T>"
          },
          {
            name: "Has private contents property",
            test: (code) => /private\s+contents\s*:\s*T/.test(code),
            hint: "Add a private 'contents' property of type T"
          },
          {
            name: "Has getContents and setContents methods",
            test: (code) => /getContents\s*\(/.test(code) && /setContents\s*\(/.test(code),
            hint: "Add getContents() and setContents() methods"
          },
          {
            name: "Final output is 100",
            test: (_, output) => output.includes("100"),
            hint: "After setting contents to 100, it should print 100"
          }
        ]
      }
    ]
  },
  {
    id: 8,
    title: "String Methods",
    description: "Master powerful string manipulation methods in TypeScript.",
    explanation: `
# String Methods

Strings have many built-in methods for manipulation and searching.

## Checking Content

\`\`\`typescript
const text = "Hello, TypeScript!";

// Check if string starts/ends with a value
console.log(text.startsWith("Hello")); // true
console.log(text.endsWith("!")); // true

// Check if string contains a value
console.log(text.includes("Type")); // true
\`\`\`

## Finding and Replacing

\`\`\`typescript
const sentence = "The cat sat on the mat";

// Find index of a pattern
console.log(sentence.search("cat")); // 4

// Replace first occurrence
console.log(sentence.replace("cat", "dog")); // "The dog sat on the mat"

// Replace all occurrences
const text2 = "ha ha ha";
console.log(text2.replaceAll("ha", "he")); // "he he he"
\`\`\`

## Padding Strings

\`\`\`typescript
const num = "42";

// Pad to reach a certain length
console.log(num.padStart(5, "0")); // "00042"
console.log(num.padEnd(5, "*")); // "42***"
\`\`\`

## Trimming Whitespace

\`\`\`typescript
const messy = "  hello world  ";

console.log(messy.trim());      // "hello world"
console.log(messy.trimStart()); // "hello world  "
console.log(messy.trimEnd());   // "  hello world"
\`\`\`

## Splitting Strings

\`\`\`typescript
const csv = "apple,banana,cherry";
const fruits = csv.split(",");
console.log(fruits); // ["apple", "banana", "cherry"]
\`\`\`
    `,
    exercises: [
      {
        id: "8-1",
        title: "String Validation",
        instructions: "Create a function `validateEmail` that takes an email string and returns true if:\n1. It includes '@'\n2. It ends with '.com' or '.org'\n\nTest with 'test@example.com' (should be true) and 'invalid-email' (should be false).",
        starterCode: `// Create your validateEmail function here

`,
        solution: `function validateEmail(email: string): boolean {
  return email.includes("@") && (email.endsWith(".com") || email.endsWith(".org"));
}

console.log(validateEmail("test@example.com"));
console.log(validateEmail("invalid-email"));`,
        tests: [
          {
            name: "Defines validateEmail function",
            test: (code) => /function\s+validateEmail|validateEmail\s*=/.test(code),
            hint: "Define a function called 'validateEmail'"
          },
          {
            name: "Uses includes() method",
            test: (code) => /\.includes\s*\(/.test(code),
            hint: "Use .includes() to check for '@'"
          },
          {
            name: "Uses endsWith() method",
            test: (code) => /\.endsWith\s*\(/.test(code),
            hint: "Use .endsWith() to check for '.com' or '.org'"
          },
          {
            name: "Returns true for valid email",
            test: (_, output) => output[0] === "true",
            hint: "'test@example.com' should return true"
          },
          {
            name: "Returns false for invalid email",
            test: (_, output) => output[1] === "false",
            hint: "'invalid-email' should return false"
          }
        ]
      },
      {
        id: "8-2",
        title: "Format and Clean Data",
        instructions: "Given a messy product code '  abc-123-xyz  ':\n1. Trim the whitespace\n2. Convert to uppercase\n3. Replace all '-' with '_'\n4. Pad the start to make it 15 characters with '0'\n\nPrint each step.",
        starterCode: `const code = "  abc-123-xyz  ";

// Clean and format the code step by step
`,
        solution: `const code = "  abc-123-xyz  ";

const trimmed = code.trim();
console.log(trimmed);

const upper = trimmed.toUpperCase();
console.log(upper);

const replaced = upper.replaceAll("-", "_");
console.log(replaced);

const padded = replaced.padStart(15, "0");
console.log(padded);`,
        tests: [
          {
            name: "Uses trim()",
            test: (code) => /\.trim\s*\(/.test(code),
            hint: "Use .trim() to remove whitespace"
          },
          {
            name: "Uses toUpperCase()",
            test: (code) => /\.toUpperCase\s*\(/.test(code),
            hint: "Use .toUpperCase() to convert to uppercase"
          },
          {
            name: "Uses replaceAll()",
            test: (code) => /\.replaceAll\s*\(/.test(code) || /\.replace\s*\(.*\/g/.test(code),
            hint: "Use .replaceAll() to replace all dashes"
          },
          {
            name: "Uses padStart()",
            test: (code) => /\.padStart\s*\(/.test(code),
            hint: "Use .padStart() to pad the string"
          },
          {
            name: "Final output is padded correctly",
            test: (_, output) => output.some(line => line.includes("00ABC_123_XYZ")),
            hint: "Final result should be '00ABC_123_XYZ'"
          }
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Advanced Arrays",
    description: "Deep dive into array methods like map, reduce, find, and more.",
    explanation: `
# Advanced Arrays

Arrays have powerful methods for transforming and searching data.

## Transform with map()

\`\`\`typescript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8]

const names = ["alice", "bob"];
const upper = names.map(name => name.toUpperCase());
console.log(upper); // ["ALICE", "BOB"]
\`\`\`

## Accumulate with reduce()

\`\`\`typescript
const nums = [1, 2, 3, 4];

// Sum all numbers
const sum = nums.reduce((total, n) => total + n, 0);
console.log(sum); // 10

// Find max value
const max = nums.reduce((max, n) => n > max ? n : max, nums[0]);
console.log(max); // 4
\`\`\`

## Find Elements

\`\`\`typescript
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 }
];

// Find first match
const bob = users.find(u => u.name === "Bob");
console.log(bob); // { name: "Bob", age: 30 }

// Find index
const index = users.findIndex(u => u.age > 26);
console.log(index); // 1
\`\`\`

## Check Conditions

\`\`\`typescript
const scores = [85, 90, 78, 92];

// Check if ALL pass
const allPassing = scores.every(s => s >= 70);
console.log(allPassing); // true

// Check if ANY pass
const anyPerfect = scores.some(s => s === 100);
console.log(anyPerfect); // false
\`\`\`

## Sort Arrays

\`\`\`typescript
const nums = [3, 1, 4, 1, 5];

// Sort numbers (ascending)
nums.sort((a, b) => a - b);
console.log(nums); // [1, 1, 3, 4, 5]

// Sort descending
nums.sort((a, b) => b - a);
console.log(nums); // [5, 4, 3, 1, 1]
\`\`\`
    `,
    exercises: [
      {
        id: "9-1",
        title: "Data Transformation",
        instructions: "Given an array of prices [10, 20, 30, 40, 50]:\n1. Use map() to apply a 10% discount to each price\n2. Use filter() to keep only prices under 40\n3. Use reduce() to calculate the total\n\nPrint the discounted prices, filtered prices, and total.",
        starterCode: `const prices = [10, 20, 30, 40, 50];

// Transform the data
`,
        solution: `const prices = [10, 20, 30, 40, 50];

const discounted = prices.map(p => p * 0.9);
console.log(discounted);

const affordable = discounted.filter(p => p < 40);
console.log(affordable);

const total = affordable.reduce((sum, p) => sum + p, 0);
console.log(total);`,
        tests: [
          {
            name: "Uses map() for discount",
            test: (code) => /\.map\s*\(/.test(code),
            hint: "Use .map() to apply the discount"
          },
          {
            name: "Uses filter()",
            test: (code) => /\.filter\s*\(/.test(code),
            hint: "Use .filter() to keep prices under 40"
          },
          {
            name: "Uses reduce() for total",
            test: (code) => /\.reduce\s*\(/.test(code),
            hint: "Use .reduce() to sum the prices"
          },
          {
            name: "Calculates correct total",
            test: (_, output) => output.some(line => line.includes("54") || line === "54"),
            hint: "The total of discounted prices under 40 should be 54 (9+18+27)"
          }
        ]
      },
      {
        id: "9-2",
        title: "Find and Check",
        instructions: "Given students: [{name: 'Alice', grade: 85}, {name: 'Bob', grade: 92}, {name: 'Charlie', grade: 78}]\n\n1. Use find() to get the student named 'Bob'\n2. Use findIndex() to get the index of the student with grade < 80\n3. Use every() to check if all students passed (grade >= 60)\n4. Use some() to check if any student got above 90\n\nPrint each result.",
        starterCode: `const students = [
  { name: "Alice", grade: 85 },
  { name: "Bob", grade: 92 },
  { name: "Charlie", grade: 78 }
];

// Find and check
`,
        solution: `const students = [
  { name: "Alice", grade: 85 },
  { name: "Bob", grade: 92 },
  { name: "Charlie", grade: 78 }
];

const bob = students.find(s => s.name === "Bob");
console.log(bob);

const lowIndex = students.findIndex(s => s.grade < 80);
console.log(lowIndex);

const allPassed = students.every(s => s.grade >= 60);
console.log(allPassed);

const anyExcellent = students.some(s => s.grade > 90);
console.log(anyExcellent);`,
        tests: [
          {
            name: "Uses find()",
            test: (code) => /\.find\s*\(/.test(code),
            hint: "Use .find() to get Bob"
          },
          {
            name: "Uses findIndex()",
            test: (code) => /\.findIndex\s*\(/.test(code),
            hint: "Use .findIndex() to find the low grade student"
          },
          {
            name: "Uses every()",
            test: (code) => /\.every\s*\(/.test(code),
            hint: "Use .every() to check all passed"
          },
          {
            name: "Uses some()",
            test: (code) => /\.some\s*\(/.test(code),
            hint: "Use .some() to check for excellent grades"
          },
          {
            name: "Finds index 2 for low grade",
            test: (_, output) => output.includes("2"),
            hint: "Charlie (index 2) has the grade below 80"
          }
        ]
      }
    ]
  },
  {
    id: 10,
    title: "Advanced Functions",
    description: "Learn about closures, callbacks, and higher-order functions.",
    explanation: `
# Advanced Functions

Functions in TypeScript can be passed around, returned, and composed.

## Higher-Order Functions

Functions that take or return other functions:

\`\`\`typescript
// Function that returns a function
function multiplier(factor: number): (n: number) => number {
  return (n: number) => n * factor;
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
\`\`\`

## Closures

Inner functions can access outer variables:

\`\`\`typescript
function createCounter(): () => number {
  let count = 0;
  return () => {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
\`\`\`

## Callback Functions

\`\`\`typescript
function processArray(
  arr: number[],
  callback: (n: number) => number
): number[] {
  return arr.map(callback);
}

const result = processArray([1, 2, 3], n => n * 2);
console.log(result); // [2, 4, 6]
\`\`\`

## Optional & Default Parameters

\`\`\`typescript
function greet(name: string, greeting: string = "Hello"): string {
  return \`\${greeting}, \${name}!\`;
}

console.log(greet("Alice"));           // "Hello, Alice!"
console.log(greet("Bob", "Hi"));       // "Hi, Bob!"
\`\`\`

## Rest Parameters

\`\`\`typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3));       // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
\`\`\`
    `,
    exercises: [
      {
        id: "10-1",
        title: "Create a Multiplier Factory",
        instructions: "Create a function `createMultiplier(factor)` that:\n1. Takes a factor number\n2. Returns a new function that multiplies its input by that factor\n\nCreate `double` and `triple` using your factory, then test with the number 7.",
        starterCode: `// Create your multiplier factory

`,
        solution: `function createMultiplier(factor: number): (n: number) => number {
  return (n: number) => n * factor;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(7));
console.log(triple(7));`,
        tests: [
          {
            name: "Defines createMultiplier function",
            test: (code) => /function\s+createMultiplier|createMultiplier\s*=/.test(code),
            hint: "Define a function called 'createMultiplier'"
          },
          {
            name: "Returns a function",
            test: (code) => /return\s*\(/.test(code) || /=>\s*\(/.test(code) || /return\s+\w+\s*=>/.test(code),
            hint: "createMultiplier should return a function"
          },
          {
            name: "double(7) outputs 14",
            test: (_, output) => output.includes("14"),
            hint: "double(7) should output 14"
          },
          {
            name: "triple(7) outputs 21",
            test: (_, output) => output.includes("21"),
            hint: "triple(7) should output 21"
          }
        ]
      },
      {
        id: "10-2",
        title: "Counter with Closure",
        instructions: "Create a function `createCounter(start)` that:\n1. Takes a starting number (default 0)\n2. Returns an object with `increment()`, `decrement()`, and `getCount()` methods\n3. Uses closure to keep track of the count\n\nCreate a counter starting at 10, increment twice, decrement once, then print the count.",
        starterCode: `// Create your counter factory

`,
        solution: `function createCounter(start: number = 0) {
  let count = start;
  return {
    increment: () => { count++; },
    decrement: () => { count--; },
    getCount: () => count
  };
}

const counter = createCounter(10);
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.getCount());`,
        tests: [
          {
            name: "Defines createCounter function",
            test: (code) => /function\s+createCounter|createCounter\s*=/.test(code),
            hint: "Define a function called 'createCounter'"
          },
          {
            name: "Has increment method",
            test: (code) => /increment\s*:/.test(code) || /increment\s*\(\)/.test(code),
            hint: "Return an object with an 'increment' method"
          },
          {
            name: "Has decrement method",
            test: (code) => /decrement\s*:/.test(code) || /decrement\s*\(\)/.test(code),
            hint: "Return an object with a 'decrement' method"
          },
          {
            name: "Final count is 11",
            test: (_, output) => output.includes("11"),
            hint: "Starting at 10, +2 -1 = 11"
          }
        ]
      }
    ]
  },
  {
    id: 11,
    title: "Array Practice",
    description: "Practice array methods with real-world coding challenges.",
    explanation: `
# Array Practice

Time to practice! These exercises will test your understanding of array methods.

## Quick Reference

**Transform arrays:**
\`\`\`typescript
// map - transform each element
const doubled = [1, 2, 3].map(n => n * 2); // [2, 4, 6]
\`\`\`

**Filter arrays:**
\`\`\`typescript
// filter - keep elements that pass a test
const positive = [-1, 2, -3, 4].filter(n => n > 0); // [2, 4]
\`\`\`

**Find elements:**
\`\`\`typescript
// find - get first matching element
const found = ["cat", "dogs", "bird"].find(w => w.endsWith("s")); // "dogs"
\`\`\`

**Reduce to single value:**
\`\`\`typescript
// reduce - accumulate to single value
const sum = [1, 2, 3].reduce((total, n) => total + n, 0); // 6

// find longest string
const longest = ["a", "abc", "ab"].reduce(
  (max, s) => s.length > max.length ? s : max, 
  ""
); // "abc"
\`\`\`

**String methods reminder:**
\`\`\`typescript
"cats".endsWith("s")  // true
"hello".length        // 5
\`\`\`
    `,
    exercises: [
      {
        id: "11-1",
        title: "Halve Numbers",
        instructions: "Create a function `halve(nums)` that takes an array of numbers and returns a new array with each number divided by 2.\n\nTest with [10, 20, 30, 40].",
        starterCode: `function halve(nums: number[]): number[] {
  return [];
}

console.log(halve([10, 20, 30, 40]));
`,
        solution: `function halve(nums: number[]): number[] {
  return nums.map(n => n / 2);
}

console.log(halve([10, 20, 30, 40]));`,
        tests: [
          {
            name: "Uses map()",
            test: (code) => /\.map\s*\(/.test(code),
            hint: "Use .map() to transform each number"
          },
          {
            name: "Returns correct result",
            test: (_, output) => output.some(line => line.includes("5") && line.includes("10") && line.includes("15") && line.includes("20")),
            hint: "[10, 20, 30, 40] halved should be [5, 10, 15, 20]"
          }
        ]
      },
      {
        id: "11-2",
        title: "Only Positives",
        instructions: "Create a function `onlyPositives(nums)` that returns only the positive numbers from an array.\n\nTest with [-5, 10, -3, 8, 0, -1, 15].",
        starterCode: `function onlyPositives(nums: number[]): number[] {
  return [];
}

console.log(onlyPositives([-5, 10, -3, 8, 0, -1, 15]));
`,
        solution: `function onlyPositives(nums: number[]): number[] {
  return nums.filter(n => n > 0);
}

console.log(onlyPositives([-5, 10, -3, 8, 0, -1, 15]));`,
        tests: [
          {
            name: "Uses filter()",
            test: (code) => /\.filter\s*\(/.test(code),
            hint: "Use .filter() to keep only positive numbers"
          },
          {
            name: "Returns correct result",
            test: (_, output) => output.some(line => line.includes("10") && line.includes("8") && line.includes("15") && !line.includes("-")),
            hint: "Should return [10, 8, 15]"
          }
        ]
      },
      {
        id: "11-3",
        title: "Average of Positives",
        instructions: "Create a function `averagePositives(nums)` that returns the average of only the positive numbers.\n\nTest with [-5, 10, -3, 20, 0, 30]. The positive numbers are 10, 20, 30 with average 20.",
        starterCode: `function averagePositives(nums: number[]): number {
  return 0;
}

console.log(averagePositives([-5, 10, -3, 20, 0, 30]));
`,
        solution: `function averagePositives(nums: number[]): number {
  const positives = nums.filter(n => n > 0);
  if (positives.length === 0) return 0;
  const sum = positives.reduce((total, n) => total + n, 0);
  return sum / positives.length;
}

console.log(averagePositives([-5, 10, -3, 20, 0, 30]));`,
        tests: [
          {
            name: "Uses filter()",
            test: (code) => /\.filter\s*\(/.test(code),
            hint: "Use .filter() to get only positive numbers first"
          },
          {
            name: "Uses reduce()",
            test: (code) => /\.reduce\s*\(/.test(code),
            hint: "Use .reduce() to sum the numbers"
          },
          {
            name: "Returns correct average (20)",
            test: (_, output) => output.includes("20"),
            hint: "Average of [10, 20, 30] is 20"
          }
        ]
      },
      {
        id: "11-4",
        title: "Get Plurals",
        instructions: "Create a function `getPlurals(words)` that returns only strings ending with 's'.\n\nTest with ['cat', 'dogs', 'bird', 'horses', 'fish'].",
        starterCode: `function getPlurals(words: string[]): string[] {
  return [];
}

console.log(getPlurals(["cat", "dogs", "bird", "horses", "fish"]));
`,
        solution: `function getPlurals(words: string[]): string[] {
  return words.filter(word => word.endsWith("s"));
}

console.log(getPlurals(["cat", "dogs", "bird", "horses", "fish"]));`,
        tests: [
          {
            name: "Uses filter()",
            test: (code) => /\.filter\s*\(/.test(code),
            hint: "Use .filter() to select matching words"
          },
          {
            name: "Uses endsWith()",
            test: (code) => /\.endsWith\s*\(/.test(code),
            hint: "Use .endsWith('s') to check if word ends with 's'"
          },
          {
            name: "Returns correct result",
            test: (_, output) => output.some(line => line.includes("dogs") && line.includes("horses")),
            hint: "Should return ['dogs', 'horses']"
          }
        ]
      },
      {
        id: "11-5",
        title: "First Plural",
        instructions: "Create a function `firstPlural(words)` that returns the first string ending with 's'. If none found, return empty string.\n\nTest with ['cat', 'bird', 'dogs', 'horses'].",
        starterCode: `function firstPlural(words: string[]): string {
  return "";
}

console.log(firstPlural(["cat", "bird", "dogs", "horses"]));
console.log(firstPlural(["cat", "bird", "fish"]));
`,
        solution: `function firstPlural(words: string[]): string {
  const found = words.find(word => word.endsWith("s"));
  return found || "";
}

console.log(firstPlural(["cat", "bird", "dogs", "horses"]));
console.log(firstPlural(["cat", "bird", "fish"]));`,
        tests: [
          {
            name: "Uses find()",
            test: (code) => /\.find\s*\(/.test(code),
            hint: "Use .find() to get the first matching element"
          },
          {
            name: "Returns 'dogs' for first test",
            test: (_, output) => output[0] === "dogs",
            hint: "First word ending with 's' is 'dogs'"
          },
          {
            name: "Returns empty string when no plural",
            test: (_, output) => output[1] === "" || output[1] === undefined,
            hint: "Return empty string if no word ends with 's'"
          }
        ]
      },
      {
        id: "11-6",
        title: "Grow If Small",
        instructions: "Create a function `growIfSmall(nums, threshold)` that increases each number by 1 if it's less than the threshold.\n\nTest with [1, 5, 3, 8, 2] and threshold 4.",
        starterCode: `function growIfSmall(nums: number[], threshold: number): number[] {
  return [];
}

console.log(growIfSmall([1, 5, 3, 8, 2], 4));
`,
        solution: `function growIfSmall(nums: number[], threshold: number): number[] {
  return nums.map(n => n < threshold ? n + 1 : n);
}

console.log(growIfSmall([1, 5, 3, 8, 2], 4));`,
        tests: [
          {
            name: "Uses map()",
            test: (code) => /\.map\s*\(/.test(code),
            hint: "Use .map() to transform numbers conditionally"
          },
          {
            name: "Uses conditional logic",
            test: (code) => /\?.*:/.test(code) || /if\s*\(/.test(code),
            hint: "Use a ternary operator or if statement to check threshold"
          },
          {
            name: "Returns correct result",
            test: (_, output) => output.some(line => line.includes("2") && line.includes("5") && line.includes("4") && line.includes("8") && line.includes("3")),
            hint: "[1, 5, 3, 8, 2] with threshold 4 becomes [2, 5, 4, 8, 3]"
          }
        ]
      },
      {
        id: "11-7",
        title: "Longest String",
        instructions: "Create a function `longestString(words)` that returns the longest string. If empty array, return empty string. If tie, return first longest.\n\nTest with ['cat', 'elephant', 'dog', 'butterfly'].",
        starterCode: `function longestString(words: string[]): string {
  return "";
}

console.log(longestString(["cat", "elephant", "dog", "butterfly"]));
console.log(longestString([]));
`,
        solution: `function longestString(words: string[]): string {
  if (words.length === 0) return "";
  return words.reduce((longest, word) => 
    word.length > longest.length ? word : longest
  , "");
}

console.log(longestString(["cat", "elephant", "dog", "butterfly"]));
console.log(longestString([]));`,
        tests: [
          {
            name: "Uses reduce()",
            test: (code) => /\.reduce\s*\(/.test(code),
            hint: "Use .reduce() to find the longest string"
          },
          {
            name: "Returns 'butterfly'",
            test: (_, output) => output[0] === "butterfly",
            hint: "'butterfly' is the longest with 9 characters"
          },
          {
            name: "Handles empty array",
            test: (_, output) => output[1] === "" || output[1] === undefined,
            hint: "Return empty string for empty array"
          }
        ]
      },
      {
        id: "11-8",
        title: "Longest Plural",
        instructions: "Create a function `longestPlural(words)` that returns the longest string ending with 's'. If none, return empty string.\n\nTest with ['cat', 'dogs', 'elephants', 'bird', 'cats'].",
        starterCode: `function longestPlural(words: string[]): string {
  return "";
}

console.log(longestPlural(["cat", "dogs", "elephants", "bird", "cats"]));
`,
        solution: `function longestPlural(words: string[]): string {
  const plurals = words.filter(word => word.endsWith("s"));
  if (plurals.length === 0) return "";
  return plurals.reduce((longest, word) => 
    word.length > longest.length ? word : longest
  , "");
}

console.log(longestPlural(["cat", "dogs", "elephants", "bird", "cats"]));`,
        tests: [
          {
            name: "Uses filter()",
            test: (code) => /\.filter\s*\(/.test(code),
            hint: "Use .filter() to get only plurals first"
          },
          {
            name: "Uses reduce()",
            test: (code) => /\.reduce\s*\(/.test(code),
            hint: "Use .reduce() to find the longest"
          },
          {
            name: "Returns 'elephants'",
            test: (_, output) => output[0] === "elephants",
            hint: "'elephants' is the longest plural"
          }
        ]
      },
      {
        id: "11-9",
        title: "Add Pairs",
        instructions: "Create a function `addPairs(nums1, nums2)` that adds numbers at each index. If arrays have different lengths, use 0 for missing values.\n\nTest with [1, 2, 3] and [10, 20, 30, 40].",
        starterCode: `function addPairs(nums1: number[], nums2: number[]): number[] {
  return [];
}

console.log(addPairs([1, 2, 3], [10, 20, 30, 40]));
`,
        solution: `function addPairs(nums1: number[], nums2: number[]): number[] {
  const maxLength = Math.max(nums1.length, nums2.length);
  const result: number[] = [];
  for (let i = 0; i < maxLength; i++) {
    result.push((nums1[i] || 0) + (nums2[i] || 0));
  }
  return result;
}

console.log(addPairs([1, 2, 3], [10, 20, 30, 40]));`,
        tests: [
          {
            name: "Handles different length arrays",
            test: (code) => /Math\.max|length/.test(code),
            hint: "Use Math.max to find the longer array length"
          },
          {
            name: "Returns correct result",
            test: (_, output) => output.some(line => line.includes("11") && line.includes("22") && line.includes("33") && line.includes("40")),
            hint: "Result should be [11, 22, 33, 40]"
          }
        ]
      }
    ]
  }
];

export function getLessonById(id: number): Lesson | undefined {
  return lessons.find(lesson => lesson.id === id);
}

export function getExerciseById(lessonId: number, exerciseId: string): Exercise | undefined {
  const lesson = getLessonById(lessonId);
  return lesson?.exercises.find(ex => ex.id === exerciseId);
}
