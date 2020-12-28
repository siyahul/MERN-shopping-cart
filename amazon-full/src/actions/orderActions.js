import axios from "../axios";
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
  ORDERS_LIST_FAIL,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
  PAY_ORDER_FAIL,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  const {
    userSignIn: { userInfo },
  } = getState();
  console.log(userInfo);
  axios
    .post("api/orders", order, {
      headers: {
        autherization: `Bearer ${userInfo.token}`,
      },
    })
    .then(({ data }) => {
      console.log(data);
      dispatch({ type: ORDER_CREATE_SUCCEESS, payload: data.order });
      dispatch({ type: CLEAR_CART });
      dispatch({ type: ORDER_DETAILS_RESET });
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
  axios
    .get(`api/orders/${orderId}`, {
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

export const getOrdersList = () => (dispatch, getState) => {
  dispatch({ type: ORDERS_LIST_REQUEST });
  const {
    userSignIn: { userInfo },
  } = getState();
  axios
    .get("api/orders", {
      headers: {
        autherization: `Bearer ${userInfo?.token}`,
      },
    })
    .then(({ data }) => {
      dispatch({ type: ORDERS_LIST_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({
        type: ORDERS_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};
export const getAllOrdersList = () => (dispatch, getState) => {
  dispatch({ type: ORDERS_LIST_REQUEST });
  const {
    userSignIn: { userInfo },
  } = getState();
  axios
    .get("api/orders/admin", {
      headers: {
        autherization: `Bearer ${userInfo?.token}`,
      },
    })
    .then(({ data }) => {
      dispatch({ type: ORDERS_LIST_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({
        type: ORDERS_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};

export const payOrder = (order, paymentResult) => (dispatch, getState) => {
  dispatch({ type: PAY_ORDER_REQUEST, payload: { order, paymentResult } });
  const {
    userSignin: { userInfo },
  } = getState();
  axios.put(`api/orders/${order._id}/pay`, {
    headers: {
      autherization: `Bearer ${userInfo?.token}`,
    },
  }).then(({ data })=>{
      dispatch({type:PAY_ORDER_SUCCESS,payload: data})
  }).catch(error=>{
    dispatch({
      type: PAY_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  })
};
