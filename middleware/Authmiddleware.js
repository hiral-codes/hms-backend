const dotenv = require("dotenv");
dotenv.config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secretKey = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
    let token = req.header('Authorization');
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    } else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        const user = await User.findById(decoded._id); // Use the correct property name

        if (!user) {
            return res.status(401).json({ error: 'User not found, authorization denied' });
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
