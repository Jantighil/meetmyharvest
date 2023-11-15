const db = require("../../db");


exports.getBuyers = async (req, res, next) => {
    try {
        const buyers = await db.query("SELECT * FROM buyers");
        if (buyers.rows.length === 0) {
            return res.status(404).send("No buyers found!")
        }
        res.json(buyers.rows)
    } catch (err) {
        return next(err);
    }
}

exports.getOneBuyer = async (req, res, next) => {
    try {
        const buyers = await db.query("SELECT * FROM buyers WHERE username ILIKE $1", [req.params.buyerName]);
        if (buyers.rows.length === 0) {
            return res.status(404).send("Buyers not found!")
        }
        res.json(buyers.rows)
    } catch (err) {
        return next(err);
    }           
}

exports.postBuyers = async (req, res, next) => {
    try {
        const buyerUser = await db.query("SELECT user_id FROM users WHERE username ILIKE $1", [req.params.username]);
        const buyer = await db.query("INSERT INTO buyers (buyer_id, firstname, lastname, username, email, location, mobile_no, dp_public_id, dp_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", 
            [buyerUser.rows[0].user_id, req.body.fname, req.body.lname, req.params.username, req.body.mail, req.body.place, req.body.mobile, req.body.dp_public_id, req.body.dp_url]);
        res.json({message: "Buyer Added Successfully!!", data: buyer.rows[0]});
    } catch (err) {
        return next(err);
    }
}

// exports.postBuyers = async (req, res, next) => {
//     try {
//         const checkUserExists = await db.query("SELECT * FROM buyers WHERE username ILIKE $1", [req.params.username]);
//         console.log(checkUserExists.rows[0]);
//         console.log(checkUserExists.rows.length);

//         if (checkUserExists.rows.length !== 0) {
//             const buyerUser = await db.query("SELECT user_id FROM users WHERE username ILIKE $1", [req.body.username]);
//             const buyer = await db.query("UPDATE buyers SET firstname=$1, lastname=$2, email=($3), location=($4), mobile_no=($5) WHERE username ILIKE $6 RETURNING *", 
//                 [req.body.fname, req.body.lname, req.body.mail, req.body.place, req.body.mobile, req.params.buyerName]);
//             if (buyer.rows.length === 0) {
//                 return res.status(404).send("Buyer not found!")
//             }
//         } else {
//             const buyerUser = await db.query("SELECT user_id FROM users WHERE username ILIKE $1", [req.params.username]);
//             const buyer = await db.query("INSERT INTO buyers (buyer_id, firstname, lastname, username, email, location, mobile_no, profile_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", 
//                 [buyerUser.rows[0].user_id, req.body.fname, req.body.lname, req.params.username, req.body.mail, req.body.place, req.body.mobile, req.body.profile_image]);
//             res.json({message: "Buyer Added Successfully!!", data: buyer.rows[0]});
//         }
//     } catch (err) {
//         return next(err);
//     }
// }

exports.patchBuyer = async (req, res, next) => {
    try {
        const buyerUser = await db.query("SELECT user_id FROM users WHERE username ILIKE $1", [req.body.username]);
        const buyer = await db.query("UPDATE buyers SET firstname=$1, lastname=$2, email=($3), location=($4), mobile_no=($5) WHERE username ILIKE $6 RETURNING *", 
            [req.body.firstname, req.body.lastname, req.body.email, req.body.location, req.body.mobile_no, req.params.buyerName]);
        if (buyer.rows.length === 0) {
            return res.status(404).send("Buyer not found!")
        }
        res.json({message: "Buyer Updated Successfully!!", data: buyer.rows[0]});
    } catch (err) {
        return next(err);
    }
}

exports.deleteBuyer = async (req, res, next) => {
    try {
        const buyer = await db.query("DELETE FROM buyers WHERE username ILIKE $1 RETURNING *", [req.params.buyerName]);
        if (buyer.rows.length === 0) {
            return res.status(404).send("Buyer not found!")
        }
        res.json({message: "Buyer Deleted Successfully!!", data: buyer.rows[0]});
    } catch (err) {
        return next(err);
    }
}