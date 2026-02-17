// ============================================
// BONUS CHALLENGE: Build a Task Manager
// ============================================
// 
// Combine everything you've learned to build a complete
// task management system!
//
// Requirements:
// 1. Define interfaces for Task and User
// 2. Create a TaskManager class with full CRUD operations
// 3. Use generics for a reusable storage system
// 4. Implement filtering and searching
// 5. Add proper type guards and error handling
// ============================================

// --- Step 1: Define Types and Interfaces ---

type Priority = "low" | "medium" | "high";
type TaskStatus = "todo" | "in-progress" | "done";

interface Task {
  id: number;
  title: string;
  description?: string;
  priority: Priority;
  status: TaskStatus;
  assignee?: string;
  dueDate?: Date;
  createdAt: Date;
}

interface User {
  id: number;
  name: string;
  email: string;
}

// --- Step 2: Generic Storage Class ---

class Storage<T extends { id: number }> {
  protected items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  remove(id: number): boolean {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  findById(id: number): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  getAll(): T[] {
    return [...this.items];
  }

  count(): number {
    return this.items.length;
  }
}

// --- Step 3: TaskManager Class ---

class TaskManager extends Storage<Task> {
  private nextId: number = 1;

  createTask(
    title: string,
    priority: Priority = "medium",
    options?: {
      description?: string;
      assignee?: string;
      dueDate?: Date;
    }
  ): Task {
    const task: Task = {
      id: this.nextId++,
      title,
      priority,
      status: "todo",
      createdAt: new Date(),
      ...options,
    };
    this.add(task);
    return task;
  }

  updateStatus(taskId: number, status: TaskStatus): boolean {
    const task = this.findById(taskId);
    if (task) {
      task.status = status;
      return true;
    }
    return false;
  }

  assignTask(taskId: number, assignee: string): boolean {
    const task = this.findById(taskId);
    if (task) {
      task.assignee = assignee;
      return true;
    }
    return false;
  }

  filterByStatus(status: TaskStatus): Task[] {
    return this.items.filter((task) => task.status === status);
  }

  filterByPriority(priority: Priority): Task[] {
    return this.items.filter((task) => task.priority === priority);
  }

  filterByAssignee(assignee: string): Task[] {
    return this.items.filter((task) => task.assignee === assignee);
  }

  search(query: string): Task[] {
    const lowerQuery = query.toLowerCase();
    return this.items.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerQuery) ||
        task.description?.toLowerCase().includes(lowerQuery)
    );
  }

  getOverdueTasks(): Task[] {
    const now = new Date();
    return this.items.filter(
      (task) =>
        task.dueDate &&
        task.dueDate < now &&
        task.status !== "done"
    );
  }

  getStats(): {
    total: number;
    byStatus: Record<TaskStatus, number>;
    byPriority: Record<Priority, number>;
  } {
    return {
      total: this.count(),
      byStatus: {
        todo: this.filterByStatus("todo").length,
        "in-progress": this.filterByStatus("in-progress").length,
        done: this.filterByStatus("done").length,
      },
      byPriority: {
        low: this.filterByPriority("low").length,
        medium: this.filterByPriority("medium").length,
        high: this.filterByPriority("high").length,
      },
    };
  }

  printTask(task: Task): void {
    console.log(`
    [${task.id}] ${task.title}
    Status: ${task.status} | Priority: ${task.priority}
    Assignee: ${task.assignee ?? "Unassigned"}
    ${task.description ? `Description: ${task.description}` : ""}
    `.trim());
  }
}

// --- Step 4: Test the System ---

console.log("=== Task Manager Demo ===\n");

const manager = new TaskManager();

// Create tasks
const task1 = manager.createTask("Set up project structure", "high", {
  description: "Initialize the repository and configure TypeScript",
});

const task2 = manager.createTask("Design database schema", "high", {
  assignee: "Alice",
});

const task3 = manager.createTask("Write unit tests", "medium", {
  assignee: "Bob",
  dueDate: new Date("2024-01-01"), // Past date for testing
});

const task4 = manager.createTask("Update documentation", "low");

// Update some tasks
manager.updateStatus(task1.id, "in-progress");
manager.assignTask(task1.id, "Carol");
manager.updateStatus(task2.id, "done");

// Display all tasks
console.log("All Tasks:");
manager.getAll().forEach((task) => manager.printTask(task));

// Filter examples
console.log("\n--- High Priority Tasks ---");
manager.filterByPriority("high").forEach((t) => console.log(`- ${t.title}`));

console.log("\n--- In Progress ---");
manager.filterByStatus("in-progress").forEach((t) => console.log(`- ${t.title}`));

console.log("\n--- Assigned to Alice ---");
manager.filterByAssignee("Alice").forEach((t) => console.log(`- ${t.title}`));

console.log("\n--- Search 'database' ---");
manager.search("database").forEach((t) => console.log(`- ${t.title}`));

console.log("\n--- Overdue Tasks ---");
manager.getOverdueTasks().forEach((t) => console.log(`- ${t.title}`));

// Stats
console.log("\n--- Statistics ---");
console.log(manager.getStats());

// ============================================
// YOUR CHALLENGE: Extend the Task Manager!
// ============================================
// 
// Ideas to implement:
// 1. Add subtasks support (tasks can have child tasks)
// 2. Add tags/labels to tasks
// 3. Create a UserManager class for managing team members
// 4. Add task comments/notes
// 5. Implement task dependencies (task X must be done before Y)
// 6. Add due date reminders
// 7. Create a simple CLI interface
// 8. Add data persistence (save/load from JSON file)
//
// Your code here:



// ============================================
// Run this file: npx ts-node 08-bonus-challenge.ts
// ============================================
