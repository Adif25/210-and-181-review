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
  title("LESSON 5: Classes");

  explain("  Classes are blueprints for creating objects.");
  explain("  They bundle data and behavior together.\n");
  await pressEnter();

  // BASIC CLASS
  section("1. Basic Class");
  
  code(`class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return "Hello, I'm " + this.name;
  }
}`);

  class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }

    greet(): string {
      return "Hello, I'm " + this.name;
    }
  }

  let alice = new Person("Alice", 30);
  output("alice.name", alice.name);
  output("alice.greet()", alice.greet());
  await pressEnter();

  // ACCESS MODIFIERS
  section("2. Access Modifiers");
  explain("  Control who can access properties:");
  
  code(`class BankAccount {
  public owner: string;     // Anyone can access
  private balance: number;  // Only this class
  protected id: number;     // This class + subclasses

  constructor(owner: string, balance: number) {
    this.owner = owner;
    this.balance = balance;
    this.id = Math.random();
  }

  getBalance(): number {
    return this.balance;  // Access private inside class
  }
}`);

  class BankAccount {
    public owner: string;
    private balance: number;

    constructor(owner: string, balance: number) {
      this.owner = owner;
      this.balance = balance;
    }

    deposit(amount: number): void {
      this.balance += amount;
    }

    getBalance(): number {
      return this.balance;
    }
  }

  let account = new BankAccount("Bob", 1000);
  output("account.owner", account.owner);
  output("account.getBalance()", account.getBalance());
  account.deposit(500);
  output("After deposit(500)", account.getBalance());
  
  explain("\n  Trying account.balance directly:");
  error("Property 'balance' is private and only accessible within class");
  await pressEnter();

  // SHORTHAND CONSTRUCTOR
  section("3. Shorthand Constructor");
  explain("  TypeScript has a shorter way to write classes:");
  
  code(`// Instead of declaring + assigning separately:
class Product {
  constructor(
    public name: string,
    public price: number,
    private stock: number = 0
  ) {}
}`);

  class Product {
    constructor(
      public name: string,
      public price: number,
      private stock: number = 0
    ) {}

    getStock(): number {
      return this.stock;
    }
  }

  let laptop = new Product("Laptop", 999, 10);
  output("laptop.name", laptop.name);
  output("laptop.price", laptop.price);
  output("laptop.getStock()", laptop.getStock());
  
  hint("Add public/private in constructor to auto-create properties!");
  await pressEnter();

  // INHERITANCE
  section("4. Inheritance");
  explain("  Classes can extend other classes:");
  
  code(`class Animal {
  constructor(public name: string) {}
  
  move(distance: number): void {
    console.log(this.name + " moved " + distance + "m");
  }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name);  // Call parent constructor
  }
  
  bark(): void {
    console.log(this.name + " says: Woof!");
  }
}`);

  class Animal {
    constructor(public name: string) {}
    
    move(distance: number): string {
      return `${this.name} moved ${distance}m`;
    }
  }

  class Dog extends Animal {
    constructor(name: string, public breed: string) {
      super(name);
    }
    
    bark(): string {
      return `${this.name} says: Woof!`;
    }
  }

  let dog = new Dog("Buddy", "Golden Retriever");
  output("dog.name", dog.name);
  output("dog.breed", dog.breed);
  output("dog.bark()", dog.bark());
  output("dog.move(10)", dog.move(10));
  await pressEnter();

  // GETTERS AND SETTERS
  section("5. Getters and Setters");
  explain("  Control how properties are accessed and modified:");
  
  code(`class Circle {
  constructor(private _radius: number) {}

  get radius(): number {
    return this._radius;
  }

  set radius(value: number) {
    if (value > 0) this._radius = value;
  }

  get area(): number {
    return Math.PI * this._radius ** 2;
  }
}`);

  class Circle {
    constructor(private _radius: number) {}

    get radius(): number {
      return this._radius;
    }

    set radius(value: number) {
      if (value > 0) this._radius = value;
    }

    get area(): number {
      return Math.PI * this._radius ** 2;
    }
  }

  let circle = new Circle(5);
  output("circle.radius", circle.radius);
  output("circle.area", circle.area.toFixed(2));
  circle.radius = 10;
  output("After radius = 10, area", circle.area.toFixed(2));
  
  hint("Getters look like properties but run code!");
  await pressEnter();

  divider();

  // QUIZ
  title("QUIZ TIME!");
  let score = 0;
  const total = 3;

  // Question 1
  explain("  Question 1: What keyword creates a new instance of a class?\n");
  const a1 = await question("  Your answer: ");
  if (a1.toLowerCase() === "new") {
    success("Correct! 'new' creates an instance.");
    score++;
  } else {
    error("The answer is 'new'");
  }

  // Question 2
  explain("\n  Question 2: What access modifier makes a property accessible only inside the class?\n");
  const a2 = await question("  Your answer: ");
  if (a2.toLowerCase() === "private") {
    success("Correct! 'private' restricts access to the class.");
    score++;
  } else {
    error("The answer is 'private'");
  }

  // Question 3
  explain("\n  Question 3: What keyword is used to inherit from another class?\n");
  const a3 = await question("  Your answer: ");
  if (a3.toLowerCase() === "extends") {
    success("Correct! 'extends' creates inheritance.");
    score++;
  } else {
    error("The answer is 'extends'");
  }

  divider();

  // Results
  if (score === total) {
    success(`Perfect score! ${score}/${total} - Class master!`);
  } else if (score >= total / 2) {
    success(`Good job! ${score}/${total} - Keep practicing!`);
  } else {
    explain(`  Score: ${score}/${total} - Review and try again!`);
  }

  markLessonComplete(5, score);
  
  explain("\n  You've completed Lesson 5! 🎉");
  explain("  Next up: Union Types and Type Guards\n");

  rl.close();
}
