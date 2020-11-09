import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

export const cartReducer = (state={cartItems:[]},action)=>{
    switch(action.type){
        case ADD_TO_CART :
            const item = action.payload;
            const existItem = state.cartItems.find(cartItem => cartItem.product === item.product);
            if(existItem){
              return {
                ...state,cartItems: state.cartItems.map(x=> x.product === item.product? item: x),
              }
            }
            else{
              return {
                ...state,cartItems: [...state.cartItems,item]
              }
            }
        case REMOVE_FROM_CART :
            const index = state.findIndex(
                (basketItem) => basketItem._id === action.id
              );
              let newBasket = [...state];
        
              if (index >= 0) {
                newBasket.splice(index, 1);
              } else {
                console.warn(
                  `Cant remove product (id: ${action.id} as its not in cart!)`
                );
              }
            return newBasket;
        case CLEAR_CART :
            return {...state,cartItems:[]};
        default:
            return state;
    }
}