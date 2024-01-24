const Order = require('../Models/Order'); // Import the Order model

// Create a new order
const createOrder = async (req, res) => {
  try {
    const order = new Order({
        products : req.body.products,
        user : req.body.user,
        totalAmount : req.body.totalAmount,
    });
    console.log(order);

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order by ID
const getOrderByUserId = async (req, res) => {
  try {
    userId = req.params.userId
    const order = await Order.find({user : userId}).populate('products').populate('user');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getOrderById = async (req, res) => {
  try {
    orderId = req.params.orderId
    const order = await Order.findById(orderId).populate('products').populate('user');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export the controller methods
module.exports = {
  createOrder,
  getOrderByUserId,
  getOrders,
  getOrderById,
};