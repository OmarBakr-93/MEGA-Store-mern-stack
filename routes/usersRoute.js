const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  newUser = new User({ 
    name: req.body.name,
    email: req.body.email, 
    password: hashedPassword
  });
  await newUser.save();
  let token = jwt.sign({ email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1w' });
  res.status(201).json({ message: 'User registered successfully', newUser, token });
});


// Signin a user
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  let user = await User.findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    let token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1w' });
    return res.status(200).json({ message: 'User signed in successfully', user, token });
  }
  else {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
}
);

// Get user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(200).json({ user });
});



module.exports = router;