import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating';
import "./Product.css";

function Product({product}) {
    return (
      <Link to={`/products/${product._id}`}>
        <div className="product__card">
            <div className="product__cardImage">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product__cardName">
              <p>{product.name}</p>
              <p>$ {product.price}</p>
            </div>
            <Rating rating={product.rating} numReviews={product.numReviews}/>
            {/* <div className="product__cardDescription">
              <p>
                {product.description}
              </p>
            </div> */}
          </div>
          </Link>
    )
}

export default Product
