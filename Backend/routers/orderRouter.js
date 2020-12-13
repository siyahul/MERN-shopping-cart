const express = require("express");
const { isAuth } = require("../../utils");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const orderRouter = express.Router();

orderRouter.get("/", isAuth, (req, res) => {
  Order.find({ userInfo: req.user._id })
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => {
      res.status(400).json({ message: "order fetch failed", error: err });
    });
});
orderRouter.get("/admin", isAuth, (req, res) => {
  Order.find()
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => {
      res.status(400).json({ message: "order fetch failed", error: err });
    });
});

orderRouter.post("/", isAuth, (req, res) => {
  if (req.body.orderItems.length <= 0) {
    res.status(400).json({ message: "Cart is Empty" });
  } else {
    const order = new Order({
      orderItems: req.body.orderItems,
      shippingAdress: req.body.shippingAdress,
      payementMethod: req.body.payementMethod,
      itemsPrice: req.body.totalAmount,
      shippingPrice: req.body.shipping,
      taxPrice: req.body.tax,
      totalPrice: req.body.netAmount,
      userInfo: req.user._id,
    });
    order
      .save()
      .then((data) => {
        res.status(200).json({ message: "order created", order: data });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "order failed create", error: err });
      });
  }
});

orderRouter.get("/:id", isAuth, (req, res) => {
  const id = req.params.id;
  Order.findById(id)
    .then((data) => {
      if (String(req.user._id) === String(data.userInfo)) {
        res.status(200).json(data);
      } else {
        res.status(401).json({ message: "Not Your Order" });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

orderRouter.put("/:id/pay", isAuth, (req, res) => {
  Order.findById(req.params.id)
    .then((order) => {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.payementResult = {
        id: req.body.id,
        status: req.body.status,
        updateTime: req.body.update_time,
        email_address: req.body.email_address,
      };
      order
        .save()
        .then((updated) => {
          res
            .status(200)
            .json({ message: "order Updated successfully", order: updated });
        })
        .catch((err) => {
          res.status(400).json({ message: "error occured", error: err });
        });
    })
    .catch((err) => {
      res.status(400).json({ message: "error occured", error: err });
    });
});

module.exports = orderRouter;
