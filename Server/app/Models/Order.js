const mongoose = require('mongoose');
const ProductSchema = require('./Product').schema;

const OrderSchema = new mongoose.Schema({

  products: [ProductSchema],
  
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;