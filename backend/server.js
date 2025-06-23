const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectDB = require('./config/database'); 
const authRoute = require('./routes/auth-route');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false, 
        httpOnly: true
    }
}));
app.use('/api/auth', authRoute)
app.use((req, res) => {
    res.send('404 PAGE NOT FOUND')
});

app.get('/', (req, res) => {
    res.send('Habit Tracker')
});

app.listen(PORT, async () => {
    console.log(`server running on http://localhost:${PORT}`);
    connectDB();
});