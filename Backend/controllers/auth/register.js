const db = require("../../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.addUser = async (req, res, next) => {
    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    try {
        const user = await db.query("INSERT INTO users (username, email, password, user_type, mobile_no) VALUES ($1, $2, $3, $4, $5) RETURNING *", [req.body.username, req.body.email, hashedPassword, req.body.user_type, req.body.mobile_no]);
        const checkemail = await db.query("SELECT email FROM users WHERE email=$1", [req.body.email]);
        
        res.json({success: true, data: user.rows[0]});
    } catch (err) {
        return next(err);
    }
}