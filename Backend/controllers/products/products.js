const db = require("../../db");

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await db.query("SELECT * FROM items");
        if (products.rows.length === 0) {
            return res.status(404).send({data: "No Products found!"})
        }
        res.json({success: true, data: products.rows});
    } catch (err) {
        return next(err);
    }
}

exports.getCertainProduct = async (req, res, next) => {
    try {
        const products = await db.query("SELECT * FROM items where name ILIKE $1", [req.params.productName+'%']);
        if (products.rows.length === 0) {
            return res.status(404).send({data: "Product not found!"})
        }
        res.json({success: true, data: products.rows});
    } catch (err) {
        return next(err);
    }
}

exports.addProduct = async (req, res, next) => {
    try {
        const products = await db.query("INSERT INTO items (name, quantity, description, price, location, images) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *", 
            [req.body.name, req.body.quantity, req.body.description, req.body.price, req.body.location, req.body.images]);
        res.json({success: true, message: "Product Added Sucessfully", data: products.rows[0]});
    } catch (err) {
        return next(err);
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        const products = await db.query("UPDATE items SET quantity=$1,description=$2,price=$3,images=$4,updated_at=CURRENT_TIMESTAMP where name ILIKE $5 RETURNING *", 
            [req.body.quantity, req.body.description, req.body.price,  req.body.images, req.params.productName+'%']);
        if (products.rows.length === 0) {
            return res.status(404).send({data: "Product not found!"})
        }
        res.json({message: "Product Updated Sucessfully", data: products.rows[0]});
    } catch (err) {
        return next(err);
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const products = await db.query("DELETE FROM items where name ILIKE $1 RETURNING *", [req.params.productName+'%']);
        if (products.rows.length === 0) {
            return res.status(404).send({data: "Product does not Exists!"})
        }
        res.json({message: "Product Deleted Sucessfully", data: products.rows[0]});
    } catch (err) {
        return next(err);
    }
}