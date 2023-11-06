const express = require("express");
const router = express.Router({ mergeParams: true});
const { getFarmers, getOneFarmer, postFarmers, patchFarmers, deleteFarmer } = require("../controllers/farmers/farmers")


//  GET ALL FARMERS
router.get("/", getFarmers)

//  GET A PARTICULAR FARMER BY NAME
router.get("/:farmerName", getOneFarmer)

//  POST/ADD A FARMERS
router.post("/", postFarmers)

//  PATCH/UPDATE A PARTICULAR FARMER BY NAME
router.patch("/:farmerName", patchFarmers)

//  DELETE A PARTICULAR FARMER BY NAME
router.delete("/:farmerName", deleteFarmer)

module.exports = router;