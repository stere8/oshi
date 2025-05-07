import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LessonDetail from './pages/LessonDetail';
import Lessons from './pages/Lessons';
import Calendar from './pages/Calendar';
import Stats from './pages/Stats';

function App() {
  return (
    <Router>
      <div>
        <Sidebar />
        <div className="main">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/lessons/:id" element={<LessonDetail />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
