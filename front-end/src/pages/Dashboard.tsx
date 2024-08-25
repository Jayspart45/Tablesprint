import React from "react";
import Flex from "../shared/Flex";
import logo from "../assets/logo/logo.svg";

const Dashboard: React.FC = () => {
  return (
    <Flex className="w-full flex flex-col">
      <img src={logo} alt="" />
      <p className="text-xl sm:text-2xl text-gray-400">Welcome to Tablesprint admin</p>
    </Flex>
  );
};

export default Dashboard;
