const mongoose = require('mongoose');
require('dotenv').config();

// const mongoURL=process.env.MONGODB_URL_LOCAL
const mongoURL = process.env.MONGODB_URL;

if (!mongoURL) {
    throw new Error('MONGODB_URL is not defined');
}


mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));


const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB connection successful');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db;
