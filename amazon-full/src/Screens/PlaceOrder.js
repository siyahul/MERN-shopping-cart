import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderActions";
import ProgressBar from "../Components/ProgressBar";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import "./Css/PlaceOrder.css";

function PlaceOrder(props) {
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const dispatch = useDispatch();
  const { shippingAdress } = cart;
  const { payementMethod } = cart;
  const { cartItems } = cart;
  const toPrice = (num)=> Number(num.toFixed(2));
  cart.totalAmount =toPrice(cartItems.reduce((a, c) => (a + Number(c.price)) * Number(c.qty), 0));
  cart.tax = toPrice((cart.totalAmount/100)*14);
  cart.shipping = cart.totalAmount>100?toPrice(0):toPrice(10);
  cart.netAmount = toPrice(cart.totalAmount + cart.tax + cart.shipping);
  const {loading,success,error,order} = orderCreate;

  const placeOrder = ()=>{
    dispatch(createOrder({...cart,orderItems:cart.cartItems}))
  }

  useEffect(()=>{
    if(!shippingAdress) props.history.push('/signin');
    else if(success){
      props.history.push(`/order/${order?._id}`);
      dispatch({type:ORDER_CREATE_RESET})
    }
  },[shippingAdress,props.history,success])

  return (
    <div className="placeOrder">
      <ProgressBar placeOrder payment />
      <div className="placeOrder__details">
        <div className="placeOrder__items">
          <div className="placeOrder__box">
            <p className="placeOrder__heading">Shipping</p>
            <p className="placeOrder__subHeading">
              Name: <span>{shippingAdress?.fullName}</span>
            </p>
            <p className="placeOrder__subHeading">
              Mobile: <span>{shippingAdress?.mobile}</span>
            </p>
            <p className="placeOrder__subHeading">
              Address:{" "}
              <span>
                {shippingAdress?.appartment +
                  " " +
                  shippingAdress?.street +
                  " " +
                  shippingAdress?.city +
                  " " +
                  shippingAdress?.state +
                  " " +
                  shippingAdress?.pincode}
              </span>
            </p>
          </div>
          <div className="placeOrder__box">
            <p className="placeOrder__heading">Payement</p>
            <p className="placeOrder__subHeading">
              Method: <span>{payementMethod}</span>
            </p>
          </div>
          <div className="placeOrder__box">
            <p className="placeOrder__heading">Items</p>
            {cartItems.map((cartItem,key) => (
              <div key={key} className="placeOrder__itemsList">
                <img src={cartItem.image} alt={cartItem.name} />
                <p>{cartItem.name}</p>
                <p>
                  {cartItem.qty +
                    " x $" +
                    cartItem.price +
                    " = " +
                    "$" +
                    Number(cartItem.qty) * cartItem.price}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="placeOrder__submit">
          <div className="placeOrder__box">
            <p className="placeOrder__heading">Order Summery</p>
            <p className="placeOrder__subHeading">
              Items: $<span className="price">{cart.totalAmount}</span>
            </p>
            <p className="placeOrder__subHeading">
              Shipping Charge: $<span className="price">{cart.shipping}</span>
            </p>
            <p className="placeOrder__subHeading">
              Tax: $<span className="price">{cart.tax}</span>
            </p>
            <p className="placeOrder__subHeading">
              Order Total: $<span className="price">{cart.netAmount}</span>
            </p>
            <button onClick={placeOrder}>PlaceOrder</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(PlaceOrder);
