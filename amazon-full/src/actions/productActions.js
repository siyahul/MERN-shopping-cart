import Axios from "axios";
import {
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
  Axios.get("http://192.168.1.10:5000/api/products")
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
  Axios.get(`http://192.168.1.10:5000/api/products/${productId}`)
    .then(({ data }) => {
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
    });
};