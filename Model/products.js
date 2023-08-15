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
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "price",
    autoIncrement: false,
  },
};
const options = {
  freezeTableName: true,
  timestamps: false,
  tableName: "product",
  comment: "",
  indexes: [],
};
const productModel = db.define("product", attributes, options);
export default productModel;

// return MAsuransiModel;
