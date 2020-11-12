import {
  ORDERS_LIST_FAIL,
  ORDERS_LIST_REQUEST,
  ORDERS_LIST_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCEESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_RESET,
  ORDER_DETAILS_SUCCESS,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, loading: true };
    case ORDER_CREATE_SUCCEESS:
      return { ...state, loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = {loading: true},action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {...state, loading:true};
    case ORDER_DETAILS_SUCCESS:
      return {...state, loading:false, orderDetails:action.payload};
    case ORDER_DETAILS_FAIL :
      return {...state, loading: false, error: action.payload};
      case ORDER_DETAILS_RESET :
        return {};
    default:
      return state;
  }
}
export const ordersListReducer = (state = {loading: true},action) => {
  switch (action.type) {
    case ORDERS_LIST_REQUEST:
      return {...state, loading:true};
    case ORDERS_LIST_SUCCESS:
      return {...state, loading:false, orders:action.payload};
    case ORDERS_LIST_FAIL :
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
}
