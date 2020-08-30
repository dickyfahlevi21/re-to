const express = require("express");
const router = express.Router();
const { multerUploads } = require("../controllers/Upload");
const ProductController = require("../controllers/ProductController");

router
  .route("/")
  .get(ProductController.getProducts)
  .delete(ProductController.deleteProductsById);
router
  .route("/:id")
  .get(ProductController.getProductsById)
  .patch(ProductController.updateProducts);

module.exports = router;
