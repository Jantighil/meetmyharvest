const express = require("express");
const router = express.Router();
const { addUser } = require("../controllers/auth/register")

router.post("/register", addUser);

module.exports = router;
