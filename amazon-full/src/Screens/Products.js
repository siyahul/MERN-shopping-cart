import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { detailsProducts } from "../actions/productActions";
import Rating from "../Components/Rating";
import "./Css/Products.css";
function Products({ match }) {
  const [qty, setQty] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();
  const [inCart, setInCart] = useState(false);
  const { product, loading } = useSelector((state) => state.productDetails);
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(detailsProducts(match.params.id));
  }, []);
  const addToBasket = () => {
    dispatch(addToCart(product._id, qty));
  };
  const remove = () => {
    dispatch(removeFromCart(product, cart));
  };
  const checkOut = () => {
    history.push(`/cart/${product._id}?qty=${qty}`);
  };
  console.log(qty);
  if (loading) {
    return (
      <div className="spinner">
      <i class="fa fa-circle-o-notch" aria-hidden="true"></i>
      </div>
    );
  } else {
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
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
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
              <select
                className="select"
                value={qty}
                onChange={(e) => {
                  setQty(e.target.value);
                }}
              >
                {[
                  ...Array(
                    product.countInStock > 10 ? 10 : product.countInStock
                  ).keys(),
                ].map((value) => (
                  <option key={value + 1} value={value + 1}>
                    {value + 1}
                  </option>
                ))}
              </select>
              {product.countInStock > 0 ? (
                <>
                  <button className="addToCart" onClick={addToBasket}>
                    <i className="fa fa-cart-plus" aria-hidden="true"></i> Add
                    To Cart {/* cart?.length */}
                  </button>
                  <button className="addToCart" onClick={checkOut}>
                    BuyNow
                  </button>
                </>
              ) : (
                <button className="outOfStock">Out Of Stock</button>
              )}
              {inCart ? (
                <button className="outOfStock remove" onClick={remove}>
                  <i class="fa fa-cart-arrow-down" aria-hidden="true"></i>{" "}
                  Remove From cart
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Products;
