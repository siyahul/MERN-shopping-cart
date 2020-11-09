import Axios from "axios";
import {
    USER_LOGOUT,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
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
    .then((data) => {
      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem('userInfo',JSON.stringify(data));
    })
    .catch((error) => {
        console.log(error);
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};

export const userSignOut = () => dispatch =>{
    dispatch({
        type: USER_LOGOUT,
    });
    localStorage.removeItem('userInfo');
}
