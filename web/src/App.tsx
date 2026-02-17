import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import LinuxLesson from './pages/LinuxLesson';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lesson/:lessonId" element={<Lesson />} />
        <Route path="/linux/:lessonId" element={<LinuxLesson />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
