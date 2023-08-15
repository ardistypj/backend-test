import success from "../../Helper/Response/success.js";
import erorr_handling from "../../Helper/Response/error.js";
import { readProduct } from "../../Services/products/productsRepository.js";
import { validationResult } from "express-validator";

export default async function get(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return erorr_handling("Product Data Failed To Get", 422, errors.array(), res);
    } else {
      let page = parseInt(req.query.page || "1");
      let page_size = parseInt(req.query.page_size || "10");
      const search = req.query.search ? req.query.search.toLowerCase() : '';

      let requirement = {};
      if (search) requirement.search = search; //Filter Datas By kode
      let tax = await readProduct(requirement, page, page_size);
      const meta = {
        limit: page_size,
        page: page,
        total_page: Math.ceil(tax.count / page_size),
        total: tax.count,
      };
      return success(
        "Product Data Fetched",
        200,
        tax.rows,
        res,
        meta.total,
        req.query.page,
        req.query.page_size
      );
    }
  } catch (error) {
    console.error(error);
    return erorr_handling("Product Data Failed To Get", 500, error.message, res);
  }
}
