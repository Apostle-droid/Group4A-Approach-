const express = require('express');
const jwt = require('jsonwebtoken');
const user = require('./models/User');
const router = express.Router();

// Middleware to verify JWT token and check user in Mongodb
const authenticateToken = async (req, res, next) => {
    try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json({error: 'Access denied, token missing'});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({error: 'Invalid token'});
        req.user = user;
        next();
    });

    const foundUser = await user.findById(req.user.id).select('-password');

    if(!foundUser) {
        return res.status(401).json({ error: 'User not found'});
    }

    if(!user.isActive === false) {
        return res.status(401).json({ error: 'Account deactivated'});
    }

    req.user = user;
    next();

    } catch (err) {
        return res.status(403).json({ error: 'Invalid token'});
    }
    };

module.exports = { protect: authenticateToken, router };
