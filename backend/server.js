const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./config/database'); 

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('hello world')
});
app.use((req, res) => {
    res.send('404 PAGE NOT FOUND')
});

app.listen(PORT, async () => {
    console.log(`server running on http://localhost:${PORT}`);
    connectDB();
});