import { createStore,compose,applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk'
import { cartReducer } from "./reducers/cartReducer";
import { productListReducer } from "./reducers/productReducer";

const initialState = {};
const reducer = combineReducers({
    productList:productListReducer,
    cart: cartReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState,composeEnhancer(applyMiddleware(thunk)));
export default store;