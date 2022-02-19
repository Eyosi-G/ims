const inquirer = require("inquirer");
const ProductController = require("../controllers/product_controller");
const Product = require("../models/product");
class ProductView {
  constructor() {
    this._productController = new ProductController();
  }

  async _productChoices() {
    const products = await this._productController.getProducts();
    const { productId } = await inquirer.prompt({
      type: "list",
      name: "productId",
      message: "Products",
      choices: products.map((product) => ({
        name: `[ID] ${product.id}, [Name] ${product.name}`,
        value: product.id,
      })),
    });
    return productId;
  }
  _displayProduct(product) {
    console.log("============================================");
    console.log("ID            : " + product.id);
    console.log("Name          : " + product.name);
    console.log("Description   : " + product.description);
    console.log("============================================");
  }

  _displayFullProduct(product) {
    console.log("============================================");
    console.log("ID                     : " + product.id);
    console.log("Name                   : " + product.name);
    console.log("Description            : " + product.description);
    console.log("Weight                 : " + product.weight);
    console.log("Color                  : " + product.color);
    console.log("Country Manufactured   : " + product.countryManufactured);
    console.log("Year Manufactured      : " + product.yearManufactured);
    console.log(
      "Is Original            : " + (product.isOriginal ? "Yes" : "No")
    );
    console.log("============================================");
  }

  async insertProduct() {
    try {
      const {
        name,
        description,
        weight,
        color,
        country_made_in,
        year_made_in,
        is_original,
      } = await inquirer.prompt([
        {
          name: "name",
          message: "Name of product",
        },
        {
          name: "description",
          message: "Description of product",
        },
        {
          name: "weight",
          message: "Weight",
        },
        {
          name: "color",
          message: "Color",
        },
        {
          name: "country_made_in",
          message: "Country Manufactured",
        },
        {
          name: "year_made_in",
          message: "Year Manufactured",
        },
        {
          name: "is_original",
          message: "Is Original",
          type: "list",
          choices: [
            { name: "Yes", value: true },
            { name: "No", value: false },
          ],
        },
      ]);
      const ui = new inquirer.ui.BottomBar();
      ui.updateBottomBar("loading ...");
      await this._productController.createProduct(
        name,
        description,
        weight,
        color,
        country_made_in,
        is_original,
        year_made_in
      );
      ui.updateBottomBar("product created \n");
    } catch (e) {
      console.log('Creating Product Failed !')
    }
  }

  async updateProduct() {
    try {
      const productId = await this._productChoices();
      const {
        name,
        description,
        weight,
        color,
        country_made_in,
        year_made_in,
        is_original,
      } = await inquirer.prompt([
        {
          name: "name",
          message: "Name of product",
        },
        {
          name: "description",
          message: "Description of product",
        },
        {
          name: "weight",
          message: "Weight",
        },
        {
          name: "color",
          message: "Color",
        },
        {
          name: "country_made_in",
          message: "Country Manufactured",
        },
        {
          name: "year_made_in",
          message: "Year Manufactured",
        },
        {
          name: "is_original",
          message: "Is Original",
          type: "list",
          choices: [
            { name: "Yes", value: true },
            { name: "No", value: false },
          ],
        },
      ]);
      const ui = new inquirer.ui.BottomBar();
      ui.updateBottomBar("loading ...");
      await this._productController.updateProduct(
        productId,
        name,
        description,
        weight,
        color,
        country_made_in,
        is_original,
        year_made_in
      );
      ui.updateBottomBar("product updated \n");
    } catch (e) {
      console.log('Updating Product Failed !')
    }
  }

  async deleteProduct() {
    try {
      const productId = await this._productChoices();
      const { confirmation } = await inquirer.prompt({
        type: "confirm",
        name: "confirmation",
        message: "Are you sure ?",
      });
      if (confirmation) {
        const ui = new inquirer.ui.BottomBar();
        ui.updateBottomBar("loading ...");
        await this._productController.deleteProduct(productId);
        ui.updateBottomBar("product deleted");
      }
    } catch (e) {
      console.log('Deleting Product Failed !')
    }
  }

  async findProduct() {
    try {
      const { productName } = await inquirer.prompt({
        type: "input",
        name: "productName",
        message: "Product Name",
      });
      const ui = new inquirer.ui.BottomBar();
      ui.updateBottomBar("loading ...");
      const products = await this._productController.findProduct(productName)
      ui.updateBottomBar("");
      products.map((product) => {
        this._displayFullProduct(product);
      });
    } catch (e) {
      console.log('Searching Product Failed !')
    }
  }

  async displayProducts() {
    try {
      const ui = new inquirer.ui.BottomBar();
      ui.updateBottomBar("loading ...");
      const products = await this._productController.getFullProducts();
      ui.updateBottomBar("");
      products.map((product) => {
        this._displayFullProduct(product);
      });
    } catch (e) {
      console.log('Displaying Product Lists Failed !')
    }
  }

  async displayPopularProductsForKids() {
    try {
      const ui = new inquirer.ui.BottomBar();
      ui.updateBottomBar("loading ...");
      const products =
        await this._productController.getPopularProductsForKids();
      ui.updateBottomBar("");
      products.map((product) => {
        this._displayProduct(product);
      });
    } catch (e) {
      console.log('Displaying Popular Products For Kids Failed !')
    }
  }

  async displayPopularProductsForAdults() {
    try {
      const ui = new inquirer.ui.BottomBar();
      ui.updateBottomBar("loading ...");
      const products =
        await this._productController.getPopularProductsForAdults();
      ui.updateBottomBar("");
      products.map((product) => {
        this._displayProduct(product);
      });
    } catch (e) {
      console.log('Displaying Popular Products For Adults Failed !')
    }
  }
}

module.exports = ProductView;
