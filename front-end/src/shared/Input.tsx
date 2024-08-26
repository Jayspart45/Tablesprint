import React from "react";
import { cn } from "../lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  className?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  className,
  placeholder,
  ...props
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        className={cn(
          "border border-gray-400 rounded-lg p-2 sm:w-[24rem] outline-none",
          className
        )}
        {...props}
      />
      <label  className="absolute -top-3 font-medium left-5 bg-secondary px-1 rounded">
        {placeholder}
      </label>
    </div>
  );
};

export default Input;
