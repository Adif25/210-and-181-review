import { Link } from 'react-router-dom';
import { lessons } from '../lessons/lessonData';
import { linuxLessons } from '../lessons/linuxLessonData';
import LessonCard from '../components/LessonCard';
import { resetProgress, isExerciseComplete } from '../utils/progressStore';

export default function Home() {
  // TypeScript stats
  const tsExercises = lessons.reduce((sum, l) => sum + l.exercises.length, 0);
  const tsCompleted = lessons.reduce((sum, l) => 
    sum + l.exercises.filter(ex => isExerciseComplete(ex.id)).length, 0);
  
  // Linux stats
  const linuxExercises = linuxLessons.reduce((sum, l) => sum + l.exercises.length, 0);
  const linuxCompleted = linuxLessons.reduce((sum, l) => 
    sum + l.exercises.filter(ex => isExerciseComplete(ex.id)).length, 0);
  
  const totalExercises = tsExercises + linuxExercises;
  const completedCount = tsCompleted + linuxCompleted;

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress?')) {
      resetProgress();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Interactive Learning Platform</h1>
          <p className="text-xl text-gray-400 mb-6">
            Master programming through hands-on exercises
          </p>
          
          {/* Progress Overview */}
          <div className="inline-flex items-center gap-4 bg-gray-800 rounded-full px-6 py-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <span className="text-lg">
                <strong className="text-blue-400">{completedCount}</strong>
                <span className="text-gray-400"> / {totalExercises} exercises completed</span>
              </span>
            </div>
            {completedCount > 0 && (
              <button
                onClick={handleReset}
                className="text-sm text-gray-500 hover:text-red-400 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Linux Course Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🐧</span>
            <div>
              <h2 className="text-2xl font-bold">Linux Terminal Fundamentals</h2>
              <p className="text-gray-400">Learn command line basics with an interactive terminal</p>
            </div>
            <div className="ml-auto text-sm text-gray-500">
              {linuxCompleted}/{linuxExercises} completed
            </div>
          </div>
          
          <div className="grid gap-4">
            {linuxLessons.map((lesson) => {
              const lessonCompleted = lesson.exercises.filter(ex => isExerciseComplete(ex.id)).length;
              const lessonTotal = lesson.exercises.length;
              const isComplete = lessonCompleted === lessonTotal;
              
              return (
                <Link
                  key={lesson.id}
                  to={`/linux/${lesson.id}`}
                  className="block bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-colors border border-gray-800 hover:border-gray-700"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{lesson.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        Lesson {lesson.id}: {lesson.title}
                        {isComplete && <span className="text-green-400">✓</span>}
                      </h3>
                      <p className="text-gray-400 text-sm">{lesson.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">
                        {lessonCompleted}/{lessonTotal} exercises
                      </div>
                      <div className="w-24 h-2 bg-gray-700 rounded-full mt-2">
                        <div 
                          className="h-full bg-green-500 rounded-full transition-all"
                          style={{ width: `${(lessonCompleted / lessonTotal) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* TypeScript Course Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📘</span>
            <div>
              <h2 className="text-2xl font-bold">TypeScript Fundamentals</h2>
              <p className="text-gray-400">Master TypeScript through coding exercises</p>
            </div>
            <div className="ml-auto text-sm text-gray-500">
              {tsCompleted}/{tsExercises} completed
            </div>
          </div>
          
          <div className="grid gap-4">
            {lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>

        {/* Completion Message */}
        {completedCount === totalExercises && totalExercises > 0 && (
          <div className="mt-12 text-center p-8 bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded-xl border border-green-500/30">
            <span className="text-4xl mb-4 block">🎉</span>
            <h2 className="text-2xl font-bold text-green-400 mb-2">
              Congratulations!
            </h2>
            <p className="text-gray-300">
              You've completed all courses! You're now ready for real-world development!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
