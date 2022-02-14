const User = require("../models/user");
const db = require("../config/database");
class AuthController {
  async authenticate(username, password) {
    const response = await db.query(
      `select * from credentials where username=$1 and password=$2`,
      [username, password]
    );
    return User.fromData(response.rows[0]);
  }
}

module.exports = AuthController;
