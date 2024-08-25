import React, { useEffect, useState } from "react";
import Flex from "../shared/Flex";
import Input from "../shared/Input";
import { LoginApi } from "../api/authApi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo.svg";

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
      [name]: e.target.value.trim(),
    }));
  };

  const handleSubmit = async () => {
    const { email, password } = userData;

    if (email.length > 0 && password.length > 0) {
      try {
        const res = await LoginApi(userData);
        if (res && res.success) {
          localStorage.setItem("authToken", res.data.accessToken);
          localStorage.setItem("isAuthenticated", "true");

          toast.success(res.message);
          navigate("/admin/dashboard");
        } else {
          toast.error(res.message || "Login failed. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred during login. Please try again.");
        console.error("Login error:", error);
      }
    } else {
      toast.warning("Please fill in both fields.");
    }
  };
  const getFromLocal = (key: string): string | null => {
    return localStorage.getItem(key);
  };
  useEffect(() => {
    const isAuthenticated = getFromLocal("isAuthenticated");
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, []);

  return (
    <div className="font-Poppins w-full min-h-screen bg-primary/30 bg-bg_image bg-right bg-contain">
      <Flex className="max-w-7xl mx-auto w-full h-screen justify-start">
        <Flex className="w-full max-w-xl flex-col bg-secondary rounded-xl text-center py-20 gap-12">
          <div className="flex flex-col">
            <img src={logo} alt="logo" />
            <p className="text-xl text-gray-400 mb-10">
              Welcome to TableSprint admin
            </p>
          </div>
          <div className="flex flex-col items-end">
            <Input
              value={userData.email}
              onChange={(e) => handleInput(e, "email")}
              className="mb-5"
              placeholder="Email"
            />
            <Input
              value={userData.password}
              onChange={(e) => handleInput(e, "password")}
              className="mb-2"
              type="password"
              placeholder="Password"
            />
            <Link to="/forgot-password" className="text-primary font-semibold">
              Forgot Password?
            </Link>
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
