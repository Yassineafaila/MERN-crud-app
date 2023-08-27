import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/Form/InputField";
import Button from "../components/Form/Button";

import { LoginHandler } from "../services/adminApi";
function Login() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    LoginHandler(e, email, password, navigate);
  };
  return (
    <div className="Admin-container w-full h-screen flex items-center justify-center">
      <div className="Admin-child w-96 bg-white p-6 rounded-lg flex flex-col gap-2 shadow-lg ">
        <h3 className="font-semibold text-2xl mb-5 mt-3 text-center">
          Welcome Back!
        </h3>
        <form autoComplete="off" onSubmit={submitHandler}>
          <InputField
            label="Email"
            placeholder="e.g@example.com"
            onChange={setEmail}
            value={email}
            type="email"
          />
          <InputField
            label="Password"
            placeholder=""
            onChange={setPassword}
            value={password}
            type="password"
          />
          <div className="form-group flex flex-col gap-3 mt-3">
            <Button
              type="submit"
              value="Log in"
              className="py-3 px-5 my-5 text-white capitalize rounded-md"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
