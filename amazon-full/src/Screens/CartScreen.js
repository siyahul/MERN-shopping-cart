import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { addToCart, clearCart, removeFromCart } from "../actions/cartActions";
import "./Css/cartScreen.css";

function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    if (productId) dispatch(addToCart(productId, qty));
  }, [productId, qty, dispatch]);
  console.log(cart);

  const removeFromCartScr = (id) => {
    if (window.confirm("Are you sure to remove")) {
      dispatch(removeFromCart(id));
    }
  };
  const clear =()=> {
    if (window.confirm("Are you sure to Clear")) {
      dispatch(clearCart());
    }
  }
  const checkout = ()=>{
    history.push("/signin?redirect=shipping");
  }
  return (
    <div className="cart">
      <div className="cart__items">
        <p className="cart__title">
          {cart.cartItems.length > 0
            ? `Your Shopping Cart (${cart.cartItems.length})`
            : "Your Shopping Cart is Empty"}
        </p>
        {cart?.cartItems?.map((cartItem) => (
          <div key={cartItem.product} className="cart__item">
            <Link to={`/products/${cartItem.product}`}>
              <img src={cartItem.image} alt={cartItem.name} />
            </Link>
            <p>{cartItem.name}</p>
            <select
              className="qtySelect"
              value={Number(cartItem.qty)}
              onChange={(e) => {
                dispatch(addToCart(cartItem.product, Number(e.target.value)));
              }}
            >
              {[
                ...Array(
                  cartItem.countInStock > 10 ? 10 : cartItem.countInStock
                ).keys(),
              ].map((value) => (
                <option key={value + 1} value={value + 1}>
                  {value + 1}
                </option>
              ))}
            </select>
            <p>${cartItem.price} </p>
            <button onClick={() => removeFromCartScr(cartItem.product)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      {cart?.cartItems?.length > 0 ? (
        <div className="cart__checkout">
          <div className="cart__checkoutBox">
            <h1>
              Total ({cart.cartItems.reduce((a, c) => a + Number(c.qty), 0)})
              items
              <br />
              SubTotal :${" "}
              {cart.cartItems.reduce(
                (a, c) => (a + Number(c.price)) * Number(c.qty),
                0
              )}
            </h1>
            <button className="cart__checkoutBoxButton" onClick={checkout}>
              Proceed To Checkout
            </button>
            <button className="app__clearBtn" onClick={clear}>
              Clear Cart
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CartScreen;
