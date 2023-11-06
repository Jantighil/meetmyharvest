const express = require("express");
const router = express.Router({ mergeParams: true});
const db = require("../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

