import * as fs from "fs";
import * as path from "path";

const PROGRESS_FILE = path.join(__dirname, "../../.progress.json");

interface Progress {
  completedLessons: number[];
  quizScores: { [lesson: number]: number };
  lastLesson: number;
}

function getDefaultProgress(): Progress {
  return {
    completedLessons: [],
    quizScores: {},
    lastLesson: 0,
  };
}

export function loadProgress(): Progress {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      const data = fs.readFileSync(PROGRESS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    // Ignore errors, return default
  }
  return getDefaultProgress();
}

export function saveProgress(progress: Progress): void {
  try {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
  } catch {
    // Ignore save errors
  }
}

export function markLessonComplete(lessonNum: number, quizScore?: number): void {
  const progress = loadProgress();
  if (!progress.completedLessons.includes(lessonNum)) {
    progress.completedLessons.push(lessonNum);
  }
  if (quizScore !== undefined) {
    progress.quizScores[lessonNum] = quizScore;
  }
  progress.lastLesson = lessonNum;
  saveProgress(progress);
}

export function isLessonComplete(lessonNum: number): boolean {
  const progress = loadProgress();
  return progress.completedLessons.includes(lessonNum);
}

export function getNextLesson(): number {
  const progress = loadProgress();
  return progress.lastLesson + 1;
}

export function resetProgress(): void {
  saveProgress(getDefaultProgress());
}
