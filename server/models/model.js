const mongoose = require("mongoose");
const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required:[true,"Please You Need to Enter the Email"]
    },
    password: {
        type: String,
        required:[true,"Please Enter The Password"]
    }
})
const EmployeeSchema = new mongoose.Schema(
  {
    f_name: {
      type: String,
      required: [true, "Please Enter the First Name"],
    },
    l_name: {
      type: String,
      required: [true, "Please Enter the Last Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter the Email"],
    },
    phone: {
      type: String,
      required: [true, "Please Enter the Phone Number"],
    },
    salary: {
      type: String,
      required: [true, "Please Enter the Salary"],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
const LoginModel = new mongoose.model("logins", LoginSchema);
const EmployeeModel=new mongoose.model("employees",EmployeeSchema)

module.exports = { LoginModel, EmployeeModel }