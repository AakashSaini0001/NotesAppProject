import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import protect from '../middleware/auth.js';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.js';

const router = express.Router();

// Login route (standardized JWT payload)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt for:", req.body.email);
    try {

        const user = await User.findOne({ email }).select('+password');
        
        // no user registered with this email
        if (!user) {
            return res.status(401).json({ msg: 'Invalid credentials, This email is not registered' });
        }

        // password dont match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: 'Invalid credentials, entered wrong password' });
        }
        const token = generateToken(user._id);
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            token
        })
        // Standardized JWT payload: { user: { id: user._id } }
        // const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, {
        //     expiresIn: '1d',
        // });

        // user.password = undefined; 
        
        // res.json({ token, user: { id: user._id, name: user.name } });

    } catch (err) {
        console.log("Login Server Error:", err.message);
        res.status(500).json({ msg: 'Server error during login', error: err.message });
    }
});

// Register route (unchanged)
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if(!username|| !email || !password){
            return res.status(400).json({msg:"Please enter all fields, Bad Request 400"});
        }

        const userExists = await User.findOne({email});
        if(userExists){ 
            return res.status(400).json({msg:"User already exists with this email"});
        }

        const user = await User.create({ username, email, password});
        const token = generateToken(user._id);
        res.status(201).json({
            id : user._id,
            username: user.username,
            email: user.email,
            token
        });
    } catch (err) {
        console.log("Registration Server Error:", err.message);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Profile route
router.get("/profile", protect, async (req, res) => {
  try {
    res.json({
      user: {
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      },
    });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};


export default router;