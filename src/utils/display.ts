const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
  
  bgGreen: "\x1b[42m",
  bgRed: "\x1b[41m",
  bgBlue: "\x1b[44m",
  bgYellow: "\x1b[43m",
};

export function title(text: string): void {
  console.log("\n" + colors.bright + colors.cyan + "═".repeat(60) + colors.reset);
  console.log(colors.bright + colors.cyan + "  " + text + colors.reset);
  console.log(colors.bright + colors.cyan + "═".repeat(60) + colors.reset + "\n");
}

export function section(text: string): void {
  console.log("\n" + colors.bright + colors.yellow + "▶ " + text + colors.reset);
  console.log(colors.dim + "─".repeat(40) + colors.reset);
}

export function explain(text: string): void {
  console.log(colors.reset + text);
}

export function code(code: string): void {
  console.log(colors.dim + "┌" + "─".repeat(58) + "┐" + colors.reset);
  const lines = code.split("\n");
  for (const line of lines) {
    console.log(colors.dim + "│ " + colors.green + line.padEnd(56) + colors.dim + " │" + colors.reset);
  }
  console.log(colors.dim + "└" + "─".repeat(58) + "┘" + colors.reset);
}

export function output(label: string, value: any): void {
  console.log(colors.magenta + "  → " + label + ": " + colors.bright + value + colors.reset);
}

export function success(text: string): void {
  console.log("\n" + colors.bgGreen + colors.bright + " ✓ " + colors.reset + colors.green + " " + text + colors.reset);
}

export function error(text: string): void {
  console.log("\n" + colors.bgRed + colors.bright + " ✗ " + colors.reset + colors.red + " " + text + colors.reset);
}

export function hint(text: string): void {
  console.log(colors.dim + "  💡 " + text + colors.reset);
}

export function divider(): void {
  console.log("\n" + colors.dim + "─".repeat(60) + colors.reset + "\n");
}

export function banner(): void {
  console.clear();
  console.log(colors.cyan + `
  ╔════════════════════════════════════════════════════════════╗
  ║                                                            ║
  ║   ████████╗██╗   ██╗██████╗ ███████╗███████╗ ██████╗██████╗║
  ║   ╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝██╔════╝██╔══██╝
  ║      ██║    ╚████╔╝ ██████╔╝█████╗  ███████╗██║     ██████╔╝
  ║      ██║     ╚██╔╝  ██╔═══╝ ██╔══╝  ╚════██║██║     ██╔══██╗
  ║      ██║      ██║   ██║     ███████╗███████║╚██████╗██║  ██║
  ║      ╚═╝      ╚═╝   ╚═╝     ╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝
  ║                                                            ║
  ║              Interactive TypeScript Course                 ║
  ║                   Learn by Doing!                          ║
  ╚════════════════════════════════════════════════════════════╝
  ` + colors.reset);
}

export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
