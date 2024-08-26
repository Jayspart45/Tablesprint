import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "./components/Header";
import Layout from "./components/Layout";
import { LogOutApi } from "./api/authApi";
import "./App.css";
import LogOutModal from "./shared/LogoutModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await LogOutApi();
      if (res.success) {
        toast.success(res.message);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("authToken");
        navigate("/");
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred while logging out. Please try again.");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="font-Poppins">
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <Layout />
      <LogOutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}

export default App;
