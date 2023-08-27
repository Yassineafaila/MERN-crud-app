const express = require("express");
const router = express.Router();
const {
  AdminLogin,
  CreateEmployee,
  GetData,
  GetEmployee,
  UpdateEmployee,
  DeleteEmployee
} = require("../controllers/AdminController");

//create routes:
router.route("/").post(AdminLogin)
router.route("/admin").get(GetData)
router.route("/admin/add-employee").post(CreateEmployee)
router.route("/admin/update-employee/:id").get(GetEmployee)
router.route("/admin/update/:id").put(UpdateEmployee)
router.route("/admin/delete-employee/:id").delete(DeleteEmployee)

module.exports=router