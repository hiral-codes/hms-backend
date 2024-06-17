// AuthController.js
const dotenv = require("dotenv")
dotenv.config();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Common registration function
const registerUser = async (req, res, role) => {
    const { name, email, password, branch } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            branch,
            isApproved: role === 'student' || role === 'principal'
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Check Login 
exports.check = async (req, res) => {
    try {
        // Extract token from request headers or other sources
        const token = req.header('Authorization');
        // Check if token exists
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded._id;
        // Find the user corresponding to the token
        const user = await User.findById(userId);
        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // If all checks pass, return user data
        res.json(user);
    } catch (err) {
        // Handle errors
        res.status(401).json({ error: 'Token is not valid' });
    }
};



// Student registration
exports.register = (req, res) => registerUser(req, res, 'student');

// Warden registration
exports.registerWarden = (req, res) => registerUser(req, res, 'warden');

// Class Coordinator registration
exports.registerCoordinator = (req, res) => registerUser(req, res, 'class_coordinator');

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// User logout
exports.logout = async (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
};
