import moment from "moment";
import success from "../../Helper/Response/success.js";
import error_handling from "../../Helper/Response/error.js";
import { createResepDokter } from "../../Services/transactionProducts/transactionProductsRepository.js";
import { createResepObat } from "../../Services/transactionPayment/transactionPaymentRepository.js";
import { validationResult } from "express-validator";
import { readObatById } from "../../Services/Obat/ObatRepository.js";
var nowTime = moment().add(7, "hours").format("YYYY-MM-DD HH:mm:ss");
import { convertTZ } from "../../Helper/Helper.js";

export default async function createOne(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return error_handling("Data Resep Dokter Gagal Ditambahkan", 422, errors.array(), res);
    } else {
      const generateCode = (length) => {
        let result = 'RSP';
        const characters ='0123456789';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      };

      var kode = generateCode(5);
      var inputResepDokter = {
        clinic_id: req.app.locals.clinic_id,
        no_reg: req.body.no_reg,
        m_satuan_id: req.body.m_satuan_id,
        jumlah_obat: req.body.jumlah_obat,
        no_rm: req.body.no_rm,
        nama_dokter: req.body.nama_dokter,
        nama_pasien: req.body.nama_pasien,
        asuransi: req.body.asuransi,
        no_asuransi: req.body.no_asuransi,
        no_invoice: kode,
        m_dokter_id: req.body.m_dokter_id,
        keterangan: req.body.keterangan,
        status: true,
        created_at: convertTZ(new Date(Date.now()), "Asia/Jakarta"),
        updated_at: convertTZ(new Date(Date.now()), "Asia/Jakarta")
    };
      var datas = req.body.m_obat_id;  // Req Input Data Obat

      // Cek Data Obat required
      if (datas == 0 || datas === undefined) {
        return error_handling(
          "Data Resep Dokter Gagal Ditambahkan",
          422,
          "Obat Wajib Diisi",
          res
        );
      } else {
        
        // Create Data Master Resep Dokter
        let createDataResepDokter = await createResepDokter(
          inputResepDokter
          );

        // Loop data pivot Resep Dokter Obat
        await loop(datas, async (item) => {
          var dataSatuan = await readObatById(item.id)
          var resepObat = {
            m_obat_id: item.id,
            jumlah: item.jumlah,
            m_satuan_id: dataSatuan.m_satuan_jual_id,
            aturan_pakai: item.aturan_pakai,
            cara_pakai: item.cara_pakai,
            m_resep_id: createDataResepDokter.id,
            status: true,
            clinic_id: req.app.locals.clinic_id,
            created_at: convertTZ(new Date(Date.now()), "Asia/Jakarta"),
            updated_at: convertTZ(new Date(Date.now()), "Asia/Jakarta")
            };

          // Create Data Pivot 
          let createDataPivot = await createResepObat(
            resepObat
          );
        });

        var responseData = {
          clinic_id: req.app.locals.clinic_id,
          no_rm: req.body.no_rm,
          nama_dokter: req.body.nama_dokter,
          nama_pasien: req.body.nama_pasien,
          asuransi: req.body.asuransi,
          no_asuransi: req.body.no_asuransi,
          no_invoice: kode,
          keterangan: req.body.keterangan,
          obat: datas,
          status: true,
          created_at: convertTZ(new Date(Date.now()), "Asia/Jakarta"),
          updated_at: convertTZ(new Date(Date.now()), "Asia/Jakarta")
        };

        return success("Data Resep Dokter Berhasil Ditambahkan", 201, responseData, res);
      }
    }
  } catch (error) {
    return error_handling("Data Resep Dokter Gagal Ditambahkan", 500, error.message, res);
  }
}

async function loop(items, callback) {
  for (var a = 0; a < items.length; a++) {
    // eslint-disable-next-line
    await callback(items[a]);
  }
}