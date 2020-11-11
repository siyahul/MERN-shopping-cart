import { memo } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { userSignOut } from "./actions/userActions";
import "./App.css";
import cartScreen from "./Screens/CartScreen";
import Home from "./Screens/Home";
import Payement from "./Screens/Payement";
import PlaceOrder from "./Screens/PlaceOrder";
import ProductScreen from "./Screens/Products";
import Shipping from "./Screens/Shipping";
import SignIn from "./Screens/SignIn";
import SignUp from "./Screens/SignUp";


function App() {
  const cart = useSelector((state) => state.cart);
  const userSignIn = useSelector(state=>state.userSignIn);
  const dispatch = useDispatch();
  const {userInfo} =userSignIn;
  const signOut =()=>{
    dispatch(userSignOut());
  }
  return (
    <Router>
      <div className="app__grid">
        <header className="app__row">
          <div className="app__headerLabel">
            <Link to="/">
              <p>Shopping Hub</p>
            </Link>
          </div>
          <div className="app__headerLinks">
            <Link to="/cart">
              <i
                className="fa fa-shopping-cart"
                style={{ fontSize: "1.5rem" }}
                aria-hidden="true"
              ></i>{" "}
              {cart?.cartItems?.length>0 ? (
                <span className="numberOfItems">{cart.cartItems.length}</span>
              ) : null}
            </Link>{
              userInfo && userInfo.status===200?
              <div className="app__dropDown">
              <Link to="#"><span>{userInfo.data.name} <i className="fa fa-caret-down"></i></span></Link>
              <ul>
                <Link to="#signout" onClick={signOut}>SignOut</Link>
              </ul>
              </div>
              :
              <Link to="/signin">SignIn</Link>
            }
            
          </div>
        </header>
        <main className="app__row main">
        <Route path="/cart/:id?" component={cartScreen} />
        <Route path="/products/:id" component={ProductScreen} />
        <Route path="/placeorder" component={PlaceOrder} />
        <Route path="/payement" component={Payement} />
        <Route path="/shipping" component={Shipping} />
        <Route path="/signup/" component={SignUp}/>
        <Route path="/signin/" component={SignIn}/>
          <Route path="/" component={Home} exact />
        </main>
        <footer className="app__row footer">
          <p>© SiyahulHaq 2020</p>
        </footer>
      </div>
    </Router>
  );
}

export default memo(App);
