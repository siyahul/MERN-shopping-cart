const express = require('express');
const data = require("./data.js");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors());

app.get("/api/products",(req,res)=>{
    res.status(200).json(data.products)
})

app.get("/api/products/:id",(req,res)=>{
    const id = req.params.id;
    const product = data.products.find((product)=> String(product._id) == id);
    res.status(200).json(product)
})

app.listen(PORT,()=>{
    console.log('server started on',PORT);
})