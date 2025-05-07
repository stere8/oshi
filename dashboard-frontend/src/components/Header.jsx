import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white shadow p-4 flex flex-wrap items-center justify-between">
      <div className="text-lg font-bold">Oreste Dashboard</div>
      <nav className="flex space-x-4 mt-2 md:mt-0">
        <Link to="/" className="hover:text-blue-300">Dashboard</Link>
        <Link to="/lessons" className="hover:text-blue-300">Lessons</Link>
        <Link to="/calendar" className="hover:text-blue-300">Calendar</Link>
        <Link to="/stats" className="hover:text-blue-300">Stats</Link>
      </nav>
    </header>
  );
};

export default Header;
