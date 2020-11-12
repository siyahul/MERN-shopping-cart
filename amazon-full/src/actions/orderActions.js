import Axios from "axios";
import { CLEAR_CART } from "../constants/cartConstants";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCEESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_RESET,
  ORDERS_LIST_REQUEST,
  ORDERS_LIST_SUCCESS,
  ORDERS_LIST_FAIL
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  const {
    userSignIn: { userInfo },
  } = getState();
  console.log(userInfo);
  Axios.post("http://192.168.1.10:5000/api/orders", order, {
    headers: {
      autherization: `Bearer ${userInfo.token}`,
    },
  })
    .then(({ data }) => {
      console.log(data);
      dispatch({ type: ORDER_CREATE_SUCCEESS, payload: data.order });
      dispatch({ type: CLEAR_CART });
      dispatch({ type: ORDER_DETAILS_RESET})
      localStorage.removeItem("cartItems");
    })
    .catch((error) => {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};

export const getOrderDetails = (orderId) => (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST });
  const {
    userSignIn: { userInfo },
  } = getState();
  Axios.get(`http://192.168.1.10:5000/api/orders/${orderId}`, {
    headers: {
      autherization: `Bearer ${userInfo?.token}`,
    },
  })
    .then(({ data }) => {
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};

export const getOrdersList = ()=> (dispatch,getState) =>{
  dispatch({type:ORDERS_LIST_REQUEST})
  const {
    userSignIn: { userInfo },
  } = getState();
  Axios.get('http://192.168.1.10:5000/api/orders',{
    headers: {
      autherization: `Bearer ${userInfo?.token}`,
    }
  }).then(({data})=>{
    dispatch({ type:ORDERS_LIST_SUCCESS, payload: data})
  }).catch(error=>{
    dispatch({
      type: ORDERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  })  
}
