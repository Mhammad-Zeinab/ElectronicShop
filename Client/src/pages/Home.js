import React from 'react';
import ProductItem from '../components/ProductItem';
import { AppContext } from '../index.js';
import { useContext } from 'react';

export default function Home(){    

    const { productList } = useContext(AppContext);

    return(
        <div className='bg-light'>
            <div className='container py-5'>
                <h2 className="mb-3 text-center">Products</h2>
                <div className="row g-2 mb-5">
                    {productList.map((product, index) => (
                        <div key={index} className="col-md-6 col-xl-3 col-lg-6 col-sm-6">
                        <ProductItem product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
