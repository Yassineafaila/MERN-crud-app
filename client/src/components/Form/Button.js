import React from "react";
import PropTypes from "prop-types"; // ES6

const Button = ({ type, value, className,onClick }) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {value}
    </button>
  );
};
Button.prototype = {
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick:PropTypes.func
};
Button.defaultProps = {
  value: "Click",
  type: "button",
  className: "app-button",
};
export default Button;
