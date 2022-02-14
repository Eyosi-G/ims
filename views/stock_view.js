const inquirer = require("inquirer");
const StockController = require("../controllers/stock_controller");
const SupplierController = require("../controllers/supplier_controller");
const ProductController = require("../controllers/product_controller");
const Stock = require("../models/stock");

class StockView {
  constructor() {
    this.stockController = new StockController();
    this.productController = new ProductController();
    this.supplierController = new SupplierController();
  }

  displayStock(stock) {
    console.log(
      "========================================================================="
    );
    console.log("ID                              : " + stock.id);
    console.log("Unit Price                      : " + stock.unitPrice);
    console.log("Quanitity                       : " + stock.quantity);
    console.log("Product  > ");
    console.log("Product Name                    : " + stock.product.name);
    console.log(
      "Product Description             : " + stock.product.description
    );
    console.log("Supplier > ");
    console.log(
      "Supplier Company Name           : " + stock.supplier.companyName
    );
    console.log("Supplier Country                : " + stock.supplier.country);
    console.log("Supplier City                   : " + stock.supplier.city);
    console.log(
      "Supplier Phonenumber            : " + stock.supplier.phonenumber
    );
    console.log(
      "========================================================================="
    );
  }

  async addToStock() {
    try {
      const products = await this.productController.getProducts();
      const suppliers = await this.supplierController.getSuppliers();
      const { productId } = await inquirer.prompt({
        type: "list",
        message: "Product",
        name: "productId",
        choices: products.map(({ name, id }) => ({
          name: name,
          value: id,
        })),
      });

      const { unitPrice } = await inquirer.prompt({
        name: "unitPrice",
        message: "Unit Price",
      });

      const { quantity } = await inquirer.prompt({
        name: "quantity",
        message: "Quantity",
      });

      const { supplierId } = await inquirer.prompt({
        type: "list",
        message: "Supplier",
        name: "supplierId",
        choices: suppliers.map((supplier) => ({
          name: `${supplier.companyName} (${supplier.country})`,
          value: supplier.id,
        })),
      });
      const ui = new inquirer.ui.BottomBar();
      ui.updateBottomBar("loading ...");
      await this.stockController.addToStock(
        productId,
        supplierId,
        unitPrice,
        quantity
      );
      ui.updateBottomBar("item successfully added to stock ! \n");
    } catch (e) {
      console.log(e);
    }
  }

  async updateStockItems() {
    try {
      const stocks = await this.stockController.getAllStocks();
      const products = await this.productController.getProducts();
      const suppliers = await this.supplierController.getSuppliers();

      const { stockId } = await inquirer.prompt({
        type: "list",
        name: "stockId",
        message: "Stock",
        choices: stocks.map((stock) => ({
          name: ` [Stock Id]: ${stock.id} [ Name ]: ${stock.product.name}`,
          value: stock.id,
        })),
      });

      const { productId } = await inquirer.prompt({
        type: "list",
        message: "Product",
        name: "productId",
        choices: products.map(({ name, id }) => ({
          name: name,
          value: id,
        })),
      });

      const { unitPrice, quantity } = await inquirer.prompt([
        {
          name: "unitPrice",
          message: "Unit Price",
        },
        {
          name: "quantity",
          message: "Quantity",
        },
      ]);

      const { supplierId } = await inquirer.prompt({
        type: "list",
        message: "Supplier",
        name: "supplierId",
        choices: suppliers.map(({ id, companyName, country }) => ({
          name: `${companyName} (${country})`,
          value: id,
        })),
      });
      const ui = new inquirer.ui.BottomBar();
      ui.updateBottomBar("loading ...");
      await this.stockController.updateStock(
        stockId,
        productId,
        supplierId,
        unitPrice,
        quantity
      );
      ui.updateBottomBar("successfully updated ! \n");
    } catch (e) {
      console.log(e);
    }
  }

  async deleteStock() {
    try {
      const stocks = await this.stockController.getAllStocks();
      const { stockId } = await inquirer.prompt({
        type: "list",
        name: "stockId",
        message: "Stock Item",
        choices: stocks.map((stock) => ({
          name: ` [ Name ]: ${stock.product.name}, [ DateTime ] : ${stock.createdAt}`,
          value: stock.id,
        })),
      });
      const ui = new inquirer.ui.BottomBar();
      ui.updateBottomBar("loading ...");
      await this.stockController.deleteStock(stockId);
      ui.updateBottomBar("successfully deleted \n");
    } catch (e) {
      console.log(e);
    }
  }

  async displayAllStockItems() {
    try {
      const ui = new inquirer.ui.BottomBar();
      ui.updateBottomBar("loading ...");
      const stocks = await this.stockController.getAllStocks();
      ui.updateBottomBar("");
      stocks.map((stock) => this.displayStock(stock));
    } catch (e) {
      console.log(e);
    }
  }

  async findItemInStock(){
    try {
      const { productName } = await inquirer.prompt({
        name: "productName",
        message: "Product Name",
      });
      const ui = new inquirer.ui.BottomBar();
      ui.updateBottomBar("loading ...");
      const stocks = await this.stockController.findStock(productName)
      ui.updateBottomBar("");
      stocks.map((stock) => this.displayStock(stock));
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = StockView;
