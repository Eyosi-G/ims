const Stock = require("../models/stock");
const Supplier = require("../models/supplier");
const Product = require("../models/product");
const db = require("../config/database");

class StockController {
  async addToStock(productId, supplierId, unitPrice, quantity) {
    await db.query(`select insert_stock($1, $2, $3, $4)`, [
      quantity,
      unitPrice,
      supplierId,
      productId,
    ]);
  }

  async getAllStocks() {
    const response = await db.query(`select * from get_stock_items()`);
    const stocks = response.rows.map((row) => Stock.fromJson(row));
    return stocks;
  }

  async deleteStock(stockId) {
    await db.query(`select delete_stock($1)`, [stockId]);
  }

  async updateStock(stockId, productId, supplierId, unitPrice, quantity) {
    await db.query(`select update_stock($1, $2, $3, $4, $5)`, [
      stockId,
      productId,
      supplierId,
      unitPrice,
      quantity,
    ]);
  }
  async findStock(productName){
    const response = await db.query(`select * from get_stock_items($1)`,[productName]);
    const stocks = response.rows.map((row) => Stock.fromJson(row));
    return stocks;
  }
}

module.exports = StockController;
