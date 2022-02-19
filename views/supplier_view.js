const inquirer = require("inquirer");
const SupplierController = require("../controllers/supplier_controller");
class SupplierView {
  constructor() {
    this.supplierController = new SupplierController();
  }

  displaySupplier(supplier) {
    console.log("============================================");
    console.log("Id              : " + supplier.id);
    console.log("Company Name    : " + supplier.companyName);
    console.log("Country         : " + supplier.country);
    console.log("City            : " + supplier.city);
    console.log("Phonenumber     : " + supplier.phonenumber);
    console.log("============================================");
  }

  async _supplierChoice() {
    const suppliers = await this.supplierController.getSuppliers();
    const { supplierId } = await inquirer.prompt({
      type: "list",
      name: "supplierId",
      choices: suppliers.map((supplier) => ({
        name: `[name] ${supplier.companyName}, [country] ${supplier.country}`,
        value: supplier.id,
      })),
    });
    return supplierId;
  }

  async createSupplier() {
    const { companyName, phonenumber, country, city } = await inquirer.prompt([
      { name: "companyName", message: "Company Name" },
      { name: "phonenumber", message: "Phonenumber" },
      { name: "country", message: "Country" },
      { name: "city", message: "City" },
    ]);
    const ui = new inquirer.ui.BottomBar();
    ui.updateBottomBar("loading ...");
    await this.supplierController.createSupplier(
      companyName,
      phonenumber,
      country,
      city
    );
    ui.updateBottomBar("successfully created ! \n");
  }

  async updateSupplier() {
    try {
      const supplierId = await this._supplierChoice();

      const { companyName, phonenumber, country, city } = await inquirer.prompt(
        [
          { name: "companyName", message: "Company Name" },
          { name: "phonenumber", message: "Phonenumber" },
          { name: "country", message: "Country" },
          { name: "city", message: "City" },
        ]
      );
      const ui = new inquirer.ui.BottomBar();
      ui.updateBottomBar("loading ...");
      await this.supplierController.updateSupplier(
        supplierId,
        companyName,
        phonenumber,
        country,
        city
      );
      ui.updateBottomBar("successfully updated ! \n");
    } catch (e) {
      console.log(e);
    }
  }

  async deleteSupplier() {
    try {
      const supplierId = await this._supplierChoice();
      const ui = new inquirer.ui.BottomBar();
      ui.updateBottomBar("loading ...");
      await this.supplierController.deleteSupplier(supplierId);
      ui.updateBottomBar("successfully deleted ! \n");
    } catch (e) {
      console.log(e);
    }
  }

  async findSupplier() {
    try {
      const { companyName } = await inquirer.prompt({
        name: "companyName",
        message: "Company Name",
      });
      const ui = new inquirer.ui.BottomBar();
      ui.updateBottomBar("loading ...");
      const suppliers = await this.supplierController.findSupplier(companyName);
      ui.updateBottomBar("");
      suppliers.map((supplier) => this.displaySupplier(supplier));
    } catch (e) {
      console.log("Finding Supplier Failed !");
    }
  }

  async displaySuppliers() {
    try{
      const ui = new inquirer.ui.BottomBar();
      ui.updateBottomBar("loading ...");
      const suppliers = await this.supplierController.getSuppliers();
      ui.updateBottomBar("");
      suppliers.map((supplier) => this.displaySupplier(supplier));
    }catch(e){
      console.log(e)
    }
  }
}

module.exports = SupplierView;
