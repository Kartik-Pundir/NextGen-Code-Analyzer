import express from 'express';
import Analysis from '../models/Analysis.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
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
