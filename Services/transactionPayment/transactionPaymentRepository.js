import transactionPaymentModel from "../../Model/transactionPayments.js";
import moment from "moment";
import { Op } from "sequelize";

// Start Session Create Data TransactionPayment
const createTransactionPayment = async (data, transaction) => {
  const t = transaction ? transaction : await transactionPaymentModel.sequelize.transaction();
  try {
    let result = await transactionPaymentModel.create(data, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] CreateTransactionPayment", error);
    throw new Error(error);
  }
};
// End Session Create Data TransactionPayment

// Start Session Update Data TransactionPayment
const updateTransactionPayment = async (data, filter, transaction) => {
  const t = transaction ? transaction : await transactionPaymentModel.sequelize.transaction();
  try {
    let result = await transactionPaymentModel.update(data, { ...filter, transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] updateTransactionPayment", error);
    throw new Error(error);
  }
};
// End Session Update Data TransactionPayment

const deleteTransactionPayment = async (filter, transaction) => {
  const t = transaction
    ? transaction
    : await transactionPaymentModel.sequelize.transaction();
  try {
    let result = await transactionPaymentModel.destroy({
      ...filter,
      transaction,
    });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] deleteKonsumsi", error);
    throw new Error(error);
  }
};

// Start Session Read TransactionPayment By Id
const readTransactionPaymentById = async (id) => {
  try {
    let result = await transactionPaymentModel.findByPk(id);
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readTransactionPaymentById", error);
    throw new Error(error);
  }
};
// End Session Read TransactionPayment By Id


export {
  createTransactionPayment,
  updateTransactionPayment,
  deleteTransactionPayment,
  readTransactionPaymentById,
};
