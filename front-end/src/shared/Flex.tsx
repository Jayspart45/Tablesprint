import React, { ReactNode } from "react";
import { cn } from "../lib/utils";

interface flexProps {
  children: ReactNode;
  className?: string;
}

const Flex: React.FC<flexProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn("flex justify-center items-center",className)} {...props}>
      {children}
    </div>
  );
};

export default Flex;
