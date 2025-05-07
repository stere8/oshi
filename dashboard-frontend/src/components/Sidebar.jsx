import { Home, BookOpen, CalendarDays, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">My Dashboard</div>
      <nav className="mt-6 flex-1">
        <ul>
          <li className="p-4 hover:bg-gray-800">
            <Link to="/" className="flex items-center gap-2"><Home />Dashboard</Link>
          </li>
          <li className="p-4 hover:bg-gray-800">
            <Link to="/lessons" className="flex items-center gap-2"><BookOpen />Lessons</Link>
          </li>
          <li className="p-4 hover:bg-gray-800">
            <Link to="/calendar" className="flex items-center gap-2"><CalendarDays />Calendar</Link>
          </li>
          <li className="p-4 hover:bg-gray-800">
            <Link to="/stats" className="flex items-center gap-2"><BarChart2 />Stats</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
  

export default Sidebar;
