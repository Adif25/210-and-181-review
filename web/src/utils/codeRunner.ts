export interface RunResult {
  output: string[];
  error: string | null;
}

export function runCode(code: string): RunResult {
  const output: string[] = [];
  let error: string | null = null;

  // Create a custom console.log that captures output
  const customConsole = {
    log: (...args: unknown[]) => {
      output.push(args.map(arg => {
        if (typeof arg === 'object') {
          return JSON.stringify(arg);
        }
        return String(arg);
      }).join(' '));
    },
    error: (...args: unknown[]) => {
      output.push('ERROR: ' + args.map(arg => String(arg)).join(' '));
    },
    warn: (...args: unknown[]) => {
      output.push('WARN: ' + args.map(arg => String(arg)).join(' '));
    }
  };

  try {
    // Remove TypeScript type annotations for runtime execution
    const jsCode = stripTypeAnnotations(code);
    
    // Create a function that runs the code with custom console
    const runnable = new Function('console', jsCode);
    runnable(customConsole);
  } catch (e) {
    if (e instanceof Error) {
      error = e.message;
    } else {
      error = String(e);
    }
  }

  return { output, error };
}

function stripTypeAnnotations(code: string): string {
  // Simple TypeScript to JavaScript conversion
  // This handles common cases - for production, use proper TS compiler
  
  let result = code;
  
  // Remove interface declarations
  result = result.replace(/interface\s+\w+\s*{[^}]*}/g, '');
  
  // Remove type declarations
  result = result.replace(/type\s+\w+\s*=\s*[^;]+;/g, '');
  
  // Remove type annotations from variable declarations
  // let x: string = "hello" -> let x = "hello"
  result = result.replace(/:\s*\w+(\[\])?\s*=/g, ' =');
  
  // Remove type annotations from function parameters
  // (name: string, age: number) -> (name, age)
  result = result.replace(/(\w+)\s*:\s*[\w<>\[\]|&\s,]+(?=[,)])/g, '$1');
  
  // Remove return type annotations
  // ): string { -> ) {
  // ): number => -> ) =>
  result = result.replace(/\)\s*:\s*[\w<>\[\]|&\s]+\s*(?=[{=])/g, ') ');
  
  // Remove generic type parameters from function calls
  // func<number>(x) -> func(x)
  result = result.replace(/(\w+)<[\w<>\[\]|&\s,]+>\(/g, '$1(');
  
  // Remove access modifiers
  result = result.replace(/\b(public|private|protected)\s+/g, '');
  
  // Remove readonly modifier
  result = result.replace(/\breadonly\s+/g, '');
  
  return result;
}
