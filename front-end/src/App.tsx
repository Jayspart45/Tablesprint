import { useState } from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Flex from "./shared/Flex";
import LogOutModal from "./shared/LogoutModal";
import { LogOutApi } from "./api/authApi";
import { FaRegUserCircle } from "react-icons/fa";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await LogOutApi();
      if (res.success) {
        localStorage.removeItem("isAuthenticated"); 
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="font-Poppins">
      <Flex className="fixed top-0 left-0 right-0 flex justify-end items-center px-5 py-4 bg-primary text-secondary">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-white rounded px-4 py-2"
        >
          <FaRegUserCircle size={24} />
        </button>
      </Flex>
      <Flex className="w-full h-screen justify-between pt-20">
        <Sidebar />
        <Outlet />
      </Flex>
      <LogOutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}

export default App;
