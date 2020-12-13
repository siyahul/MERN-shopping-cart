import Axios from "axios";
import {
  USER_LOGOUT,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNUP_FAILED,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGN_LOGOUT,
} from "../constants/userConstants";

export const userSignin = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { email, password },
  });
  Axios.post("http://192.168.1.10:5000/api/users/signin", {
    email: email,
    password: password,
  })
    .then(({data}) => {
      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    })
    .catch((error) => {
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      setTimeout(() => {
        dispatch({
          type: USER_SIGNIN_FAIL,
          payload: null,
        });
      }, 5000);
    });
};

export const userSignOut = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: USER_SIGN_LOGOUT,
  });
  localStorage.removeItem("userInfo");
  localStorage.removeItem("shippingAddress");
  
};

export const userSignUp = (name, email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNUP_REQUEST,
    payload: { name, email, password },
  });
  Axios.post("http://192.168.1.10:5000/api/users/signup", {
    name: name,
    email: email,
    password: password,
  })
    .then(({data}) => {
      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: data,
      });
      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    })
    .catch((error) => {
      dispatch({
        type: USER_SIGNUP_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      setTimeout(() => {
        dispatch({
          type: USER_SIGNUP_FAILED,
          payload: null,
        });
      }, 5000);
    });
};
