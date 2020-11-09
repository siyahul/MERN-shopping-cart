import {  useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./App.css";
import cartScreen from "./Screens/CartScreen";
import Home from "./Screens/Home";
import ProductScreen from "./Screens/Products";
import SignIn from "./Screens/SignIn";
function App() {
  const cart = useSelector((state) => state.cart);
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
            </Link>
            <Link to="/signIn">Sign in</Link>
          </div>
        </header>
        <main className="app__row main">
          <Route path="/signin/" component={SignIn}/>
          <Route path="/cart/:id?" component={cartScreen} />
          <Route path="/products/:id" component={ProductScreen} />
          <Route path="/" component={Home} exact />
        </main>
        <footer className="app__row footer">
          <p>© SiyahulHaq 2020</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
