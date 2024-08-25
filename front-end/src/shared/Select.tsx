import React from "react";
import { cn } from "../lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

const Select: React.FC<SelectProps> = ({ className, children, ...props }) => {
  return (
    <select
      className={cn("border border-gray-400 rounded p-2 sm:w-[24rem]", className)}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
