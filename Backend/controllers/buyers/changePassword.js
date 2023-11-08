const db = require("../../db");
const bcrypt = require("bcrypt");
const saltRounds = 5;


exports.checkoldPassword = async (req, res, next) => {
    try {
        const user = await db.query("SELECT * FROM users WHERE username ILIKE $1", [req.params.buyerName]);
        console.log(user);
        let userPassword = user.rows[0].password;
        let comparePassword = await bcrypt.compare(req.body.oldpassword, userPassword)

        if (comparePassword === true) {
            res.json({message: comparePassword, data: user.rows[0]});
        } else {
            res.json({message: comparePassword, data: user.rows[0]});
        }
        if (user.rows.length === 0) {
            return res.status(404).send("User not found!")
        }
    } catch (err) {
        return next(err);
    }
}

exports.patchBuyerPassword = async (req, res, next) => {
    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    try {
        const passwordUpdate = await db.query("UPDATE users SET password=$1 WHERE username ILIKE $2 RETURNING *", 
            [hashedPassword, req.params.buyerName]);
        if (passwordUpdate.rows.length === 0) {
            return res.status(404).send("User not found!")
        }
        res.json({message: "Password Updated Successfully!!", data: passwordUpdate.rows[0]});
    } catch (err) {
        return next(err);
    }
}
