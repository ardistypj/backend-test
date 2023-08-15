import customerModel from "../../Model/customer.js";
import { Op } from "sequelize";
import sequelize from "sequelize";

// Start Session Create Data Customer
const createCustomer = async (data, transaction) => {
  const t = transaction ? transaction : await customerModel.sequelize.transaction();
  try {
    let result = await customerModel.create(data, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    throw new Error(error);
  }
};
// End Session Create Data Customer

// Start Session Update Data Customer
const updateCustomer = async (data, filter, transaction) => {
  const t = transaction ? transaction : await customerModel.sequelize.transaction();
  try {
    let result = await customerModel.update(data, { ...filter, transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] updateCustomer", error);
    throw new Error(error);
  }
};
// End Session Update Data Customer

// Start Session Read Data Customer
const readCustomer = async ({ search }, page, page_size) => {
    
  try {
    let result = await customerModel.findAndCountAll({
      where: {
        [Op.or]: [
          {customer_name: search ? sequelize.where(sequelize.fn('LOWER', sequelize.col('customer_name')), 'LIKE', '%' + search + '%') : { [Op.like]: `%%` }}
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
      customer_name: item.customer_name,
      };
    });
  
    result["rows"] = newArray;
    return result;
} catch (error) {
    console.error("[EXCEPTION] readCustomer", error);
    throw new Error(error);
  }
};
// End Session Read Data Customer Status = True

// Start Session Read Customer By Id
const readCustomerById = async (id) => {
  try {
    let result = await customerModel.findByPk(id);
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readCustomerById", error);
    throw new Error(error);
  }
};
// End Session Read Customer By Id

// Start Session Customer By Nama
const findCustomerByNama = async (customer_name) => {
  try {
    let result = await customerModel.findOne({
      where: {
        customer_name: { [Op.iLike]: `${customer_name}` },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] findCustomerByNama", error);
    throw new Error(error);
  }
};

const readAllCustomerByNama = async (customer_name) => {
  try {
    let result = await customerModel.findAll({
      where: {
        customer_name: { [Op.iLike]: `${customer_name}` },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readAllCustomerByNama", error);
    throw new Error(error);
  }
};
// End Session Customer By Nama



export {
  createCustomer,
  updateCustomer,
  readCustomer,
  readCustomerById,
  readAllCustomerByNama,
  findCustomerByNama,
};
