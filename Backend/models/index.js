const {confirmUser, trueLogin_logs, falseLogin_logs} = require("../models/auth/login")
const { getUser_byUsername, addUser_todb, check_userEmail, deactivate_user } = require("../models/auth/register")



module.exports = {confirmUser, trueLogin_logs, falseLogin_logs, getUser_byUsername, addUser_todb, check_userEmail, deactivate_user}