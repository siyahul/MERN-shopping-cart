const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter.js");
const bodyParser = require("body-parser");
const orderRouter = require("./routers/orderRouter");
const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  console.log("connected");
  socket.on('disconnect', () => {
    console.log('disconnect');
  })
  socket.on('email',(email)=>{
    console.log(email);
  })
})

mongoose.connect(
  `mongodb+srv://admin:${process.env.MONGO_DB_PASSWORD}@cluster0.sd3ae.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("Mongo DB Connected");
  }
);


app.use(cors());
app.use(bodyParser.json());

app.use('/api/orders',orderRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.get('/api/config/paypal',(req, res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID || 'SB');
})

app.use((err, req, res, next) => {
  res.status(500).send({ message: err });
  console.log(err);
});

http.listen(PORT, () => {
  console.log("server started on", PORT);
});
