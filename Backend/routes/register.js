const express = require("express");
const router = express.Router();
const { addUser, deleteUser } = require("../controllers/auth/register")

router.post("/register", addUser);

router.delete("/deleteaccount/:userName", deleteUser);

module.exports = router;
