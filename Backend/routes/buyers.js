const express = require("express");
const router = express.Router({ mergeParams: true});
const { getBuyers, getOneBuyer, postBuyers, patchBuyer, deleteBuyer } = require("../controllers/buyers/buyers")
const { patchBuyerPassword, checkoldPassword} = require("../controllers/buyers/changePassword")


//  GET ALL BUYERS
router.get("/", getBuyers)

//  GET A PARTICULAR BUYER BY NAME
router.get("/:buyerName", getOneBuyer)

//  POST/ADD A BUYERS
router.post("/", postBuyers)

//  PATCH/UPDATE A PARTICULAR BUYER BY NAME
router.patch("/:buyerName", patchBuyer)

//  DELETE A PARTICULAR BUYER BY NAME
router.delete("/:buyerName", deleteBuyer)

//  GET A PARTICULAR BUYER OLDPASSWORD BY NAME
router.post("/oldpassword/:buyerName", checkoldPassword)

//  PATCH/UPDATE A PARTICULAR BUYER'S PASSWORD BY NAME
router.patch("/passwordchange/:buyerName", patchBuyerPassword)

module.exports = router;