import React from "react";
import "./Input.css";

type InputStyle = {
  type?: string;
  value?: any;
  className?: string;
  placeholder?: string;
  onChange?: any;
};

const InputUI = (prop: InputStyle) => {
  let { type, value, className, placeholder, onChange } = prop;
  return (
    <input
      type={type || "text"}
      value={value}
      className={`custom-input ${className}`}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default InputUI;
