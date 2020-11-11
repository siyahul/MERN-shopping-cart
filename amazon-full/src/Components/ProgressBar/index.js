import React, { memo } from 'react';
import "./ProgressBar.css"

function ProgressBar({shipping,payment,placeOrder}) {
    return (
        <div className="progreessBar">
                <div className={shipping || payment? "progress active":"progress"}>
                    <p>Sign in</p>
                </div>
                <div className={shipping || payment? "progress active":"progress"}>
                    <p>Shipping</p>
                </div>
                <div className={placeOrder || payment? "progress active":"progress"}>
                    <p>Payement</p>
                </div>
                <div className={placeOrder ? "progress active":"progress"}>
                    <p>Place Order</p>
                </div>
            </div>
    )
}

export default memo(ProgressBar);
