import createProduct from "../../Controller/products/CreateController.js";
import updateProduct from "../../Controller/products/UpdateController.js";
import readProduct from "../../Controller/products/ReadController.js";

const productRoutes = (app) => {
  app.route(`/api/product`).post(createProduct);
  app.route(`/api/product`).put(updateProduct);
  app.route(`/api/product`).get(readProduct);
};
export { productRoutes };
