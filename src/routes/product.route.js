const express = require("express");
const { authenticate, isSeller } = require("../middleware/auth");
const {
  createProduct,
  getProducts,
} = require("../conttoller/product.contoller");
const upload = require("../congfig/multer");

const router = express.Router();
router.route("/").get(getProducts)
.post(authenticate, isSeller,upload.array("image"), createProduct);
// router.route("/:id").get().delete().patch()

module.exports = router;
