import React, { useState, useEffect } from 'react';
import { getOrders } from '../../axiosAPI/Orders.js';
import { Link } from 'react-router-dom';

export default function OrderList() {
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders(); 
        setOrdersData(ordersData); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchOrders(); // Call the function to fetch users when the component mounts
  }, []);

  return (
    <div className='bg-light'>
            <div className='container py-5'>
                <h2 className="mb-3 text-center">Orders list</h2>
                <div className="row g-2 mb-5">
                  <ul className="navbar-nav justify-content-end flex-grow-1">
                    <li className="nav-item" style={{ marginTop: 20 }}>
                      <div className="rounded border shadow p-4 text-center h-100">
                        <table className="table">
                          <thead>
                            <tr>
                              <th className="center-cell">Order ID</th>
                              <th className="center-cell">User</th>
                              <th className="center-cell">Order date</th>
                              <th className="center-cell">Order total</th>
                              <th className="center-cell">Number of items</th>
                              <th className="center-cell"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {ordersData.map((order) => (
                              <tr key={order._id}>
                                <td className="center-cell">{order._id}</td>
                                <td className="center-cell">{order.user.name} {order.user.lastname}</td>
                                <td className="center-cell">{order.date}</td>
                                <td className="center-cell">$ {order.totalAmount}</td>
                                <td className="center-cell">{order.products.length}</td>
                                <td className="center-cell">
                                    <Link className="btn btn-warning" to={`/orderDetails/${order._id}`} style={{ marginLeft: 20 }}>
                                      Submit
                                    </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </li>
                  </ul>
                </div>
            </div>
        </div>
  );
}