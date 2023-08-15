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
  m_penjualan_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "m_penjualan_id",
    autoIncrement: false,
  },
  m_obat_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "m_obat_id",
    autoIncrement: false,
  },
  jumlah: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "jumlah",
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
  tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "tanggal",
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
};
const options = {
  freezeTableName: true,
  timestamps: false,
  tableName: "mapping_penjualan_obat",
  comment: "",
  indexes: [],
};
const penjualanObatModel = db.define("mapping_penjualan_obat", attributes, options);
export default penjualanObatModel;

// return MAsuransiModel;
