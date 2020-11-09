const mongoose = require("mongoose");

const productsScema = mongoose.Schema(
  {
    name: {type:String,required:true,unique:true},
    price: {type:Number,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
    rating: {type:Number,required:true},
    numReviews: {type:Number,required:true},
    countInStock: {type:Number,required:true},
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", productsScema);
module.exports = Products;
