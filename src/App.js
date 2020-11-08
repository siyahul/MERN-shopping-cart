import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { clearCart } from "./actions/cartActions";
import "./App.css";
import Home from "./Screens/Home";
import ProductScreen from "./Screens/Products";
function App() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  function clear(){
    dispatch(clearCart())
  }
  return (
    <Router>
      <div className="app__grid">
        <header className="app__row">
          <div className="app__headerLabel">
            <Link to="/"><p>Shopping Hub</p></Link>
          </div>
          <div className="app__headerLinks">
            <button className="app__clearBtn" onClick={clear}>Clear Cart</button>
            <Link to="/cart"><i class="fa fa-shopping-cart" style={{fontSize:"1.5rem"}} aria-hidden="true"></i> {cart?.length}</Link>
            <Link to="/signIn">Sign in</Link>
          </div>
        </header>
        <main className="app__row main">
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
