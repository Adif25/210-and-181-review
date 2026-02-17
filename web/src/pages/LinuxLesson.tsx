import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLinuxLessonById } from '../lessons/linuxLessonData';
import type { LinuxExercise } from '../lessons/linuxLessonData';
import TerminalSimulator from '../components/TerminalSimulator';
import type { FileSystem } from '../utils/virtualFileSystem';
import { createInitialFileSystem } from '../utils/virtualFileSystem';
import { 
  markExerciseComplete, 
  isExerciseComplete 
} from '../utils/progressStore';
import ReactMarkdown from 'react-markdown';

interface TestResult {
  name: string;
  passed: boolean;
  hint: string;
}

export default function LinuxLesson() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const lesson = getLinuxLessonById(Number(lessonId));
  
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [fileSystem, setFileSystem] = useState<FileSystem>(createInitialFileSystem());
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showHint, setShowHint] = useState(false);

  const currentExercise: LinuxExercise | undefined = lesson?.exercises[currentExerciseIndex];

  // Reset state when exercise changes
  useEffect(() => {
    setCommandHistory([]);
    setFileSystem(createInitialFileSystem());
    setTestResults([]);
    setShowHint(false);
  }, [currentExerciseIndex, lessonId]);

  // Run tests whenever command history or file system changes
  useEffect(() => {
    if (!currentExercise) return;

    const results = currentExercise.tests.map(test => ({
      name: test.name,
      passed: test.test(commandHistory, fileSystem),
      hint: test.hint
    }));
    setTestResults(results);

    // Check if all tests pass
    if (results.length > 0 && results.every(r => r.passed)) {
      markExerciseComplete(currentExercise.id);
    }
  }, [commandHistory, fileSystem, currentExercise]);

  const handleCommandExecuted = useCallback((command: string, newFs: FileSystem) => {
    if (command.trim()) {
      setCommandHistory(prev => [...prev, command]);
    }
    setFileSystem(newFs);
  }, []);

  const handleReset = () => {
    setCommandHistory([]);
    setFileSystem(createInitialFileSystem());
    setTestResults([]);
  };

  const goToNextExercise = () => {
    if (lesson && currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const goToPrevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  if (!lesson || !currentExercise) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
          <Link to="/" className="text-blue-400 hover:underline">
            ← Back to lessons
          </Link>
        </div>
      </div>
    );
  }

  const allTestsPassed = testResults.length > 0 && testResults.every(r => r.passed);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Lesson Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link to="/" className="text-gray-400 hover:text-white text-sm mb-2 inline-block">
              ← Back to courses
            </Link>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <span>{lesson.icon}</span>
              Lesson {lesson.id}: {lesson.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {lesson.exercises.map((ex, idx) => (
              <button
                key={ex.id}
                onClick={() => setCurrentExerciseIndex(idx)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  idx === currentExerciseIndex
                    ? 'bg-green-600 text-white'
                    : isExerciseComplete(ex.id)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {isExerciseComplete(ex.id) ? '✓' : idx + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Instructions */}
          <div className="space-y-4">
            {/* Explanation */}
            <div className="bg-gray-900 rounded-xl p-6 prose prose-invert max-w-none max-h-[300px] overflow-y-auto">
              <ReactMarkdown
                components={{
                  code: ({ className, children, ...props }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-300" {...props}>
                        {children}
                      </code>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                      {children}
                    </pre>
                  ),
                }}
              >
                {lesson.explanation}
              </ReactMarkdown>
            </div>

            {/* Exercise Instructions */}
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 bg-green-600 rounded text-sm font-medium">
                  Exercise {currentExerciseIndex + 1}
                </span>
                <h2 className="text-lg font-semibold">{currentExercise.title}</h2>
                {isExerciseComplete(currentExercise.id) && (
                  <span className="text-green-400">✓</span>
                )}
              </div>
              <div className="text-gray-300 whitespace-pre-wrap mb-4">
                {currentExercise.instructions}
              </div>

              {/* Test Results */}
              {testResults.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h3 className="text-sm font-medium text-gray-400">Progress:</h3>
                  {testResults.map((result, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center gap-2 text-sm ${
                        result.passed ? 'text-green-400' : 'text-gray-500'
                      }`}
                    >
                      <span>{result.passed ? '✓' : '○'}</span>
                      <span>{result.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Hint Button */}
              {!allTestsPassed && testResults.some(r => !r.passed) && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-sm text-yellow-500 hover:text-yellow-400"
                  >
                    {showHint ? 'Hide hint' : '💡 Need a hint?'}
                  </button>
                  {showHint && (
                    <div className="mt-2 p-3 bg-yellow-900/30 border border-yellow-700/50 rounded-lg text-yellow-200 text-sm">
                      {testResults.find(r => !r.passed)?.hint}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Terminal */}
          <div className="space-y-4">
            <TerminalSimulator
              initialFileSystem={fileSystem}
              onCommandExecuted={handleCommandExecuted}
            />

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                🔄 Reset Terminal
              </button>
              <div className="flex-1"></div>
              <span className="text-gray-500 text-sm">
                Commands run: {commandHistory.length}
              </span>
            </div>

            {/* Success Message */}
            {allTestsPassed && (
              <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎉</span>
                  <span className="text-green-400 font-medium">
                    Great job! Exercise completed!
                  </span>
                </div>
                {currentExerciseIndex < lesson.exercises.length - 1 ? (
                  <button
                    onClick={goToNextExercise}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Next Exercise →
                  </button>
                ) : (
                  <Link
                    to="/"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Back to Courses
                  </Link>
                )}
              </div>
            )}

            {/* Exercise Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-800">
              <button
                onClick={goToPrevExercise}
                disabled={currentExerciseIndex === 0}
                className="text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <span className="text-gray-500">
                Exercise {currentExerciseIndex + 1} of {lesson.exercises.length}
              </span>
              <button
                onClick={goToNextExercise}
                disabled={currentExerciseIndex === lesson.exercises.length - 1}
                className="text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
