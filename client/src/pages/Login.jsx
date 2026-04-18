import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiCode, FiMail, FiLock } from 'react-icons/fi';

export default function Login({ setToken }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/login', formData);
      setToken(data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-600/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="glass-card p-10 w-full max-w-md relative z-10 hover:shadow-glow-lg transition-all duration-500">
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl blur-xl opacity-50 animate-pulse-slow"></div>
            <FiCode className="text-6xl gradient-text relative z-10" />
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-2">
            NextGen Analyzer
          </h1>
          <p className="text-gray-400 text-sm">AI-Powered Code Analysis</p>
        </div>
        
        <h2 className="text-2xl font-semibold mb-6 text-center">Welcome Back</h2>
        
        {error && (
          <div className="glass-card border-red-500/50 bg-red-500/10 p-4 rounded-xl mb-6 flex items-center">
            <FiMail className="text-red-400 mr-3" />
            <span className="text-red-400 text-sm">{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
            <div className="relative group">
              <FiMail className="absolute left-4 top-4 text-gray-400 group-focus-within:text-primary-400 transition-colors" />
              <input
                type="email"
                className="input-field pl-12"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
            <div className="relative group">
              <FiLock className="absolute left-4 top-4 text-gray-400 group-focus-within:text-primary-400 transition-colors" />
              <input
                type="password"
                className="input-field pl-12"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>
          
          <button type="submit" className="btn-primary w-full mt-6 animated-gradient">
            <span className="relative z-10">Sign In</span>
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="gradient-text font-semibold hover:underline">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
