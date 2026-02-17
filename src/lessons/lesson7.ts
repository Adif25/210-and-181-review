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
  title("LESSON 7: Generics");

  explain("  Generics let you write reusable code that works with ANY type.");
  explain("  Think of them as 'type variables'.\n");
  await pressEnter();

  // THE PROBLEM
  section("1. The Problem");
  explain("  Without generics, you'd need separate functions for each type:");
  
  code(`function identityString(value: string): string {
  return value;
}

function identityNumber(value: number): number {
  return value;
}

// This gets repetitive fast!`);

  hint("There must be a better way...");
  await pressEnter();

  // GENERIC FUNCTION
  section("2. Generic Functions");
  explain("  Use <T> to create a type variable:");
  
  code(`function identity<T>(value: T): T {
  return value;
}

// T becomes whatever type you pass:
identity<string>("hello");  // T is string
identity<number>(42);       // T is number
identity(true);             // T inferred as boolean`);

  function identity<T>(value: T): T {
    return value;
  }
  
  output('identity<string>("hello")', identity<string>("hello"));
  output('identity<number>(42)', identity<number>(42));
  output('identity(true)', identity(true));
  await pressEnter();

  // GENERIC WITH ARRAYS
  section("3. Generics with Arrays");
  
  code(`function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

getFirst([1, 2, 3]);           // returns number
getFirst(["a", "b", "c"]);     // returns string`);

  function getFirst<T>(arr: T[]): T | undefined {
    return arr[0];
  }
  
  output("getFirst([1, 2, 3])", getFirst([1, 2, 3]));
  output('getFirst(["a", "b", "c"])', getFirst(["a", "b", "c"]));
  await pressEnter();

  // MULTIPLE TYPE PARAMETERS
  section("4. Multiple Type Parameters");
  
  code(`function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

pair("name", "Alice");   // [string, string]
pair(1, true);           // [number, boolean]`);

  function pair<K, V>(key: K, value: V): [K, V] {
    return [key, value];
  }
  
  output('pair("name", "Alice")', JSON.stringify(pair("name", "Alice")));
  output('pair(1, true)', JSON.stringify(pair(1, true)));
  await pressEnter();

  // GENERIC INTERFACES
  section("5. Generic Interfaces");
  
  code(`interface Box<T> {
  value: T;
  getValue(): T;
}

let numberBox: Box<number> = {
  value: 100,
  getValue() { return this.value; }
};`);

  interface Box<T> {
    value: T;
    getValue(): T;
  }

  let numberBox: Box<number> = {
    value: 100,
    getValue() { return this.value; }
  };
  
  let stringBox: Box<string> = {
    value: "hello",
    getValue() { return this.value; }
  };
  
  output("numberBox.getValue()", numberBox.getValue());
  output("stringBox.getValue()", stringBox.getValue());
  await pressEnter();

  // GENERIC CLASSES
  section("6. Generic Classes");
  
  code(`class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}`);

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
  }

  let numStack = new Stack<number>();
  numStack.push(10);
  numStack.push(20);
  numStack.push(30);
  
  output("Stack after pushing 10, 20, 30", "");
  output("  pop()", numStack.pop());
  output("  pop()", numStack.pop());
  output("  peek()", numStack.peek());
  await pressEnter();

  // GENERIC CONSTRAINTS
  section("7. Generic Constraints");
  explain("  Limit what types can be used with 'extends':");
  
  code(`interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log("Length:", item.length);
}

logLength("hello");     // OK - strings have length
logLength([1, 2, 3]);   // OK - arrays have length
logLength(123);         // ERROR - numbers don't have length`);

  interface HasLength {
    length: number;
  }

  function logLength<T extends HasLength>(item: T): number {
    return item.length;
  }
  
  output('logLength("hello")', logLength("hello"));
  output('logLength([1, 2, 3])', logLength([1, 2, 3]));
  error("Argument of type 'number' is not assignable - number has no length");
  await pressEnter();

  divider();

  // QUIZ
  title("QUIZ TIME!");
  let score = 0;
  const total = 3;

  // Question 1
  explain("  Question 1: What syntax declares a generic type parameter?\n");
  const a1 = await question("  Your answer (e.g., how to add type T): ");
  if (a1.includes("<T>") || a1.includes("<") && a1.includes(">")) {
    success("Correct! <T> declares a type parameter.");
    score++;
  } else {
    error("The answer is <T>");
  }

  // Question 2
  explain("\n  Question 2: In Array<number>, what is 'number'?\n");
  explain("  a) A type parameter");
  explain("  b) A type argument\n");
  const a2 = await question("  Your answer (a or b): ");
  if (a2.toLowerCase() === "b") {
    success("Correct! It's a type argument - the actual type being used.");
    score++;
  } else {
    error("It's b - a type argument (the actual type passed to the generic).");
  }

  // Question 3
  explain("\n  Question 3: How do you constrain a generic to types with a length property?\n");
  const a3 = await question("  Your answer: ");
  if (a3.toLowerCase().includes("extends")) {
    success("Correct! Use 'extends' to constrain generics.");
    score++;
  } else {
    error("Use 'extends', like: <T extends HasLength>");
  }

  divider();

  if (score === total) {
    success(`Perfect score! ${score}/${total} - Generic genius!`);
  } else if (score >= total / 2) {
    success(`Good job! ${score}/${total} - Keep practicing!`);
  } else {
    explain(`  Score: ${score}/${total} - Review and try again!`);
  }

  markLessonComplete(7, score);
  
  explain("\n  🎉 Congratulations! You've completed the TypeScript Course! 🎉");
  explain("  You now know the fundamentals of TypeScript.\n");
  explain("  Keep practicing and building projects!\n");

  rl.close();
}
