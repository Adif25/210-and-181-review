import type { FileSystem } from '../utils/virtualFileSystem';

export interface LinuxTestCase {
  name: string;
  test: (commandHistory: string[], fs: FileSystem) => boolean;
  hint: string;
}

export interface LinuxExercise {
  id: string;
  title: string;
  instructions: string;
  expectedCommands?: string[];  // Commands that should be run
  tests: LinuxTestCase[];
}

export interface LinuxLesson {
  id: number;
  title: string;
  description: string;
  explanation: string;
  icon: string;
  exercises: LinuxExercise[];
}

export const linuxLessons: LinuxLesson[] = [
  {
    id: 1,
    title: "Getting Started",
    description: "Learn what the terminal is and run your first commands.",
    icon: "🖥️",
    explanation: `
# Welcome to the Terminal!

The **terminal** (also called command line or shell) is a text-based way to interact with your computer. Instead of clicking buttons and icons, you type commands.

## Why Learn the Terminal?

- **Power**: Do things faster than with a mouse
- **Automation**: Write scripts to automate repetitive tasks
- **Development**: Essential for programming and server management
- **Universal**: Works on Linux, Mac, and Windows (with WSL)

## Your First Commands

### \`pwd\` - Print Working Directory
Shows where you currently are in the file system.

\`\`\`bash
pwd
\`\`\`

### \`ls\` - List
Shows files and folders in the current directory.

\`\`\`bash
ls
\`\`\`

### \`echo\` - Print Text
Displays text to the terminal.

\`\`\`bash
echo "Hello, World!"
\`\`\`

## The Prompt

The terminal prompt shows useful info:
\`\`\`
learner@linux:~$
\`\`\`

- **learner** = your username
- **linux** = computer name
- **~** = current directory (~ means home)
- **$** = ready for your command

Let's try some commands!
    `,
    exercises: [
      {
        id: "linux-1-1",
        title: "Where Am I?",
        instructions: "Run the `pwd` command to see your current location in the file system.\n\nThis is the first thing you should do when you open a new terminal - find out where you are!",
        expectedCommands: ["pwd"],
        tests: [
          {
            name: "Ran pwd command",
            test: (history) => history.some(cmd => cmd.trim().toLowerCase() === 'pwd'),
            hint: "Type 'pwd' and press Enter"
          }
        ]
      },
      {
        id: "linux-1-2",
        title: "Look Around",
        instructions: "Now let's see what files and folders are in your current directory.\n\nRun the `ls` command to list the contents.",
        expectedCommands: ["ls"],
        tests: [
          {
            name: "Ran ls command",
            test: (history) => history.some(cmd => cmd.trim().toLowerCase().startsWith('ls')),
            hint: "Type 'ls' and press Enter"
          }
        ]
      },
      {
        id: "linux-1-3",
        title: "Say Hello",
        instructions: "Let's make the terminal talk back to us!\n\nUse the `echo` command to print \"Hello, Terminal!\" to the screen.\n\nSyntax: `echo \"Your message here\"`",
        expectedCommands: ["echo"],
        tests: [
          {
            name: "Used echo command",
            test: (history) => history.some(cmd => cmd.trim().toLowerCase().startsWith('echo')),
            hint: "Type 'echo \"Hello, Terminal!\"' and press Enter"
          }
        ]
      },
      {
        id: "linux-1-4",
        title: "Get Help",
        instructions: "Not sure what commands are available? The `help` command shows you all available commands in this simulator.\n\nRun `help` to see the list.",
        expectedCommands: ["help"],
        tests: [
          {
            name: "Ran help command",
            test: (history) => history.some(cmd => cmd.trim().toLowerCase() === 'help'),
            hint: "Type 'help' and press Enter"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Navigation",
    description: "Master moving around the file system like a pro.",
    icon: "🧭",
    explanation: `
# Navigating the File System

Think of the file system like a tree of folders. You need to know how to move around!

## The \`cd\` Command (Change Directory)

\`cd\` lets you move between directories.

### Basic Usage

\`\`\`bash
cd foldername    # Go into a folder
cd ..            # Go up one level (parent folder)
cd ~             # Go to home directory
cd /             # Go to root directory
\`\`\`

## Understanding Paths

### Relative Paths
Start from where you currently are:
\`\`\`bash
cd documents        # Go to documents folder inside current folder
cd ../projects      # Go up, then into projects
\`\`\`

### Absolute Paths
Start from the root (/):
\`\`\`bash
cd /home/learner/documents   # Full path from root
\`\`\`

## Special Symbols

| Symbol | Meaning |
|--------|---------|
| \`..\` | Parent directory (one level up) |
| \`.\` | Current directory |
| \`~\` | Home directory |
| \`/\` | Root directory (start of absolute path) |

## Checking Where You Are

Always use \`pwd\` and \`ls\` to verify your location:
\`\`\`bash
pwd     # Where am I?
ls      # What's here?
\`\`\`

Let's practice navigating!
    `,
    exercises: [
      {
        id: "linux-2-1",
        title: "Enter the Documents",
        instructions: "You should be in your home directory (~).\n\nUse `cd` to navigate into the `documents` folder.\n\nTip: Use `ls` first to see available folders!",
        tests: [
          {
            name: "Navigated to documents folder",
            test: (_history, fs) => fs.currentPath === '/home/learner/documents',
            hint: "Type 'cd documents' and press Enter"
          }
        ]
      },
      {
        id: "linux-2-2",
        title: "Go Back Up",
        instructions: "Now you're inside the documents folder.\n\nUse `cd ..` to go back up to your home directory.\n\nThe `..` means \"parent directory\" - the folder that contains this one.",
        tests: [
          {
            name: "Navigated back to home",
            test: (_history, fs) => fs.currentPath === '/home/learner',
            hint: "Type 'cd ..' to go up one level"
          }
        ]
      },
      {
        id: "linux-2-3",
        title: "Multiple Hops",
        instructions: "Let's navigate deeper! Go to the `projects` folder.\n\nOnce there, use `ls` to see what's inside.",
        tests: [
          {
            name: "Navigated to projects folder",
            test: (_history, fs) => fs.currentPath === '/home/learner/projects',
            hint: "Type 'cd projects' from your home directory"
          },
          {
            name: "Listed contents",
            test: (history) => {
              return history.some(c => c.trim() === 'ls' || c.trim().startsWith('ls '));
            },
            hint: "Run 'ls' to see the contents of the projects folder"
          }
        ]
      },
      {
        id: "linux-2-4",
        title: "Absolute Path",
        instructions: "No matter where you are, you can jump directly to any location using an absolute path (starting with /).\n\nNavigate to `/home/learner/downloads` using an absolute path.",
        tests: [
          {
            name: "Used absolute path to reach downloads",
            test: (_history, fs) => fs.currentPath === '/home/learner/downloads',
            hint: "Type 'cd /home/learner/downloads' - this works from anywhere!"
          }
        ]
      },
      {
        id: "linux-2-5",
        title: "Home Sweet Home",
        instructions: "The `~` symbol is a shortcut for your home directory.\n\nNo matter where you are, `cd ~` takes you home instantly.\n\nTry it now!",
        tests: [
          {
            name: "Used ~ to go home",
            test: (history, fs) => {
              const usedTilde = history.some(cmd => cmd.trim() === 'cd ~' || cmd.trim() === 'cd');
              return fs.currentPath === '/home/learner' && usedTilde;
            },
            hint: "Type 'cd ~' to go to your home directory"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "File Operations",
    description: "Create, view, and manage files and directories.",
    icon: "📁",
    explanation: `
# Working with Files and Directories

Now let's learn how to create, view, and organize files!

## Viewing Files

### \`cat\` - Display File Contents
\`\`\`bash
cat filename.txt     # Show entire file
\`\`\`

## Creating Things

### \`touch\` - Create Empty File
\`\`\`bash
touch newfile.txt    # Creates an empty file
\`\`\`

### \`mkdir\` - Make Directory
\`\`\`bash
mkdir newfolder      # Creates a new folder
\`\`\`

## Removing Things

### \`rm\` - Remove File
\`\`\`bash
rm filename.txt      # Delete a file (careful!)
rm -r foldername     # Delete a folder and contents
\`\`\`

⚠️ **Warning**: In real Linux, \`rm\` permanently deletes files. There's no trash can! Always double-check before deleting.

## Hidden Files

Files starting with a dot (.) are hidden:
\`\`\`bash
ls -a                # Show ALL files including hidden
\`\`\`

## Combining What You Know

A typical workflow:
\`\`\`bash
cd projects          # Navigate to projects
mkdir myapp          # Create new folder
cd myapp             # Enter it
touch readme.md      # Create a file
ls                   # Verify it's there
\`\`\`

Let's practice!
    `,
    exercises: [
      {
        id: "linux-3-1",
        title: "Read a File",
        instructions: "Let's read the contents of a file!\n\nFirst, make sure you're in your home directory (use `cd ~` if needed).\n\nThen navigate to `documents` and use `cat` to view the contents of `notes.txt`.",
        tests: [
          {
            name: "Read the notes.txt file",
            test: (history) => history.some(cmd => cmd.includes('cat') && cmd.includes('notes.txt')),
            hint: "Navigate to documents, then type 'cat notes.txt'"
          }
        ]
      },
      {
        id: "linux-3-2",
        title: "Create Your First File",
        instructions: "Let's create a new file!\n\nMake sure you're in your home directory, then use `touch` to create a file called `myfile.txt`.\n\nAfter creating it, use `ls` to verify it exists.",
        tests: [
          {
            name: "Created myfile.txt",
            test: (_history, fs) => {
              const homeNode = fs.root.children.home?.type === 'directory' 
                ? fs.root.children.home.children.learner
                : null;
              if (homeNode?.type === 'directory') {
                return 'myfile.txt' in homeNode.children;
              }
              return false;
            },
            hint: "Type 'touch myfile.txt' while in your home directory"
          }
        ]
      },
      {
        id: "linux-3-3",
        title: "Make a Directory",
        instructions: "Now let's create a folder!\n\nUse `mkdir` to create a directory called `learning` in your home directory.\n\nThen navigate into it using `cd`.",
        tests: [
          {
            name: "Created learning directory",
            test: (_history, fs) => {
              const homeNode = fs.root.children.home?.type === 'directory' 
                ? fs.root.children.home.children.learner
                : null;
              if (homeNode?.type === 'directory') {
                return 'learning' in homeNode.children;
              }
              return false;
            },
            hint: "Type 'mkdir learning' while in your home directory"
          },
          {
            name: "Entered the learning directory",
            test: (_history, fs) => fs.currentPath === '/home/learner/learning',
            hint: "Type 'cd learning' to enter the new folder"
          }
        ]
      },
      {
        id: "linux-3-4",
        title: "Find Hidden Files",
        instructions: "Some files are hidden - they start with a dot (like `.bashrc`).\n\nGo to your home directory and use `ls -a` to reveal hidden files.\n\nCan you spot the hidden ones?",
        tests: [
          {
            name: "Listed hidden files",
            test: (history) => history.some(cmd => cmd.includes('ls') && cmd.includes('-a')),
            hint: "Type 'ls -a' to show all files including hidden ones"
          }
        ]
      },
      {
        id: "linux-3-5",
        title: "Clean Up",
        instructions: "Let's practice removing files safely.\n\nFirst, create a test file: `touch deleteme.txt`\n\nThen verify it exists with `ls`\n\nFinally, remove it with `rm deleteme.txt`\n\nUse `ls` again to confirm it's gone.",
        tests: [
          {
            name: "Created the test file",
            test: (history) => history.some(cmd => cmd.includes('touch') && cmd.includes('deleteme')),
            hint: "First run 'touch deleteme.txt'"
          },
          {
            name: "Removed the test file",
            test: (history, _fs) => {
              const createdFile = history.some(cmd => cmd.includes('touch') && cmd.includes('deleteme'));
              const removedFile = history.some(cmd => cmd.includes('rm') && cmd.includes('deleteme'));
              return createdFile && removedFile;
            },
            hint: "Run 'rm deleteme.txt' to remove the file"
          }
        ]
      }
    ]
  }
];

export function getLinuxLessonById(id: number): LinuxLesson | undefined {
  return linuxLessons.find(lesson => lesson.id === id);
}

export function getLinuxExerciseById(lessonId: number, exerciseId: string): LinuxExercise | undefined {
  const lesson = getLinuxLessonById(lessonId);
  return lesson?.exercises.find(ex => ex.id === exerciseId);
}
