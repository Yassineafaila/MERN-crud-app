import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AddEmployeePage from "./pages/AddEmployeePage";
import { UpdateEmployee } from "./pages/UpdateEmployeePage";

function App() {
  return (
    <div className="App w-full h-screen">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="admin" element={<Admin />}></Route>
        <Route path="admin/add-employee" element={<AddEmployeePage />}></Route>
        <Route
          path="admin/update-employee/:id"
          element={<UpdateEmployee />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
