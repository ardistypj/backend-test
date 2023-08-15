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
  customer_name: {
    type: DataTypes.CHAR(100),
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "customer_name",
    autoIncrement: false,
  },
};
const options = {
  freezeTableName: true,
  timestamps: false,
  tableName: "customer",
  comment: "",
  indexes: [],
};
const customerModel = db.define("customer", attributes, options);
export default customerModel;

// return MAsuransiModel;
