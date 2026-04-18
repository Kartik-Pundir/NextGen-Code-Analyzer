import express from 'express';
import Analysis from '../models/Analysis.js';
import { analyzeCode } from '../services/astAnalyzer.js';
import { getAISuggestions } from '../services/aiService.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/analyze', authMiddleware, async (req, res) => {
  try {
    const { code, fileName, language } = req.body;
    
    // AST-based analysis
    const astResults = analyzeCode(code, language);
    
    // AI-based suggestions
    const aiSuggestions = await getAISuggestions(code, language, astResults);
    
    const analysis = new Analysis({
      userId: req.userId,
      fileName,
      language,
      code,
      issues: astResults.issues,
      suggestions: aiSuggestions,
      metrics: astResults.metrics
    });
    
    await analysis.save();
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: 'Analysis failed', error: error.message });
  }
});

router.get('/history', authMiddleware, async (req, res) => {
  try {
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
