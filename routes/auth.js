const express = require('express');
const router = express.Router();
const {USERS} = require('../utils/dummyData')
const {isAuthenticated} = require("../middlewares/auth");

// Login API
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = USERS.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.user = { id: user.id, username: user.username };
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

// Logout API
router.post('/logout', isAuthenticated, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).json({ message: 'Error logging out' });
        } else {
            res.json({ message: 'Logout successful' });
        }
    });
});

// Signup API
router.post('/signup', (req, res) => {
    const { username, password } = req.body;

    const userExists = USERS.some(u => u.username === username);

    if (userExists) {
        res.status(400).json({ message: 'Username already taken' });
    } else {
        const newUser = { id: USERS.length + 1, username, password };
        USERS.push(newUser);

        res.json({ message: 'Signup successful', user: newUser });
    }
});

module.exports = router;