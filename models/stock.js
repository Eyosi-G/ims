const Supplier = require('./supplier')
const Product = require('./product')
class Stock {
  constructor(id, quantity, unitPrice, supplier, product, createdAt, updatedAt) {
    this.id = id;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.supplier = supplier;
    this.product = product;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(data){
    return new Stock(data.stock_id, data.quantity, data.unit_price, Supplier.fromJson(data), Product.fromJson(data), data.created_at, data.updated_at)
  }
}


module.exports = Stock;
