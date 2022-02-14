const Customer = require("../models/customer");
const db = require("../config/database");

class CustomerController {
  async createCustomer(firstname, lastname, phonenumber, dob, sex) {
    await db.query(
      "insert into customers(first_name, last_name, phone_number, dob, sex) values ($1, $2, $3, $4, $5);",
      [firstname, lastname, phonenumber, dob, sex]
    );
  }

  async deleteCustomer(id) {
    await db.query("delete from customers where customer_id = $1", [1]);
  }

  async updateCustomer(id, firstname, lastname, phonenumber, dob, sex) {
    await db.query(
      "update customers set first_name=$1, last_name=$2, phone_number=$3, dob=$4, sex=$5 where customer_id = $6",
      [firstname, lastname, phonenumber, dob, sex, id]
    );
  }

  async getCustomers() {
    const response = await db.query("select * from only customers");
    const customers = response.rows.map((row) => Customer.fromJson(row));
    return customers;
  }
}

module.exports = CustomerController;
