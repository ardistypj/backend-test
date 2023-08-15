import customerModel from "../../Model/customer.js";
import customerAddressModel from "../../Model/customerAddress.js";
import transactionModel from "../../Model/transactions.js";
import transactionProductModel from "../../Model/transactionProducts.js";
import { Op } from "sequelize";
import sequelize from "sequelize";
import pkg from 'lodash';
import transactionPaymentModel from "../../Model/transactionPayments.js";
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

// Start Session Read Data Transaction
const readTransaction = async ({ search }, page, page_size) => {
  var customerId = customerModel.belongsTo(transactionModel, {
    foreignKey: "customer_id",
  });

  var customerAddressId = customerAddressModel.belongsTo(transactionModel, {
    foreignKey: "customer_address_id",
  });
  try {
    let result = await transactionModel.findAndCountAll({
      where: {
        [Op.or]: [
          {transaction_code: sequelize.where(sequelize.fn('LOWER', sequelize.col('transaction_code')), 'LIKE', '%' + search + '%')},
          {employer_name: sequelize.where(sequelize.fn('LOWER', sequelize.col('employer_name')), 'LIKE', '%' + search + '%')},
        ],        
      },
      included: [customerId, customerAddressId],
      offset: page_size * page,
      limit: page_size,
      order: [["id", "DESC"]],
    });
    let result2 = await transactionPaymentModel.findAndCountAll()
    let result3 = await transactionProductModel.findAndCountAll()

    var datas = result.rows;
    var datas2 = result2.rows;
    var datas3 = result3.rows;

    var newArray = datas.map((item) => {
      const transactionArray = []

      let filterProduct = datas3.filter(data => data.transaction_id == item.id);

      
      forEach(filterProduct, row => {

      let dataPayment = datas2.filter(data => data.id == row.payment_method_id)[0]; 

      let detailTransaction = {
        id: dataPayment.id,
        nama_obat: dataPayment.nama,
        kode_obat: dataPayment.kode,
        harga_jual: dataPayment.harga_jual,
        transaction_id: dataPayment[0].transaction_id,
        payment_method_id: dataPayment[0].payment_method_id,
        aturan_pakai: dataPayment[0].aturan_pakai,
      }
      transactionArray.push(detailTransaction);
    });

      return {
      id: item.id,
      transaction_code: item.transaction_code,
      employer_name: item.employer_name,
      customer: item.customer,
      customer_address: item.customer_address,
      details: transactionArray,
      status: item.status,
      };
    });
  
    result["rows"] = newArray;
    return result;
} catch (error) {
    console.error("[EXCEPTION] readTransaction", error);
    throw new Error(error);
  }
};
// End Session Read Data Transaction Status = True

// Start Session Read Transaction By Id
const readTransactionById = async (id) => {
  try {
    let result = await transactionModel.findByPk(id);
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readTransactionById", error);
    throw new Error(error);
  }
};
// End Session Read Transaction By Id

export {
  createTransaction,
  updateTransaction,
  readTransaction,
  readTransactionById,
  createTransactionProduct
};
