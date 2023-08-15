import success from "../../Helper/Response/success.js";
import error_handling from "../../Helper/Response/error.js";
import { updateProduct, readProductById } from "../../Services/products/productsRepository.js";
import { validationResult } from "express-validator";

export default async function updateOne(req, res, next) {
  try {
    let checkData = await readProductById(req.query.id);
    if (!checkData) {
      var deskripsi = {
        value: req.query.id,
        msg: "Product Data Doesnt Exist",
        param: "id",
        location: "params",
      };
      var data_deskripsi = [];
      data_deskripsi.push(deskripsi);
      return error_handling("Failed to Update Product Data", 500, data_deskripsi, res);
    } else {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return error_handling("Failed to Update Product Data", 422, errors.array(), res);
      } else {
        var inputProduct = {
          name: req.body.name,
          price: req.body.price
        };
        let updateData = await updateProduct(inputProduct, {
          where: { id: req.query.id },
        });
        
        let responseData = await readProductById(req.query.id);

        return success("Success to Update Product Data", 200, responseData, res);
      }
    }
  } catch (error) {
    return error_handling("Failed to Update Customer Data", 500, error.message, res);
  }
}
