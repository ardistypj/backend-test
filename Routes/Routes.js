import { customerRoutes } from "../Services/customer/customerRoutes.js";
import { customerAddressRoutes } from "../Services/customerAddress/customerAddressRoutes.js";
import { paymentMethodRoutes } from "../Services/paymentMethod/paymentMethodRoutes.js";
import { productRoutes } from "../Services/products/productsRoutes.js";

const MainRoutes = (app) => {
  customerRoutes(app);
  customerAddressRoutes(app)
  paymentMethodRoutes(app)
  productRoutes(app)
};

export default MainRoutes;
