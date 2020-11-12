import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../actions/orderActions";
import "./Css/PlaceOrder.css";

function OrderDetails(props) {
  const orderId = props.match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const userSignIn = useSelector((state) => state.userSignIn);
  useEffect(() => {
    if (!userSignIn?.userInfo) {
      props.history.push("/signin");
    } else {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, userSignIn.userInfo,props.history]);
  if (orderDetails?.error) {
    return (
      <div className="notYourOrder">
        <div className="error__box">
          <p>{orderDetails?.error}</p>
        </div>
      </div>
    )
  } else {
    return (
      <div className="placeOrder">
        <div className="placeOrder__details">
          <div className="placeOrder__items">
            <div className="placeOrder__box">
              <p className="placeOrder__heading">OrderId: {orderId}</p>
            </div>
            <div className="placeOrder__box">
              <p className="placeOrder__heading">Shipping</p>
              <p className="placeOrder__subHeading">
                Name:{" "}
                <span>
                  {orderDetails?.orderDetails?.shippingAdress?.fullName}
                </span>
              </p>
              <p className="placeOrder__subHeading">
                Mobile:{" "}
                <span>
                  {orderDetails?.orderDetails?.shippingAdress?.mobile}
                </span>
              </p>
              <p className="placeOrder__subHeading">
                Address:{" "}
                <span>
                  {orderDetails?.orderDetails?.shippingAdress?.appartment +
                    " " +
                    orderDetails?.orderDetails?.shippingAdress?.street +
                    " " +
                    orderDetails?.orderDetails?.shippingAdress?.city +
                    " " +
                    orderDetails?.orderDetails?.shippingAdress?.state +
                    " " +
                    orderDetails?.orderDetails?.shippingAdress?.pincode}
                </span>
              </p>
              <p className="placeOrder__subHeading">
                Shipping Status:{" "}
                <span>
                  {orderDetails?.orderDetails?.isShipped
                    ? "Shipped"
                    : "Not Shipped Yet"}
                </span>
              </p>
            </div>
            <div className="placeOrder__box">
              <p className="placeOrder__heading">Payement</p>
              <p className="placeOrder__subHeading">
                Method:{" "}
                <span>{orderDetails?.orderDetails?.payementMethod}</span>
              </p>
              <p className="placeOrder__subHeading">
                Is Paid:{" "}
                <span>
                  {orderDetails?.orderDetails?.isPaid ? "Paid" : "Not Paid"}
                </span>
              </p>
            </div>
            <div className="placeOrder__box">
              <p className="placeOrder__heading">Items</p>
              {orderDetails?.orderDetails?.orderItems?.map((orderItem, key) => (
                <div key={key} className="placeOrder__itemsList">
                  <img src={orderItem.image} alt={orderItem.name} />
                  <p>{orderItem.name}</p>
                  <p>
                    {orderItem.qty +
                      " x $" +
                      orderItem.price +
                      " = " +
                      "$" +
                      Number(orderItem.qty) * orderItem.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="placeOrder__submit">
            <div className="placeOrder__box">
              <p className="placeOrder__heading">Order Summery</p>
              <p className="placeOrder__subHeading">
                Items: $
                <span className="price">
                  {orderDetails?.orderDetails?.itemsPrice}
                </span>
              </p>
              <p className="placeOrder__subHeading">
                Shipping Charge: $
                <span className="price">
                  {orderDetails?.orderDetails?.shippingPrice}
                </span>
              </p>
              <p className="placeOrder__subHeading">
                Tax: $
                <span className="price">
                  {orderDetails?.orderDetails?.taxPrice}
                </span>
              </p>
              <p className="placeOrder__subHeading">
                Order Total: $
                <span className="price">
                  {orderDetails?.orderDetails?.totalPrice}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default memo(OrderDetails);
