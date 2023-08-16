import createTransaction from "../../Controller/transactions/CreateController.js";

const transactionRoutes = (app) => {
  app.route(`/api/transaction`).post(createTransaction);
};
export { transactionRoutes };
