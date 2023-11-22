const db = require("../../../db");
// const {upload, cloudinary} = require("../imgsUpload/helpers");

exports.getAllcartProducts = async (req, res, next) => {
    try {
        const cartproducts = await db.query("SELECT * FROM cart");
        if (cartproducts.rows.length === 0) {
            return res.status(404).send({data: "No cartProducts found!"})
        }
        res.json({success: true, data: cartproducts.rows});
    } catch (err) {
        return next(err);
    }
}

exports.getCertaincartProduct = async (req, res, next) => {
    try {
        const cartproducts = await db.query(`SELECT u.user_id, u.username, itms.item_id, itms.name, itms.quantity,itms.price,itms.location,itms.img_url 
                                                FROM users u 
                                                JOIN cart ct ON u.user_id=ct.user_id
                                                JOIN items itms ON ct.item_id = itms.item_id
                                                WHERE ct.user_id = $1
                                                ORDER BY u.user_id`,
                                                [req.params.user_id]);
        if (cartproducts.rows.length === 0) {
            return res.status(404).send({data: "Product not found!"})
        }
        res.json({success: true, data: cartproducts.rows});
    } catch (err) {
        return next(err);
    }
}

exports.addcartProduct = async (req, res, next) => {
    try {
        // const img = req.file;
        // try {
        //     var result = await cloudinary.uploader.upload(`${img.path}`, {folder: "meetmyharvest"})
        //     console.log({message: "image uploaded successfully!"}); 
        //   } catch (error) {
        //     return error;
        //   }
        
        `SELECT u.user_id, u.username, itms.item_id, itms.name, itms.quantity,itms.price,itms.location,itms.img_url 
            FROM users u 
            JOIN cart ct ON u.user_id=ct.user_id
            JOIN items itms ON ct.item_id = itms.item_id
            WHERE ct.user_id = 16
            ORDER BY u.user_id`

        const user = await db.query("SELECT user_id FROM users WHERE username ILIKE $1", [req.params.username]);
        const item = await db.query("SELECT item_id FROM items WHERE name ILIKE $1", [req.body.pr]);

        const cartproducts = await db.query("INSERT INTO cart (user_id, item_id) VALUES ($1,$2) RETURNING *", 
            [req.body.name, req.body.quantity]);
        res.json({success: true, message: "Product Added Sucessfully", imgData: result, data: cartproducts.rows[0]});
    } catch (err) {
        return next(err);
    }
}

exports.updatecartProduct = async (req, res, next) => {
    try {
        const cartproducts = await db.query("UPDATE items SET quantity=$1,description=$2,price=$3,images=$4,updated_at=CURRENT_TIMESTAMP where name ILIKE $5 RETURNING *", 
            [req.body.quantity, req.body.description, req.body.price,  req.body.images, req.params.productName+'%']);
        if (cartproducts.rows.length === 0) {
            return res.status(404).send({data: "Product not found!"})
        }
        res.json({message: "Product Updated Sucessfully", data: cartproducts.rows[0]});
    } catch (err) {
        return next(err);
    }
}

exports.deletecartProduct = async (req, res, next) => {
    try {
        const cartproducts = await db.query("DELETE FROM items where name ILIKE $1 RETURNING *", [req.params.productName+'%']);
        if (cartproducts.rows.length === 0) {
            return res.status(404).send({data: "Product does not Exists!"})
        }
        res.json({message: "Product Deleted Sucessfully", data: cartproducts.rows[0]});
    } catch (err) {
        return next(err);
    }
}