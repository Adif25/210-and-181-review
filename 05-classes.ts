// ============================================
// LESSON 5: Classes
// ============================================

// --- Basic Class ---
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
  }
}

let person1 = new Person("Alice", 30);
console.log(person1.greet());

// --- Access Modifiers ---
class BankAccount {
  public owner: string;      // Accessible anywhere
  private balance: number;   // Only inside this class
  protected id: number;      // Inside class and subclasses

  constructor(owner: string, initialBalance: number) {
    this.owner = owner;
    this.balance = initialBalance;
    this.id = Math.random();
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited $${amount}. New balance: $${this.balance}`);
    }
  }

  withdraw(amount: number): boolean {
    if (amount <= this.balance) {
      this.balance -= amount;
      console.log(`Withdrew $${amount}. New balance: $${this.balance}`);
      return true;
    }
    console.log("Insufficient funds");
    return false;
  }

  getBalance(): number {
    return this.balance;
  }
}

let account = new BankAccount("Bob", 1000);
account.deposit(500);
account.withdraw(200);
console.log("Balance:", account.getBalance());
// account.balance = 0; // Error! Private property

// --- Shorthand Constructor ---
class Product {
  constructor(
    public name: string,
    public price: number,
    private stock: number = 0
  ) {}

  addStock(quantity: number): void {
    this.stock += quantity;
  }

  getStock(): number {
    return this.stock;
  }
}

let laptop = new Product("Laptop", 999, 10);
console.log(`${laptop.name}: $${laptop.price}, Stock: ${laptop.getStock()}`);

// --- Inheritance ---
class Animal {
  constructor(public name: string) {}

  move(distance: number): void {
    console.log(`${this.name} moved ${distance} meters.`);
  }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name); // Call parent constructor
  }

  bark(): void {
    console.log(`${this.name} says: Woof!`);
  }

  // Override parent method
  move(distance: number): void {
    console.log(`${this.name} runs...`);
    super.move(distance); // Call parent method
  }
}

let dog = new Dog("Buddy", "Golden Retriever");
dog.bark();
dog.move(10);

// --- Getters and Setters ---
class Circle {
  constructor(private _radius: number) {}

  get radius(): number {
    return this._radius;
  }

  set radius(value: number) {
    if (value > 0) {
      this._radius = value;
    }
  }

  get area(): number {
    return Math.PI * this._radius ** 2;
  }
}

let circle = new Circle(5);
console.log(`Radius: ${circle.radius}, Area: ${circle.area.toFixed(2)}`);
circle.radius = 10;
console.log(`New radius: ${circle.radius}, New area: ${circle.area.toFixed(2)}`);

// --- Static Members ---
class Counter {
  static count: number = 0;

  static increment(): void {
    Counter.count++;
  }

  static getCount(): number {
    return Counter.count;
  }
}

Counter.increment();
Counter.increment();
console.log("Count:", Counter.getCount());

// --- Exercise 1 ---
// Create a Rectangle class with:
// - width and height (private)
// - getters for width, height, and area
// - a method to resize(newWidth, newHeight)

// Your code here:



// --- Exercise 2 ---
// Create a Vehicle class and a Car class that extends it
// Vehicle should have: brand, year, start()
// Car should add: numDoors, honk()

// Your code here:



// --- Exercise 3 ---
// Create a TodoList class with:
// - private array of tasks
// - addTask(task: string)
// - removeTask(index: number)
// - getTasks(): string[]
// - static counter for total tasks ever created

// Your code here:



// ============================================
// Run this file: npx ts-node 05-classes.ts
// ============================================
