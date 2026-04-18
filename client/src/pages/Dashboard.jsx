import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiCode, FiActivity, FiCheckCircle, FiAlertTriangle, FiTrendingUp, FiClock } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import MetricsCard from '../components/MetricsCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Dashboard({ setToken }) {
  const [stats, setStats] = useState({ total: 0, issues: 0, optimized: 0, avgComplexity: 0 });
  const [recentAnalyses, setRecentAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/analysis/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const total = data.length;
      const issues = data.reduce((sum, a) => sum + a.issues.length, 0);
      const optimized = data.filter(a => a.issues.length === 0).length;
      const avgComplexity = total > 0 
        ? Math.round(data.reduce((sum, a) => sum + a.metrics.complexity, 0) / total)
        : 0;
      
      setStats({ total, issues, optimized, avgComplexity });
      setRecentAnalyses(data.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-secondary-600/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <Navbar setToken={setToken} />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 gradient-text animate-pulse-slow">
            Welcome to Your Dashboard
          </h1>
          <p className="text-gray-400 text-lg">Analyze, optimize, and improve your code quality with AI-powered insights</p>
        </div>

        {loading ? (
          <LoadingSpinner text="Loading dashboard..." />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <MetricsCard
                icon={FiActivity}
                value={stats.total}
                label="Total Analyses"
                color="primary"
              />
              <MetricsCard
                icon={FiAlertTriangle}
                value={stats.issues}
                label="Issues Found"
                color="warning"
              />
              <MetricsCard
                icon={FiCheckCircle}
                value={stats.optimized}
                label="Clean Code Files"
                color="success"
              />
              <MetricsCard
                icon={FiTrendingUp}
                value={stats.avgComplexity}
                label="Avg Complexity"
                color="info"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              <Link to="/analyzer" className="glass-card-hover p-8 group cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-primary-600 to-primary-400 p-4 rounded-2xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                      <FiCode className="text-3xl text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 gradient-text">Analyze Code</h2>
                  <p className="text-gray-400">Upload your code and get instant AI-powered analysis with optimization suggestions</p>
                </div>
              </Link>

              <Link to="/history" className="glass-card-hover p-8 group cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-secondary-600 to-secondary-400 p-4 rounded-2xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                      <FiClock className="text-3xl text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 gradient-text">Analysis History</h2>
                  <p className="text-gray-400">View your past code analyses and track improvements over time</p>
                </div>
              </Link>
            </div>

            {recentAnalyses.length > 0 && (
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6 gradient-text">Recent Analyses</h2>
                <div className="space-y-4">
                  {recentAnalyses.map((analysis) => (
                    <div key={analysis._id} className="glass-card-hover p-5 group">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg text-white group-hover:gradient-text transition-all">{analysis.fileName}</h3>
                          <p className="text-sm text-gray-400 flex items-center mt-1">
                            <FiClock className="inline mr-2" />
                            {formatDate(analysis.createdAt)}
                          </p>
                        </div>
                        <span className="glass-card px-4 py-2 text-sm font-semibold gradient-text border border-primary-500/30">
                          {analysis.language}
                        </span>
                      </div>
                      <div className="flex space-x-6 text-sm">
                        <span className="text-gray-400">
                          Complexity: <span className="text-primary-400 font-bold">{analysis.metrics.complexity}</span>
                        </span>
                        <span className="text-gray-400">
                          Issues: <span className="text-yellow-400 font-bold">{analysis.issues.length}</span>
                        </span>
                        <span className="text-gray-400">
                          Lines: <span className="text-blue-400 font-bold">{analysis.metrics.linesOfCode}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
