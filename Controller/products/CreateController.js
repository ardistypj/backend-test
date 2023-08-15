import success from "../../Helper/Response/success.js";
import error_handling from "../../Helper/Response/error.js";
import { createProduct } from "../../Services/products/productsRepository.js";
import { validationResult } from "express-validator";
import { v4 as uuidv4 } from 'uuid';


export default async function createOne(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return error_handling("Create Product Method Data Failed", 422, errors.array(), res);
    } else {
      var productData = {
        id: uuidv4(),
        name: req.body.name,
        price: req.body.price
      };
       
      let createProductData = await createProduct(productData);
      return success("Create Product Method Data Success", 201, createProductData, res);
    }
  } catch (error) {
    return error_handling("Create Product Method Data Failed", 500, error.message, res);
  }
}
