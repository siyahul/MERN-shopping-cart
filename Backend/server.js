const express = require("express");
const data = require("../data.js");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter.js");
const bodyParser = require('body-parser');

dotenv.config();

mongoose.connect(
  `mongodb+srv://admin:${data.passwords.mongoDb}@cluster0.sd3ae.mongodb.net/shopping?retryWrites=true&w=majority`,
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
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
/* app.use((err, req, res, next) => {
  res.status(500).send({ message: err });
}); */

app.listen(PORT, () => {
  console.log("server started on", PORT);
});
