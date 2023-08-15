import success from "../../Helper/Response/success.js";
import erorr_handling from "../../Helper/Response/error.js";
import { readResepDokter } from "../../Services/ResepDokter/ResepDokterRepository.js";
import { validationResult } from "express-validator";

export default async function get(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return erorr_handling("Data Resep Dokter Gagal Ditampilkan", 422, errors.array(), res);
    } else {
      // const nama_pasien = req.query.nama_pasien || "";
      let page = parseInt(req.query.page || "1");
      let page_size = parseInt(req.query.page_size || "10");
      const search = req.query.search ? req.query.search.toLowerCase() : '';

      let requirement = {};
      let klinik = req.app.locals.clinic_id
      if (search) requirement.search = search; //Filter Datas By kode
      let tax = await readResepDokter(requirement, page, page_size, klinik);
      const meta = {
        limit: page_size,
        page: page,
        total_page: Math.ceil(tax.count / page_size),
        total: tax.count,
      };
      return success(
        "Data Resep Dokter Berhasil Ditampilkan",
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
    return erorr_handling("Data Resep Dokter Gagal Ditampilkan", 500, error.message, res);
  }
}
