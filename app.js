const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('dotenv').config();

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Change to true if using HTTPS
}));

app.use('/', usersRouter);
app.use('/', authRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
