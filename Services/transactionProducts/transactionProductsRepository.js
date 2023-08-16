import customerModel from "../../Model/customer.js";
import customerAddressModel from "../../Model/customerAddress.js";
import transactionModel from "../../Model/transactions.js";
import transactionProductModel from "../../Model/transactionProducts.js";
import transactionPaymentModel from "../../Model/transactionPayments.js";
import { Op } from "sequelize";
import sequelize from "sequelize";
import pkg from 'lodash';
const { groupBy, forEach, find } = pkg;

// Start Session Create Data Transaction
const createTransaction = async (data, transaction) => {
  const t = transaction ? transaction : await transactionModel.sequelize.transaction();
  try {
    let result = await transactionModel.create(data, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] CreateTransaction", error);
    throw new Error(error);
  }
};
// End Session Create Data Transaction

// Start Session Create Data Transaction
const createTransactionProduct = async (data, transaction) => {
  const t = transaction ? transaction : await transactionModel.sequelize.transaction();
  try {
    let result = await transactionProductModel.create(data, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] CreateTransaction", error);
    throw new Error(error);
  }
};

// Start Session Update Data Transaction
const updateTransaction = async (data, filter, transaction) => {
  const t = transaction ? transaction : await transactionModel.sequelize.transaction();
  try {
    let result = await transactionModel.update(data, { ...filter, transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] updateTransaction", error);
    throw new Error(error);
  }
};
// End Session Update Data Transaction


export {
  createTransaction,
  updateTransaction,
  createTransactionProduct
};
