import "./App.css";
import Product from "./Components/Product";
import { data } from "./data";
function App() {
  return (
    <div className="app__grid">
      <header className="app__row">
        <div className="app__headerLabel">
          <p>Shopping Hub</p>
        </div>
        <div className="app__headerLinks">
          <a href="#">Cart</a>
          <a href="#">Products</a>
        </div>
      </header>
      <main className="app__row main">
        {data.products.map((product) => (
          <Product key={product._id} product={product}/>
        ))}
      </main>
      <footer className="app__row footer">
        <p>© SiyahulHaq 2020</p>
      </footer>
    </div>
  );
}

export default App;
