// Virtual File System for Linux Terminal Simulator

export interface FileNode {
  type: 'file';
  name: string;
  content: string;
}

export interface DirectoryNode {
  type: 'directory';
  name: string;
  children: Record<string, FileSystemNode>;
}

export type FileSystemNode = FileNode | DirectoryNode;

export interface FileSystem {
  root: DirectoryNode;
  currentPath: string;
  homeDir: string;
}

// Create the initial file system state
export function createInitialFileSystem(): FileSystem {
  const root: DirectoryNode = {
    type: 'directory',
    name: '',
    children: {
      home: {
        type: 'directory',
        name: 'home',
        children: {
          learner: {
            type: 'directory',
            name: 'learner',
            children: {
              documents: {
                type: 'directory',
                name: 'documents',
                children: {
                  'notes.txt': {
                    type: 'file',
                    name: 'notes.txt',
                    content: 'Welcome to Linux!\n\nThis is your notes file.\nYou can view files using the cat command.\n'
                  },
                  'todo.txt': {
                    type: 'file',
                    name: 'todo.txt',
                    content: '1. Learn terminal basics\n2. Practice navigation\n3. Create and manage files\n4. Become a Linux pro!\n'
                  }
                }
              },
              projects: {
                type: 'directory',
                name: 'projects',
                children: {
                  'hello.py': {
                    type: 'file',
                    name: 'hello.py',
                    content: '# My first Python script\nprint("Hello, World!")\n'
                  },
                  'readme.md': {
                    type: 'file',
                    name: 'readme.md',
                    content: '# Projects Folder\n\nThis is where you can store your coding projects.\n'
                  }
                }
              },
              downloads: {
                type: 'directory',
                name: 'downloads',
                children: {
                  'image.png': {
                    type: 'file',
                    name: 'image.png',
                    content: '[Binary image data]'
                  }
                }
              },
              '.bashrc': {
                type: 'file',
                name: '.bashrc',
                content: '# Bash configuration file\nexport PATH=$PATH:/usr/local/bin\nalias ll="ls -la"\n'
              },
              '.hidden_secret': {
                type: 'file',
                name: '.hidden_secret',
                content: 'You found the hidden file! 🎉\n'
              }
            }
          }
        }
      },
      etc: {
        type: 'directory',
        name: 'etc',
        children: {
          'hostname': {
            type: 'file',
            name: 'hostname',
            content: 'linux-learning\n'
          }
        }
      },
      tmp: {
        type: 'directory',
        name: 'tmp',
        children: {}
      }
    }
  };

  return {
    root,
    currentPath: '/home/learner',
    homeDir: '/home/learner'
  };
}

// Helper: Split path into segments
export function splitPath(path: string): string[] {
  return path.split('/').filter(segment => segment !== '');
}

// Helper: Join path segments
export function joinPath(segments: string[]): string {
  return '/' + segments.join('/');
}

// Resolve a path (handles ., .., ~, absolute and relative)
export function resolvePath(fs: FileSystem, inputPath: string): string {
  let path = inputPath.trim();
  
  // Handle empty path
  if (!path || path === '.') {
    return fs.currentPath;
  }
  
  // Handle home directory shortcut
  if (path === '~') {
    return fs.homeDir;
  }
  if (path.startsWith('~/')) {
    path = fs.homeDir + path.slice(1);
  }
  
  // Handle absolute vs relative path
  let segments: string[];
  if (path.startsWith('/')) {
    segments = splitPath(path);
  } else {
    segments = [...splitPath(fs.currentPath), ...splitPath(path)];
  }
  
  // Process . and ..
  const resolved: string[] = [];
  for (const segment of segments) {
    if (segment === '.') {
      continue;
    } else if (segment === '..') {
      resolved.pop();
    } else {
      resolved.push(segment);
    }
  }
  
  return joinPath(resolved);
}

// Get a node at a specific path
export function getNode(fs: FileSystem, path: string): FileSystemNode | null {
  const resolvedPath = resolvePath(fs, path);
  const segments = splitPath(resolvedPath);
  
  let current: FileSystemNode = fs.root;
  
  for (const segment of segments) {
    if (current.type !== 'directory') {
      return null;
    }
    const child: FileSystemNode | undefined = current.children[segment];
    if (!child) {
      return null;
    }
    current = child;
  }
  
  return current;
}

// Check if a path exists
export function pathExists(fs: FileSystem, path: string): boolean {
  return getNode(fs, path) !== null;
}

// Check if path is a directory
export function isDirectory(fs: FileSystem, path: string): boolean {
  const node = getNode(fs, path);
  return node !== null && node.type === 'directory';
}

// Check if path is a file
export function isFile(fs: FileSystem, path: string): boolean {
  const node = getNode(fs, path);
  return node !== null && node.type === 'file';
}

// List directory contents
export function listDirectory(fs: FileSystem, path: string, showHidden: boolean = false): string[] {
  const node = getNode(fs, path);
  if (!node || node.type !== 'directory') {
    return [];
  }
  
  let names = Object.keys(node.children);
  if (!showHidden) {
    names = names.filter(name => !name.startsWith('.'));
  }
  
  return names.sort();
}

// Get file content
export function readFile(fs: FileSystem, path: string): string | null {
  const node = getNode(fs, path);
  if (!node || node.type !== 'file') {
    return null;
  }
  return node.content;
}

// Create a file
export function createFile(fs: FileSystem, path: string, content: string = ''): FileSystem {
  const resolvedPath = resolvePath(fs, path);
  const segments = splitPath(resolvedPath);
  const fileName = segments.pop();
  
  if (!fileName) {
    return fs;
  }
  
  const parentPath = joinPath(segments);
  const parentNode = getNode(fs, parentPath);
  
  if (!parentNode || parentNode.type !== 'directory') {
    return fs;
  }
  
  // Clone the file system to maintain immutability
  const newFs = JSON.parse(JSON.stringify(fs)) as FileSystem;
  const newParent = getNode(newFs, parentPath) as DirectoryNode;
  
  newParent.children[fileName] = {
    type: 'file',
    name: fileName,
    content
  };
  
  return newFs;
}

// Create a directory
export function createDirectory(fs: FileSystem, path: string): FileSystem {
  const resolvedPath = resolvePath(fs, path);
  const segments = splitPath(resolvedPath);
  const dirName = segments.pop();
  
  if (!dirName) {
    return fs;
  }
  
  const parentPath = joinPath(segments);
  const parentNode = getNode(fs, parentPath);
  
  if (!parentNode || parentNode.type !== 'directory') {
    return fs;
  }
  
  // Clone the file system
  const newFs = JSON.parse(JSON.stringify(fs)) as FileSystem;
  const newParent = getNode(newFs, parentPath) as DirectoryNode;
  
  newParent.children[dirName] = {
    type: 'directory',
    name: dirName,
    children: {}
  };
  
  return newFs;
}

// Remove a file or empty directory
export function remove(fs: FileSystem, path: string): FileSystem {
  const resolvedPath = resolvePath(fs, path);
  const segments = splitPath(resolvedPath);
  const name = segments.pop();
  
  if (!name) {
    return fs;
  }
  
  const parentPath = joinPath(segments);
  const parentNode = getNode(fs, parentPath);
  
  if (!parentNode || parentNode.type !== 'directory') {
    return fs;
  }
  
  // Clone the file system
  const newFs = JSON.parse(JSON.stringify(fs)) as FileSystem;
  const newParent = getNode(newFs, parentPath) as DirectoryNode;
  
  delete newParent.children[name];
  
  return newFs;
}

// Change directory
export function changeDirectory(fs: FileSystem, path: string): FileSystem {
  const resolvedPath = resolvePath(fs, path);
  
  if (!isDirectory(fs, resolvedPath)) {
    return fs;
  }
  
  return {
    ...fs,
    currentPath: resolvedPath
  };
}

// Get display path (with ~ for home)
export function getDisplayPath(fs: FileSystem, path?: string): string {
  const actualPath = path || fs.currentPath;
  if (actualPath === fs.homeDir) {
    return '~';
  }
  if (actualPath.startsWith(fs.homeDir + '/')) {
    return '~' + actualPath.slice(fs.homeDir.length);
  }
  return actualPath || '/';
}
