import React from "react";
import { cn } from "../lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  title?: string;
}

const Select: React.FC<SelectProps> = ({
  className,
  children,
  title,
  ...props
}) => {
  return (
    <div className="relative">
      <select
        className={cn(
          "border border-gray-400 rounded p-2 sm:w-[24rem] h-12",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <label className="absolute -top-2 font-medium left-5 bg-secondary px-1 rounded">
        {title}
      </label>
    </div>
  );
};

export default Select;
