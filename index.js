const ProductView = require('./views/product_view')
const CustomerView = require('./views/customer_view')
const SupplierView = require('./views/supplier_view')
const StockView = require('./views/stock_view')
const Stock = require('./models/stock')
const SalesView = require('./views/sales_view')
const Supplier = require('./models/supplier')
const Product = require('./models/product')
const AuthView = require('./views/auth_view');


const authView = new AuthView();
authView.showMenu()

// new ProductView().displayPopularProductsForKids()
// new ProductView().displayPopularProductsForAdults()

// new StockView().addToStock()
// new StockView().displayAllStockItems()
// new StockView().updateStockItems()
// new StockView().deleteStock()

// new SalesView().insertSales()
// new SalesView().displaySales()
// new SalesView().updateSales()



// new CustomerView().insertCustomer()