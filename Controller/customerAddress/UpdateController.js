import moment from "moment";
import success from "../../Helper/Response/success.js";
import error_handling from "../../Helper/Response/error.js";
import {
  updateCustomerAddress,
  readCustomerAddressById,
} from "../../Services/customerAddress/customerAddressRepository.js";
import { validationResult } from "express-validator";
var nowTime = moment().add(7, "hours").format("YYYY-MM-DD HH:mm:ss");

export default async function updateOne(req, res, next) {
  try {
    let checkData = await readCustomerAddressById(req.query.id);
    if (!checkData) {
      var deskripsi = {
        value: req.query.id,
        msg: "Customer Address Data Doesnt Exist",
        param: "id",
        location: "params",
      };
      var data_deskripsi = [];
      data_deskripsi.push(deskripsi);
      return error_handling("Failed to Update Customer Data", 500, data_deskripsi, res);
    } else {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return error_handling("Failed to Update Customer Data", 422, errors.array(), res);
      } else {
        var inputCustomerAddress = {
          address: req.body.address
        };
        let updateData = await updateCustomerAddress(inputCustomerAddress, {
          where: { id: req.query.id },
        });
        
        let responseData = await readCustomerAddressById(req.query.id);

        return success("Success to Update Customer Data", 200, responseData, res);
      }
    }
  } catch (error) {
    return error_handling("Failed to Update Customer Data", 500, error.message, res);
  }
}
