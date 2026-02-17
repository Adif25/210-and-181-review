// Command Processor for Linux Terminal Simulator

import type { FileSystem } from './virtualFileSystem';
import {
  listDirectory,
  readFile,
  createFile,
  createDirectory,
  remove,
  changeDirectory,
  getDisplayPath,
  isDirectory,
  isFile,
  pathExists,
  getNode,
  resolvePath
} from './virtualFileSystem';

export interface CommandResult {
  output: string[];
  newFileSystem: FileSystem;
  clear?: boolean;
}

export interface CommandHistory {
  command: string;
  path: string;
}

// Parse command into command name and arguments
function parseCommand(input: string): { command: string; args: string[] } {
  const parts = input.trim().split(/\s+/);
  const command = parts[0]?.toLowerCase() || '';
  const args = parts.slice(1);
  return { command, args };
}

// Process a command and return the result
export function processCommand(fs: FileSystem, input: string): CommandResult {
  const { command, args } = parseCommand(input);

  switch (command) {
    case 'pwd':
      return cmdPwd(fs);
    case 'ls':
      return cmdLs(fs, args);
    case 'cd':
      return cmdCd(fs, args);
    case 'cat':
      return cmdCat(fs, args);
    case 'touch':
      return cmdTouch(fs, args);
    case 'mkdir':
      return cmdMkdir(fs, args);
    case 'rm':
      return cmdRm(fs, args);
    case 'echo':
      return cmdEcho(fs, args);
    case 'clear':
      return { output: [], newFileSystem: fs, clear: true };
    case 'help':
      return cmdHelp(fs);
    case 'whoami':
      return { output: ['learner'], newFileSystem: fs };
    case 'hostname':
      return { output: ['linux-learning'], newFileSystem: fs };
    case '':
      return { output: [], newFileSystem: fs };
    default:
      return {
        output: [`${command}: command not found. Type 'help' for available commands.`],
        newFileSystem: fs
      };
  }
}

// pwd - Print working directory
function cmdPwd(fs: FileSystem): CommandResult {
  return {
    output: [fs.currentPath],
    newFileSystem: fs
  };
}

// ls - List directory contents
function cmdLs(fs: FileSystem, args: string[]): CommandResult {
  let showHidden = false;
  let showLong = false;
  let targetPath = '.';

  // Parse flags and path
  for (const arg of args) {
    if (arg === '-a' || arg === '-la' || arg === '-al') {
      showHidden = true;
    }
    if (arg === '-l' || arg === '-la' || arg === '-al') {
      showLong = true;
    }
    if (!arg.startsWith('-')) {
      targetPath = arg;
    }
  }

  const resolvedPath = resolvePath(fs, targetPath);

  if (!pathExists(fs, resolvedPath)) {
    return {
      output: [`ls: cannot access '${targetPath}': No such file or directory`],
      newFileSystem: fs
    };
  }

  if (isFile(fs, resolvedPath)) {
    // If it's a file, just show the file name
    const parts = resolvedPath.split('/');
    return {
      output: [parts[parts.length - 1]],
      newFileSystem: fs
    };
  }

  const items = listDirectory(fs, resolvedPath, showHidden);

  if (items.length === 0) {
    return { output: [], newFileSystem: fs };
  }

  if (showLong) {
    // Long format with type indicator
    const output = items.map(item => {
      const itemPath = resolvedPath === '/' ? `/${item}` : `${resolvedPath}/${item}`;
      const node = getNode(fs, itemPath);
      if (node?.type === 'directory') {
        return `drwxr-xr-x  learner  learner  ${item}/`;
      } else {
        const size = node?.type === 'file' ? node.content.length : 0;
        return `-rw-r--r--  learner  learner  ${size.toString().padStart(4)}  ${item}`;
      }
    });
    return { output, newFileSystem: fs };
  }

  // Simple format - show items in columns
  const output: string[] = [];
  
  const coloredItems = items.map(item => {
    const itemPath = resolvedPath === '/' ? `/${item}` : `${resolvedPath}/${item}`;
    const itemNode = getNode(fs, itemPath);
    if (itemNode?.type === 'directory') {
      return `${item}/`;  // Add trailing slash for directories
    }
    return item;
  });

  output.push(coloredItems.join('  '));
  return { output, newFileSystem: fs };
}

// cd - Change directory
function cmdCd(fs: FileSystem, args: string[]): CommandResult {
  const targetPath = args[0] || '~';
  const resolvedPath = resolvePath(fs, targetPath);

  if (!pathExists(fs, resolvedPath)) {
    return {
      output: [`cd: ${targetPath}: No such file or directory`],
      newFileSystem: fs
    };
  }

  if (!isDirectory(fs, resolvedPath)) {
    return {
      output: [`cd: ${targetPath}: Not a directory`],
      newFileSystem: fs
    };
  }

  const newFs = changeDirectory(fs, resolvedPath);
  return { output: [], newFileSystem: newFs };
}

// cat - Display file contents
function cmdCat(fs: FileSystem, args: string[]): CommandResult {
  if (args.length === 0) {
    return {
      output: ['cat: missing file operand'],
      newFileSystem: fs
    };
  }

  const filePath = args[0];
  const resolvedPath = resolvePath(fs, filePath);

  if (!pathExists(fs, resolvedPath)) {
    return {
      output: [`cat: ${filePath}: No such file or directory`],
      newFileSystem: fs
    };
  }

  if (isDirectory(fs, resolvedPath)) {
    return {
      output: [`cat: ${filePath}: Is a directory`],
      newFileSystem: fs
    };
  }

  const content = readFile(fs, resolvedPath);
  if (content === null) {
    return {
      output: [`cat: ${filePath}: Cannot read file`],
      newFileSystem: fs
    };
  }

  // Split content into lines, removing trailing empty line if present
  const lines = content.split('\n');
  if (lines[lines.length - 1] === '') {
    lines.pop();
  }

  return { output: lines, newFileSystem: fs };
}

// touch - Create empty file
function cmdTouch(fs: FileSystem, args: string[]): CommandResult {
  if (args.length === 0) {
    return {
      output: ['touch: missing file operand'],
      newFileSystem: fs
    };
  }

  const filePath = args[0];
  const resolvedPath = resolvePath(fs, filePath);

  // Check if parent directory exists
  const parentPath = resolvedPath.split('/').slice(0, -1).join('/') || '/';
  if (!isDirectory(fs, parentPath)) {
    return {
      output: [`touch: cannot touch '${filePath}': No such file or directory`],
      newFileSystem: fs
    };
  }

  // If file already exists, just return (touch updates timestamp in real systems)
  if (pathExists(fs, resolvedPath)) {
    return { output: [], newFileSystem: fs };
  }

  const newFs = createFile(fs, resolvedPath, '');
  return { output: [], newFileSystem: newFs };
}

// mkdir - Create directory
function cmdMkdir(fs: FileSystem, args: string[]): CommandResult {
  if (args.length === 0) {
    return {
      output: ['mkdir: missing operand'],
      newFileSystem: fs
    };
  }

  const dirPath = args[0];
  const resolvedPath = resolvePath(fs, dirPath);

  // Check if already exists
  if (pathExists(fs, resolvedPath)) {
    return {
      output: [`mkdir: cannot create directory '${dirPath}': File exists`],
      newFileSystem: fs
    };
  }

  // Check if parent directory exists
  const parentPath = resolvedPath.split('/').slice(0, -1).join('/') || '/';
  if (!isDirectory(fs, parentPath)) {
    return {
      output: [`mkdir: cannot create directory '${dirPath}': No such file or directory`],
      newFileSystem: fs
    };
  }

  const newFs = createDirectory(fs, resolvedPath);
  return { output: [], newFileSystem: newFs };
}

// rm - Remove file
function cmdRm(fs: FileSystem, args: string[]): CommandResult {
  if (args.length === 0) {
    return {
      output: ['rm: missing operand'],
      newFileSystem: fs
    };
  }

  const targetPath = args[0];
  const resolvedPath = resolvePath(fs, targetPath);

  if (!pathExists(fs, resolvedPath)) {
    return {
      output: [`rm: cannot remove '${targetPath}': No such file or directory`],
      newFileSystem: fs
    };
  }

  const node = getNode(fs, resolvedPath);
  if (node?.type === 'directory') {
    // Check if -r flag is provided
    if (!args.includes('-r') && !args.includes('-rf')) {
      return {
        output: [`rm: cannot remove '${targetPath}': Is a directory (use -r to remove)`],
        newFileSystem: fs
      };
    }
  }

  const newFs = remove(fs, resolvedPath);
  return { output: [], newFileSystem: newFs };
}

// echo - Print text
function cmdEcho(fs: FileSystem, args: string[]): CommandResult {
  const text = args.join(' ');
  // Remove surrounding quotes if present
  const cleaned = text.replace(/^["']|["']$/g, '');
  return {
    output: [cleaned],
    newFileSystem: fs
  };
}

// help - Show available commands
function cmdHelp(fs: FileSystem): CommandResult {
  const output = [
    'Available commands:',
    '',
    '  pwd          Print current working directory',
    '  ls           List directory contents',
    '    ls -a      Include hidden files (starting with .)',
    '    ls -l      Long format with details',
    '  cd <dir>     Change directory',
    '    cd ..      Go to parent directory',
    '    cd ~       Go to home directory',
    '  cat <file>   Display file contents',
    '  touch <file> Create an empty file',
    '  mkdir <dir>  Create a directory',
    '  rm <file>    Remove a file',
    '    rm -r <dir> Remove a directory',
    '  echo <text>  Print text to the terminal',
    '  clear        Clear the terminal screen',
    '  whoami       Print current username',
    '  help         Show this help message',
    ''
  ];
  return { output, newFileSystem: fs };
}

// Get prompt string for display
export function getPrompt(fs: FileSystem): string {
  const displayPath = getDisplayPath(fs);
  return `learner@linux:${displayPath}$`;
}
