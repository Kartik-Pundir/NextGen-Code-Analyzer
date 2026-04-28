import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { demoStorage } from '../demo-mode.js';

const router = express.Router();
const DEMO_MODE = !process.env.MONGODB_URI || process.env.MONGODB_URI.includes('localhost');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (DEMO_MODE) {
      // Demo mode - in-memory storage
      const existingUser = demoStorage.findUser(email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = demoStorage.createUser({ name, email, password: hashedPassword });
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'demo-secret', { expiresIn: '7d' });
      
      return res.status(201).json({ token, user: { id: user._id, name, email } });
    }

    // MongoDB mode
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name, email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (DEMO_MODE) {
      // Demo mode - in-memory storage
      const user = demoStorage.findUser(email);
      
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'demo-secret', { expiresIn: '7d' });
      return res.json({ token, user: { id: user._id, name: user.name, email } });
    }

    // MongoDB mode
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
