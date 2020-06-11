import React, { CSSProperties } from "react";
import "./Input.css";

type InputStyle = {
  type?: string;
  value?: any;
  style?: CSSProperties;
  className?: string;
  placeholder?: string;
  onChange?: any;
};

const InputUI = (prop: InputStyle) => {
  let { type, value, style, className, placeholder, onChange } = prop;
  return (
    <input
      type={type || "text"}
      value={value}
      style={style}
      className={`custom-input ${className}`}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default InputUI;
