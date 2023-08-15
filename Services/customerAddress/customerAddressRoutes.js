import updateCustomerAddress from "../../Controller/customerAddress/UpdateController.js";
import readCustomerAddress from "../../Controller/customerAddress/ReadController.js";

const customerAddressRoutes = (app) => {
  app.route(`/api/customerAddress`).put(updateCustomerAddress);
  app.route(`/api/customerAddress`).get(readCustomerAddress);
};
export { customerAddressRoutes };
