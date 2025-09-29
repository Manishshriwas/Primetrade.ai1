import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log('Registration attempt:', { name, email, password: '***' });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: "User already exists with this email" });
    }

    console.log('Hashing password...');
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Password hashed successfully');
    
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    console.log('User saved to database:', email);
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    const { password: _, ...userResponse } = user.toObject();
    res.status(201).json({ 
      message: "User created successfully", 
      user: userResponse,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login attempt:', { email, password: '***' });
    
    const user = await User.findOne({ email });
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('No user found with email:', email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log('Comparing passwords...');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('Password comparison failed');
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log('Login successful for:', email);
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    const { password: _, ...userResponse } = user.toObject();
    res.status(200).json({ 
      message: "Login successful", 
      user: userResponse,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get current user profile (protected route)
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    res.status(200).json({ 
      message: "Profile retrieved successfully",
      user: req.user
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Logout route (client-side token removal, but we can blacklist tokens if needed)
router.post('/logout', authMiddleware, async (req, res) => {
  try {
    // In a more secure implementation, you could maintain a token blacklist
    res.status(200).json({ 
      message: "Logged out successfully"
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Verify token route
router.get('/verify', authMiddleware, async (req, res) => {
  try {
    res.status(200).json({ 
      message: "Token is valid",
      user: req.user
    });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Test route to check all users (for debugging - remove in production)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude passwords
    res.json({ users, count: users.length });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
 