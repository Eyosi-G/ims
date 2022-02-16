const Sale = require("../models/sale");
const db = require("../config/database");

class SalesController {
  async createSales(quantity, unitPrice, stockId, customerId) {
    return await db.query(`select insert_sales($1,$2,$3,$4) `, [
      quantity,
      unitPrice,
      stockId,
      customerId,
    ]);
  }
  async updateSales(salesId, quantity, unitPrice, stockId, customerId) {
    return await db.query(
      `update sales set quantity=$1, unit_price=$2, stock_id=$3, customer_id=$4 where sales_id=$5`,
      [quantity, unitPrice, stockId, customerId, salesId]
    );
  }
  async getSales() {
    const response = await db.query(
      `select * from get_sales()`
    );
    const sales = response.rows.map((row) => Sale.fromJson(row));
    return sales;
  }
  async deleteSale(id) {
    await db.query(`delete from sales where sales_id=$1`, [id]);
  }
}

module.exports = SalesController;
