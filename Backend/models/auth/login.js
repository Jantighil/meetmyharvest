const confirmUser = "SELECT * FROM users WHERE username ILIKE $1"
const trueLogin_logs = "INSERT INTO login_logs (user_id, username, success) VALUES ($1, $2, $3) RETURNING *"
const falseLogin_logs = "INSERT INTO login_logs (user_id, username, success, provided_password) VALUES ($1, $2, $3, $4) RETURNING *"



module.exports = {confirmUser, trueLogin_logs, falseLogin_logs}