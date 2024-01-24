import React from 'react';
import Navbar from './components/Layout.js';
import Home from './pages/Home.js'
import ProductList from './pages/Admin/ProductList.js'
import UsersList from './pages/Admin/UsersList.js'
import ShoppingCart from './pages/ShoppingCart.js'
import Contact from './pages/Contact.js'
import NotFound from './pages/NotFound.js'
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import { createContext, useState , useEffect } from "react";
import { getProducts, addProduct, deleteProduct , updateproductItem } from './axiosAPI/Products.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import UserProfile from './components/userProfile.js';
import OrderList from './pages/Admin/OrderList.js';
import OrderDetails from './pages/Admin/OrderDetails.js';



const AppContext = createContext();
const UserContext = createContext();

function App() {  
  
const [cartList, setCartList] = useState(JSON.parse(localStorage.getItem('cart')) || []);
const [productList, setProductList] = useState([]);
const [currentUser, setcurrentUser] = useState(JSON.parse(localStorage.getItem('userCredentials')) || []);

useEffect(() => {
  const fetchData = async () => {
    try {
      const products = await getProducts();
      setProductList(products);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData();
}, []);

useEffect(() => {
  localStorage.setItem('userCredentials', JSON.stringify(currentUser));
  
}, [currentUser]);


const addProductToList = async (newProduct) => {
  try {
    const data = await addProduct(newProduct);
    setProductList([...productList, data.product]);
  } catch (error) {
    console.error('Error adding product:', error);
  }
};
const DeleteProductFromList = async (productId) => {
  try {
    await deleteProduct(productId);
    setProductList(productList.filter(product => product._id !== productId));
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};
const addProductToCart = async (product) => {
  try {
    const existingProductIndex = cartList.findIndex((item) => item._id === product._id);
    if (existingProductIndex !== -1) {
      const updatedCart = cartList.map((item, index) => {
        if (index === existingProductIndex) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartList(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); 
    } else {
      const newCartList = [...cartList, { ...product, quantity: 1 }];
      setCartList(newCartList);
      localStorage.setItem('cart', JSON.stringify(newCartList));
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
  }
};
const updatecartItem = async (updatedProduct) => {
  try {
    if(updatedProduct.quantity===0)
    {
      const updatedCart = cartList.filter((item) => item._id !== updatedProduct._id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartList(updatedCart);
    }
    else {
      const updatedCart = cartList.map((item) =>
      item._id === updatedProduct._id ? { ...item, ...updatedProduct } : item);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartList(updatedCart);
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
  }
};
const updateProductItem = async (updatedProduct) => {
  try {
    console.log(updatedProduct)
    await updateproductItem(updatedProduct);
    const productList = await getProducts();
    setProductList(productList);
  } catch (error) {
    console.error('Error adding product to cart:', error);
  }
};

return (  
    <AppContext.Provider value={{cartList,productList,addProductToCart,updatecartItem,updateProductItem,addProductToList,DeleteProductFromList}}>
      <UserContext.Provider value={{currentUser,setcurrentUser}}>
        <BrowserRouter>
          <Navbar/>
            <Routes>  
              <Route path="/userProfile"element={<UserProfile/>}/>
              <Route path="/Auth/Login" element={<Login/>}/>
              <Route path="/Auth/Register" element={<Register/>}/>
              <Route path="/Admin/products" element={<ProductList/>}/>
              <Route path="/Admin/users" element={<UsersList/>}/>
              <Route path="/orderDetails/:orderId" element={<OrderDetails/>} />
              <Route path="/Admin/orders" element={<OrderList/>}/>
              <Route path="/Home" element={<Home/>}/>
              <Route path="/ShoppingCart" element={<ShoppingCart/>}/>
              <Route path="/Contact" element={<Contact/>}/>
              <Route index element={<Home/>}/>
              <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </AppContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  </React.StrictMode>
);

export { AppContext };
export { UserContext };
