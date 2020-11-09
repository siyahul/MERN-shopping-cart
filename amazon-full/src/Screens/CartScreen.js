import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import "./Css/cartScreen.css";

function CartScreen(props) {
  const productId = props.match.params.id;
  const [selQty, setSelQty] = useState(1);
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    if (productId) dispatch(addToCart(productId, qty));
  }, [productId, qty, dispatch]);
  console.log(cart);
  return (
    <div className="cart">
      <div className="cart__items">
        <p className="cart__title">Your Shopping Cart</p>
        {cart?.cartItems?.map((cartItem) => (
          <div className="cart__item">
            <img
              src={cartItem.image}
              alt={cartItem.name}
            />
            <p>{cartItem.name}</p>
            <select
              className="select"
              value={Number(cartItem.qty)}
              onChange={(e) => {
                setSelQty(e.target.value);
              }}
            >
              {[...Array(cartItem.countInStock).keys()].map(
                (value) => (
                  <option key={value + 1} value={value + 1}>
                    {value + 1}
                  </option>
                )
              )}
            </select>
            <p>${cartItem.price} </p>
            <button>Delete</button>
          </div>
        ))}
      </div>
      <div className="cart__checkout">
        <h1>hello</h1>
      </div>
    </div>
  );
}

export default CartScreen;
