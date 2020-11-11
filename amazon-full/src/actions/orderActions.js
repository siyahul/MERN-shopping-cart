import Axios from "axios";
import { CLEAR_CART } from "../constants/cartConstants";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCEESS } from "../constants/orderConstants";

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
    .then(({data})=>{
      console.log(data);
        dispatch({type:ORDER_CREATE_SUCCEESS, payload:data.order});
        dispatch({type:CLEAR_CART});
        localStorage.removeItem('cartItems');
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
