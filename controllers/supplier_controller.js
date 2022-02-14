const Supplier = require("../models/supplier");
const db = require("../config/database");

class SupplierController {
  
  async createSupplier(companyName, phonenumber, country, city) {
    await db.query(
      `insert into suppliers(company_name, phone_number, country, city) values($1, $2, $3, $4);`,
      [companyName, phonenumber, country, city]
    );
  }

  async updateSupplier(supplierId, companyName, phonenumber, country, city) {
    await db.query(
      `update suppliers set company_name=$1, phone_number=$2, country=$3, city=$4 where supplier_id=$5;`,
      [companyName, phonenumber, country, city, supplierId]
    );
  }

  async deleteSupplier(supplierId) {
    await db.query(
      `delete from suppliers where supplier_id=$1`,
      [supplierId]
    );
  }

  async findSupplier(companyName) {
    const response = await db.query(
      `select * from suppliers where company_name like $1`,
      [companyName + "%"]
    );
    const suppliers = response.rows.map(row => Supplier.fromJson(row))
    return suppliers;
  }
  async getSuppliers() {
    const response = await db.query(`select * from suppliers`);
    const suppliers = response.rows.map(row => Supplier.fromJson(row))
    return suppliers;
  }
}

module.exports = SupplierController;
