const STORAGE_KEY = 'typescript-course-progress';

export interface Progress {
  completedExercises: string[];  // exercise IDs like "1-1", "1-2", etc.
  currentCode: { [exerciseId: string]: string };
}

export function loadProgress(): Progress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load progress:', e);
  }
  return { completedExercises: [], currentCode: {} };
}

export function saveProgress(progress: Progress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

export function markExerciseComplete(exerciseId: string): void {
  const progress = loadProgress();
  if (!progress.completedExercises.includes(exerciseId)) {
    progress.completedExercises.push(exerciseId);
    saveProgress(progress);
  }
}

export function isExerciseComplete(exerciseId: string): boolean {
  const progress = loadProgress();
  return progress.completedExercises.includes(exerciseId);
}

export function saveCode(exerciseId: string, code: string): void {
  const progress = loadProgress();
  progress.currentCode[exerciseId] = code;
  saveProgress(progress);
}

export function loadCode(exerciseId: string): string | undefined {
  const progress = loadProgress();
  return progress.currentCode[exerciseId];
}

export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getLessonProgress(lessonId: number, totalExercises: number = 2): { completed: number; total: number } {
  const progress = loadProgress();
  const lessonExercises = progress.completedExercises.filter(id => id.startsWith(`${lessonId}-`));
  return {
    completed: lessonExercises.length,
    total: totalExercises
  };
}
