import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

export const cartReducer = (state=[],action)=>{
    switch(action.type){
        case ADD_TO_CART :
            return [...state,action.payload];
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
            return [];
        default:
            return state;
    }
}