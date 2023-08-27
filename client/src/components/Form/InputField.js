import React from "react";
import PropTypes from 'prop-types'; // ES6

const InputField = ({ label, value: initialValue, onChange, type, placeholder ,error}) => {
    
  const changeHandler = (event) => {
      const { value } = event.target;
      onChange(value)
  };
  return (
    <div className="form-group flex flex-col ">
      {label && (
        <label className="text-md text-gray-700 font-semibold cursor-pointer my-4">{label} :</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
              value={initialValue}
              autoComplete="off"
        className="w-full py-3 px-4 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 rounded-md outline-none transition duration-150"
        onChange={changeHandler}
      ></input>
      {error && <p className="text-red-400 mt-1 italic text-sm  font-semibold">{error}</p>}
    </div>
  );
};

InputField.prototype = {
    label: PropTypes.string,
    value: PropTypes.string,
    onchange: PropTypes.func.isRequired,
    type: PropTypes.string,
    placeholder:PropTypes.string
    
}
InputField.defaultProps = {
    value: "",
    type: "text",
    placeholder: "",
    label:""
}
export default InputField;
