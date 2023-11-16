const db = require("../../db");
const { confirmUser, trueLogin_logs, falseLogin_logs } = require("../../models/index");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

exports.checkUserExists = async (req, res, next) => {
    try {
        const user = await db.query(confirmUser, [req.body.username]);
        let userPassword = user.rows[0].password;
        if (user.rows.length === 0) {
            return res.json({ message: "Invalid Username" });
        }
        let comparePassword = await bcrypt.compare(req.body.password, userPassword)
        
        // ADD LOGIN LOGS TO DATABASE
        if (comparePassword === true) {
            var addLogs = await db.query(trueLogin_logs, 
                [user.rows[0].user_id, user.rows[0].username, comparePassword]);
        }
        if (comparePassword === false) {
            var getWrongPassword = await db.query(falseLogin_logs, 
                [user.rows[0].user_id, user.rows[0].username, comparePassword, req.body.password]);
            return res.json({ message: "Invalid Password" });
        }
        const token = jsonwebtoken.sign({ username: user.rows[0].username}, SECRET , { expiresIn: 60 * 60 } );
            // the first parameter is an object which will become the payload of the token
            // the second parameter is the secret key we are using to "sign" or encrypt the token
            // the third parameter is an object where we can specify certain properties of the token 
            // expire in one hour
            
        // res.json({match: comparePassword, data: user.rows[0], logs: addLogs.rows[0]});
        res.json({match: comparePassword, data: user.rows, logs: addLogs.rows[0], token});
    } catch (err) {
        return next(err);
    }
}

exports.ensureLoggedIn = function (req, res, next) {
    try {
        const authHeaderValue = req.headers.authorization;
        console.log(authHeaderValue.split(" "));
        const token = jsonwebtoken.verify (authHeaderValue.split(" ")[1], SECRET );
        console.log(token);
        return next();
    } catch (e) {
        return res.status (401).json({ message: "Unauthorized" });
    }
}

exports.ensureLogged = async function (req, res, next) {
    try {
        return res.json({ message: "You made it!" });
    } catch (err) {
        return res.json(err);
    }
}


// helpful middleware to make sure the username stored on the token is the same as the request
exports.ensureCorrectUser = function (req, res, next) {
    try {
        const authHeaderValue= req.headers.authorization;
        const token = jsonwebtoken.verify(authHeaderValue.split(' ')[1], SECRET);
        if (token.username === req.params.email) {
            return next();
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (e) {
        return res.status(401).json({ message: "Unauthorized" });
    }
   }

exports.checkCorrectUser = async function(req, res, next) {
    try {
        return res.json({ message: "You made it!" });
    } catch (err) {
        return res.json(err);
    }
}
