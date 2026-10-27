import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes - agar tumhare routes require wale hain to unko bhi import karna hoga
// Example: import authRoutes from './routes/auth.js';

app.get('/', (req, res) => {
  res.send('GMB CRM Backend Running');
});

const PORT = process.env.PORT || 10000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Mongo Connection Error:', err);
  });