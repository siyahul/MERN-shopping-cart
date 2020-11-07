import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Components/Rating";
import { data } from "../data";
import "./Css/Products.css";
function Products({ match }) {
  const product = data.products.find(
    (item) => String(item._id) === match.params.id
  );
  if (!product) {
    return (
      <div>
        <h1 className="notFound">Product Not found</h1>
        <Link to="/">
          <h1 className="notFoundLink">Back To Home</h1>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="products">
        <div className="products__image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="products__info">
          <ul>
            <li>{product.name}</li>
            <li>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </li>
            <li>Price:${product.price}</li>
            <li>{product.description}</li>
          </ul>
        </div>
        <div className="products__info">
          <div className="products__addToCart">
            <p>Brand</p>
            <p>Apple</p>
            <p>{product.name}</p>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <p>Price:${product.price}</p>
            <p>Status:</p>
            {product.countInStock > 0 ? (
              <span className="availiable">Availiable</span>
            ) : (
              <span className="unAvailiable">Out Of Stock</span>
            )}
            <p>QTY</p><input type="number" min="1" max="10"/>
            {product.countInStock > 0 ? (
              <button className="addToCart">Add To Cart</button>
            ) : (
              <button className="outOfStock">Out Of Stock</button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
