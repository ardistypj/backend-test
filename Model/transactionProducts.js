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
  transaction_id: {
    type: DataTypes.UUIDV4,
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "transaction_id",
    autoIncrement: false,
  },
  products_id: {
    type: DataTypes.UUIDV4,
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "products_id",
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
  product_price: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "product_price",
    autoIncrement: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "total",
    autoIncrement: false,
  },
};
const options = {
  freezeTableName: true,
  timestamps: false,
  tableName: "transaction_product",
  comment: "",
  indexes: [],
};
const transactionProductModel = db.define("transaction_product", attributes, options);
export default transactionProductModel;

// return MAsuransiModel;
