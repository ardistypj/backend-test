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
  name: {
    type: DataTypes.CHAR(255),
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "name",
    autoIncrement: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "is_active",
    autoIncrement: false,
  },
};
const options = {
  freezeTableName: true,
  timestamps: false,
  tableName: "payment_method",
  comment: "",
  indexes: [],
};
const paymentMethodModel = db.define("payment_method", attributes, options);
export default paymentMethodModel;

// return MAsuransiModel;
