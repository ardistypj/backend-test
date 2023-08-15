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
  customer_id: {
    type: DataTypes.CHAR(100),
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "customer_id",
    autoIncrement: false,
  },
  address: {
    type: DataTypes.CHAR(100),
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "address",
    autoIncrement: false,
  }
};
const options = {
  freezeTableName: true,
  timestamps: false,
  tableName: "customer_address",
  comment: "",
  indexes: [],
};
const customerAddressModel = db.define("customer_address", attributes, options);
export default customerAddressModel;

// return MAsuransiModel;
