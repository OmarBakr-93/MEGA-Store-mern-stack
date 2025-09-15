const mongoose = require('mongoose');


const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  price : { type: Number, required: true, default: 0 },
  stock: { type: Number, required: true, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isOnSale: { type: Boolean, default: false },
  discountPercent: { type: String, default: 0 },
  coverImage: { type: String, required: false },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);