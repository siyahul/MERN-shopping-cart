import React,{useEffect,useState} from "react";
import {useSelector,useDispatch} from "react-redux";
import { listProducts,addProducts } from "../actions/productActions";
import Product from "../Components/Product";
import { useForm } from "../useForm";


function AppProducts() {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.productList);
  const {  product } = useSelector((state) => state.addProduct);
  const [add,setAdd] = useState(false);
  const [value, handleChange] = useForm({
      name:"",
      price:0,
      image:"",
      description:"",
      stockCount:0,
  })
  useEffect(() => {
    dispatch(listProducts());
  }, []);
  const addProduct = ()=>{
    setAdd(!add)
  }
  const handleAdd = (e)=>{
    e.preventDefault();
    dispatch(addProducts(value))
    if(product){
        setAdd(false);
    }
  }

  if (loading) {
    return (
      <div className="spinner">
        <i className="fa fa-circle-o-notch" aria-hidden="true"></i>
      </div>
    );
  } else {
    return (
      <div className="admin">
      <div onClick={addProduct} className="admin__items">
        <p>Add Product</p>
      </div>{
          !add?(
            products?.map((product) => (
                <Product key={product._id} product={product} />
              ))
          ):(
            <form className="addProduct__form">
            <label htmlFor="name">Name</label>
            <input
              value={value.name}
              onChange={handleChange}
              type="text"
              name="name"
            />
  
            <label htmlFor="price">Price</label>
            <input
              value={value.price}
              onChange={handleChange}
              type="number"
              name="price"
            />
  
            <label htmlFor="appartment">description</label>
            <textarea
              value={value.description}
              onChange={handleChange}
              type="text"
              name="description"
            />
  
            <label htmlFor="image">Image</label>
            <input
              value={value.image}
              onChange={handleChange}
              type="text"
              name="image"
            />
  
            <label htmlFor="stockCount">No. of Stocks</label>
            <input
              value={value.stockCount}
              onChange={handleChange}
              type="number"
              name="stockCount"
            />
            <button type="submit" onClick={handleAdd}>
              Add Product
            </button>
          </form>
          )
      }
        
      </div>
    );
  }
}

export default AppProducts;
