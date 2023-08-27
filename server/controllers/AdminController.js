const asyncHandler = require("express-async-handler");
const { LoginModel, EmployeeModel } = require("../models/model");

//@admin login
//@method POST
//@path /

const AdminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({ message: "All The fields are required !" });
  }
  const admin = await LoginModel.findOne({ email: email, password: password });

  if (!admin) {
    res.json({ message: "No Admin Found" });
  }

  res.json({ message: "Admin Found", Status: "success" });
  console.log("Successfully logged In");
});
//@Get the data
//@method GET
//@path /admin
const GetData = asyncHandler(async (req, res) => {
  const employees = await EmployeeModel.find({});
  if (!employees) {
    res.json({ message: "There's no data " });
  }
  res.json(employees);
});
//@add Employee
//@method POST
//@path /admin/add-employee
const CreateEmployee = asyncHandler(async (req, res) => {
  const { fname, lname, email, phone, salary } = req.body;
  if (!fname || !lname || !email || !phone || !salary) {
    res.json({ message: "All fields are required" });
  }
  const employeeExist = await EmployeeModel.findOne({ email: email });
  if (employeeExist) {
    res.json({ message: "Email Exist In DataBase" });
  } else {
    const employee = await EmployeeModel.create({
      f_name: fname,
      l_name: lname,
      email: email,
      phone: phone,
      salary: salary,
    });
    if (!employee) {
      throw new Error("There was an error durning creating the employee");
    }
  }
  res.json({ message: "Success" });
});
//@Get Employee
//@method POST
//@path admin/update-employee/:id
const GetEmployee = asyncHandler((req, res) => {
  const id = req.params.id;
  console.log(id);
  EmployeeModel.findById({ _id: id }).then((employee) => {
    res.json(employee);
  });
});

//@Update Employee
//@method PUT
//@path admin/update-employee/:id
const UpdateEmployee = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { f_name, l_name, email, phone, salary } = req.body;
  if (!f_name || !l_name || !email || !phone || !salary) {
    return res.json({message:"All The Field required "})
  } else {
    try {
      const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
        { _id: id },
        { f_name: f_name, l_name: l_name, email, phone, salary },
        { new: true } // Get the updated document
      );
      console.log("updated", updatedEmployee);
      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.json({ Status: "Success" });
    } catch (error) {
      console.error("Error updating employee:", error);
      res
        .status(500)
        .json({ message: "An error occurred while updating employee" });
    }
  }
  
});

//@Delete Employee
//@method DELETE
//@path /admin/delete-employee/
const DeleteEmployee = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const deleteEmployee = await EmployeeModel.findByIdAndDelete({ _id: id });
    if (!deleteEmployee) {
      return res.json({ message: "Employee Not Found" });
    }
    res.json({ Status: "Success" });
  } catch (error) {
    console.log("Error updating employee :", error);
    res.json({ message: "An error occurred while deleting employee" });
  }
});
module.exports = {
  AdminLogin,
  CreateEmployee,
  GetData,
  GetEmployee,
  UpdateEmployee,
  DeleteEmployee,
};
