import React from "react";
import Product from "../Components/Product";
import { data } from "../data";
function Home() {
  return (
    <>
      {data.products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </>
  );
}

export default Home;
