import * as readline from "readline";
import { banner, title, explain, success, divider } from "./utils/display";
import { loadProgress, resetProgress, isLessonComplete } from "./utils/progress";

const lessons = [
  { num: 1, title: "Introduction to Types", file: "./lessons/lesson1" },
  { num: 2, title: "Functions", file: "./lessons/lesson2" },
  { num: 3, title: "Arrays and Loops", file: "./lessons/lesson3" },
  { num: 4, title: "Objects and Interfaces", file: "./lessons/lesson4" },
  { num: 5, title: "Classes", file: "./lessons/lesson5" },
  { num: 6, title: "Union Types & Type Guards", file: "./lessons/lesson6" },
  { num: 7, title: "Generics", file: "./lessons/lesson7" },
];

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

function showMenu(): void {
  const progress = loadProgress();
  
  console.log("\n  ┌────────────────────────────────────────────────────┐");
  console.log("  │                   COURSE MENU                      │");
  console.log("  ├────────────────────────────────────────────────────┤");
  
  for (const lesson of lessons) {
    const completed = isLessonComplete(lesson.num);
    const status = completed ? "✓" : " ";
    const score = progress.quizScores[lesson.num];
    const scoreStr = score !== undefined ? ` (${score}pts)` : "";
    console.log(`  │  [${status}] ${lesson.num}. ${lesson.title.padEnd(30)}${scoreStr.padEnd(8)}│`);
  }
  
  console.log("  ├────────────────────────────────────────────────────┤");
  console.log("  │  [R] Reset Progress    [Q] Quit                    │");
  console.log("  └────────────────────────────────────────────────────┘");
  
  const completedCount = progress.completedLessons.length;
  console.log(`\n  Progress: ${completedCount}/${lessons.length} lessons completed`);
}

async function runLesson(lessonNum: number): Promise<void> {
  const lesson = lessons.find(l => l.num === lessonNum);
  if (!lesson) {
    console.log("\n  Invalid lesson number!");
    return;
  }
  
  rl.close();
  
  const lessonModule = await import(lesson.file);
  await lessonModule.run();
}

async function main(): Promise<void> {
  banner();
  
  explain("\n  Welcome to the Interactive TypeScript Course!");
  explain("  Learn TypeScript step by step with hands-on examples and quizzes.\n");
  
  while (true) {
    showMenu();
    
    const choice = await question("\n  Enter lesson number (1-7), R to reset, or Q to quit: ");
    
    if (choice.toLowerCase() === "q") {
      console.log("\n  Thanks for learning! See you next time! 👋\n");
      rl.close();
      process.exit(0);
    }
    
    if (choice.toLowerCase() === "r") {
      resetProgress();
      success("Progress reset!");
      continue;
    }
    
    const lessonNum = parseInt(choice);
    if (lessonNum >= 1 && lessonNum <= lessons.length) {
      await runLesson(lessonNum);
      process.exit(0); // Exit after lesson completes
    } else {
      console.log("\n  Please enter a number between 1 and 7");
    }
  }
}

main().catch(console.error);
