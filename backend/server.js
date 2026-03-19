const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); 

const app = express();

app.use(express.json()); 
app.use(cors());         

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tips', require('./routes/tipRoutes'));

app.get('/api/health', (req, res) => res.status(200).json({ status: 'ok' }));

const connectDB = async () => {
  try {
    const dbUri = process.env.NODE_ENV === 'test' 
      ? 'mongodb://127.0.0.1/cloudcost_test' 
      : process.env.MONGO_URI;

    await mongoose.connect(dbUri);
    if (process.env.NODE_ENV !== 'test') {
      console.log('Connected to MongoDB');
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'test') {
      console.error('Atlas Connection Error:', err.message);
      process.exit(1); 
    }
  }
};

if (process.env.NODE_ENV !== 'test') {
  connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;