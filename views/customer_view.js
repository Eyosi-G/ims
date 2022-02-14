const inquirer = require("inquirer");
const CustomerController = require("../controllers/customer_controller");

class CustomerView {
  constructor() {
    this._customerController = new CustomerController();
  }
  displayCustomer(customer) {
    console.log("============================================");
    console.log("ID                  : " + customer.id);
    console.log("First Name          : " + customer.firstname);
    console.log("Last Name           : " + customer.lastname);
    console.log("Phonenumber         : " + customer.phonenumber);
    console.log("Birth Date          : " + customer.dob);
    console.log("Sex                 : " + customer.sex);
    console.log("============================================");
  }

  async _customersChoices() {
    const customers = await this._customerController.getCustomers();
    const { customerId } = await inquirer.prompt({
      type: "list",
      name: "customerId",
      message: "Customers",
      choices: customers.map((customer) => ({
        name: `${customer.firstname} ${customer.lastname}`,
        value: customer.id,
      })),
    });

    return customerId;
  }

  async insertCustomer() {
    try {
      const { first_name, last_name, phonenumber, dob, sex } =
        await inquirer.prompt([
          { name: "first_name", message: "First Name" },
          { name: "last_name", message: "Last Name" },
          { name: "phonenumber", message: "Phonenumber" },
          { name: "dob", message: "Birth Date" },
          {
            name: "sex",
            message: "Sex",
            type: "list",
            choices: [{ name: "male" }, { name: "female" }],
          },
        ]);
      const ui = new inquirer.ui.BottomBar();
      ui.updateBottomBar("loading ...");
      await this._customerController.createCustomer(
        first_name,
        last_name,
        phonenumber,
        dob,
        sex
      );
      ui.updateBottomBar("successfully created \n");
    } catch (e) {
      console.log(e);
    }
  }

  async updateCustomer() {
    try {
      const customerId = await this._customersChoices();
      const { first_name, last_name, phonenumber, dob, sex } =
        await inquirer.prompt([
          { name: "first_name", message: "First Name" },
          { name: "last_name", message: "Last Name" },
          { name: "phonenumber", message: "Phonenumber" },
          { name: "dob", message: "Birth Date" },
          {
            name: "sex",
            message: "Sex",
            type: "list",
            choices: [{ name: "male" }, { name: "female" }],
          },
        ]);

      const ui = new inquirer.ui.BottomBar();
      ui.updateBottomBar("loading ...");
      await this._customerController.updateCustomer(
        customerId,
        first_name,
        last_name,
        phonenumber,
        dob,
        sex
      );
      ui.updateBottomBar("updated succesfully !\n");
    } catch (e) {
      console.log(e);
    }
  }

  async displayCustomers() {
    const ui = new inquirer.ui.BottomBar();
    ui.updateBottomBar("loading ...");
    const customers = await this._customerController.getCustomers();
    ui.updateBottomBar("");
    customers.map((customer) => this.displayCustomer(customer));
  }

  async deleteCustomer() {
    try {
      const customerId = await this._customersChoices();
      const ui = new inquirer.ui.BottomBar();
      ui.updateBottomBar("loading ...");
      await this._customerController.deleteCustomer(
        customerId
      );
      ui.updateBottomBar("successfully deleted \n");
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = CustomerView;
