import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLessonById } from '../lessons/lessonData';
import type { Exercise } from '../lessons/lessonData';
import CodeEditor from '../components/CodeEditor';
import TestResults from '../components/TestResults';
import { runCode } from '../utils/codeRunner';
import { 
  loadCode, 
  saveCode, 
  markExerciseComplete, 
  isExerciseComplete 
} from '../utils/progressStore';
import ReactMarkdown from 'react-markdown';

interface TestResult {
  name: string;
  passed: boolean;
  hint: string;
}

export default function Lesson() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const lesson = getLessonById(Number(lessonId));
  
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showSolution, setShowSolution] = useState(false);

  const currentExercise: Exercise | undefined = lesson?.exercises[currentExerciseIndex];

  // Load saved code or starter code
  useEffect(() => {
    if (currentExercise) {
      const saved = loadCode(currentExercise.id);
      setCode(saved || currentExercise.starterCode);
      setOutput([]);
      setError(null);
      setTestResults([]);
      setShowSolution(false);
    }
  }, [currentExercise?.id]);

  // Save code on change
  useEffect(() => {
    if (currentExercise && code) {
      saveCode(currentExercise.id, code);
    }
  }, [code, currentExercise?.id]);

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

  const handleRunCode = () => {
    const result = runCode(code);
    setOutput(result.output);
    setError(result.error);

    // Run tests
    const results = currentExercise.tests.map(test => ({
      name: test.name,
      passed: test.test(code, result.output),
      hint: test.hint
    }));
    setTestResults(results);

    // Check if all tests pass
    if (results.every(r => r.passed)) {
      markExerciseComplete(currentExercise.id);
    }
  };

  const handleReset = () => {
    setCode(currentExercise.starterCode);
    setOutput([]);
    setError(null);
    setTestResults([]);
  };

  const handleShowSolution = () => {
    setShowSolution(!showSolution);
    if (!showSolution) {
      setCode(currentExercise.solution);
    }
  };

  const goToNextExercise = () => {
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const goToPrevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const allTestsPassed = testResults.length > 0 && testResults.every(r => r.passed);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Lesson Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link to="/" className="text-gray-400 hover:text-white text-sm mb-2 inline-block">
              ← Back to lessons
            </Link>
            <h1 className="text-2xl font-bold">
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
                    ? 'bg-blue-600 text-white'
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
            <div className="bg-gray-900 rounded-xl p-6 prose prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  code: ({ className, children, ...props }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300" {...props}>
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
                <span className="px-2 py-1 bg-blue-600 rounded text-sm font-medium">
                  Exercise {currentExerciseIndex + 1}
                </span>
                <h2 className="text-lg font-semibold">{currentExercise.title}</h2>
                {isExerciseComplete(currentExercise.id) && (
                  <span className="text-green-400">✓</span>
                )}
              </div>
              <div className="text-gray-300 whitespace-pre-wrap">
                {currentExercise.instructions}
              </div>
            </div>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="space-y-4">
            <CodeEditor 
              value={code} 
              onChange={setCode} 
              height="300px"
            />

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleRunCode}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>▶</span> Run Code
              </button>
              <button
                onClick={handleReset}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Reset
              </button>
              <button
                onClick={handleShowSolution}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
            </div>

            {/* Test Results */}
            <TestResults 
              results={testResults} 
              output={output} 
              error={error} 
            />

            {/* Success / Navigation */}
            {allTestsPassed && (
              <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎉</span>
                  <span className="text-green-400 font-medium">
                    Great job! All tests passed!
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
                    Back to Lessons
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
