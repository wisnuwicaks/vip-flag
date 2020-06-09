import React, { CSSProperties } from "react";
import "./Button.css";

type ButtonStyle = {
  type?: "contain" | "outline" | "text";
  className?: string;
  style?: CSSProperties;
  children?: any;
  onClick?: any;
};

const ButtonUI = (prop: ButtonStyle) => {
  let { type, className, style, children, onClick } = prop;
  return (
    <div
      className={`custom-btn custom-btn-${(type =
        type || "contain")} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ButtonUI;
