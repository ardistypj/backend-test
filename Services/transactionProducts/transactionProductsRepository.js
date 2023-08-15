import customerModel from "../../Model/customer.js";
import customerAddressModel from "../../Model/customerAddress.js";
import transactionModel from "../../Model/transactions.js";
import transactionProductModel from "../../Model/transactionProducts.js";
import { Op } from "sequelize";
import sequelize from "sequelize";
import pkg from 'lodash';
const { groupBy, forEach, find } = pkg;
import { getDateTime } from "../../Helper/Helper.js";

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

  try {
    let result = await transactionModel.findAndCountAll({
      where: {
        [Op.or]: [
          {transaction_code: sequelize.where(sequelize.fn('LOWER', sequelize.col('transaction_code')), 'LIKE', '%' + search + '%')},
          {employer_name: sequelize.where(sequelize.fn('LOWER', sequelize.col('employer_name')), 'LIKE', '%' + search + '%')},
        ],        
      },
      offset: page_size * page,
      limit: page_size,
      order: [["id", "DESC"]],
    });
    let result2 = await customerModel.findAndCountAll()
    let result3 = await customerAddressModel.findAndCountAll()

    var datas = result.rows;
    var datas2 = result2.rows;
    var datas3 = result3.rows;

    var newArray = datas.map((item) => {
      const ArrayObat = []

      let filterData = datas2.filter(data => data.m_resep_id == item.id);

      
      forEach(filterData, row => {

      let dataObat = datas3.filter(data => data.id == row.m_obat_id)[0]; 
      let dataSatuan = datas4.filter(data => data.id == row.m_satuan_id)[0]; 

      let detailObat = {
        id_obat: dataObat.id,
        nama_obat: dataObat.nama,
        kode_obat: dataObat.kode,
        harga_jual: dataObat.harga_jual,
        jumlah: filterData[0].jumlah,
        cara_pakai: filterData[0].cara_pakai,
        aturan_pakai: filterData[0].aturan_pakai,
        m_satuan_id: dataSatuan.id,
        nama_satuan: dataSatuan.nama
      }
      ArrayObat.push(detailObat);
    });

      return {
      id: item.id,
      clinic_id: item.clinic_id,
      transaction_code: item.transaction_code,
      employer_name: item.employer_name,
      nama_dokter: item.nama_dokter,
      no_reg: item.no_reg,
      jumlah_obat: item.jumlah_obat,
      m_satuan_id: item.m_satuan_id,
      obat: ArrayObat,
      asuransi: item.asuransi,
      no_asuransi: item.no_asuransi,
      no_invoice: item.no_invoice,
      status_pemeriksaan: item.status_pemeriksaan,
      status_proses: item.status_proses,
      keterangan: item.keterangan,
      m_dokter_id: item.m_dokter_id,
      status: item.status,
      created_at: getDateTime(item.created_at),
      updated_at: getDateTime(item.updated_at)
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
