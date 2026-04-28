import express from 'express';
import Analysis from '../models/Analysis.js';
import { authMiddleware } from '../middleware/auth.js';
import { demoStorage } from '../demo-mode.js';

const router = express.Router();
const DEMO_MODE = !process.env.MONGODB_URI || process.env.MONGODB_URI.includes('localhost');

router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    if (DEMO_MODE) {
      // Demo mode - in-memory storage
      const analyses = demoStorage.getUserAnalyses(req.userId);
      const demoStats = demoStorage.getAnalysisStats(req.userId);

      const stats = {
        total: demoStats.totalAnalyses,
        totalIssues: demoStats.totalIssues,
        cleanFiles: analyses.filter(a => a.issues?.length === 0).length,
        avgComplexity: demoStats.avgComplexity,
        avgMaintainability: demoStats.avgMaintainability,
        recentAnalyses: analyses.slice(0, 5)
      };

      return res.json(stats);
    }

    // MongoDB mode
    const analyses = await Analysis.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .select('-code');

    const stats = {
      total: analyses.length,
      totalIssues: analyses.reduce((sum, a) => sum + a.issues.length, 0),
      cleanFiles: analyses.filter(a => a.issues.length === 0).length,
      avgComplexity: analyses.length > 0
        ? Math.round(analyses.reduce((sum, a) => sum + a.metrics.complexity, 0) / analyses.length)
        : 0,
      avgMaintainability: analyses.length > 0
        ? Math.round(analyses.reduce((sum, a) => sum + a.metrics.maintainability, 0) / analyses.length)
        : 0,
      recentAnalyses: analyses.slice(0, 5)
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
