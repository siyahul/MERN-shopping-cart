import React, { useEffect } from "react";
import Product from "../Components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

function Home() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  useEffect(() => {
    dispatch(listProducts());
  }, []);
  return (
    <>
      {productList?.products?.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </>
  );
}

export default Home;
