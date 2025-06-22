const mongoose = require('mongoose');

const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/habitTracker'
    try {
       await mongoose.connect(MONGO_URI);
        console.log('mongodb connected');
    } catch (error) {
        console.log('error connecting to mongoDb: ', error);
        process.exit(1);   
    }
}
module.exports = connectDB;
