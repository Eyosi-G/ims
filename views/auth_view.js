const inquirer = require("inquirer");
const AuthController = require("../controllers/auth_controller");
const AdminView = require("./admin_view");
const { updateLoginUser } = require('../config/user')
class AuthView {

  constructor() {
    this.authController = new AuthController();
    this.adminView = new AdminView(this);
  }

  async loginMenu() {
    try {
      const { username, password } = await inquirer.prompt([
        {
          type: "input",
          name: "username",
          message: "username",
        },
        {
          type: "input",
          name: "password",
          message: "password",
        },
      ]);

      const user = await this.authController.authenticate(username, password);
      if (user) {
        updateLoginUser(user);
        return this.adminView.showAdminMainMenu();
      }
    } catch (e) {
      console.log(e)
      console.log("auth failed !");
    }
  }

  async showMenu() {
    const { mainMenu } = await inquirer.prompt({
      type: "list",
      message: "Main Menu",
      name: "mainMenu",
      choices: [
        { type: "choice", name: "login" },
        { type: "choice", name: "exit" },
      ],
    });
    switch (mainMenu) {
      case "login": {
        await this.loginMenu();
        break;
      }
      case "exit": {
        break;
      }
    }
  }
}

module.exports = AuthView;
