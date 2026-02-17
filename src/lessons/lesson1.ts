import * as readline from "readline";
import { title, section, explain, code, output, success, error, hint, divider, wait } from "../utils/display";
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
  title("LESSON 1: Introduction to TypeScript");

  explain("  Welcome! TypeScript is JavaScript with TYPES.");
  explain("  Types help catch errors before your code runs.\n");
  await pressEnter();

  // STRING TYPE
  section("1. The String Type");
  explain("  Strings are for text. Use quotes to create them.");
  
  code(`let greeting: string = "Hello, TypeScript!";
console.log(greeting);`);

  explain("\n  Let's run this:");
  let greeting: string = "Hello, TypeScript!";
  output("greeting", greeting);
  await pressEnter();

  // NUMBER TYPE
  section("2. The Number Type");
  explain("  Numbers work for both integers and decimals.");
  
  code(`let age: number = 25;
let price: number = 19.99;`);

  let age: number = 25;
  let price: number = 19.99;
  output("age", age);
  output("price", price);
  await pressEnter();

  // BOOLEAN TYPE
  section("3. The Boolean Type");
  explain("  Booleans are either true or false.");
  
  code(`let isActive: boolean = true;
let isComplete: boolean = false;`);

  let isActive: boolean = true;
  let isComplete: boolean = false;
  output("isActive", isActive);
  output("isComplete", isComplete);
  await pressEnter();

  // TYPE INFERENCE
  section("4. Type Inference");
  explain("  TypeScript can guess types automatically!");
  
  code(`let name = "Alice";    // TypeScript knows this is a string
let count = 42;        // TypeScript knows this is a number`);

  hint("You don't always need to write types - TypeScript is smart!");
  await pressEnter();

  // TYPE ERRORS
  section("5. Type Safety");
  explain("  TypeScript prevents mistakes at compile time:");
  
  code(`let username: string = "bob";
username = 123;  // ERROR! Can't assign number to string`);

  error("Type 'number' is not assignable to type 'string'");
  explain("\n  This error appears BEFORE running, saving you from bugs!");
  await pressEnter();

  divider();

  // QUIZ
  title("QUIZ TIME!");
  let score = 0;
  const total = 3;

  // Question 1
  explain("  Question 1: What type would you use for someone's name?\n");
  const a1 = await question("  Your answer (string/number/boolean): ");
  if (a1.toLowerCase() === "string") {
    success("Correct! Names are text, so we use string.");
    score++;
  } else {
    error("Not quite. Names are text, so we use string.");
  }

  // Question 2
  explain("\n  Question 2: What type is the value 'true'?\n");
  const a2 = await question("  Your answer (string/number/boolean): ");
  if (a2.toLowerCase() === "boolean") {
    success("Correct! true and false are booleans.");
    score++;
  } else {
    error("Not quite. true and false are booleans.");
  }

  // Question 3
  explain("\n  Question 3: What type is the value 3.14?\n");
  const a3 = await question("  Your answer (string/number/boolean): ");
  if (a3.toLowerCase() === "number") {
    success("Correct! Both integers and decimals are numbers.");
    score++;
  } else {
    error("Not quite. Both integers and decimals are numbers in TypeScript.");
  }

  divider();

  // Results
  if (score === total) {
    success(`Perfect score! ${score}/${total} - You've mastered the basics!`);
  } else if (score >= total / 2) {
    success(`Good job! ${score}/${total} - Keep practicing!`);
  } else {
    explain(`  Score: ${score}/${total} - Review this lesson and try again!`);
  }

  markLessonComplete(1, score);
  
  explain("\n  You've completed Lesson 1! 🎉");
  explain("  Next up: Functions in TypeScript\n");

  rl.close();
}
