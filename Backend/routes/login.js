const express = require("express");
const router = express.Router();
const { checkUserExists, ensureLoggedIn, ensureLogged, ensureCorrectUser, checkCorrectUser} = require("../controllers/auth/login")
// const {checkUserExists} = require("../controllers/index")


router.post("/", checkUserExists);

router. get("/secret" , ensureLoggedIn, ensureLogged);

router.get("/:username", ensureCorrectUser, checkCorrectUser);

module.exports = router;
