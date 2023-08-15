import createPaymentMethod from "../../Controller/paymentMethod/CreateController.js";
import updatePaymentMethod from "../../Controller/paymentMethod/UpdateController.js";
import readPaymentMethod from "../../Controller/paymentMethod/ReadController.js";

const paymentMethodRoutes = (app) => {
  app.route(`/api/paymentMethod`).post(createPaymentMethod);
  app.route(`/api/paymentMethod`).put(updatePaymentMethod);
  app.route(`/api/paymentMethod`).get(readPaymentMethod);
};
export { paymentMethodRoutes };
