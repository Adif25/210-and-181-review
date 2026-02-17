import * as readline from "readline";
import { title, section, explain, code, output, success, error, hint, divider } from "../utils/display";
import { markLessonComplete } from "../utils/progress";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function pressEnter(): Promise<void> {
  await question("\n  Press ENTER to continue...");
}

export async function run(): Promise<void> {
  title("LESSON 4: Objects and Interfaces");

  explain("  Objects store related data together.");
  explain("  Interfaces define the 'shape' of objects.\n");
  await pressEnter();

  // BASIC OBJECTS
  section("1. Basic Object with Type");
  
  code(`let person: { name: string; age: number } = {
  name: "Alice",
  age: 30
};`);

  let person: { name: string; age: number } = {
    name: "Alice",
    age: 30
  };
  output("person.name", person.name);
  output("person.age", person.age);
  
  hint("Inline types work, but get messy with complex objects...");
  await pressEnter();

  // INTERFACES
  section("2. Interfaces - Reusable Object Types");
  explain("  Interfaces let you define object shapes once and reuse them:");
  
  code(`interface User {
  id: number;
  username: string;
  email: string;
  isActive: boolean;
}

let user: User = {
  id: 1,
  username: "alice123",
  email: "alice@example.com",
  isActive: true
};`);

  interface User {
    id: number;
    username: string;
    email: string;
    isActive: boolean;
  }

  let user: User = {
    id: 1,
    username: "alice123",
    email: "alice@example.com",
    isActive: true
  };
  
  output("user.username", user.username);
  output("user.isActive", user.isActive);
  await pressEnter();

  // OPTIONAL PROPERTIES
  section("3. Optional Properties");
  explain("  Use ? to mark properties that aren't required:");
  
  code(`interface Product {
  name: string;
  price: number;
  description?: string;  // Optional!
}

// Both are valid:
let laptop: Product = { name: "Laptop", price: 999 };
let phone: Product = { name: "Phone", price: 699, description: "Smartphone" };`);

  interface Product {
    name: string;
    price: number;
    description?: string;
  }

  let laptop: Product = { name: "Laptop", price: 999 };
  let phone: Product = { name: "Phone", price: 699, description: "Smartphone" };
  
  output("laptop", `${laptop.name}: $${laptop.price}`);
  output("phone", `${phone.name}: $${phone.price} - ${phone.description}`);
  await pressEnter();

  // READONLY
  section("4. Readonly Properties");
  explain("  Prevent properties from being changed:");
  
  code(`interface Config {
  readonly apiKey: string;
  readonly baseUrl: string;
}

let config: Config = {
  apiKey: "abc123",
  baseUrl: "https://api.example.com"
};

config.apiKey = "xyz";  // ERROR! Cannot modify readonly`);

  error("Cannot assign to 'apiKey' because it is a read-only property");
  hint("Use readonly for values that should never change");
  await pressEnter();

  // EXTENDING INTERFACES
  section("5. Extending Interfaces");
  explain("  Build new interfaces from existing ones:");
  
  code(`interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}`);

  interface Animal {
    name: string;
    age: number;
  }

  interface Dog extends Animal {
    breed: string;
  }

  let myDog: Dog = {
    name: "Buddy",
    age: 3,
    breed: "Golden Retriever"
  };
  
  explain("\n  Dog has all Animal properties PLUS breed:");
  output("myDog.name", myDog.name);
  output("myDog.age", myDog.age);
  output("myDog.breed", myDog.breed);
  await pressEnter();

  // TYPE ALIASES
  section("6. Type Aliases");
  explain("  Another way to name types:");
  
  code(`type Point = {
  x: number;
  y: number;
};

type ID = string | number;  // Can also do union types!`);

  type Point = { x: number; y: number };
  let origin: Point = { x: 0, y: 0 };
  output("origin", `(${origin.x}, ${origin.y})`);
  
  hint("Interfaces are best for objects, type aliases for unions");
  await pressEnter();

  divider();

  // QUIZ
  title("QUIZ TIME!");
  let score = 0;
  const total = 3;

  // Question 1
  explain("  Question 1: What keyword creates a reusable object type?\n");
  const a1 = await question("  Your answer: ");
  if (a1.toLowerCase() === "interface") {
    success("Correct! interface defines object shapes.");
    score++;
  } else {
    error("The answer is 'interface'");
  }

  // Question 2
  explain("\n  Question 2: How do you make a property optional?\n");
  const a2 = await question("  Your answer (symbol to use): ");
  if (a2 === "?") {
    success("Correct! Add ? after the property name.");
    score++;
  } else {
    error("Add ? after the property name.");
  }

  // Question 3
  explain("\n  Question 3: What keyword prevents a property from being changed?\n");
  const a3 = await question("  Your answer: ");
  if (a3.toLowerCase() === "readonly") {
    success("Correct! readonly prevents modifications.");
    score++;
  } else {
    error("The answer is 'readonly'");
  }

  divider();

  // Results
  if (score === total) {
    success(`Perfect score! ${score}/${total} - Interface expert!`);
  } else if (score >= total / 2) {
    success(`Good job! ${score}/${total} - Keep it up!`);
  } else {
    explain(`  Score: ${score}/${total} - Review and try again!`);
  }

  markLessonComplete(4, score);
  
  explain("\n  You've completed Lesson 4! 🎉");
  explain("  Next up: Classes\n");

  rl.close();
}
