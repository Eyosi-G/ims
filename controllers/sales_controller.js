const Sale = require("../models/sale");
const db = require('../config/database')

class SalesController {
  async createSales(quantity, unitPrice, productId, customerId) {
    return await db.query(`insert into sales(quantity, unit_price, product_id, customer_id) values ($1, $2, $3, $4)`, [quantity, unitPrice, productId, customerId])
  }
  async updateSales(salesId, quantity, unitPrice, productId, customerId) {
    return await db.query(`update sales set quantity=$1, unit_price=$2, product_id=$3, customer_id=$4 where sales_id=$5`, [quantity, unitPrice, productId, customerId,salesId])
  }
  async getSales() {
    const response =  await db.query(`select distinct * from sales join products_data on products_data.product_id = sales.product_id join customers on customers.customer_id = sales.customer_id `)
    const sales = response.rows.map(row => Sale.fromJson(row))
    return sales;
  }
  async deleteSale(id) {
    await db.query(`delete from sales where sales_id=$1`,[id])
  }
}

module.exports = SalesController;
