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
  title("LESSON 2: Functions in TypeScript");

  explain("  Functions are reusable blocks of code.");
  explain("  In TypeScript, we add types to parameters and return values.\n");
  await pressEnter();

  // BASIC FUNCTION
  section("1. Basic Function Syntax");
  explain("  Here's a function that adds two numbers:");
  
  code(`function add(a: number, b: number): number {
  return a + b;
}`);

  explain("\n  Breaking it down:");
  explain("  • a: number      → parameter 'a' must be a number");
  explain("  • b: number      → parameter 'b' must be a number");
  explain("  • ): number      → the function returns a number");
  
  function add(a: number, b: number): number {
    return a + b;
  }
  output("add(5, 3)", add(5, 3));
  await pressEnter();

  // VOID RETURN TYPE
  section("2. Functions That Return Nothing (void)");
  explain("  Some functions just do something without returning a value:");
  
  code(`function greet(name: string): void {
  console.log("Hello, " + name + "!");
}`);

  function greet(name: string): void {
    output("greet output", "Hello, " + name + "!");
  }
  greet("Alice");
  
  hint("Use 'void' when a function doesn't return anything.");
  await pressEnter();

  // OPTIONAL PARAMETERS
  section("3. Optional Parameters");
  explain("  Add a ? to make a parameter optional:");
  
  code(`function introduce(name: string, title?: string): string {
  if (title) {
    return "Hello, " + title + " " + name;
  }
  return "Hello, " + name;
}`);

  function introduce(name: string, title?: string): string {
    if (title) {
      return "Hello, " + title + " " + name;
    }
    return "Hello, " + name;
  }
  output('introduce("Alice")', introduce("Alice"));
  output('introduce("Smith", "Dr.")', introduce("Smith", "Dr."));
  await pressEnter();

  // DEFAULT PARAMETERS
  section("4. Default Parameters");
  explain("  Give parameters default values:");
  
  code(`function createUser(name: string, role: string = "guest"): string {
  return name + " is a " + role;
}`);

  function createUser(name: string, role: string = "guest"): string {
    return name + " is a " + role;
  }
  output('createUser("Bob")', createUser("Bob"));
  output('createUser("Carol", "admin")', createUser("Carol", "admin"));
  await pressEnter();

  // ARROW FUNCTIONS
  section("5. Arrow Functions");
  explain("  A shorter way to write functions:");
  
  code(`// Regular function
function multiply(a: number, b: number): number {
  return a * b;
}

// Arrow function (same thing!)
const multiply = (a: number, b: number): number => a * b;`);

  const multiply = (a: number, b: number): number => a * b;
  const square = (n: number): number => n * n;
  
  output("multiply(4, 7)", multiply(4, 7));
  output("square(9)", square(9));
  
  hint("Arrow functions are great for short, simple functions!");
  await pressEnter();

  divider();

  // QUIZ
  title("QUIZ TIME!");
  let score = 0;
  const total = 3;

  // Question 1
  explain("  Question 1: What does this function return?\n");
  code(`function double(n: number): number {
  return n * 2;
}`);
  explain("");
  const a1 = await question("  What is double(5)? ");
  if (a1 === "10") {
    success("Correct! 5 * 2 = 10");
    score++;
  } else {
    error("Not quite. 5 * 2 = 10");
  }

  // Question 2
  explain("\n  Question 2: What return type means 'returns nothing'?\n");
  const a2 = await question("  Your answer: ");
  if (a2.toLowerCase() === "void") {
    success("Correct! 'void' means no return value.");
    score++;
  } else {
    error("The answer is 'void'.");
  }

  // Question 3
  explain("\n  Question 3: How do you make a parameter optional?\n");
  const a3 = await question("  Your answer (symbol after the parameter name): ");
  if (a3 === "?") {
    success("Correct! Use ? after the parameter name.");
    score++;
  } else {
    error("Use ? after the parameter name to make it optional.");
  }

  divider();

  // Results
  if (score === total) {
    success(`Perfect score! ${score}/${total} - Functions mastered!`);
  } else if (score >= total / 2) {
    success(`Good job! ${score}/${total} - Keep it up!`);
  } else {
    explain(`  Score: ${score}/${total} - Review and try again!`);
  }

  markLessonComplete(2, score);
  
  explain("\n  You've completed Lesson 2! 🎉");
  explain("  Next up: Arrays and Loops\n");

  rl.close();
}
