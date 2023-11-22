const express = require("express");
// const helpers = require("../controllers/imgsUpload/helpers");
const router = express.Router({ mergeParams: true});
const { getAllcartProducts, getCertaincartProduct, addcartProduct, updatecartProduct, deletecartProduct} = require("../controllers/products/carts/cart")

//  GET ALL PRODUCTS
router.get("/", getAllcartProducts);

//  GET A PARTICULAR PRODUCT BY NAME
router.get("/:user_id", getCertaincartProduct)

//  POST/ADD A PRODUCT
// router.post("/", helpers.upload.single('avatar'), addProduct)
router.post("/:username", addcartProduct) // REAL ONE

//  PATCH/UPDATE A PARTICULAR PRODUCTT BY NAME
router.patch("/:productName", updatecartProduct)

//  DELETE A PARTICULAR PRODUCT BY NAME
router.delete("/:productName", deletecartProduct)

module.exports = router;