const express = require("express");
const { authenticate, isBuyer } = require("../middleware/auth");
const {
  createProduct,
  getProducts,
} = require("../conttoller/product.contoller");
const { createOrder } = require("../conttoller/order.controller");

const router = express.Router();
router.route("/")
.post(authenticate, isBuyer, createOrder);

// router.route("/:id").get().delete().patch()

module.exports = router;
