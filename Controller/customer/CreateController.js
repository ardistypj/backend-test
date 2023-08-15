import success from "../../Helper/Response/success.js";
import error_handling from "../../Helper/Response/error.js";
import { createCustomer } from "../../Services/customer/customerRepository.js";
import { createCustomerAddress } from "../../Services/customerAddress/customerAddressRepository.js";
import { validationResult } from "express-validator";
import { v4 as uuidv4 } from 'uuid';


export default async function createOne(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return error_handling("Create Customer Data Failed", 422, errors.array(), res);
    } else {
      var customerData = {
        id: uuidv4(),
        customer_name: req.body.customer_name
      };
       
      var customerAddressData = {
        id: uuidv4(),
        customer_id: customerData.id,
        address: req.body.address
      }

      let createCustomerData = await createCustomer(customerData);
      let createCustomerAddressData = await createCustomerAddress(customerAddressData)

      let response = {
        id: customerData.id,
        customer_name: customerData.customer_name,
        address: customerAddressData.address
      }
      return success("Create Customer Data Success", 201, response, res);
    }
  } catch (error) {
    return error_handling("Create Customer Data Failed", 500, error.message, res);
  }
}
