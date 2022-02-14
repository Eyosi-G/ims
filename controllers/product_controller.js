const Product = require("../models/product");
const ProductFull = require("../models/product_full");
const db = require("../config/database");

class ProductController {
  async createProduct(
    name,
    description,
    weight,
    color,
    country_made_in,
    is_original,
    year_made_in
  ) {
    await db.query(`select insert_product_item($1, $2, $3, $4, $5, $6, $7)`, [
      name,
      description,
      weight,
      color,
      country_made_in,
      is_original,
      year_made_in,
    ]);
  }

  async updateProduct(
    id,
    name,
    description,
    weight,
    color,
    country_made_in,
    is_original,
    year_made_in
  ) {
    await db.query(`update_product_item($1, $2, $3, $4, $5, $6, $7, $8)`, [
      id,
      name,
      description,
      weight,
      color,
      country_made_in,
      is_original,
      year_made_in,
    ]);
  }
  async deleteProduct(id) {
    await db.query(`select delete_product_item($1)`, [id]);
  }

  async getProducts() {
    const response = await db.query(`select * from products_data`);
    const products = response.rows.map((row) => Product.fromJson(row));
    return products;
  }

  async getFullProducts() {
    const response = await db.query(`select * from get_products()`);
    const products = response.rows.map((row) => ProductFull.fromJson(row));
    return products;
  }

  async findProduct(productName){
    const response = await db.query(`select * from get_products($1)`,[productName]);
    const products = response.rows.map((row) => ProductFull.fromJson(row));
    return products;
  }

  async getPopularProductsForKids() {
    const response = await db.query(
      `select * from popular_products_for_kids()`
    );
    const products = response.rows.map((row) => Product.fromJson(row));
    return products;
  }

  async getPopularProductsForAdults() {
    const response = await db.query(
      `select * from popular_products_for_adults()`
    );
    const products = response.rows.map((row) => Product.fromJson(row));
    return products;
  }
}

module.exports = ProductController;
