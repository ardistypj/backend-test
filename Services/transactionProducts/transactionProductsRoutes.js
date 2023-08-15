import create_m_resep_dokter from "../../Controller/m_resep_dokter/CreateController.js";
import update_m_resep_dokter from "../../Controller/m_resep_dokter/UpdateController.js";
import update_m_resep_dokter_status from "../../Controller/m_resep_dokter/UpdateStatusController.js";
import read_m_resep_dokter from "../../Controller/m_resep_dokter/ReadController.js";
import read_status_aktif_m_resep_dokter from "../../Controller/m_resep_dokter/ReadControllerStatusAktif.js";
import read_by_norm from "../../Controller/m_resep_dokter/ReadByNoRmController.js";
import read_by_noreg from "../../Controller/m_resep_dokter/ReadByNoRegController.js";
import validator_m_resep_dokter from "../../Validator/ResepDokterValidator.js";
import AuthMiddleware from "../../Middleware/authentication.js"

const resepDokterRoutes = (app) => {
  app.route(`/api/resep_dokter/create`).post(AuthMiddleware, validator_m_resep_dokter("create"), create_m_resep_dokter);
  app.route(`/api/resep_dokter/update`).put(AuthMiddleware, validator_m_resep_dokter("update"), update_m_resep_dokter);
  app.route(`/api/resep_dokter/update_status`).put(AuthMiddleware, update_m_resep_dokter_status);
  app.route(`/api/resep_dokter/ResepByNoRm`).get(AuthMiddleware, read_by_norm);
  app.route(`/api/resep_dokter/ResepByNoReg`).get(AuthMiddleware, read_by_noreg);
  app.route(`/api/resep_dokter/read`).get(AuthMiddleware, validator_m_resep_dokter("read"), read_m_resep_dokter);
  app.route(`/api/resep_dokter_aktif/read`).get(AuthMiddleware, validator_m_resep_dokter("read_aktif"), read_status_aktif_m_resep_dokter);

};
export { resepDokterRoutes };
