class User {
  constructor(id, username) {
    this.id = id;
    this.username = username;
  }

  static fromData(data) {
    return new User(data.credential_id, data.username);
  }
}

module.exports = User;
