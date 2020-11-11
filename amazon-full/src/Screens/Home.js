import React, { memo, useEffect } from "react";
import Product from "../Components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

function Home() {
  const dispatch = useDispatch();
  const {loading,products} = useSelector((state) => state.productList);
  useEffect(() => {
    dispatch(listProducts());
  }, []);
  if(loading){
    return (
      <div className="spinner">
      <i className="fa fa-circle-o-notch" aria-hidden="true"></i>
      </div>
    )
  }else{
    return (
      <>
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </>
    );
  }
}

export default memo(Home);
