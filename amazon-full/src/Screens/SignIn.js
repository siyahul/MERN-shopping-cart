import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userSignin } from "../actions/userActions";
import "./Css/SignIn.css";
function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { error, userInfo } = userSignIn;
  const redirect = props.location.search? props.location.search.split('=')[1]:'/';
  const logIn = (e) => {
    e.preventDefault();
    dispatch(userSignin(email, password));
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
      <p>SignIn</p>
      <form>
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
        <button type="submit" onClick={logIn}>
          SignIn
        </button>
        <Link className="signInorSignUp" to={props.location.search? `/signup?redirect=${redirect}`:"/signup"}>Don't have an Acoount?</Link>
      </form>
      {error ? (
        <div className="error">
          <p>{error}</p>
        </div>
      ) : null}
    </div>
  );
}

export default memo(SignIn);