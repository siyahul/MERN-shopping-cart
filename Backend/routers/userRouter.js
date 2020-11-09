const express = require('express');
const bcrypt = require('bcrypt');
const data = require('../../data');
const User = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../utils');

const userRouter = express.Router();

userRouter.get("/seed",expressAsyncHandler(async(req,res)=>{
    await User.remove({});
    console.log("user");
    const createdUsers = await User.insertMany(data.users);
    res.send(createdUsers);
}))

userRouter.post('/signin',(req,res)=>{
    console.log("signin");
    console.log(req.body);
    User.findOne({email:req.body.email}).then(data=>{
        if(bcrypt.compareSync(req.body.password,data.password)){
            res.status(201).json({
                _id:data._id,
                name:data.name,
                email:data.email,
                isAdmin:data.isAdmin,
                token:generateToken(data),
            })
        }else{
            res.status(400).json({message:"Password Incorrect"})
        }
    }).catch(err=>{
        res.status(400).json({message:"User Not Found"})
    })
})

module.exports = userRouter;