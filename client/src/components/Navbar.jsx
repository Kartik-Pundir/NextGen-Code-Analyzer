import { Link, useLocation } from 'react-router-dom';
import { FiCode, FiLogOut, FiHome, FiActivity, FiClock } from 'react-icons/fi';

export default function Navbar({ setToken }) {
  const location = useLocation();
  
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-dark/50 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center group">
            <FiCode className="text-3xl text-primary mr-2 group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              NextGen Analyzer
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/dashboard')
                  ? 'bg-primary/20 text-primary'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <FiHome />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/analyzer"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/analyzer')
                  ? 'bg-secondary/20 text-secondary'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <FiActivity />
              <span>Analyzer</span>
            </Link>

            <Link
              to="/history"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/history')
                  ? 'bg-primary/20 text-primary'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <FiClock />
              <span>History</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
