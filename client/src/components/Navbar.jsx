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
    <nav className="glass-card sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <FiCode className="text-3xl gradient-text relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="ml-3 text-xl font-bold gradient-text">
              NextGen Analyzer
            </span>
          </Link>

          <div className="flex items-center space-x-2">
            <Link
              to="/dashboard"
              className={isActive('/dashboard') ? 'nav-link-active' : 'nav-link'}
            >
              <FiHome className="inline mr-2" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/analyzer"
              className={isActive('/analyzer') ? 'nav-link-active' : 'nav-link'}
            >
              <FiActivity className="inline mr-2" />
              <span>Analyzer</span>
            </Link>

            <Link
              to="/history"
              className={isActive('/history') ? 'nav-link-active' : 'nav-link'}
            >
              <FiClock className="inline mr-2" />
              <span>History</span>
            </Link>

            <button
              onClick={handleLogout}
              className="nav-link text-red-400 hover:bg-red-500/10 hover:border-red-500/30 border border-transparent ml-2"
            >
              <FiLogOut className="inline mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
