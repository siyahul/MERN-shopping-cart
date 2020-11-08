import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { detailsProducts } from "../actions/productActions";
import Rating from "../Components/Rating";
import "./Css/Products.css";
function Products({ match }) {
  const dispatch = useDispatch();
  const [inCart, setInCart] = useState(false);
  const productList = useSelector((state) => state.productList);
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(detailsProducts(match.params.id));
  }, []);
  const product = productList.product;
  const addToBasket = () => {
    dispatch(addToCart(product));
  };
  const remove = () => {
    dispatch(removeFromCart(product, cart));
  };
  useEffect(() => {
    const index = cart.findIndex(
      (basketItem) => basketItem._id === product._id
    );
    if (index >= 0) {
      setInCart(true);
    }else{
      setInCart(false);
    }
  }, [cart,product]);

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
            {product.countInStock > 10 ? (
              <span className="availiable">Availiable</span>
            ) : product.countInStock <= 0 ? (
              <span className="unAvailiable">Out Of Stock</span>
            ) : (
              <span className="lowStock">
                Hurry Just {product.countInStock} are availiable
              </span>
            )}
            <p>QTY</p>
            <input type="number" min="1" max="10" />
            {product.countInStock > 0 ? (
              <button className="addToCart" onClick={addToBasket}>
                Add To Cart {cart?.length}
              </button>
            ) : (
              <button className="outOfStock">Out Of Stock</button>
            )}
            {inCart ? (
              <button onClick={remove}>Remove From cart</button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
