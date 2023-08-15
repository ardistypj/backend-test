import customerModel from "../../Model/customer.js";
import customerAddressModel from "../../Model/customerAddress.js";
import { Op } from "sequelize";

// Start Session Create Data CustomerAddress
const createCustomerAddress = async (data, transaction) => {
  const t = transaction ? transaction : await customerAddressModel.sequelize.transaction();
  try {
    let result = await customerAddressModel.create(data, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    throw new Error(error);
  }
};
// End Session Create Data customerAddressModel

// Start Session Update Data customerAddressModel
const updateCustomerAddress = async (data, filter, transaction) => {
  const t = transaction ? transaction : await customerAddressModel.sequelize.transaction();
  try {
    let result = await customerAddressModel.update(data, { ...filter, transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    throw new Error(error);
  }
};
// End Session Update Data customerAddressModel

// Start Session Read Data
const readCustomerAddress = async ({ search }, page, page_size) => {
  var customerId = customerAddressModel.belongsTo(customerModel, {
    foreignKey: "customer_id",
  });
    
  try {
    let result = await customerAddressModel.findAndCountAll({
      where: {
        [Op.or]: [
          {address: search ? sequelize.where(sequelize.fn('LOWER', sequelize.col('address')), 'LIKE', '%' + search + '%') : { [Op.like]: `%%` }}
        ], 
      },
      include: [customerId],
      offset: page_size * page,
      limit: page_size,
      order: [["id", "DESC"]],
    });

    var datas = result.rows;
    var newArray = datas.map((item) => {
      return {
      id: item.id,
      address: item.address,
      customer: item.customer
      };
    });
  
    result["rows"] = newArray;
    return result;
} catch (error) {
    console.error("[EXCEPTION] readSatuan", error);
    throw new Error(error);
  }
};
// End Session Read Data 


// Start Session Read customerAddressModel By Id
const readCustomerAddressById = async (id) => {
  try {
    let result = await customerAddressModel.findByPk(id);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
// End Session Read customerAddressModel By Id

// Start Session customerAddressModel By Address
const findCustomerAddressByAddress = async (address) => {
  try {
    let result = await customerAddressModel.findOne({
      where: {
        address: { [Op.iLike]: `${address}` },
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const readAllCustomerAddressByAddress = async (address) => {
  try {
    let result = await customerAddressModel.findAll({
      where: {
        address: { [Op.iLike]: `${address}` },
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
// End Session customerAddressModel By Address


export {
  createCustomerAddress,
  updateCustomerAddress,
  readCustomerAddress,
  readCustomerAddressById,
  readAllCustomerAddressByAddress,
  findCustomerAddressByAddress,
};
