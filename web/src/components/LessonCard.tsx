import { Link } from 'react-router-dom';
import type { Lesson } from '../lessons/lessonData';
import { getLessonProgress } from '../utils/progressStore';

interface LessonCardProps {
  lesson: Lesson;
}

export default function LessonCard({ lesson }: LessonCardProps) {
  const progress = getLessonProgress(lesson.id, lesson.exercises.length);
  const isComplete = progress.completed === progress.total;

  return (
    <Link
      to={`/lesson/${lesson.id}`}
      className="block bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all hover:scale-[1.02] hover:shadow-xl border border-gray-700 hover:border-blue-500"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg text-lg font-bold">
            {lesson.id}
          </span>
          <h3 className="text-xl font-semibold text-white">{lesson.title}</h3>
        </div>
        {isComplete && (
          <span className="text-green-400 text-xl">✓</span>
        )}
      </div>
      
      <p className="text-gray-400 mb-4">{lesson.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {lesson.exercises.length} exercises
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 bg-gray-700 rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full transition-all ${
                isComplete ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${(progress.completed / progress.total) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-500">
            {progress.completed}/{progress.total}
          </span>
        </div>
      </div>
    </Link>
  );
}
