import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Baseaxios } from "../../config/config";

const ResetPassword: React.FC = () => {
  const { token, email } = useParams<{ token: string, email: string }>(); 
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await Baseaxios.post(`/auth/reset_password/${email}/${token}`, {
        password,
      });

      if (res.data.success) {
        toast.success("Password reset successfully!");
        navigate("/");
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="font-Poppins w-full min-h-screen bg-primary/30">
      <div className="max-w-7xl mx-auto w-full h-screen flex justify-center items-center">
        <div className="w-full max-w-md flex flex-col items-center bg-secondary rounded-xl text-center py-10 gap-6">
          <h1 className="text-4xl mb-5">Reset Password</h1>
          <div className="flex flex-col items-center">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-5 p-2 border rounded"
              placeholder="New Password"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mb-5 p-2 border rounded"
              placeholder="Confirm Password"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full max-w-sm bg-primary px-4 py-2 rounded-xl text-secondary"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
