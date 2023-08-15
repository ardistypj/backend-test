import DataTypes from "sequelize";
import db from "../Config/config.js";

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: null,
    comment: null,
    primaryKey: true,
    field: "id",
    autoIncrement: true,
  },
  no_rm: {
    type: DataTypes.CHAR(100),
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "no_rm",
    autoIncrement: false,
  },
  no_reg: {
    type: DataTypes.CHAR(100),
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "no_reg",
    autoIncrement: false,
  },
  nama_dokter: {
    type: DataTypes.CHAR(100),
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "nama_dokter",
    autoIncrement: false,
  },
  nama_pasien: {
    type: DataTypes.CHAR(100),
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "nama_pasien",
    autoIncrement: false,
  },
  asuransi: {
    type: DataTypes.CHAR(100),
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "asuransi",
    autoIncrement: false,
  },
  no_asuransi: {
    type: DataTypes.CHAR(100),
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "no_asuransi",
    autoIncrement: false,
  },
  no_invoice: {
    type: DataTypes.CHAR(100),
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "no_invoice",
    autoIncrement: false,
  },
  keterangan: {
    type: DataTypes.CHAR(100),
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "keterangan",
    autoIncrement: false,
  },
  jumlah_obat: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "jumlah_obat",
    autoIncrement: false,
  },
  m_satuan_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "m_satuan_id",
    autoIncrement: false,
  },
  status_proses: {
    type: DataTypes.CHAR(100),
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "status_proses",
    autoIncrement: false,
  },
  clinic_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "clinic_id",
    autoIncrement: false,
  },
  m_dokter_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "m_dokter_id",
    autoIncrement: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "created_at",
    autoIncrement: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "updated_at",
    autoIncrement: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "status",
    autoIncrement: false,
  },
};
const options = {
  freezeTableName: true,
  timestamps: false,
  tableName: "m_resep_dokter",
  comment: "",
  indexes: [],
};
const resepDokterModel = db.define("m_resep_dokter", attributes, options);
export default resepDokterModel;

// return MAsuransiModel;