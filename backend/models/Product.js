const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productType: {
    type: String,
    required: true,
    enum: ['flower', 'card', 'packaging', 'ribbon']
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
  details: { type: Object, required: true }
}, { collection: 'products' });

// Важно: экспортируем именно модель
module.exports = mongoose.model('Product', productSchema);            