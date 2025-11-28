const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User'); // import the User model

const app = express();
app.use(express.json());

// Debug: check if MONGO_URI is loaded
console.log("🔍 MONGO_URI from .env:", process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Simple route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Test route to add a user
app.post('/add-user', async (req, res) => {
  try {
    const user = new User(req.body); // create new user from request body
    await user.save();               // save to MongoDB
    res.json({ message: 'User saved successfully', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));