import "./App.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Flex from "./shared/Flex";

function App() {
  return (
    <div className="font-Poppins">
      <Flex className="justify-end  text-secondary bg-primary w-full p-5">logout</Flex>
      <Flex className="w-full h-screen justify-between">
        <Sidebar />
        <Outlet />
      </Flex>
    </div>
  );
}

export default App;
