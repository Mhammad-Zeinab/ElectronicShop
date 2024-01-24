// api.js

import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const addProduct = async (newProduct) => {
  try {
    const response = await axios.post(`${BASE_URL}/product`, newProduct);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateproductItem = async (updatedProduct) => {
    try {
      const response = await axios.put(`${BASE_URL}/product/${updatedProduct._id}`, updatedProduct);
      return response.data;
    } catch (error) {
      console.error('Error updating Cart:', error);
      throw error;
    }
};
  

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/product/${productId}`);
    console.log(response);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
