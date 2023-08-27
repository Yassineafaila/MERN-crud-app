import React, { useEffect, useState } from "react";
import { GetData } from "../services/adminApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DeleteEmployee } from "../services/adminApi";
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";
import { slideTop } from "../components/variants/variants";
 import { ToastContainer, toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Form/Button";
toast("Successfully Logged ", {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  color:"green"
});
function Admin() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await GetData(setData, pathname);
        setIsLoading(false);
      } catch (error) {
        console.log("Error Fetching Data :", error);
        setIsLoading(false);
      }
    };
    setTimeout(fetchData, 2000);
  }, []);
  //click handler for button:
  const handleClick = () => {
    navigate("add-employee");
  };
  const logoutHandler = () => {
    window.localStorage.setItem("isLoggedIn", false);
    window.localStorage.clear()
    navigate("/")
  }
  const deleteHandler = (id,setData,pathname) => {
    DeleteEmployee(id);
    navigate(0)
  };
  return (
    <motion.div
      className="Admin-page h-screen w-full  bg-white py-7 px-7 shadow-lg flex flex-col items-start"
      variants={slideTop}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-center mb-9 font-bold text-2xl">
        Employee Management Software
      </h1>
      <div className="flex  w-72  items-center  gap-3 mb-9">
        <Button
          type="button"
          value="Add Employee"
          className="text-blue-800 bg-blue-200 uppercase font-semibold px-4 rounded-md py-2 bg-opacity-50 hover:bg-opacity-100 text-md md:text-sm"
          onClick={handleClick}
        />
        <Button
          type="button"
          value="Logout"
          className="text-red-800 bg-red-200 uppercase font-semibold px-4 rounded-md py-2 bg-opacity-50 hover:bg-opacity-100 text-md md:text-sm"
          onClick={logoutHandler}
        />
      </div>
      {isLoading ? (
        <div className="flex mt-10  items- justify-center w-full">
          <ClipLoader
            color="#36d7b7"
            loading={isLoading}
            size={90}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : data && data.length > 0 ? (
        <div className="overflow-auto w-full 2xl:max-w-7xl  rounded-lg shadow-lg">
          <table className="border-collapse  text-center text-md font-light w-full bg-gray-50 border-b-2 border-gray-200   ">
            <thead className="border-b font-medium ">
              <tr>
                <th
                  scope="col"
                  className="w-20 px-5 py-3.5 text-sm tracking-wide"
                >
                  Id
                </th>
                <th scope="col" className="px-6 py-3.5 text-sm tracking-wide">
                  First Name
                </th>
                <th scope="col" className="px-6 py-3.5 text-sm tracking-wide">
                  Last Name
                </th>
                <th scope="col" className="px-6 py-3.5">
                  Email
                </th>
                <th scope="col" className="px-6 py-3.5 text-sm tracking-wide">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3.5 text-sm tracking-wide">
                  Salary
                </th>
                <th scope="col" className="px-6 py-3.5 text-sm tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((item, index) => {
                return (
                  <tr className="" key={item._id}>
                    <td className="px-6 py-3.5 font-semibold text-sm whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-3.5 font-medium text-sm whitespace-nowrap">
                      {item.f_name}
                    </td>
                    <td className="px-6 py-3.5 font-medium text-sm whitespace-nowrap">
                      {item.l_name}
                    </td>
                    <td className="px-6 py-3.5 font-medium text-sm whitespace-nowrap">
                      {item.email}
                    </td>
                    <td className="px-6 py-3.5 font-medium text-sm whitespace-nowrap">
                      {item.phone}
                    </td>
                    <td className="px-6 py-3.5 font-medium text-sm whitespace-nowrap">
                      {item.salary}
                    </td>
                    <td className="px-6 py-3.5 font-medium text-sm whitespace-nowrap flex items-center justify-between gap-3">
                      <button className="text-green-800 bg-green-200 uppercase font-semibold px-4 rounded-md py-2 bg-opacity-50 hover:bg-opacity-100">
                        <Link to={`update-employee/${item._id}`}>Update</Link>
                      </button>
                      <button
                        className=" text-yellow-800 bg-yellow-200 uppercase font-semibold px-4 rounded-md py-2 bg-opacity-50 hover:bg-opacity-100"
                        onClick={(e) => deleteHandler(`${item._id}`)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex w-full items-center justify-center">
          <p className="font-semibold text-red-500mt-10 ">
            No data available
          </p>
        </div>
      )}
      {window.localStorage.getItem("isLoggedIn") && (
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      )}
    </motion.div>
  );
}

export default Admin;
