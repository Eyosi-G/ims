const Customer = require('./customer')
const Product = require('./product')
class Sale {
  constructor(
    id,
    quantity,
    unitPrice,
    product,
    customer,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.product = product;
    this.customer = customer;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(data){
    return new Sale(data.sales_id, data.quantity, data.unit_price, Product.fromJson(data), Customer.fromJson(data), data.created_at, data.updated_at)
  }
}

module.exports = Sale;
