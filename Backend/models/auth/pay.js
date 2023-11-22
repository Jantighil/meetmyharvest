const getUser_youremail = "SELECT * FROM pay WHERE username=$1"
const addUser_todb = "INSERT INTO pay (email, amount, merchant_username, merchant_email, merchant_address, product_description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"
const check_userEmail = "SELECT email FROM users WHERE email=$1"
const deactivate_user = "UPDATE users SET status=1 WHERE username ILIKE $1 RETURNING *"



module.exports = {getUser_youremail, addUser_todb, check_userEmail, deactivate_user}