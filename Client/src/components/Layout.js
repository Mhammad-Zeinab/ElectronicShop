import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AppContext } from '../index';
import { UserContext } from '../index';
import { useNavigate  } from 'react-router-dom';



import '../App.css';

export default function Navbar() 
    {  
      const navigate = useNavigate();
      const {cartList} = useContext(AppContext);
      const {currentUser,setcurrentUser} = useContext(UserContext);
                  
      const logoutUser = async () =>  {
        navigate('/Home');
        setcurrentUser([]);
      };
      let productCount = cartList.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);
      
     if(currentUser)
      {
        return (
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <div className="container-fluid">
                    <Link to="/Home" className="navbar-brand">Electronic Shop</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                      <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ bsScrollHeight: 100 }}>
                        <li className="nav-item">
                          <Link to="/Home" className="nav-link active " aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/About" className="nav-link active " aria-current="page">About</Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/Contact" className="nav-link active " aria-current="page">Contact</Link>
                        </li>
                      </ul>
                      {currentUser.accessToken && currentUser.user.userType === "Admin" &&(
                        <ul className="navbar-nav ms-auto " style={{marginRight:65}}>
                        <li className="nav-item dropdown">
                          <Link className="nav-link dropdown-toggle" to="/#" role="button" 
                          data-bs-toggle="dropdown" aria-expanded="false">
                          Administrator
                          </Link>
                          <ul className="dropdown-menu">
                          <li><Link className="dropdown-item" to="/Admin/products">Products</Link></li>
                          <li><Link className="dropdown-item" to="/Admin/orders">Orders</Link></li>
                          <li><Link className="dropdown-item" to="/Admin/users">Users</Link></li>
                          <li><hr className="dropdown-divider" /></li>
                          <li><Link className="dropdown-item" to='/userProfile'>Profile</Link></li>
                          <li><Link className="dropdown-item" onClick={logoutUser}>Logout</Link></li>
                          </ul>
                        </li>
                        
                        </ul>
                      )}
                      {currentUser.accessToken && currentUser.user.userType === "User" &&(
                        <ul className="navbar-nav ms-auto " style={{marginRight:65}}>
                        <li className="nav-item dropdown">
                          <Link className="nav-link dropdown-toggle" to="/#" role="button" 
                          data-bs-toggle="dropdown" aria-expanded="false">
                          {currentUser.user.name} { currentUser.user.lastname}
                          </Link>
                          <ul className="dropdown-menu">
                          <li><Link className="dropdown-item" to="/">Orders</Link></li>
                          <li><hr className="dropdown-divider" /></li>
                          <li><Link className="dropdown-item" to='/userProfile'>Profile</Link></li>
                          <li><Link className="dropdown-item" 
                          onClick={logoutUser}>Logout</Link></li>
                          </ul>
                        </li>
                        <li className="nav-item">
                          <Link to="/ShoppingCart" className="nav-link" type="button">
                            <span className="navbar-chart-icon">
                              <span className="cart-count">{productCount}</span>
                              <FontAwesomeIcon icon={faShoppingCart} size="xl" />
                            </span>
                          </Link>
                        </li>
                        </ul>
                      )}  
                      {!currentUser.accessToken && (
                        <ul className="navbar-nav ms-auto " style={{marginRight:65}}>
                          <li className="nav-item">
                            <Link to="/Auth/Login" className="nav-link active" aria-current="page">Login</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/Auth/Register" className="nav-link active" aria-current="page">Register</Link>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </nav>
      );
     }
    }
