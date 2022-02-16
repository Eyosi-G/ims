const Customer = require("../models/customer");
const db = require("../config/database");

class CustomerController {
  async createCustomer(firstname, lastname, phonenumber, dob, sex) {
    await db.query(
      "select insert_customer($1, $2, $3, $4, $5)",
      [firstname, lastname, phonenumber, dob, sex]
    );
  }

  async deleteCustomer(id) {
    await db.query("delete from customers where customer_id = $1", [id]);
  }

  async updateCustomer(id, firstname, lastname, phonenumber, dob, sex) {
    await db.query(
      "select update_customer($1, $2, $3, $4, $5, $6)",
      [id, firstname, lastname, phonenumber, dob, sex]
    );
  }

  async getCustomers() {
    const response = await db.query("select * from only customers");
    const customers = response.rows.map((row) => Customer.fromJson(row));
    return customers;
  }
}

module.exports = CustomerController;
