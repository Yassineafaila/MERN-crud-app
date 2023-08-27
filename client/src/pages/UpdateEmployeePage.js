import React, { useEffect, useState } from "react";
import InputField from "../components/Form/InputField";
import Button from "../components/Form/Button";
import { useNavigate, useParams } from "react-router-dom";
import { GetEmployee, UpdateTheEmployee,ValidateForm } from "../services/adminApi";

export const UpdateEmployee = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    salary: "",
  });
  const navigate = useNavigate();
  const BackHandler = () => {
    navigate(-1);
  };
  useEffect(() => {
    GetEmployee(id, setFirstName, setLastName, setEmail, setPhone, setSalary);
  }, []);
  const UpdateHandler = (e) => {
    ValidateForm(
      e,
      firstName,
      lastName,
      email,
      phone,
      salary,
      setErrors,
      errors
    );
    UpdateTheEmployee(
      e,
      id,
      firstName,
      lastName,
      email,
      phone,
      salary,
      navigate
    );
  };
  return (
    <div className="container  py-6 px-10 mx-auto">
      <form
        className="w-96 lg:w-4/5 md:w-4/5 xl:w-2/5 2xl:w-2/5 mx-auto bg-white px-10  py-6 rounded-md shadow-lg my-5"
        autoComplete="off"
        method="POST"
        onSubmit={UpdateHandler}
      >
        <h1 className="text-2xl font-bold text-center mt-4 mb-2">
          Update Employee
        </h1>
        <InputField
          label="First Name"
          value={firstName}
          onChange={setFirstName}
          type="text"
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          value={lastName}
          onChange={setLastName}
          type="text"
          error={errors.lastName}
        />
        <InputField
          label="Email"
          value={email}
          onChange={setEmail}
          type="email"
          error={errors.email}
        />
        <InputField
          label="Salary"
          value={salary}
          onChange={setSalary}
          type="text"
          error={errors.salary}
        />
        <InputField
          label="Phone"
          value={phone}
          onChange={setPhone}
          type="text"
          error={errors.phone}
        />
        <div className="form-group flex  gap-4 my-11">
          <Button
            type="submit"
            value="Update"
            className="text-white bg-green-600 uppercase font-semibold px-4 rounded-md py-2 "
          />
          <Button
            type="button"
            value="Cancel"
            className="text-gray-800 bg-gray-200 uppercase font-semibold px-4 w-28 rounded-md py-3 bg-opacity-50 hover:bg-opacity-100 text-md md:text-sm"
            onClick={BackHandler}
          />
        </div>
      </form>
    </div>
  );
};
