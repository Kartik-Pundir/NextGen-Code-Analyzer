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
    <div className="min-h-screen bg-gradient-to-br from-darker via-dark to-primary/10">
      <Navbar setToken={setToken} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome to Your Dashboard
          </h1>
          <p className="text-gray-400">Analyze, optimize, and improve your code quality with AI-powered insights</p>
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
              <Link to="/analyzer" className="card p-8 hover:border-primary transition-all duration-300 group cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/20 p-4 rounded-lg group-hover:bg-primary/30 transition-all group-hover:scale-110 duration-300">
                    <FiCode className="text-3xl text-primary" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Analyze Code</h2>
                <p className="text-gray-400">Upload your code and get instant AI-powered analysis with optimization suggestions</p>
              </Link>

              <Link to="/history" className="card p-8 hover:border-secondary transition-all duration-300 group cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="bg-secondary/20 p-4 rounded-lg group-hover:bg-secondary/30 transition-all group-hover:scale-110 duration-300">
                    <FiClock className="text-3xl text-secondary" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Analysis History</h2>
                <p className="text-gray-400">View your past code analyses and track improvements over time</p>
              </Link>
            </div>

            {recentAnalyses.length > 0 && (
              <div className="card p-6">
                <h2 className="text-2xl font-bold mb-6">Recent Analyses</h2>
                <div className="space-y-4">
                  {recentAnalyses.map((analysis) => (
                    <div key={analysis._id} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-750 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{analysis.fileName}</h3>
                          <p className="text-sm text-gray-400">
                            <FiClock className="inline mr-1" />
                            {formatDate(analysis.createdAt)}
                          </p>
                        </div>
                        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                          {analysis.language}
                        </span>
                      </div>
                      <div className="flex space-x-4 text-sm">
                        <span className="text-gray-400">
                          Complexity: <span className="text-primary font-semibold">{analysis.metrics.complexity}</span>
                        </span>
                        <span className="text-gray-400">
                          Issues: <span className="text-yellow-500 font-semibold">{analysis.issues.length}</span>
                        </span>
                        <span className="text-gray-400">
                          Lines: <span className="text-blue-500 font-semibold">{analysis.metrics.linesOfCode}</span>
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
