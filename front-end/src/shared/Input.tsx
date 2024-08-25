import React from "react";
import { cn } from "../lib/utils";

// Define the type for the props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ type = "text", className, ...props }) => {
  return (
    <input
      type={type}
      className={cn(
        "border border-gray-400 rounded p-2 sm:w-[24rem]",
        className
      )}
      {...props}
    />
  );
};

export default Input;
