const express = require('express');
const {isAuthenticated} = require("../middlewares/auth");
const {USERS} = require("../utils/dummyData");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({message: 'SERVER is Live'});
})

router.get('/profile', isAuthenticated, (req, res) => {
  res.json({ message: 'Welcome to your profile', user: req.session.user });
});

router.get('/users', (req, res) => {
  res.json({
    message: "All Users",
    users: USERS
  })
})

module.exports = router;
