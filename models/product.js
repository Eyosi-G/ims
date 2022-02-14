class Product {
  constructor(id, name, description) {
    this.name = name;
    this.description = description;
    this.id = id;
  }

  static fromJson(data) {
    return new Product(data.product_id, data.product_name, data.description);
  }
}

module.exports = Product;
