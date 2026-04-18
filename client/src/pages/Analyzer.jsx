import { useState } from 'react';
import axios from 'axios';
import { FiUpload, FiLoader, FiAlertCircle } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import CodeEditor from '../components/CodeEditor';
import MetricsCard from '../components/MetricsCard';
import IssueCard from '../components/IssueCard';

export default function Analyzer({ token, setToken }) {
  const [code, setCode] = useState('');
  const [fileName, setFileName] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError('Please enter some code to analyze');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post(
        '/api/analysis/analyze',
        { code, fileName: fileName || 'untitled.js', language },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSample = () => {
    const samples = {
      javascript: {
        code: `function calculateTotal(items, tax, discount, shipping, coupon, membership) {
  let total = 0;
  
  if (items && items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].price) {
        if (items[i].quantity) {
          total += items[i].price * items[i].quantity;
        }
      }
    }
  }
  
  if (tax) {
    total = total + (total * tax);
  }
  
  if (discount) {
    total = total - discount;
  }
  
  return total;
}`,
        fileName: 'sample.js'
      },
      python: {
        code: `def calculate_total(items, tax, discount, shipping, coupon, membership):
    total = 0
    
    if items and len(items) > 0:
        for i in range(len(items)):
            if items[i]['price']:
                if items[i]['quantity']:
                    total += items[i]['price'] * items[i]['quantity']
    
    if tax:
        total = total + (total * tax)
    
    if discount:
        total = total - discount
    
    return total`,
        fileName: 'sample.py'
      },
      java: {
        code: `public class Calculator {
    public double calculateTotal(Item[] items, double tax, double discount, 
                                 double shipping, double coupon, boolean membership) {
        double total = 0;
        
        if (items != null && items.length > 0) {
            for (int i = 0; i < items.length; i++) {
                if (items[i].getPrice() > 0) {
                    if (items[i].getQuantity() > 0) {
                        total += items[i].getPrice() * items[i].getQuantity();
                    }
                }
            }
        }
        
        if (tax > 0) {
            total = total + (total * tax);
        }
        
        if (discount > 0) {
            total = total - discount;
        }
        
        return total;
    }
}`,
        fileName: 'Calculator.java'
      },
      c: {
        code: `#include <stdio.h>

double calculate_total(double prices[], int quantities[], int n, 
                      double tax, double discount) {
    double total = 0;
    int i;
    
    if (prices != NULL && n > 0) {
        for (i = 0; i < n; i++) {
            if (prices[i] > 0) {
                if (quantities[i] > 0) {
                    total += prices[i] * quantities[i];
                }
            }
        }
    }
    
    if (tax > 0) {
        total = total + (total * tax);
    }
    
    if (discount > 0) {
        total = total - discount;
    }
    
    return total;
}`,
        fileName: 'calculator.c'
      },
      cpp: {
        code: `#include <vector>

class Calculator {
public:
    double calculateTotal(std::vector<double> prices, 
                         std::vector<int> quantities,
                         double tax, double discount, 
                         double shipping, double coupon) {
        double total = 0;
        
        if (!prices.empty() && prices.size() > 0) {
            for (size_t i = 0; i < prices.size(); i++) {
                if (prices[i] > 0) {
                    if (i < quantities.size() && quantities[i] > 0) {
                        total += prices[i] * quantities[i];
                    }
                }
            }
        }
        
        if (tax > 0) {
            total = total + (total * tax);
        }
        
        if (discount > 0) {
            total = total - discount;
        }
        
        return total;
    }
};`,
        fileName: 'Calculator.cpp'
      }
    };

    const sample = samples[language] || samples.javascript;
    setCode(sample.code);
    setFileName(sample.fileName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-darker via-dark to-secondary/10">
      <Navbar setToken={setToken} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Code Analyzer</h1>
          <p className="text-gray-400">Paste your code below and get instant AI-powered analysis</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6 flex items-center">
            <FiAlertCircle className="mr-2" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Input Code</h2>
              <button
                onClick={handleLoadSample}
                className="text-sm text-primary hover:text-secondary transition-colors"
              >
                Load Sample
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">File Name</label>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-secondary"
                placeholder="example.js"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Language</label>
              <select
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-secondary"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="javascript">JavaScript</option>
                <option value="jsx">React JSX</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Code</label>
              <CodeEditor
                value={code}
                onChange={setCode}
                placeholder="Paste your code here..."
                language={language}
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading || !code.trim()}
              className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin mr-2" /> Analyzing...
                </>
              ) : (
                <>
                  <FiUpload className="mr-2" /> Analyze Code
                </>
              )}
            </button>
          </div>

          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
            
            {!result ? (
              <div className="flex items-center justify-center h-96 text-gray-500">
                <div className="text-center">
                  <div className="text-6xl mb-4 opacity-50">📊</div>
                  <p>Submit code to see analysis results</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Code Metrics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <MetricsCard
                      icon={() => <span>🔄</span>}
                      value={result.metrics.complexity}
                      label="Complexity"
                      color="primary"
                    />
                    <MetricsCard
                      icon={() => <span>✅</span>}
                      value={result.metrics.maintainability}
                      label="Maintainability"
                      color="success"
                    />
                    <MetricsCard
                      icon={() => <span>📝</span>}
                      value={result.metrics.linesOfCode}
                      label="Lines"
                      color="info"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Issues Found ({result.issues.length})</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {result.issues.length === 0 ? (
                      <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg text-center">
                        <p className="text-green-500">✨ No issues found! Your code looks great!</p>
                      </div>
                    ) : (
                      result.issues.map((issue, idx) => (
                        <IssueCard key={idx} issue={issue} />
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">AI Suggestions</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {result.suggestions.map((suggestion, idx) => (
                      <div key={idx} className="bg-gray-800 p-3 rounded-lg hover:bg-gray-750 transition-all">
                        <p className="text-sm text-gray-300">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
