import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../constants/cartConstants"
import Axios from 'axios';

export const addToCart = (productId,qty)=>async (dispatch,getState) =>{
    await Axios.get(`http://192.168.1.10:5000/api/products/${productId}`).then(({data})=>{
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