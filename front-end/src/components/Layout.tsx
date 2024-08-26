import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Flex from "../shared/Flex";

const Layout: React.FC = () => {
  return (
    <Flex className="w-full h-screen justify-between pt-32">
      <Sidebar />
      <Outlet />
    </Flex>
  );
};

export default Layout;
