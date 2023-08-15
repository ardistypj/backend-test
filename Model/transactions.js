import DataTypes from "sequelize";
import db from "../Config/config.js";

const attributes = {
  id: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    defaultValue: null,
    comment: null,
    primaryKey: true,
    field: "id",
    autoIncrement: true,
  },
  customer_id: {
    type: DataTypes.UUIDV4,
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "customer_id",
    autoIncrement: false,
  },
  customer_address_id: {
    type: DataTypes.UUIDV4,
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "customer_address_id",
    autoIncrement: false,
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "qty",
    autoIncrement: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "price",
    autoIncrement: false,
  },
  created: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "created",
    autoIncrement: false,
  },
  updated: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "updated",
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
  tableName: "transactions",
  comment: "",
  indexes: [],
};
const transactionModel = db.define("transactions", attributes, options);
export default transactionModel;

// return MAsuransiModel;
