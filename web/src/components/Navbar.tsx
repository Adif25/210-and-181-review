import { Link, useLocation } from 'react-router-dom';
import { loadProgress } from '../utils/progressStore';
import { lessons } from '../lessons/lessonData';

export default function Navbar() {
  const location = useLocation();
  const progress = loadProgress();
  const totalExercises = lessons.reduce((sum, l) => sum + l.exercises.length, 0);
  const completedCount = progress.completedExercises.length;

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">📘</span>
            <span className="font-bold text-xl text-white">TypeScript Course</span>
          </Link>
          
          <div className="flex items-center gap-6">
            {location.pathname !== '/' && (
              <Link 
                to="/" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                ← All Lessons
              </Link>
            )}
            <div className="flex items-center gap-2 text-sm">
              <div className="w-32 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedCount / totalExercises) * 100}%` }}
                />
              </div>
              <span className="text-gray-400">
                {completedCount}/{totalExercises}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
