import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {userSignUp} from '../actions/userActions'
import "./Css/SignUp.css";

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassowrd] = useState("");
  const userSignUpState = useSelector((state) => state.userSignUp);
  const { error, userInfo } = userSignUpState;
  const dispatch = useDispatch();
  const redirect = props.location.search? props.location.search.split('=')[1]:'/';

  const signUp = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      alert("PasswordMissmatch");
    } else if (email.length < 3 && password.length < 6 && name.length < 3) {
      alert("Require fields are not qualified");
    } else {
      dispatch(userSignUp(name, email, password));
    }
  };

  useEffect(() => {
    if(userInfo){
        props.history.push(redirect);
      }else{
          console.log(userInfo);
    }
}, [userInfo,redirect,props.history])

  return (
    <div className="signIn">
      <p>SignUp</p>
      <form>
        <div className="signIn__email">
          <label htmlFor="email">Name</label>
          <input
            value={name}
            name="name"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="signIn__email">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            name="email"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="signIn__email">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="signIn__email">
          <label htmlFor="cPassword">Confirm Password</label>
          <input
            value={cPassword}
            name="cPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setCPassowrd(e.target.value)}
          />
        </div>
        <button type="submit" onClick={signUp}>
          SignUp
        </button>
        <Link className="signInorSignUp" to={props.location.search? `/signin?redirect=${redirect}`:"/signin"}>
          Already have an Acoount?
        </Link>
      </form>
      {error ? (
        <div className="error">
          <p>{error}</p>
        </div>
      ) : null}
    </div>
  );
}

export default SignUp;
