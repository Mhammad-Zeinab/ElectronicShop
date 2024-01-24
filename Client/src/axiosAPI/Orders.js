// api.js

import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export const getOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getOrderByUserId = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/orderbyuser/`+userId);
        return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  };

  export const getOrderId = async (orderId) => {
    try {
      const response = await axios.get(`${BASE_URL}/order/`+orderId);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  };

export const addOrder = async (newOrder) => {
  try {
    console.log(newOrder)
    const response = await axios.post(`${BASE_URL}/order`, newOrder);
    return response.data;
  } catch (error) {
    console.error('Error adding order:', error);
    throw error;
  }
};

