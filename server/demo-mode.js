// Demo mode - In-memory storage for college project demo
let users = [];
let analyses = [];

export const demoStorage = {
  // User operations
  findUser: (email) => users.find(u => u.email === email),
  
  createUser: (userData) => {
    const user = {
      _id: Date.now().toString(),
      ...userData,
      createdAt: new Date()
    };
    users.push(user);
    return user;
  },

  // Analysis operations
  createAnalysis: (analysisData) => {
    const analysis = {
      _id: Date.now().toString(),
      ...analysisData,
      createdAt: new Date()
    };
    analyses.push(analysis);
    return analysis;
  },

  getUserAnalyses: (userId) => {
    return analyses.filter(a => a.userId === userId).slice(-10);
  },

  getAnalysisStats: (userId) => {
    const userAnalyses = analyses.filter(a => a.userId === userId);
    return {
      totalAnalyses: userAnalyses.length,
      totalIssues: userAnalyses.reduce((sum, a) => sum + (a.issues?.length || 0), 0),
      avgComplexity: userAnalyses.length > 0 
        ? Math.round(userAnalyses.reduce((sum, a) => sum + (a.metrics?.complexity || 0), 0) / userAnalyses.length)
        : 0,
      avgMaintainability: userAnalyses.length > 0
        ? Math.round(userAnalyses.reduce((sum, a) => sum + (a.metrics?.maintainability || 0), 0) / userAnalyses.length)
        : 0
    };
  },

  // Clear data (for testing)
  clearAll: () => {
    users = [];
    analyses = [];
  }
};
