const getUser_byUsername = "SELECT * FROM users WHERE username=$1"
const addUser_todb = "INSERT INTO users (username, email, password, user_type, mobile_no) VALUES ($1, $2, $3, $4, $5) RETURNING *"
const check_userEmail = "SELECT email FROM users WHERE email=$1"
const deactivate_user = "UPDATE users SET status=1 WHERE username ILIKE $1 RETURNING *"



module.exports = {getUser_byUsername, addUser_todb, check_userEmail, deactivate_user}