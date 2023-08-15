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
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "date",
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
  tableName: "transaction_payment",
  comment: "",
  indexes: [],
};
const transactionPaymentModel = db.define("transaction_payment", attributes, options);
export default transactionPaymentModel;

// return MAsuransiModel;
