const express = require("express");
const helpers = require("../controllers/imgsUpload/helpers");
const router = express.Router({ mergeParams: true});
const { getAllProducts, getCertainProduct, addProduct, updateProduct, deleteProduct} = require("../controllers/products/products")

//  GET ALL PRODUCTS
router.get("/", getAllProducts);

//  GET A PARTICULAR PRODUCT BY NAME
router.get("/:productName", getCertainProduct)

//  POST/ADD A PRODUCT
router.post("/", helpers.upload.single('avatar'), addProduct)
// router.post("/", addProduct) REAL ONE

//  PATCH/UPDATE A PARTICULAR PRODUCTT BY NAME
router.patch("/:productName", updateProduct)

//  DELETE A PARTICULAR PRODUCT BY NAME
router.delete("/:productName", deleteProduct)

module.exports = router;