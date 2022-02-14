const inquirer = require("inquirer");
const SalesController = require("../controllers/sales_controller");
const ProductController = require("../controllers/product_controller");
const CustomerController = require("../controllers/customer_controller");
class SalesView {
  constructor() {
    this._salesController = new SalesController();
    this._productController = new ProductController();
    this._customerController = new CustomerController();
  }

  async _customersChoices() {
    const customers = await this._customerController.getCustomers();
    const { customerId } = await inquirer.prompt({
      type: "list",
      name: "customerId",
      message: "Customers",
      choices: customers.map((customer) => ({
        name: `${customer.firstname} ${customer.lastname}`,
        value: customer.id,
      })),
    });
    return customerId;
  }

  displaySale(sale) {
    console.log(
      "========================================================================="
    );
    console.log("ID                              : " + sale.id);
    console.log("Unit Price                      : " + sale.unitPrice);
    console.log("Quanitity                       : " + sale.quantity);
    console.log("Product    > ");
    console.log("Product Name                    : " + sale.product.name);
    console.log(
      "Product Description             : " + sale.product.description
    );
    console.log("Customer   > ");
    console.log("Customer First Name             : " + sale.customer.firstname);
    console.log("Customer Last Name              : " + sale.customer.lastname);
    console.log(
      "========================================================================="
    );
  }

  async insertSales() {
    try {
      const products = await this._productController.getProducts();
      const { productId } = await inquirer.prompt({
        type: "list",
        name: "productId",
        message: "Products In Stock",
        choices: products.map((product) => ({
          name: product.name,
          value: product.id,
        })),
      });
      const { unitPrice, quantity } = await inquirer.prompt([
        { name: "unitPrice", message: "Unit Price" },
        { name: "quantity", message: "Quantity" },
      ]);

      const customerId = await this._customersChoices();
      const ui = new inquirer.ui.BottomBar();
      ui.updateBottomBar("loading ...");
      await this._salesController.createSales(
        quantity,
        unitPrice,
        productId,
        customerId
      );
      ui.updateBottomBar("successfully inserted \n");
    } catch (e) {
      console.log(e);
    }
  }

  async updateSales() {
    const sales = await this._salesController.getSales();
    const products = await this._productController.getProducts();

    const { saleId } = await inquirer.prompt({
      type: "list",
      name: "saleId",
      message: "Sales",
      choices: sales.map((sale) => ({
        name: `[Sales ID]-${sale.id} [Name]-${sale.product.name} [Unit Price]-${sale.unitPrice} [Quanitity]-${sale.quantity}`,
        value: sale.id,
      })),
    });
    const { productId } = await inquirer.prompt({
      type: "list",
      name: "productId",
      message: "Products In Stock",
      choices: products.map((product) => ({
        name: product.name,
        value: product.id,
      })),
    });
    const { unitPrice, quantity } = await inquirer.prompt([
      { name: "unitPrice", message: "Unit Price" },
      { name: "quantity", message: "Quantity" },
    ]);

    const customerId = await this._customersChoices();
    const ui = new inquirer.ui.BottomBar();
    ui.updateBottomBar("loading ...");
    await this._salesController.updateSales(
      saleId,
      quantity,
      unitPrice,
      productId,
      customerId
    );
    ui.updateBottomBar("updated successfully \n");
  }

  async deleteSales() {
    const sales = await this._salesController.getSales();
    const { saleId } = await inquirer.prompt({
      type: "list",
      name: "saleId",
      message: "Sales",
      choices: sales.map((sale) => ({
        name: sale.product.name,
        value: sale.id,
      })),
    });
    const ui = new inquirer.ui.BottomBar();
    ui.updateBottomBar("loading ...");
    await this._salesController.deleteSale(saleId);
    ui.updateBottomBar("successfully deleted \n");
  }

  async displaySales() {
    try{
      const ui = new inquirer.ui.BottomBar();
      ui.updateBottomBar("loading ...");
      const sales = await this._salesController.getSales();
      ui.updateBottomBar("");
      sales.map((sale) => this.displaySale(sale));
    }catch(e){
      console.log(e)
    }
  }
}

module.exports = SalesView;
