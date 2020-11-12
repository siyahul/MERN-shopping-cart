import React, { memo, useEffect } from "react";
import ProgressBar from "../Components/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../useForm";
import "./Css/Shipping.css";
import { addShippingAddress } from "../actions/cartActions";
import { useHistory } from "react-router-dom";

function Shipping(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const userSignIn = useSelector((state) => state.userSignIn);
  const [value, handleChange] = useForm({
    fullName: cart.shippingAdress?.fullName
      ? cart.shippingAdress?.fullName
      : "",
    mobile: cart.shippingAdress?.mobile ? cart.shippingAdress?.mobile : "",
    appartment: cart.shippingAdress?.appartment
      ? cart.shippingAdress?.appartment
      : "",
    street: cart.shippingAdress?.street ? cart.shippingAdress?.street : "",
    city: cart.shippingAdress?.city ? cart.shippingAdress?.city : "",
    state: cart.shippingAdress?.state ? cart.shippingAdress?.state : "",
    pincode: cart.shippingAdress?.pincode ? cart.shippingAdress?.pincode : "",
  });
  useEffect(() => {
    if (!userSignIn.userInfo) props.history.push("/signin");
  }, [props.history, userSignIn.userInfo]);
  const addAddress = (e) => {
    e.preventDefault();
    if (
      value.fullName !== "" &&
      value.mobile !== "" &&
      value.appartment !== "" &&
      value.street !== "" &&
      value.city !== "" &&
      value.state !== "" &&
      value.pincode !== ""
    ) {
      dispatch(
        addShippingAddress({
          fullName: value.fullName,
          mobile: value.mobile,
          appartment: value.appartment,
          street: value.street,
          city: value.city,
          state: value.state,
          pincode: value.pincode,
        })
      );
      history.push("/payement");
    } else {
      alert("Enter Required Fields");
    }
  };

  return (
    <div className="shipping">
      <ProgressBar shipping />
      <div className="Shipping__address">
        <form>
          <label htmlFor="fullName">FullName</label>
          <input
            value={value.fullName}
            onChange={handleChange}
            type="text"
            name="fullName"
          />

          <label htmlFor="mobile">Mobile</label>
          <input
            value={value.mobile}
            onChange={handleChange}
            type="number"
            name="mobile"
          />

          <label htmlFor="appartment">Appartment No.</label>
          <input
            value={value.appartment}
            onChange={handleChange}
            type="text"
            name="appartment"
          />

          <label htmlFor="street">Street</label>
          <input
            value={value.street}
            onChange={handleChange}
            type="text"
            name="street"
          />

          <label htmlFor="city">City</label>
          <input
            value={value.city}
            onChange={handleChange}
            type="text"
            name="city"
          />

          <label htmlFor="state">State</label>
          <input
            value={value.state}
            onChange={handleChange}
            type="text"
            name="state"
          />

          <label htmlFor="pincode">PinCode</label>
          <input
            value={value.pincode}
            onChange={handleChange}
            type="number"
            name="pincode"
          />

          <button type="submit" onClick={addAddress}>
            Add Address
          </button>
        </form>
      </div>
    </div>
  );
}

export default memo(Shipping);
