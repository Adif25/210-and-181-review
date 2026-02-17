interface TestResult {
  name: string;
  passed: boolean;
  hint: string;
}

interface TestResultsProps {
  results: TestResult[];
  output: string[];
  error: string | null;
}

export default function TestResults({ results, output, error }: TestResultsProps) {
  const allPassed = results.length > 0 && results.every(r => r.passed);

  return (
    <div className="space-y-4">
      {/* Console Output */}
      <div className="bg-gray-900 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-400 mb-2">Console Output</h3>
        <div className="font-mono text-sm min-h-[60px] max-h-[150px] overflow-y-auto">
          {output.length > 0 ? (
            output.map((line, i) => (
              <div key={i} className="text-green-400">{line}</div>
            ))
          ) : (
            <div className="text-gray-500 italic">No output yet. Run your code to see results.</div>
          )}
          {error && (
            <div className="text-red-400 mt-2">
              <span className="font-bold">Error: </span>{error}
            </div>
          )}
        </div>
      </div>

      {/* Test Results */}
      {results.length > 0 && (
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-400">Test Results</h3>
            {allPassed && (
              <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                All tests passed!
              </span>
            )}
          </div>
          <div className="space-y-2">
            {results.map((result, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-2 rounded ${
                  result.passed ? 'bg-green-900/30' : 'bg-red-900/30'
                }`}
              >
                <span className="text-lg">
                  {result.passed ? '✓' : '✗'}
                </span>
                <div className="flex-1">
                  <div className={result.passed ? 'text-green-400' : 'text-red-400'}>
                    {result.name}
                  </div>
                  {!result.passed && (
                    <div className="text-sm text-gray-400 mt-1">
                      💡 Hint: {result.hint}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
