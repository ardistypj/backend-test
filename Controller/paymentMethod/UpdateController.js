import success from "../../Helper/Response/success.js";
import error_handling from "../../Helper/Response/error.js";
import {
  updatePaymentMethod,
  readPaymentMethodById,
} from "../../Services/paymentMethod/paymentMethodRepository.js";
import { validationResult } from "express-validator";

export default async function updateOne(req, res, next) {
  try {
    let checkData = await readPaymentMethodById(req.query.id);
    if (!checkData) {
      var deskripsi = {
        value: req.query.id,
        msg: "Payment Method Data Doesnt Exist",
        param: "id",
        location: "params",
      };
      var data_deskripsi = [];
      data_deskripsi.push(deskripsi);
      return error_handling("Failed to Update Payment Method Data", 500, data_deskripsi, res);
    } else {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return error_handling("Failed to Update Payment Method Data", 422, errors.array(), res);
      } else {
        var inputPaymentMethod = {
          name: req.body.name,
          is_active: req.body.is_active
        };
        let updateData = await updatePaymentMethod(inputPaymentMethod, {
          where: { id: req.query.id },
        });
        
        let responseData = await readPaymentMethodById(req.query.id);

        return success("Success to Update Payment Method Data", 200, responseData, res);
      }
    }
  } catch (error) {
    return error_handling("Failed to Update Payment Method Data", 500, error.message, res);
  }
}
