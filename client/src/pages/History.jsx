import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiClock, FiAlertCircle, FiDownload } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

export default function History({ token, setToken }) {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data } = await axios.get('/api/analysis/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnalyses(data);
    } catch (error) {
      console.error('Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredAnalyses = analyses.filter(analysis => {
    if (filter === 'all') return true;
    if (filter === 'issues') return analysis.issues.length > 0;
    if (filter === 'clean') return analysis.issues.length === 0;
    return true;
  });

  const exportToJSON = () => {
    const dataStr = JSON.stringify(analyses, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'analysis-history.json';
    link.click();
  };

  return (
    <div className="min-h-screen bg-dark-950 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <Navbar setToken={setToken} />

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold mb-3 gradient-text">Analysis History</h1>
            <p className="text-gray-400 text-lg">Track your code quality improvements over time</p>
          </div>
          {analyses.length > 0 && (
            <button
              onClick={exportToJSON}
              className="btn-secondary flex items-center glow-effect"
            >
              <FiDownload className="mr-2" /> Export
            </button>
          )}
        </div>

        {!loading && analyses.length > 0 && (
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-glow'
                  : 'glass-card text-gray-400 hover:bg-white/10'
              }`}
            >
              All ({analyses.length})
            </button>
            <button
              onClick={() => setFilter('issues')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                filter === 'issues'
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-glow'
                  : 'glass-card text-gray-400 hover:bg-white/10'
              }`}
            >
              With Issues ({analyses.filter(a => a.issues.length > 0).length})
            </button>
            <button
              onClick={() => setFilter('clean')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                filter === 'clean'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-glow'
                  : 'glass-card text-gray-400 hover:bg-white/10'
              }`}
            >
              Clean Code ({analyses.filter(a => a.issues.length === 0).length})
            </button>
          </div>
        )}

        {loading ? (
          <LoadingSpinner text="Loading history..." />
        ) : filteredAnalyses.length === 0 ? (
          <EmptyState
            icon={() => <span className="text-6xl">📊</span>}
            title={filter === 'all' ? 'No Analyses Yet' : 'No Results Found'}
            description={
              filter === 'all'
                ? 'Start analyzing code to see your history here'
                : 'Try changing the filter to see more results'
            }
            action={
              filter === 'all' ? (
                <button onClick={() => navigate('/analyzer')} className="btn-primary">
                  Analyze Code
                </button>
              ) : (
                <button onClick={() => setFilter('all')} className="btn-secondary">
                  Show All
                </button>
              )
            }
          />
        ) : (
          <div className="space-y-4">
            {filteredAnalyses.map((analysis) => (
              <div key={analysis._id} className="card p-6 hover:border-primary/50 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{analysis.fileName}</h3>
                    <p className="text-sm text-gray-400">
                      <FiClock className="inline mr-1" />
                      {formatDate(analysis.createdAt)}
                    </p>
                  </div>
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                    {analysis.language}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="text-lg font-bold text-primary">{analysis.metrics.complexity}</div>
                    <div className="text-xs text-gray-400">Complexity</div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="text-lg font-bold text-green-500">{analysis.metrics.maintainability}</div>
                    <div className="text-xs text-gray-400">Maintainability</div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="text-lg font-bold text-yellow-500">{analysis.issues.length}</div>
                    <div className="text-xs text-gray-400">Issues</div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="text-lg font-bold text-blue-500">{analysis.metrics.linesOfCode}</div>
                    <div className="text-xs text-gray-400">Lines</div>
                  </div>
                </div>

                {analysis.issues.length > 0 ? (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                    <div className="flex items-center text-yellow-500 text-sm">
                      <FiAlertCircle className="mr-2" />
                      <span>{analysis.issues.length} issue(s) detected</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <div className="flex items-center text-green-500 text-sm">
                      ✨ <span className="ml-2">Clean code - no issues found!</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
