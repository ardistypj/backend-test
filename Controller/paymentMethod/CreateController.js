import success from "../../Helper/Response/success.js";
import error_handling from "../../Helper/Response/error.js";
import { createPaymentMethod } from "../../Services/paymentMethod/paymentMethodRepository.js";
import { validationResult } from "express-validator";
import { v4 as uuidv4 } from 'uuid';


export default async function createOne(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return error_handling("Create Payment Method Data Failed", 422, errors.array(), res);
    } else {
      var paymentMethodData = {
        id: uuidv4(),
        name: req.body.name,
        is_active: req.body.is_active
      };
       
      let createPaymentMethodData = await createPaymentMethod(paymentMethodData);
      return success("Create Payment Method Data Success", 201, createPaymentMethodData, res);
    }
  } catch (error) {
    return error_handling("Create Payment Method Data Failed", 500, error.message, res);
  }
}
