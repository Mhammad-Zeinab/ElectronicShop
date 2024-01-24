import {React, useContext} from 'react';
import { AppContext } from '../index.js';

export default function ProductItem({product}) 
{

    const {addProductToCart} = useContext(AppContext);

    return (
        <div className="rounded border shadow p-3 text-center h-100">
        <img src="https://techstory.in/wp-content/uploads/2024/01/Apple1-1140x570.jpg" className="img-fluid" alt="..." style={{height:260}}/>
        <hr/>
        <h4 className="py-2">{product.name}</h4>
        <h6>{product.category}</h6>
        <p>{product.brand}</p>
        <h4 className='mb-2'> ${product.price}</h4>
        <button type="button" onClick={() => addProductToCart(product)} className="btn btn-outline-success btn-sm">
        Add to Cart
        </button>
    </div> 
    );
}