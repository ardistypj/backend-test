import productModel from "../../Model/products.js";
import moment from "moment";
import { Op } from "sequelize";

// Start Session Create Data Product
const createProduct = async (data, transaction) => {
  const t = transaction ? transaction : await productModel.sequelize.transaction();
  try {
    let result = await productModel.create(data, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] CreateProduct", error);
    throw new Error(error);
  }
};
// End Session Create Data Product


// Start Session Update Data Product
const updateProduct = async (data, filter, transaction) => {
  const t = transaction ? transaction : await productModel.sequelize.transaction();
  try {
    let result = await productModel.update(data, { ...filter, transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] updateProduct", error);
    throw new Error(error);
  }
};
// End Session Update Data Product

const deleteProduct = async (filter, transaction) => {
  const t = transaction
    ? transaction
    : await productModel.sequelize.transaction();
  try {
    let result = await productModel.destroy({
      ...filter,
      transaction,
    });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    throw new Error(error);
  }
};

// Start Session Read Data Satuan
const readProduct = async ({ search }, page, page_size) => {
    
  try {
    let result = await productModel.findAndCountAll({
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
    console.error("[EXCEPTION] readProduct", error);
    throw new Error(error);
  }
};
// End Session Read Data Satuan Status = True

// Start Session Read Satuan By Id
const readProductById = async (id) => {
  try {
    let result = await productModel.findByPk(id);
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readProductById", error);
    throw new Error(error);
  }
};
// End Session Read Satuan By Id


export {
  createProduct,
  updateProduct,
  readProduct,
  readProductById,
  deleteProduct,
};
