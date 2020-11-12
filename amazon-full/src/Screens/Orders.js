import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrdersList } from "../actions/orderActions";
import "./Css/Orders.css";

function Orders(props) {
  const dispatch = useDispatch();
  const ordersList = useSelector((state) => state.ordersList);
  const userSignIn = useSelector((state) => state.userSignIn);
  const { loading, orders } = ordersList;
  const { userInfo } = userSignIn;
  useEffect(() => {
    if (userInfo) {
      dispatch(getOrdersList());
    } else {
      props.history.push("/signin");
    }
  }, [dispatch, props.history, userInfo]);
  return (
    <div className="orders">
      {orders?.map((order, i) => {
        return (
          <Link to={`/order/${order._id}`}>
            <div key={i} className="Orders__order">
              {order.orderItems.map((item, index) => (
                <div key={index} className="orderItems">
                  <img
                    className="orderImage"
                    src={item.image}
                    alt={item.name}
                  />
                  <p>{item.name}</p>
                  <p>
                    {item.qty +
                      " x $" +
                      item.price +
                      " = " +
                      "$" +
                      Number(item.qty) * item.price}
                  </p>
                </div>
              ))}
              <p>
                Total Order amount: $<span>{order.totalPrice}</span>
              </p>
              <p>
                Total Order items: <span>{order.orderItems.length}</span>
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Orders;
