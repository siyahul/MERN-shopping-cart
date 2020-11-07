import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../Components/Product";

function Home() {
  const [data,setData] = useState([]);
  useEffect(() => {
    axios.get("http://192.168.1.10:5000/api/products").then(res=>{
      setData(res)
    }).catch(err=>{
      console.log(err.message)
    })
  }, [])
  console.log(data)
  return (
    <>
      {data?.data?.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </>
  );
}

export default Home;
