const db = require("../../db");
const bcrypt = require("bcrypt");
const saltRounds = 5;

exports.getFarmers = async (req, res, next) => {
    try {
        const farmers = await db.query("SELECT * FROM farmers");
        if (farmers.rows.length === 0) {
            return res.status(404).send("No Farmers found!")
        }
        res.json(farmers.rows)
    } catch (err) {
        return next(err);
    }
}

exports.getOneFarmer = async (req, res, next) => {
    try {
        const farmers = await db.query("SELECT * FROM farmers WHERE username ILIKE $1", [req.params.farmerName]);
        if (farmers.rows.length === 0) {
            return res.status(404).send("Farmer not found!")
        }
        res.json(farmers.rows)
    } catch (err) {
        return next(err);
    }           
}

exports.postFarmers = async (req, res, next) => {
    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    console.log("Hash: ", hashedPassword);
    try {
        const farmer = await db.query("INSERT INTO farmers (username, email, password, mobile_no) VALUES ($1, $2, $3, $4) RETURNING *", [req.body.username, req.body.email, hashedPassword, req.body.mobile_no]);
        // const farmerUser = await db.query("INSERT INTO users (username, email, password, user_type, mobile_no) VALUES ($1, $2, $3, $4, $5) RETURNING *", [req.body.username, req.body.email, hashedPassword, req.body.user_type, req.body.mobile_no]);
        res.json({message: "Farmer Added Successfully!!", data: farmer.rows[0]});
    } catch (err) {
        return next(err);
    }
}

exports.patchFarmers = async (req, res, next) => {
    try {
        const farmer = await db.query("UPDATE farmers SET username=($1), email=($2), password=($3), mobile_no=($4) WHERE username ILIKE $5 RETURNING *", [req.body.username, req.body.email, hashedPassword, req.body.mobile_no, req.params.farmerName]);
        // const farmerUser = await db.query("UPDATE users SET username=($1), email=($2), password=($3), mobile_no=($4) WHERE username=$5 RETURNING *", [req.body.username, req.body.email, hashedPassword, req.body.mobile_no, req.params.farmerName]);
        if (farmer.rows.length === 0) {
            return res.status(404).send("Farmer not found!")
        }
        res.json({message: "Farmer Updated Successfully!!", data: farmer.rows[0]});
    } catch (err) {
        return next(err);
    }
}

exports.deleteFarmer = async (req, res, next) => {
    try {
        const farmer = await db.query("DELETE FROM farmers WHERE username ILIKE $1 RETURNING *", [req.params.farmerName]);
        if (farmer.rows.length === 0) {
            return res.status(404).send("Farmer not found!")
        }
        res.json({message: "Farmer Deleted Successfully!!", data: farmer.rows[0]});
    } catch (err) {
        return next(err);
    }
}