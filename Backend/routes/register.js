const express = require("express");
const router = express.Router();
const { getUser, addUser, deleteUser } = require("../controllers/auth/register")

router.get("/users/:username", getUser);

router.post("/register", addUser);

router.delete("/deleteaccount/:userName", deleteUser);

module.exports = router;
