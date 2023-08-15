import moment from "moment";
import success from "../../Helper/Response/success.js";
import error_handling from "../../Helper/Response/error.js";
import {
  updateResepDokter ,
  readResepDokterById,
} from "../../Services/ResepDokter/ResepDokterRepository.js";
import { createResepObat, 
  deleteResepObat, 
  findResepObatByObat, 
  readAllResepObatByResep } from "../../Services/MappingResepDokter/MappingResepDokterRepository.js";
import { validationResult } from "express-validator";
import { readObatById } from "../../Services/Obat/ObatRepository.js";
import { convertTZ } from "../../Helper/Helper.js";
var nowTime = moment().add(7, "hours").format("YYYY-MM-DD HH:mm:ss");

export default async function updateOne(req, res, next) {
  try {
    let checkData = await readResepDokterById(req.query.id);
    if (!checkData) {
      var deskripsi = {
        value: req.query.id,
        msg: "Data Resep Dokter Tidak Tersedia",
        param: "id",
        location: "params",
      };
      var data_deskripsi = [];
      data_deskripsi.push(deskripsi);
      return error_handling("Data Resep Dokter Gagal Diubah", 500, data_deskripsi, res);
    } else {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return error_handling("Data Resep Dokter Gagal Diubah", 422, errors.array(), res);
      } else {
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
          m_dokter_id: req.body.m_dokter_id,
          keterangan: req.body.keterangan,
          status: req.body.status,
          updated_at: convertTZ(new Date(Date.now()), "Asia/Jakarta")
        };
        // let updateData = await updateResepDokter(inputResepDokter, {
        //   where: { id: req.query.id },
        // });
        
        let responseData = await readResepDokterById(req.query.id);

        const pivot = await readAllResepObatByResep(req.query.id);
        if (pivot.length != 0) {
          for (let i = 0; i < pivot.length; i++) {
            await deleteResepObat({
              where: {
                id: pivot[i].id,
                // m_resep_id: req.query.id,
              },
              force: true,
            });
          }
        }

        // Update pivot resep obat
        let updateData = await updateResepDokter(inputResepDokter, {
          where: { id: req.query.id },
        });
        // await updateJenisPemeriksaan(inputitem, { where: { id: req.query.id } });
        for (let i = 0; i < req.body.m_obat_id.length; i++) {
          if (req.body.m_obat_id[i].id_obat) {
            var dataSatuan = await readObatById(req.body.m_obat_id[i].id_obat)
            console.log('dataSatuan ', dataSatuan);
            var resep_obat_detail = {
              clinic_id: req.app.locals.clinic_id,
              m_obat_id: req.body.m_obat_id[i].id_obat,
              m_resep_id: req.query.id,
              jumlah: req.body.m_obat_id[i].jumlah,
              // m_satuan_id: item.m_satuan_id,
              m_satuan_id: dataSatuan.m_satuan_jual_id,
              aturan_pakai: req.body.m_obat_id[i].aturan_pakai,
              cara_pakai: req.body.m_obat_id[i].cara_pakai,
              created_at: convertTZ(new Date(Date.now()), "Asia/Jakarta"),
              updated_at: convertTZ(new Date(Date.now()), "Asia/Jakarta")
                };

            let createData = await createResepObat(
              resep_obat_detail
            );
          } else {
            
          }
        }

        // let datas = req.body.m_obat_id; // Req Body Jenis Pemeriksaan 

        var ArrayDataTmp = [];

        // // Array Konsumsi dan Jenis Pemeriksaan 
        // await loop(datas, async (resep_obat) => {
        //   var resep_obat_detail = {
        //     m_obat_id: resep_obat.id,
        //     m_resep_id: req.query.id,
        //     id_klinik: req.app.locals.clinic_id,
        //     created_at: nowTime,
        //     updated_at: nowTime,
        //   };

        //   // Delete Jenis Pemeriksaan By Id From Table Pivot 
        //   if (resep_obat.action === "delete") {
        //     var deleteData = await deleteResepObat({
        //       where: {
        //         id: resep_obat.id,
        //         m_resep_id: req.query.id,
        //       },
        //       force: true,
        //     });
        //   } else if (resep_obat.action === "new") {   // Adding New Jenis Pemeriksaan 
        //     var resep_obat_detail = {
        //       clinic_id: req.app.locals.clinic_id,
        //       m_obat_id: resep_obat.id,
        //       m_resep_id: req.query.id,
        //       created_at: nowTime,
        //       updated_at: nowTime,
        //     };

        //     let createData = await createResepObat(
        //       resep_obat_detail
        //     );
        //   }
        // });

        var dataPivot = await  readAllResepObatByResep(req.query.id); 

        if(dataPivot){
          await loop(dataPivot, async (item_obat) => {
            let data_obat = await findResepObatByObat(
              item_obat.m_obat_id
              );
            var DatasObat = {
              id: item_obat.m_obat_id,
              nama: data_obat.nama,
              kode: data_obat.kode
              // kode: data_jenis_pemeriksaan.kode,
              // nama: data_jenis_pemeriksaan.nama,
            };
            ArrayDataTmp.push(DatasObat);
          });
        }

        var Response = {
          clinic_id: req.app.locals.clinic_id,
          no_reg: responseData.no_reg,
          m_satuan_id: responseData.m_satuan_id,
          jumlah_obat: responseData.jumlah_obat,
          no_rm: responseData.no_rm,
          nama_dokter: responseData.nama_dokter,
          nama_pasien: responseData.nama_pasien,
          asuransi: responseData.asuransi,
          no_asuransi: responseData.no_asuransi,
          keterangan: responseData.keterangan,
          status: responseData.status,
          m_obat_id: ArrayDataTmp,
          updated_at: convertTZ(new Date(Date.now()), "Asia/Jakarta")
        };

        return success("Data Resep Dokter Berhasil Diubah", 200, Response, res);
      }
    }
  } catch (error) {
    console.log(error);
    return error_handling("Data Resep Dokter Gagal Diubah", 500, error.message, res);
  }
}

async function loop(item, callback) {
  for (var a = 0; a < item.length; a++) {
    // eslint-disable-next-line
    await callback(item[a]);
  }
}