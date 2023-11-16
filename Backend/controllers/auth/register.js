const db = require("../../db");
const { getUser_byUsername, addUser_todb, check_userEmail, deactivate_user } = require("../../models/index");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.getUser = async (req, res, next) => {
    try {
        const user = await db.query(getUser_byUsername, [req.params.username]);
        res.json({success: true, data: user.rows[0]});
    } catch (err) {
        return next(err);
    }
}
exports.addUser = async (req, res, next) => {
    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    try {
        const checkemail = await db.query(check_userEmail, [req.body.email]);
        if (checkemail.rows.length > 0) {
            res.json({success: false, data: "email already exists"});
        } else {
            const user = await db.query(addUser_todb, [req.body.username, req.body.email, hashedPassword, req.body.user_type, req.body.mobile_no]);
            res.json({success: true, data: user.rows[0]});    
        }
        // const user = await db.query(addUser_todb, [req.body.username, req.body.email, hashedPassword, req.body.user_type, req.body.mobile_no]);
        // res.json({success: true, data: user.rows[0]});
    } catch (err) {
        return next(err);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await db.query(deactivate_user, [req.params.userName]);
        if (user.rows.length === 0) {
            return res.status(404).send("Buyer not found!")
        }
        res.json({message: "User Deleted Successfully!!", data: user.rows[0]});
    } catch (err) {
        return next(err);
    }
}