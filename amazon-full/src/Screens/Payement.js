import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPayementMethod } from "../actions/cartActions";
import ProgressBar from "../Components/ProgressBar";
import "./Css/Payement.css";

function Payement(props) {
  const cart = useSelector(state => state.cart)
  const [payementMethod, setpayementMethod] = useState("paypal");
  const dispatch = useDispatch();
  useEffect(()=>{
    if(!cart.shippingAdress){
      props.history.push('/shipping')
    }
  },[])
  const payement = (e) => {
    e.preventDefault();
    dispatch(addPayementMethod(payementMethod));
    props.history.push('/placeorder');
  };
  return (
    <div className="payement">
      <ProgressBar payment />
      <div className="payement__method">
        <p> Payement Method</p>
        <form>
          <div className="payement__method__payPal">
            <input
              id="paypal"
              type="radio"
              value="paypal"
              name="payementMethod"
              required
              checked
              onChange={() => setpayementMethod("paypal")}
            />
            <label htmlFor="paypal">Paypal</label>
          </div>
          <div className="payement__method__stripe">
            <input
              id="stripe"
              type="radio"
              value="stripe"
              name="payementMethod"
              required
              onChange={() => setpayementMethod("stripe")}
            />
            <label htmlFor="stripe">Stripe</label>
          </div>
          <button type="submit" onClick={payement}>
            Countinue
          </button>
        </form>
      </div>
    </div>
  );
}

export default memo(Payement);
