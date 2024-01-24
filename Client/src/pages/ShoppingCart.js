import React from 'react';
import CartItem from '../components/CartItem';
import { useContext } from 'react';
import { AppContext } from '../index.js';
import { UserContext } from '../index.js';
import { addOrder } from '../axiosAPI/Orders.js';

export default function ShoppingCart() {
  const { cartList } = useContext(AppContext);
  const { currentUser } = useContext(UserContext);

 

  let total = 0;
  const handleSubmit = () => {
    const isConfirmed = window.confirm("Are you sure you want to submit?");
    if (isConfirmed) {
        const order = {
            products: cartList, 
            user : currentUser.user._id,
            totalAmount : total,
          };  
        const response = addOrder(order);
    }
  };

  const CartTotal = () => {
    if (cartList) {
      cartList.forEach((item) => {
        total += item.price * item.quantity;
      });
    }

    return (
      <ul className="navbar-nav justify-content-end flex-grow-1">
        <li className="nav-item">
          <div className="rounded border shadow p-4 text-center h-100">
            <h4 style={{ display: "inline-block" }}>
              Total price: ${total}
              <button
                className="btn btn-warning"
                style={{ marginLeft: 20 }}
                onClick={handleSubmit}
                type="submit"
              >
                Submit
              </button>
            </h4>
          </div>
        </li>
      </ul>
    );
  };

  return (
    <div className="bg-light">
      <div className="container py-5">
        <h2 className="mb-3 text-center">Shopping cart</h2>
        <div className="g-2 mb-5">
          <CartTotal />
          <ul className="navbar-nav justify-content-end flex-grow-1">
            {cartList && cartList.length > 0 ? (
              cartList.map((product, index) => (
                <div key={index}>
                  <CartItem product={product} />
                </div>
              ))
            ) : (
              <div className="rounded border shadow p-4 text-center h-100">
                <h4>Your cart is empty</h4>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}