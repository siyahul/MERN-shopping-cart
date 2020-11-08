import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../constants/cartConstants"

export const addToCart = (product)=>async dispatch =>{
    dispatch({
        type:ADD_TO_CART,
        payload: product
    })
}
export const clearCart = ()=>async dispatch =>{
    dispatch({
        type:CLEAR_CART,
    })
}
export const removeFromCart = (product)=>async dispatch =>{
        dispatch({
            type:REMOVE_FROM_CART,
            id:product._id,
        })
}