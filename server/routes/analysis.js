import express from 'express';
import Analysis from '../models/Analysis.js';
import { analyzeCode } from '../services/astAnalyzer.js';
import { getAISuggestions } from '../services/aiService.js';
import { authMiddleware } from '../middleware/auth.js';
import { demoStorage } from '../demo-mode.js';

const router = express.Router();
const DEMO_MODE = !process.env.MONGODB_URI || process.env.MONGODB_URI.includes('localhost');

router.post('/analyze', authMiddleware, async (req, res) => {
  try {
    const { code, fileName, language } = req.body;
    
    // AST-based analysis
    const astResults = analyzeCode(code, language);
    
    // AI-based suggestions
    const aiSuggestions = await getAISuggestions(code, language, astResults);
    
    const analysisData = {
      userId: req.userId,
      fileName,
      language,
      code,
      issues: astResults.issues,
      suggestions: aiSuggestions,
      metrics: astResults.metrics
    };

    if (DEMO_MODE) {
      // Demo mode - in-memory storage
      const analysis = demoStorage.createAnalysis(analysisData);
      return res.json(analysis);
    }

    // MongoDB mode
    const analysis = new Analysis(analysisData);
    await analysis.save();
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: 'Analysis failed', error: error.message });
  }
});

router.get('/history', authMiddleware, async (req, res) => {
  try {
    if (DEMO_MODE) {
      // Demo mode - in-memory storage
      const analyses = demoStorage.getUserAnalyses(req.userId);
      return res.json(analyses);
    }

    // MongoDB mode
    const analyses = await Analysis.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(20)
      .select('-code');
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
