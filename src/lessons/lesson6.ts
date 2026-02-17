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
  title("LESSON 6: Union Types & Type Guards");

  explain("  Sometimes a value can be one of several types.");
  explain("  Union types let us express this!\n");
  await pressEnter();

  // UNION TYPES
  section("1. Union Types");
  explain("  Use | to allow multiple types:");
  
  code(`let id: string | number;

id = "abc123";  // OK - it's a string
id = 456;       // OK - it's a number
id = true;      // ERROR - boolean not allowed`);

  let id: string | number;
  id = "abc123";
  output("id (string)", id);
  id = 456;
  output("id (number)", id);
  await pressEnter();

  // UNION IN FUNCTIONS
  section("2. Union Types in Functions");
  
  code(`function printId(id: string | number): void {
  console.log("Your ID is: " + id);
}

printId("user-123");  // OK
printId(456);         // OK`);

  function printId(id: string | number): void {
    output("ID", id);
  }
  printId("user-123");
  printId(456);
  await pressEnter();

  // TYPE GUARDS
  section("3. Type Guards with typeof");
  explain("  Check the type at runtime to use type-specific features:");
  
  code(`function formatValue(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();  // string methods OK here
  } else {
    return value.toFixed(2);     // number methods OK here
  }
}`);

  function formatValue(value: string | number): string {
    if (typeof value === "string") {
      return value.toUpperCase();
    } else {
      return value.toFixed(2);
    }
  }
  output('formatValue("hello")', formatValue("hello"));
  output('formatValue(3.14159)', formatValue(3.14159));
  
  hint("TypeScript narrows the type inside each branch!");
  await pressEnter();

  // LITERAL TYPES
  section("4. Literal Types");
  explain("  Restrict to specific values:");
  
  code(`type Status = "pending" | "approved" | "rejected";

function setStatus(status: Status): void {
  console.log("Status: " + status);
}

setStatus("approved");   // OK
setStatus("invalid");    // ERROR!`);

  type Status = "pending" | "approved" | "rejected";
  
  function setStatus(status: Status): string {
    return "Status set to: " + status;
  }
  output('setStatus("pending")', setStatus("pending"));
  output('setStatus("approved")', setStatus("approved"));
  
  error('Argument "invalid" is not assignable to type Status');
  await pressEnter();

  // DISCRIMINATED UNIONS
  section("5. Discriminated Unions");
  explain("  Use a common property to distinguish types:");
  
  code(`interface Circle {
  kind: "circle";
  radius: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape = Circle | Rectangle;

function getArea(shape: Shape): number {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  } else {
    return shape.width * shape.height;
  }
}`);

  interface Circle { kind: "circle"; radius: number; }
  interface Rectangle { kind: "rectangle"; width: number; height: number; }
  type Shape = Circle | Rectangle;

  function getArea(shape: Shape): number {
    if (shape.kind === "circle") {
      return Math.PI * shape.radius ** 2;
    } else {
      return shape.width * shape.height;
    }
  }

  let circle: Circle = { kind: "circle", radius: 5 };
  let rect: Rectangle = { kind: "rectangle", width: 10, height: 4 };
  
  output("Circle area", getArea(circle).toFixed(2));
  output("Rectangle area", getArea(rect));
  await pressEnter();

  // NULLISH COALESCING
  section("6. Handling null and undefined");
  explain("  Use ?? to provide default values:");
  
  code(`let username: string | null = null;

// ?? returns right side if left is null/undefined
let displayName = username ?? "Anonymous";`);

  let username: string | null = null;
  let displayName = username ?? "Anonymous";
  output("displayName", displayName);
  
  username = "Alice";
  displayName = username ?? "Anonymous";
  output("displayName (after setting)", displayName);
  
  hint("?? is safer than || because it only checks null/undefined");
  await pressEnter();

  divider();

  // QUIZ
  title("QUIZ TIME!");
  let score = 0;
  const total = 3;

  // Question 1
  explain("  Question 1: What symbol creates a union type?\n");
  const a1 = await question("  Your answer: ");
  if (a1 === "|") {
    success("Correct! | creates union types.");
    score++;
  } else {
    error("The answer is |");
  }

  // Question 2
  explain("\n  Question 2: What operator checks the type at runtime?\n");
  const a2 = await question("  Your answer: ");
  if (a2.toLowerCase() === "typeof") {
    success("Correct! typeof checks the type.");
    score++;
  } else {
    error("The answer is typeof");
  }

  // Question 3
  explain("\n  Question 3: What does ?? do?\n");
  explain("  a) Returns right side if left is falsy");
  explain("  b) Returns right side if left is null or undefined\n");
  const a3 = await question("  Your answer (a or b): ");
  if (a3.toLowerCase() === "b") {
    success("Correct! ?? only checks null/undefined, not all falsy values.");
    score++;
  } else {
    error("The answer is b - ?? only checks null/undefined.");
  }

  divider();

  if (score === total) {
    success(`Perfect score! ${score}/${total} - Union type expert!`);
  } else if (score >= total / 2) {
    success(`Good job! ${score}/${total} - Keep practicing!`);
  } else {
    explain(`  Score: ${score}/${total} - Review and try again!`);
  }

  markLessonComplete(6, score);
  
  explain("\n  You've completed Lesson 6! 🎉");
  explain("  Next up: Generics\n");

  rl.close();
}
