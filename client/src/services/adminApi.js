import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { resolvePath } from "react-router-dom";

//Login:
window.localStorage.setItem("isLoggedIn", false);
const LoginHandler = (e, email, password, navigate) => {
  e.preventDefault();
  axios
    .post(`${API_BASE_URL}`, { email, password })
    .then((response) => {
      if (response.data.Status === "success") {
        console.log("success");
        window.localStorage.setItem("isLoggedIn", true);
        navigate("admin");
      } else {
        console.log(response.data.message);
      }
    })
    .catch((error) => {
      console.log("Error :", error.message);
    });
};
// validate Form:

const ValidateForm = (
  e,
  firstName,
  lastName,
  email,
  phone,
  salary,
  setErrors,
  errors // Use the errors object parameter
) => {
  e.preventDefault();

  const newErrors = {}; // Create a new object to hold error messages

  if (!firstName) {
    newErrors.firstName = "This field is required";
  } else {
    newErrors.firstName=""
  }
  if (!lastName) {
    newErrors.lastName = "This field is required";
  } else {
    newErrors.lastName = "";
  }
  if (!email) {
    newErrors.email = "This field is required";
  } else {
    newErrors.email = "";
  }
  if (!phone) {
    newErrors.phone = "This field is required";
  } else {
    newErrors.phone = "";
  }
  if (!salary) {
    newErrors.salary = "This field is required";
  } else {
    newErrors.salary = "";
  }

  // Merge the new error messages with the existing ones
  setErrors({ ...errors, ...newErrors });
};
//Get Data of Employees:
const GetData = async (setData, endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`);
    const data = response.data;
    setData(data);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
  //this all code
  // await axios
  //   .get(`${API_BASE_URL}${endpoint}`)
  //   .then((response) => {
  //     const dataOfEmployees = response.data;
  //     setData(dataOfEmployees);
  //   })
  //   .catch((error) => {
  //     console.log("Error :", error.message);
  //   });
};
//Create an Employee:
const createEmployee = (
  e,
  fname,
  lname,
  email,
  phone,
  salary,
  endpoint,
  navigate
) => {
  e.preventDefault();
  try {
    axios
      .post(`${API_BASE_URL}${endpoint}`, {
        fname,
        lname,
        email,
        salary,
        phone,
      })
      .then((response) => {
        if (response.data.message === "Success") {
          console.log("The Employee has created successfully");
          navigate("/admin");
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Error :", error);
      });
  } catch (error) {
    console.log("Creating has been failed");
  }
};

//get Data of a specific employee:
const GetEmployee = async (
  id,
  setFirstName,
  setLastName,
  setEmail,
  setPhone,
  setSalary
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/admin/update-employee/${id}`
    );
    const data = response.data;
    setFirstName(data.f_name);
    setLastName(data.l_name);
    setEmail(data.email);
    setPhone(data.phone);
    setSalary(data.salary);
  } catch (error) {
    console.log("Error fetching employee :", error);
  }
};
//Updating Employee:
const UpdateTheEmployee = async (
  e,
  id,
  f_name,
  l_name,
  email,
  phone,
  salary,
  navigate
) => {
  e.preventDefault();
  try {
    const response = await axios.put(`${API_BASE_URL}/admin/update/${id}`, {
      f_name,
      l_name,
      email,
      phone,
      salary,
    });
    console.log(response.data);
    if (response.data.Status === "Success") {
      console.log("Updated Successfully");
      navigate(-1);
    }
  } catch (error) {
    console.log("Error :", error);
  }
};

//delete an Employee :
const DeleteEmployee = (id) => {
  try {
    axios
      .delete(`${API_BASE_URL}/admin/delete-employee/${id}`)
      .then((result) => {
        if (result.data.Status === "Success") {
          console.log("Deleted Successfully");
        } else {
          console.log("Deletion Failed:", result.data.Message);
        }
      })
      .catch((error) => {
        console.log("Error While Deleting An Employee:", error);
      });
  } catch (error) {
    console.log("Error in DeleteEmployee Function:", error);
  }
};
export {
  LoginHandler,
  GetData,
  createEmployee,
  GetEmployee,
  UpdateTheEmployee,
  DeleteEmployee,
  ValidateForm,
};
