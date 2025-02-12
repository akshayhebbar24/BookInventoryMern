import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { PORT, mongodbUrl } from './config.js';
import booksRoute from './routes/booksRoute.js';

dotenv.config();

const app = express();
app.use(express.json());

// CORS Configuration
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

// Basic route
app.get('/', (req, res) => {
  console.log("Received a request at '/' route");
  return res.status(200).send('Welcome to MERN STACK');
});

// Books API routes
app.use('/books', booksRoute);

// MongoDB connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || mongodbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB server');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
  }
};

// Start server
app.listen(PORT, async () => {
  await connect();
  console.log(`Server started on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
