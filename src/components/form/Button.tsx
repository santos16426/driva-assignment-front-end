import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  variant?: "default" | "submit";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  children,
  onClick,
  className,
  ...rest
}) => {
  let buttonClass = "button px-4 py-2 rounded-md ";
  switch (variant) {
    case "submit":
      buttonClass += "bg-secondary text-gray-700";
      break;
    case "default":
    default:
      buttonClass += "bg-gray-300 text-gray-700";
      break;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${buttonClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
