import { ADD_PAYEMENT_METHOD, ADD_SHIPPING_ADDRESS, ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../constants/cartConstants"
import axios from '../axios';

export const addToCart = (productId,qty)=>async (dispatch,getState) =>{
    await axios.get(`api/products/${productId}`).then(({data})=>{
        dispatch({
            type:ADD_TO_CART,
            payload: {
                name:data.name,
                image:data.image,
                price:data.price,
                countInStock:data.countInStock,
                product:data._id,
                qty,
            }
        })
        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
    }).catch(err=>{
        console.log(err);
    })
    
}
export const clearCart = ()=>async dispatch =>{
    dispatch({
        type:CLEAR_CART,
    })
    localStorage.removeItem('cartItems')
}
export const removeFromCart = (product)=>async (dispatch,getState) =>{
        dispatch({
            type:REMOVE_FROM_CART,
            id:product,
        })
        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}

export const addShippingAddress = (adress)=> (dispatch,getState) => {
    dispatch({
        type:ADD_SHIPPING_ADDRESS,
        payload:adress,
    })
    localStorage.setItem('shippingAddress',JSON.stringify(getState().cart.shippingAdress))
}
export const addPayementMethod = (data)=> (dispatch,getState) => {
    dispatch({
        type:ADD_PAYEMENT_METHOD,
        payload:data,
    })
    localStorage.setItem('payementMethod',JSON.stringify(getState().cart.payementMethod))
}