const inquirer = require("inquirer");
const ProductView = require("./product_view");
const SupplierView = require("./supplier_view");
const StockView = require("./stock_view");
const SalesView = require("./sales_view");
const CustomerView = require("./customer_view");

class AdminView {
  constructor(authView) {
    this.authView = authView;
    this.productView = new ProductView();
    this.supplierView = new SupplierView();
    this.stockView = new StockView();
    this.salesView = new SalesView();
    this.customerView = new CustomerView();
  }

  async showSupplierMenu() {
    /*
        1. Create Supplier
        2. Update Supplier
        3. Delete Supplier
        4. View Supplier
        5. << Back
      */
    const { supplierMenu } = await inquirer.prompt({
      type: "list",
      message: "Supplier",
      name: "supplierMenu",
      choices: [
        { name: "Create Supplier", value: "a" },
        { name: "Update Supplier", value: "b" },
        { name: "Delete Supplier", value: "c" },
        { name: "Find Supplier", value: "d" },
        { name: "Display Suppliers", value: "e" },
        { name: "<< Back", value: "back" },
      ],
    });

    switch (supplierMenu) {
      case "a": {
        await this.supplierView.createSupplier();
        await this.showSupplierMenu();
        break;
      }
      case "b": {
        await this.supplierView.updateSupplier();
        await this.showSupplierMenu();
        break;
      }
      case "c": {
        await this.supplierView.deleteSupplier();
        await this.showSupplierMenu();
        break;
      }
      case "d": {
        await this.supplierView.findSupplier();
        await this.showSupplierMenu();
        break;
      }
      case "e": {
        await this.supplierView.displaySuppliers();
        await this.showSupplierMenu();
        break;
      }
      case "back": {
        await this.showAdminMainMenu();
        break;
      }
    }
  }

  async showProductsMenu() {
    /*
        1. Create Product
        2. Update Product
        3. Delete Product
        4. View Products
        5. View Popular Products For Kids
        6. View Popular Products For Adults
        7. Find Product
        5. << back
      */
    const { productsMenu } = await inquirer.prompt({
      type: "list",
      message: "Products Menu",
      name: "productsMenu",
      choices: [
        { name: "Create Product", value: "a" },
        { name: "Update Product", value: "b" },
        { name: "Delete Product", value: "c" },
        { name: "Display Products", value: "d" },
        { name: "Display Popular Products For Kids", value: "e" },
        { name: "Display Popular Products For Adults", value: "f" },
        { name: "Find Product", value: "g" },
        { name: "<< Back", value: "back" },
      ],
    });

    switch (productsMenu) {
      case "a": {
        await this.productView.insertProduct();
        await this.showProductsMenu();
        break;
      }
      case "b": {
        await this.productView.updateProduct();
        await this.showProductsMenu();
        break;
      }
      case "c": {
        await this.productView.deleteProduct();
        await this.showProductsMenu();
        break;
      }
      case "d": {
        await this.productView.displayProducts();
        await this.showProductsMenu();
        break;
      }
      case "e": {
        await this.productView.displayPopularProductsForKids();
        await this.showProductsMenu();
        break;
      }
      case "f": {
        await this.productView.displayPopularProductsForAdults();
        await this.showProductsMenu();
        break;
      }
      case "g": {
        await this.productView.findProduct();
        await this.showProductsMenu();
        break;
      }
      case "back": {
        await this.showAdminMainMenu();
        break;
      }
    }
  }

  async showStockMenu() {
    /*
        1. Insert Stock Item
        2. Update Stock Item
        3. Delete Stock Item
        4. Display Stock Items
        5. Find Product In Stock 
        6. << back
      */
    const { stockMenu } = await inquirer.prompt({
      type: "list",
      message: "Stock Menu",
      name: "stockMenu",
      choices: [
        { name: "Insert Stock Item", value: "a" },
        { name: "Update Stock Item", value: "b" },
        { name: "Delete Stock Item", value: "c" },
        { name: "Display All Stock Items", value: "d" },
        { name: "Find Product In Stock", value: "e" },
        { name: "<< Back", value: "back" },
      ],
    });

    switch (stockMenu) {
      case "a": {
        await this.stockView.addToStock();
        await this.showStockMenu();
        break;
      }
      case "b": {
        await this.stockView.updateStockItems();
        await this.showStockMenu();
        break;
      }
      case "c": {
        await this.stockView.deleteStock();
        await this.showStockMenu();
        break;
      }
      case "d": {
        await this.stockView.displayAllStockItems();
        await this.showStockMenu();
        break;
      }
      case "e": {
        await this.stockView.findItemInStock()
        await this.showStockMenu();
        break;
      }
      case "back": {
        await this.showAdminMainMenu();
        break;
      }
    }
  }

  async showCustomersMenu() {
    /*
        1. Insert Customer
        2. Update Customer
        3. Delete Customer
        4. Display Customers
        5. << back
      */
    const { customersMenus } = await inquirer.prompt({
      type: "list",
      message: "Customers Menus",
      name: "customersMenus",
      choices: [
        { name: "Insert Customer", value: "a" },
        { name: "Update Customer", value: "b" },
        { name: "Delete Customer", value: "c" },
        { name: "Display Customers", value: "d" },
        { name: "<< Back", value: "back" },
      ],
    });

    switch (customersMenus) {
      case "a": {
        await this.customerView.insertCustomer();
        await this.showCustomersMenu();
        break;
      }
      case "b": {
        await this.customerView.updateCustomer();
        await this.showCustomersMenu();
        break;
      }
      case "c": {
        await this.customerView.deleteCustomer();
        await this.showCustomersMenu();
        break;
      }
      case "d": {
        await this.customerView.displayCustomers();
        await this.showCustomersMenu();
        break;
      }
      case "back": {
        await this.showAdminMainMenu();
        break;
      }
    }
  }

  async showSalesMenus() {
    /*
        1. Insert Sale
        2. Update Sale
        3. Delete Sale
        4. Display Sales
        5. << back
      */
    const { salesMenu } = await inquirer.prompt({
      type: "list",
      name: "salesMenu",
      message: "Sales",
      choices: [
        { name: "Insert Sale", value: "a" },
        { name: "Update Sale", value: "b" },
        { name: "Delete Sale", value: "c" },
        { name: "Display Sales", value: "d" },
        { name: "<< back", value: "back" },
      ],
    });
    switch (salesMenu) {
      case "a": {
        await this.salesView.insertSales();
        await this.showSalesMenus();
        break;
      }
      case "b": {
        await this.salesView.updateSales();
        await this.showSalesMenus();
        break;
      }
      case "c": {
        await this.salesView.deleteSales();
        await this.showSalesMenus();
        break;
      }
      case "d": {
        await this.salesView.displaySales();
        await this.showSalesMenus();
        break;
      }
      case "back": {
        await this.showAdminMainMenu();
        break;
      }
    }
  }

  async showAdminMainMenu() {
    /*
            1. Products
            2. Supplier
            3. Stock 
            4. Customers
            5. Sales
            6. Logout
        */
    const { adminMenu } = await inquirer.prompt({
      type: "list",
      message: "Admin Menus",
      name: "adminMenu",
      choices: [
        { name: "[Menu] Products ", value: "a" },
        { name: "[Menu] Supplier ", value: "b" },
        { name: "[Menu] Stock", value: "c" },
        { name: "[Menu] Customers ", value: "d" },
        { name: "[Menu] Sales ", value: "e" },
        { name: "Logout", value: "logout" },
      ],
    });

    switch (adminMenu) {
      case "a": {
        await this.showProductsMenu();
        break;
      }
      case "b": {
        await this.showSupplierMenu();
        break;
      }
      case "c": {
        await this.showStockMenu();
        break;
      }
      case "d": {
        await this.showCustomersMenu();
        break;
      }
      case "e": {
        await this.showSalesMenus();
        break;
      }
      case "logout": {
        this.authView.showMenu();
        break;
      }
    }
  }
}

module.exports = AdminView;
