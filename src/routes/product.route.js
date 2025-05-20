const express = require("express");
const { authenticate, isSeller } = require("../middleware/auth");
const {
  createProduct,
  getProducts,
  getSingleProduct,
  deletePorduct,
  updateProduct,
} = require("../conttoller/product.contoller");
const upload = require("../congfig/multer");
const { isMyProduct } = require("../middleware/isMyProduct");

const router = express.Router();
router.route("/").get(getProducts)
.post(authenticate, isSeller,upload.array("image"), createProduct);


router.route("/:id")
.get(
  getSingleProduct
)


.delete(
  authenticate,isSeller,isMyProduct,
  deletePorduct
)
.patch(
  authenticate,
  isSeller,isMyProduct,
  updateProduct
)

module.exports = router;
