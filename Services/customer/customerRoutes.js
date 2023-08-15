import createCustomer from "../../Controller/customer/CreateController.js";
import updateCustomer from "../../Controller/customer/UpdateController.js";
import readCustomer from "../../Controller/customer/ReadController.js";

const customerRoutes = (app) => {
  app.route(`/api/customer`).post(createCustomer);
  app.route(`/api/customer`).put(updateCustomer);
  app.route(`/api/customer`).get(readCustomer);
};
export { customerRoutes };
