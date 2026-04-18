import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  language: { type: String, required: true },
  code: { type: String, required: true },
  issues: [{ 
    type: { type: String },
    severity: { type: String },
    line: { type: Number },
    message: { type: String }
  }],
  suggestions: [{ type: String }],
  metrics: {
    complexity: { type: Number },
    maintainability: { type: Number },
    linesOfCode: { type: Number }
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Analysis', analysisSchema);
