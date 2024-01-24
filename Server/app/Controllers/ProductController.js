const Product = require('../Models/Product');
const { param } = require('../Routers/UserRoutes');

const productController = {};

// Create a new product
productController.createProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({ product: savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//update product
productController.updateProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
  
      if (!product) {
        return res.json({ message: 'Product not found' });
      }
  
      product.name = req.body.name || product.name;
      product.description = req.body.brand || product.brand;
      product.description = req.body.category || product.category;
      product.price = req.body.price || product.price;
  
      const updatedProduct = await product.save();
  
      res.status(200).json({ product: updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
};

//Delete product 
productController.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.productId);
  
      if (!product) {
        return res.json({ message: 'Product not found' });
      }
      res.status(200).json({ message:"Product removed" , product: product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
};







// Get all products
productController.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};


module.exports = productController;
