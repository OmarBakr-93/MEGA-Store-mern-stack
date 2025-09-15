const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

const cors = require('cors');
app.use(cors());

const connectDB = require('./config/DB');

connectDB();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
const userRoutes = require('./routes/usersRoute');
app.use('/users', userRoutes);

const booksRoutes = require('./routes/bookRoute');
app.use('/books', booksRoutes);

const categoryRoutes = require('./routes/categoryRoute');
app.use('/categories', categoryRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});