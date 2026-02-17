import { useState, useRef, useEffect, useCallback } from 'react';
import type { FileSystem } from '../utils/virtualFileSystem';
import { createInitialFileSystem } from '../utils/virtualFileSystem';
import { processCommand, getPrompt } from '../utils/commandProcessor';

interface TerminalLine {
  type: 'input' | 'output';
  content: string;
  prompt?: string;
}

interface TerminalSimulatorProps {
  onCommandExecuted?: (command: string, fs: FileSystem) => void;
  initialFileSystem?: FileSystem;
  onFileSystemChange?: (fs: FileSystem) => void;
}

export default function TerminalSimulator({ 
  onCommandExecuted,
  initialFileSystem,
  onFileSystemChange 
}: TerminalSimulatorProps) {
  const [fileSystem, setFileSystem] = useState<FileSystem>(
    initialFileSystem || createInitialFileSystem()
  );
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to Linux Terminal Simulator!' },
    { type: 'output', content: "Type 'help' to see available commands." },
    { type: 'output', content: '' }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Update file system when initialFileSystem changes
  useEffect(() => {
    if (initialFileSystem) {
      setFileSystem(initialFileSystem);
    }
  }, [initialFileSystem]);

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input on click anywhere in terminal
  const handleTerminalClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const executeCommand = useCallback((input: string) => {
    const prompt = getPrompt(fileSystem);
    
    // Add the input line to history
    const newLines: TerminalLine[] = [
      ...lines,
      { type: 'input', content: input, prompt }
    ];

    // Process the command
    const result = processCommand(fileSystem, input);

    // Handle clear command
    if (result.clear) {
      setLines([]);
      setCurrentInput('');
      return;
    }

    // Add output lines
    result.output.forEach(line => {
      newLines.push({ type: 'output', content: line });
    });

    setLines(newLines);
    setFileSystem(result.newFileSystem);
    setCurrentInput('');

    // Add to command history (if not empty)
    if (input.trim()) {
      setCommandHistory(prev => [...prev, input]);
    }
    setHistoryIndex(-1);

    // Notify parent components
    if (onCommandExecuted) {
      onCommandExecuted(input, result.newFileSystem);
    }
    if (onFileSystemChange) {
      onFileSystemChange(result.newFileSystem);
    }
  }, [fileSystem, lines, onCommandExecuted, onFileSystemChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Basic tab completion could be added here
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      const prompt = getPrompt(fileSystem);
      setLines(prev => [...prev, { type: 'input', content: currentInput + '^C', prompt }]);
      setCurrentInput('');
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  }, [currentInput, commandHistory, historyIndex, executeCommand, fileSystem]);

  const prompt = getPrompt(fileSystem);

  return (
    <div 
      ref={terminalRef}
      onClick={handleTerminalClick}
      className="bg-gray-900 rounded-lg border border-gray-700 font-mono text-sm h-[400px] overflow-y-auto cursor-text"
    >
      {/* Terminal Header */}
      <div className="sticky top-0 bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-gray-400 text-xs ml-2">Terminal — learner@linux</span>
      </div>

      {/* Terminal Content */}
      <div className="p-4 min-h-[calc(100%-44px)]">
        {/* Previous lines */}
        {lines.map((line, index) => (
          <div key={index} className="leading-relaxed">
            {line.type === 'input' ? (
              <div className="flex">
                <span className="text-green-400">{line.prompt}</span>
                <span className="text-white ml-1">{line.content}</span>
              </div>
            ) : (
              <div className="text-gray-300 whitespace-pre-wrap">{line.content}</div>
            )}
          </div>
        ))}

        {/* Current input line */}
        <div className="flex items-center">
          <span className="text-green-400">{prompt}</span>
          <div className="flex-1 ml-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-white outline-none caret-green-400"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Export a hook for external file system management
export function useTerminalFileSystem() {
  const [fileSystem, setFileSystem] = useState<FileSystem>(createInitialFileSystem());
  
  const resetFileSystem = useCallback(() => {
    setFileSystem(createInitialFileSystem());
  }, []);

  return {
    fileSystem,
    setFileSystem,
    resetFileSystem
  };
}
