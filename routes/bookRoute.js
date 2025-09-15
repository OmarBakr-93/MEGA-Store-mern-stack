const express = require('express');
const router = express.Router();
const Book = require('../models/bookSchema');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/images/');
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.fieldname;
    cb(null, filename);
  }
});
const upload = multer({ storage: storage });


// Create a new book
router.post('/', upload.single('coverImage') ,async (req, res) => {
  try {
    const { title, author, description, price, stock, isFeatured, category, discountPercent, coverImage } = req.body;
    if (!title || !author || !description || !price || !stock) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      isFeatured: req.body.isFeatured || false,
      discountPercent: req.body.discountPercent || 0,
      coverImage: req.file?.filename ,
      category 
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().populate('category', 'name');
    res.status(201).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a book by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).populate('category', 'name');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a book by ID
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a book by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;