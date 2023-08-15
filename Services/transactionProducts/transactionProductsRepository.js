import ResepDokterModel from "../../Model/m_resep_dokter.js";
import resepObatModel from "../../Model/transactions.js";
import obatModel from "../../Model/m_obat.js";
import satuanModel from "../../Model/m_satuan.js";
import moment from "moment";
import { Op } from "sequelize";
import sequelize from "sequelize";
import pkg from 'lodash';
const { groupBy, forEach, find } = pkg;
import { getDateTime } from "../../Helper/Helper.js";

// Start Session Create Data ResepDokter
const createResepDokter = async (data, transaction) => {
  const t = transaction ? transaction : await ResepDokterModel.sequelize.transaction();
  try {
    let result = await ResepDokterModel.create(data, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] CreateResepDokter", error);
    throw new Error(error);
  }
};
// End Session Create Data ResepDokter

// Start Session Update Data ResepDokter
const updateResepDokter = async (data, filter, transaction) => {
  const t = transaction ? transaction : await ResepDokterModel.sequelize.transaction();
  try {
    let result = await ResepDokterModel.update(data, { ...filter, transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] updateResepDokter", error);
    throw new Error(error);
  }
};
// End Session Update Data ResepDokter

// Start Session Read Data ResepDokter
const readResepDokter = async ({ search }, page, page_size, klinik) => {

  try {
    let result = await ResepDokterModel.findAndCountAll({
      where: {
        [Op.or]: [
          {no_rm: sequelize.where(sequelize.fn('LOWER', sequelize.col('no_rm')), 'LIKE', '%' + search + '%')},
          {nama_pasien: sequelize.where(sequelize.fn('LOWER', sequelize.col('nama_pasien')), 'LIKE', '%' + search + '%')},
          {nama_dokter: search ? sequelize.where(sequelize.fn('LOWER', sequelize.col('nama_dokter')), 'LIKE', '%' + search + '%') : { [Op.like]: `%%` }},
        ],        
        clinic_id: klinik
      },
      offset: page_size * page,
      limit: page_size,
      order: [["id", "DESC"]],
    });
    let result2 = await resepObatModel.findAndCountAll()
    let result3 = await obatModel.findAndCountAll()
    let result4 = await satuanModel.findAndCountAll()

    var datas = result.rows;
    var datas2 = result2.rows;
    var datas3 = result3.rows;
    var datas4 = result4.rows;      

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
      no_rm: item.no_rm,
      nama_pasien: item.nama_pasien,
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
    console.error("[EXCEPTION] readResepDokter", error);
    throw new Error(error);
  }
};
// End Session Read Data ResepDokter Status = True

const readResepDokterByNoRm = async ({ no_rm }, page, page_size, klinik) => {

  try {
    let result = await ResepDokterModel.findAndCountAll({
      where: {
        no_rm: no_rm ? { [Op.iLike]: `%${no_rm}%` } : { [Op.iLike]: `%%` },
        clinic_id: klinik
      },
      offset: page_size * page,
      limit: page_size,
      order: [["id", "DESC"]],
    });
    let result2 = await resepObatModel.findAndCountAll()
    let result3 = await obatModel.findAndCountAll()

    var datas = result.rows;
    var datas2 = result2.rows;
    var datas3 = result3.rows;

    var newArray = datas.map((item) => {
      const ArrayObat = []

      let filterData = datas2.filter(data => data.m_resep_id == item.id);

      forEach(filterData, row => {
      let dataObat = datas3.filter(data => data.id == row.m_obat_id)[0]; 

      let detailObat = {
        id_obat: dataObat.id,
        nama_obat: dataObat.nama,
        kode_obat: dataObat.kode
      }
      ArrayObat.push(detailObat);
    });

      return {
      id: item.id,
      clinic_id: item.clinic_id,
      no_rm: item.no_rm,
      nama_pasien: item.nama_pasien,
      nama_dokter: item.nama_dokter,
      no_reg: item.no_reg,
      jumlah_obat: item.jumlah_obat,
      m_satuan_id: item.m_satuan_id,
      obat: ArrayObat,
      asuransi: item.asuransi,
      no_asuransi: item.no_asuransi,
      no_invoice: item.no_invoice,
      keterangan: item.keterangan,
      m_dokter_id: item.m_dokter_id,
      status_proses: item.status_proses,
      status_pemeriksaan: item.status_pemeriksaan,
      status: item.status,
      created_at: getDateTime(item.created_at),
      updated_at: getDateTime(item.updated_at)
      };
    });
  
    result["rows"] = newArray;
    return result;
} catch (error) {
    console.error("[EXCEPTION] readResepDokter", error);
    throw new Error(error);
  }
};

const readResepDokterByNoReg = async ({ no_reg }, page, page_size, klinik) => {

  try {
    let result = await ResepDokterModel.findAndCountAll({
      where: {
        no_reg: no_reg ? { [Op.iLike]: `%${no_reg}%` } : { [Op.iLike]: `%%` },
        clinic_id: klinik
      },
      offset: page_size * page,
      limit: page_size,
      order: [["id", "DESC"]],
    });
    let result2 = await resepObatModel.findAndCountAll()
    let result3 = await obatModel.findAndCountAll()

    var datas = result.rows;
    var datas2 = result2.rows;
    var datas3 = result3.rows;

    var newArray = datas.map((item) => {
      const ArrayObat = []

      let filterData = datas2.filter(data => data.m_resep_id == item.id);

      forEach(filterData, row => {
      let dataObat = datas3.filter(data => data.id == row.m_obat_id)[0]; 

      let detailObat = {
        id_obat: dataObat.id,
        nama_obat: dataObat.nama,
        kode_obat: dataObat.kode
      }
      ArrayObat.push(detailObat);
    });

      return {
      id: item.id,
      clinic_id: item.clinic_id,
      no_rm: item.no_rm,
      nama_pasien: item.nama_pasien,
      nama_dokter: item.nama_dokter,
      no_reg: item.no_reg,
      jumlah_obat: item.jumlah_obat,
      m_satuan_id: item.m_satuan_id,
      obat: ArrayObat,
      asuransi: item.asuransi,
      no_asuransi: item.no_asuransi,
      no_invoice: item.no_invoice,
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
    console.error("[EXCEPTION] readResepDokter", error);
    throw new Error(error);
  }
};

// Start Session Read Data ResepDokter
const readResepDokterStatusAktif = async ({ nama_pasien }, klinik) => {
    
  try {
    let result = await ResepDokterModel.findAndCountAll({
      where: {
        nama_pasien: nama_pasien ? { [Op.iLike]: `%${nama_pasien}%` } : { [Op.iLike]: `%%` },
        clinic_id: klinik,
        status: true
      },
      order: [["id", "DESC"]],
    });
    let result2 = await resepObatModel.findAndCountAll()
    let result3 = await obatModel.findAndCountAll()

    var datas = result.rows;
    var datas2 = result2.rows;
    var datas3 = result3.rows;

    var newArray = datas.map((item) => {
      const ArrayObat = []

      let filterData = datas2.filter(data => data.m_resep_id == item.id);

      forEach(filterData, row => {
      let dataObat = datas3.filter(data => data.id == row.m_obat_id)[0]; 

      let detailObat = {
        id_obat: dataObat.id,
        nama_obat: dataObat.nama,
        kode_obat: dataObat.kode
      }
      ArrayObat.push(detailObat);
    });

      return {
      id: item.id,
      clinic_id: item.clinic_id,
      no_rm: item.no_rm,
      nama_pasien: item.nama_pasien,
      nama_dokter: item.nama_dokter,
      no_reg: item.no_reg,
      jumlah_obat: item.jumlah_obat,
      m_satuan_id: item.m_satuan_id,
      obat: ArrayObat,
      asuransi: item.asuransi,
      no_asuransi: item.no_asuransi,
      no_invoice: item.no_invoice,
      keterangan: item.keterangan,
      m_dokter_id: item.m_dokter_id,
      status_proses: item.status_proses,
      status: item.status,
      created_at: getDateTime(item.created_at),
      updated_at: getDateTime(item.updated_at)
      };
    });
  
    result["rows"] = newArray;
    return result;
} catch (error) {
    console.error("[EXCEPTION] readResepDokter", error);
    throw new Error(error);
  }
}; 

// Start Session Read ResepDokter By Id
const readResepDokterById = async (id) => {
  try {
    let result = await ResepDokterModel.findByPk(id);
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readResepDokterById", error);
    throw new Error(error);
  }
};
// End Session Read ResepDokter By Id

// Start Session ResepDokter By Nama
const findResepDokterByNamaPasien = async (nama_pasien) => {
  try {
    let result = await ResepDokterModel.findOne({
      where: {
        nama_pasien: { [Op.iLike]: `${nama_pasien}` },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] findResepDokterByNamaPasien", error);
    throw new Error(error);
  }
};

const readAllResepDokterByNamaPasien = async (nama_pasien) => {
  try {
    let result = await ResepDokterModel.findAll({
      where: {
        nama_pasien: { [Op.iLike]: `${nama_pasien}` },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readAllResepDokterByNamaPasien", error);
    throw new Error(error);
  }
};
// End Session ResepDokter By Nama

// Start Session ResepDokter By Nama
const findResepDokterByNoRm = async (no_rm) => {
  try {
    let result = await ResepDokterModel.findOne({
      where: {
        no_rm: { [Op.iLike]: `${no_rm}` },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] findResepDokterByNoRm", error);
    throw new Error(error);
  }
};

const readAllResepDokterByNoRm = async (no_rm) => {
  try {
    let result = await ResepDokterModel.findAll({
      where: {
        no_rm: { [Op.iLike]: `${no_rm}` },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readAllResepDokterByNoRm", error);
    throw new Error(error);
  }
};
// End Session ResepDokter By Nama

// Start Session ResepDokter By Nama
const findResepDokterByNoReg = async (no_reg) => {
  try {
    let result = await ResepDokterModel.findOne({
      where: {
        no_reg: { [Op.iLike]: `${no_reg}` },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] findResepDokterByNoReg", error);
    throw new Error(error);
  }
};

const readAllResepDokterByNoReg = async (no_reg) => {
  try {
    let result = await ResepDokterModel.findAll({
      where: {
        no_reg: { [Op.iLike]: `${no_reg}` },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readAllResepDokterByNoReg", error);
    throw new Error(error);
  }
};
// End Session ResepDokter By Nama

// Start Session ResepDokter By Nama
const findResepDokterByNoAsuransi = async (no_asuransi) => {
  try {
    let result = await ResepDokterModel.findOne({
      where: {
        no_asuransi: { [Op.iLike]: `${no_asuransi}` },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] findResepDokterByNoAsuransi", error);
    throw new Error(error);
  }
};

const readAllResepDokterByNoAsuransi = async (no_asuransi) => {
  try {
    let result = await ResepDokterModel.findAll({
      where: {
        no_asuransi: { [Op.iLike]: `${no_asuransi}` },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readAllResepDokterByNoAsuransi", error);
    throw new Error(error);
  }
};
// End Session ResepDokter By Nama

// Start Session ResepDokter By Nama
const findResepDokterByNoInvoice = async (no_invoice) => {
  try {
    let result = await ResepDokterModel.findOne({
      where: {
        no_invoice: { [Op.iLike]: `${no_invoice}` },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] findResepDokterByNoInvoice", error);
    throw new Error(error);
  }
};

const readAllResepDokterByNoInvoice = async (no_invoice) => {
  try {
    let result = await ResepDokterModel.findAll({
      where: {
        no_invoice: { [Op.iLike]: `${no_invoice}` },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readAllResepDokterByNoInvoice", error);
    throw new Error(error);
  }
};
// End Session ResepDokter By Nama

// Start Session ResepDokter By Nama
const findResepDokterByAsuransi = async (asuransi) => {
  try {
    let result = await ResepDokterModel.findOne({
      where: {
        asuransi: { [Op.iLike]: `${asuransi}` },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] findResepDokterByAsuransi", error);
    throw new Error(error);
  }
};

const readAllResepDokterByAsuransi = async (asuransi) => {
  try {
    let result = await ResepDokterModel.findAll({
      where: {
        asuransi: { [Op.iLike]: `${asuransi}` },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readAllResepDokterByAsuransi", error);
    throw new Error(error);
  }
};
// End Session ResepDokter By Nama

// Start Session ResepDokter By Nama
const findResepDokterByNamaDokter = async (nama_dokter) => {
  try {
    let result = await ResepDokterModel.findOne({
      where: {
        nama_dokter: { [Op.iLike]: `${nama_dokter}` },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] findResepDokterByNamaDokter", error);
    throw new Error(error);
  }
};

const readAllResepDokterByNamaDokter = async (nama_dokter) => {
  try {
    let result = await ResepDokterModel.findAll({
      where: {
        nama_dokter: { [Op.iLike]: `${nama_dokter}` },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readAllResepDokterByNamaDokter", error);
    throw new Error(error);
  }
};
// End Session ResepDokter By Nama

// Start Session ResepDokter By Nama
const findResepDokterByKeterangan = async (keterangan) => {
  try {
    let result = await ResepDokterModel.findOne({
      where: {
        keterangan: { [Op.iLike]: `${keterangan}` },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] findResepDokterByKeterangan", error);
    throw new Error(error);
  }
};

const readAllResepDokterByKeterangan = async (keterangan) => {
  try {
    let result = await ResepDokterModel.findAll({
      where: {
        keterangan: { [Op.iLike]: `${keterangan}` },
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] readAllResepDokterByKeterangan", error);
    throw new Error(error);
  }
};
// End Session ResepDokter By Nama

// Start Session ResepDokterModel By Id Klinik
const findResepDokterByJumlahObat = async (jumlah_obat) => {
  try {
    let result = await ResepDokterModel.findOne({
      where: {
        jumlah_obat: jumlah_obat,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const readAllResepDokterByJumlahObat = async (jumlah_obat) => {
  try {
    let result = await ResepDokterModel.findAll({
      where: {
        jumlah_obat: jumlah_obat,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
// End Session ResepDokterModel By Id Klinik

// Start Session ResepDokterModel By Id Klinik
const findResepDokterBySatuan = async (m_satuan_id) => {
  try {
    let result = await ResepDokterModel.findOne({
      where: {
        m_satuan_id: m_satuan_id,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const readAllResepDokterBySatuan = async (m_satuan_id) => {
  try {
    let result = await ResepDokterModel.findAll({
      where: {
        m_satuan_id: m_satuan_id,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
// End Session ResepDokterModel By Id Klinik

// Start Session ResepDokterModel By Id Klinik
const findResepDokterBySatuanProses = async (satuan_proses) => {
  try {
    let result = await ResepDokterModel.findOne({
      where: {
        satuan_proses: satuan_proses,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const readAllResepDokterBySatuanProses = async (satuan_proses) => {
  try {
    let result = await ResepDokterModel.findAll({
      where: {
        satuan_proses: satuan_proses,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
// End Session ResepDokterModel By Id Klinik

// Start Session ResepDokterModel By Id Klinik
const findResepDokterByIdKlinik = async (clinic_id) => {
  try {
    let result = await ResepDokterModel.findOne({
      where: {
        clinic_id: clinic_id,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const readAllResepDokterByIdKlinik = async (clinic_id) => {
  try {
    let result = await ResepDokterModel.findAll({
      where: {
        clinic_id: clinic_id,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
// End Session ResepDokterModel By Id Klinik

// Start Session Filter
const readByFilter = async (filter) => {
try {
  const filterData = {}

  if (filter.clinic_id) {
    filterData.clinic_id = filter.clinic_id //Filtered By Id Klinik
  }

  if (filter.nama_pasien) {
    filterData.nama_pasien = filter.nama_pasien // Filtered By Code
  }

  
  if (filter.nama_dokter) {
    filterData.nama_dokter = filter.nama_dokter // Filtered By Code
  }

  let result = await ResepDokterModel.findOne({
    where: filterData,                      // Find Data ResepDokterModel Based On Filters
  });
  return result;
} catch (error) {
  throw new Error(error);
}
};
// End Session Filter



export {
  createResepDokter,
  updateResepDokter,
  readResepDokter,
  readResepDokterStatusAktif,
  readResepDokterById,
  readAllResepDokterByNamaPasien,
  findResepDokterByNamaPasien,
  readAllResepDokterByNamaDokter,
  findResepDokterByNamaDokter,
  readAllResepDokterByAsuransi,
  findResepDokterByAsuransi,
  readAllResepDokterByKeterangan,
  findResepDokterByKeterangan,
  readAllResepDokterByNoAsuransi,
  findResepDokterByNoAsuransi,
  readAllResepDokterByJumlahObat,
  findResepDokterByJumlahObat,
  readAllResepDokterBySatuanProses,
  findResepDokterBySatuanProses,
  readAllResepDokterByNoReg,
  readResepDokterByNoReg,
  findResepDokterByNoReg,
  readAllResepDokterBySatuan,
  findResepDokterBySatuan,
  readAllResepDokterByNoInvoice,
  findResepDokterByNoInvoice,
  readAllResepDokterByNoRm,
  readResepDokterByNoRm,
  findResepDokterByNoRm,
  findResepDokterByIdKlinik,
  readAllResepDokterByIdKlinik,
  readByFilter
};
