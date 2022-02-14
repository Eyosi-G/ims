let _loggedInUser = null;
const updateLoginUser = (user) => { _loggedInUser = user };
const getLoggedInUser = () => _loggedInUser;

module.exports.updateLoginUser = updateLoginUser;
module.exports.getLoggedInUser = getLoggedInUser;