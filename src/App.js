import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./App.css";
import Home from "./Screens/Home";
import ProductScreen from "./Screens/Products";
function App() {
  return (
    <Router>
      <div className="app__grid">
        <header className="app__row">
          <div className="app__headerLabel">
            <Link to="/"><p>Shopping Hub</p></Link>
          </div>
          <div className="app__headerLinks">
            <a href="#">Cart</a>
            <a href="#">Products</a>
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
