import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { addToCart } from '../actions/cartActions';

function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split('=')[1]):1;
    const dispatch = useDispatch();
    const cart = useSelector(state=>state.cart);
    useEffect(()=>{
        if(productId)
            dispatch(addToCart(productId,qty));
    },[productId,qty,dispatch])
    console.log(cart)
    return (
        <div>
            <h1 style={{fontSize:"3rem"}}>Cart</h1>
            {
                cart?.cartItems?.map(item=>(

                    <div key={item.product}>
                    <h1>{item.name}</h1>
                    <h1>{item.price}</h1>
                    <h1>{item.qty}</h1>
                    <h1>{item.countInStock}</h1>
                    </div>
                ))
            }
            <p>Add to cart {productId} with qty {qty}</p>
        </div>
    )
}

export default CartScreen
