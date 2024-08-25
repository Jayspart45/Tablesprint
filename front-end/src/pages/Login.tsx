import React, { useState } from "react";
import Flex from "../shared/Flex";
import Input from "../shared/Input";
import { LoginApi } from "../api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setUserData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };
  const handleSubmit = async () => {
    if (userData.email.length > 0 && userData.password.length > 0) {
      const res = await LoginApi(userData);
      if (res) {
        toast.success(res.message);
        navigate("/admin/dasboard");
      }
    } else {
      toast.warning("Please fill in both fields.");
    }
  };
  return (
    <div className="font-Poppins w-full min-h-screen bg-primary/30">
      <Flex className="max-w-7xl mx-auto w-full h-screen  justify-start">
        <Flex className="w-full max-w-xl flex-col bg-secondary rounded-xl text-center py-20 gap-12">
          <div className="flex flex-col">
            <img src="" alt="" />
            <h1 className="text-4xl mb-5">TableSprint</h1>
            <p className="text-xl text-gray-400 mb-10">
              Welcome to tableSprint admin
            </p>
          </div>
          <div className="flex flex-col items-end">
            <Input
              value={userData.email}
              onChange={(e) => handleInput(e, "email")}
              className="mb-5"
              placeholder="email"
            />
            <Input
              value={userData.password}
              onChange={(e) => handleInput(e, "password")}
              className="mb-2"
              type="password"
              placeholder="password"
            />
            <button className="text-primary font-semibold">
              Forgot Password?
            </button>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full max-w-sm bg-primary px-4 py-2 rounded-xl text-secondary"
          >
            Login
          </button>
        </Flex>
      </Flex>
    </div>
  );
};

export default Login;
