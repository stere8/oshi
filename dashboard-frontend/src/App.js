import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Lessons from './pages/Lessons';
import Calendar from './pages/Calendar';
import Stats from './pages/Stats';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
