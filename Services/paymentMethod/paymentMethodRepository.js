import paymentMethodModel from "../../Model/paymentMethod.js";
import moment from "moment";
import { Op } from "sequelize";
import sequelize from "sequelize";

// Start Session Create Data Satuan
const createPaymentMethod = async (data, transaction) => {
  const t = transaction ? transaction : await paymentMethodModel.sequelize.transaction();
  try {
    let result = await paymentMethodModel.create(data, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] CreateSatuan", error);
    throw new Error(error);
  }
};
// End Session Create Data Satuan

// Start Session Update Data Satuan
const updatePaymentMethod = async (data, filter, transaction) => {
  const t = transaction ? transaction : await paymentMethodModel.sequelize.transaction();
  try {
    let result = await paymentMethodModel.update(data, { ...filter, transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] updatePaymentMethod", error);
    throw new Error(error);
  }
};
// End Session Update Data Satuan

// Start Session Read Data Satuan
const readPaymentMethod = async ({ search }, page, page_size) => {
    
  try {
    let result = await paymentMethodModel.findAndCountAll({
      where: {
        [Op.or]: [
          {name: search ? sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + search + '%') : { [Op.like]: `%%` }}
        ], 
      },
      offset: page_size * page,
      limit: page_size,
      order: [["id", "DESC"]],
    });

    var datas = result.rows;
    var newArray = datas.map((item) => {
      return {
      id: item.id,
      is_active: item.is_active,
      name: item.name,
      };
    });
  
    result["rows"] = newArray;
    return result;
} catch (error) {
    console.error("[EXCEPTION] readPaymentMethod", error);
    throw new Error(error);
  }
};
// End Session Read Data Satuan Status = True

// Start Session Read Satuan By Id
const readPaymentMethodById = async (id) => {
  try {
    let result = await paymentMethodModel.findByPk(id);
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readPaymentMethodById", error);
    throw new Error(error);
  }
};
// End Session Read Satuan By Id


export {
  createPaymentMethod,
  updatePaymentMethod,
  readPaymentMethod,
  readPaymentMethodById,
};
