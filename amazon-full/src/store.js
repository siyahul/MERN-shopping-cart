import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  ordersListReducer,
  payOrderReducer,
} from "./reducers/orderReducer";
import {
  productDetailsReducer,
  productListReducer,
  productAddReducer,
} from "./reducers/productReducer";
import { userSignInReducer, userSignUpReducer } from "./reducers/userReducer";

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAdress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : null,
    payementMethod: localStorage.getItem("payementMethod")
      ? JSON.parse(localStorage.getItem("payementMethod"))
      : "",
  },
  userSignIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  userSignUp: {
    userInfo: null,
  },
  orderDetails: null,
  payOrder: { error: null, success: null },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignIn: userSignInReducer,
  userSignUp: userSignUpReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  ordersList: ordersListReducer,
  payOrder: payOrderReducer,
  addProduct: productAddReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
