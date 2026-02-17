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
  title("LESSON 3: Arrays and Loops");

  explain("  Arrays store lists of items. In TypeScript, we specify");
  explain("  what type of items the array can hold.\n");
  await pressEnter();

  // TYPED ARRAYS
  section("1. Creating Typed Arrays");
  
  code(`let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Carol"];
let flags: boolean[] = [true, false, true];`);

  let numbers: number[] = [1, 2, 3, 4, 5];
  let names: string[] = ["Alice", "Bob", "Carol"];
  
  output("numbers", numbers.join(", "));
  output("names", names.join(", "));
  
  hint("number[] means 'array of numbers'");
  await pressEnter();

  // ARRAY METHODS
  section("2. Common Array Methods");
  
  code(`numbers.push(6);           // Add to end
numbers.pop();             // Remove from end
numbers.length;            // Get array length
numbers.includes(3);       // Check if item exists`);

  numbers.push(6);
  output("After push(6)", numbers.join(", "));
  
  let popped = numbers.pop();
  output("After pop()", numbers.join(", "));
  output("Popped value", popped);
  output("Length", numbers.length);
  output("includes(3)", numbers.includes(3));
  await pressEnter();

  // FOR LOOP
  section("3. For Loop");
  explain("  The classic way to loop through arrays:");
  
  code(`for (let i = 0; i < names.length; i++) {
  console.log(names[i]);
}`);

  explain("\n  Output:");
  for (let i = 0; i < names.length; i++) {
    output(`  names[${i}]`, names[i]);
  }
  await pressEnter();

  // FOR...OF LOOP
  section("4. For...of Loop (Recommended)");
  explain("  A cleaner way to loop through items:");
  
  code(`for (const name of names) {
  console.log("Hello, " + name);
}`);

  explain("\n  Output:");
  for (const name of names) {
    output("  greeting", "Hello, " + name);
  }
  
  hint("for...of is simpler when you don't need the index");
  await pressEnter();

  // MAP
  section("5. Map - Transform Each Item");
  explain("  Create a new array by transforming each item:");
  
  code(`let nums = [1, 2, 3, 4];
let doubled = nums.map(n => n * 2);
// Result: [2, 4, 6, 8]`);

  let nums = [1, 2, 3, 4];
  let doubled = nums.map(n => n * 2);
  output("Original", nums.join(", "));
  output("Doubled", doubled.join(", "));
  await pressEnter();

  // FILTER
  section("6. Filter - Keep Matching Items");
  explain("  Create a new array with only items that match:");
  
  code(`let nums = [1, 2, 3, 4, 5, 6];
let evens = nums.filter(n => n % 2 === 0);
// Result: [2, 4, 6]`);

  let allNums = [1, 2, 3, 4, 5, 6];
  let evens = allNums.filter(n => n % 2 === 0);
  output("Original", allNums.join(", "));
  output("Evens only", evens.join(", "));
  await pressEnter();

  // REDUCE
  section("7. Reduce - Combine All Items");
  explain("  Combine all items into a single value:");
  
  code(`let nums = [1, 2, 3, 4];
let sum = nums.reduce((total, n) => total + n, 0);
// Result: 10`);

  let sumNums = [1, 2, 3, 4];
  let sum = sumNums.reduce((total, n) => total + n, 0);
  output("Numbers", sumNums.join(" + "));
  output("Sum", sum);
  await pressEnter();

  divider();

  // QUIZ
  title("QUIZ TIME!");
  let score = 0;
  const total = 4;

  // Question 1
  explain("  Question 1: How do you declare an array of strings?\n");
  const a1 = await question("  Your answer: ");
  if (a1.includes("string[]") || a1.includes("string []")) {
    success("Correct! string[] is an array of strings.");
    score++;
  } else {
    error("The answer is string[]");
  }

  // Question 2
  explain("\n  Question 2: What does [1,2,3].map(n => n * 10) return?\n");
  const a2 = await question("  Your answer (comma-separated numbers): ");
  if (a2.replace(/\s/g, "") === "10,20,30" || a2.replace(/\s/g, "") === "[10,20,30]") {
    success("Correct! Each number is multiplied by 10.");
    score++;
  } else {
    error("The answer is 10, 20, 30");
  }

  // Question 3
  explain("\n  Question 3: What method adds an item to the end of an array?\n");
  const a3 = await question("  Your answer: ");
  if (a3.toLowerCase().includes("push")) {
    success("Correct! push() adds to the end.");
    score++;
  } else {
    error("The answer is push()");
  }

  // Question 4
  explain("\n  Question 4: What does [1,2,3,4].filter(n => n > 2) return?\n");
  const a4 = await question("  Your answer: ");
  if (a4.replace(/\s/g, "").includes("3,4") || a4.replace(/\s/g, "") === "[3,4]") {
    success("Correct! Only 3 and 4 are greater than 2.");
    score++;
  } else {
    error("The answer is [3, 4]");
  }

  divider();

  // Results
  if (score === total) {
    success(`Perfect score! ${score}/${total} - Array master!`);
  } else if (score >= total / 2) {
    success(`Good job! ${score}/${total} - Keep practicing!`);
  } else {
    explain(`  Score: ${score}/${total} - Review and try again!`);
  }

  markLessonComplete(3, score);
  
  explain("\n  You've completed Lesson 3! 🎉");
  explain("  Next up: Objects and Interfaces\n");

  rl.close();
}
