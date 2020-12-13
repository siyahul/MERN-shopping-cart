import axios from "../axios";
import {
  PRODUCT_ADD_FAIL,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  axios.get("api/products")
    .then(({ data }) => {
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    });
};

export const detailsProducts = (productId) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST, payload:productId,
  });
  axios.get(`api/products/${productId}`)
    .then(({ data }) => {
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
    });
};

export const addProducts = (product) => async (dispatch,getState) => {
  dispatch({
    type: PRODUCT_ADD_REQUEST, payload:product,
  });
  const {
    userSignIn: { userInfo },
  } = getState();
  console.log(userInfo?.token);
  axios.post('api/products',product,{
    headers: {
      autherization: `Bearer ${userInfo?.token}`,
    }
  })
    .then(({ data }) => {
      dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: PRODUCT_ADD_FAIL, payload: error.message });
    });
};