import React, { useState, useEffect } from 'react';
import { getOrderId } from '../../axiosAPI/Orders.js';
import { useParams } from 'react-router-dom';

export default function OrderDetails() {
  const { orderId } = useParams();
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrderId(orderId); 
        setOrdersData(ordersData); 
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrders(); 
  }, [orderId]);

  return (
    <div className='bg-light'>
              <div className='container py-5'>
                <h2 className="mb-3 text-center">Order details</h2>
                <div className="row g-2 mb-5">
                  <div className="col-12">
                    <div className="rounded border shadow p-3 text-center h-100">
                      <form className="row gx-3 gy-2 align-items-start">
                        <div className="col-12 " style={{textAlign:'left'}}>
                          <label htmlFor="firstname"  style={{marginLeft:8}} className="form-label">Order ID</label>
                          <input
                            type="text"
                            className="form-control"
                            value={ordersData._id ? ordersData._id : 'Loading...'}
                            id="firstname"
                            placeholder="First Name"
                            readOnly
                          />
                        </div>
                        <div className="col-12 "style={{ textAlign: 'left' }}>
                          <label htmlFor="lastname"style={{marginLeft:8}} className="form-label">User name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={ordersData.user ? ordersData.user.name+" "+ordersData.user.lastname  : 'Loading...'}
                            id="lastname"
                            placeholder="Last Name"
                            readOnly
                          />
                        </div>
                        <div className="col-12"style={{ textAlign: 'left' }}>
                          <label htmlFor="email"style={{marginLeft:8}} className="form-label">Order date</label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              value={ordersData.date ? ordersData.date : 'Loading...'}
                              id="email"
                              placeholder="Email"
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-12 "style={{ textAlign: 'left' }}>
                          <label htmlFor="phone"style={{marginLeft:8}} className="form-label">Total amount ($)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={ordersData.totalAmount ? ordersData.totalAmount : 'Loading...'}
                            id="phone"
                            placeholder="Phone"
                            readOnly
                          />
                        </div>
                        <div className="col-12 "style={{ textAlign: 'left' }}>
                          <label htmlFor="phone"style={{marginLeft:8}} className="form-label">Number of item </label>
                          <input
                            type="text"
                            className="form-control"
                            id="phone"
                            value={ordersData.products ? ordersData.products.length : 'Loading...'}

                            placeholder="Phone"
                            readOnly
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  );
}