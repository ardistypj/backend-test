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
  transaction_code: {
    type: DataTypes.CHAR(100),
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "transaction_code",
    autoIncrement: false,
  },
  employer_name: {
    type: DataTypes.CHAR(100),
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "employer_name",
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
