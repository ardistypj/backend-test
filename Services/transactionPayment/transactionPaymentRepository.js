import ResepObatModel from "../../Model/transactions.js";
import moment from "moment";
import { Op } from "sequelize";

// Start Session Create Data ResepObat
const createResepObat = async (data, transaction) => {
  const t = transaction ? transaction : await ResepObatModel.sequelize.transaction();
  try {
    let result = await ResepObatModel.create(data, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] CreateResepObat", error);
    throw new Error(error);
  }
};
// End Session Create Data ResepObat

// Start Session Update Data ResepObat
const updateResepObat = async (data, filter, transaction) => {
  const t = transaction ? transaction : await ResepObatModel.sequelize.transaction();
  try {
    let result = await ResepObatModel.update(data, { ...filter, transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] updateResepObat", error);
    throw new Error(error);
  }
};
// End Session Update Data ResepObat

const deleteResepObat = async (filter, transaction) => {
  const t = transaction
    ? transaction
    : await ResepObatModel.sequelize.transaction();
  try {
    let result = await ResepObatModel.destroy({
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

// Start Session Read ResepObat By Id
const readResepObatById = async (id) => {
  try {
    let result = await ResepObatModel.findByPk(id);
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readResepObatById", error);
    throw new Error(error);
  }
};
// End Session Read ResepObat By Id

// Start Session ResepObat By Nama
const findResepObatByObat = async (m_obat_id) => {
  try {
    let result = await ResepObatModel.findOne({
      where: {
        m_obat_id: m_obat_id
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] findResepObatByObat", error);
    throw new Error(error);
  }
};

const readAllResepObatByObat = async (m_obat_id) => {
  try {
    let result = await ResepObatModel.findAll({
      where: {
        m_obat_id: m_obat_id
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readAllResepObatByObat", error);
    throw new Error(error);
  }
};
// End Session ResepObat By Nama

// Start Session ResepObat By Nama
const findResepObatByResep = async (m_resep_id) => {
  try {
    let result = await ResepObatModel.findOne({
      where: {
        m_resep_id: m_resep_id
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] findResepObatByResep", error);
    throw new Error(error);
  }
};

const readAllResepObatByResep = async (m_resep_id) => {
  try {
    let result = await ResepObatModel.findAll({
      where: {
        m_resep_id: m_resep_id
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readAllResepObatByResep", error);
    throw new Error(error);
  }
};

const readAllResepObatByResepObat = async (m_resep_id, m_obat_id, klinik) => {
  try {
    let result = await ResepObatModel.findAll({
      where: {
        m_resep_id: m_resep_id,
        m_obat_id: m_obat_id,
        clinic_id: klinik
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readAllResepObatByResep", error);
    throw new Error(error);
  }
};
// End Session ResepObat By Nama

// Start Session ResepObatModel By Id Klinik
const findResepObatByIdKlinik = async (clinic_id) => {
  try {
    let result = await ResepObatModel.findOne({
      where: {
        clinic_id: clinic_id,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const readAllResepObatByIdKlinik = async (clinic_id) => {
  try {
    let result = await ResepObatModel.findAll({
      where: {
        clinic_id: clinic_id,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
// End Session ResepObatModel By Id Klinik

export {
  createResepObat,
  updateResepObat,
  deleteResepObat,
  readResepObatById,
  readAllResepObatByObat,
  findResepObatByObat,
  readAllResepObatByResep,
  findResepObatByResep,
  readAllResepObatByResepObat,
  findResepObatByIdKlinik,
  readAllResepObatByIdKlinik,
};
