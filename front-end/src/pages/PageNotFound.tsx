import React from "react";
import { useNavigate } from "react-router-dom";
const PageNotFound: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/admin/dashboard");
  };
  return (
    <div className="flex text-center items-center justify-center min-h-screen bg-cover relative bg-color-4">
      
      <div className=" p-6   flex flex-col items-center gap-2">
        <div>
          <h1 className="text-3xl font-bold text-color1 mb-4 text-color-14">
            404 Not Found
          </h1>
          <p className="text-color4 text-xl">
            Can't seem to find the page you are looking for.
          </p>
          <button
            className="text-white bg-primary px-5 py-3 text-lg rounded-xl mt-6 hover:bg-slate-800 hover:text-text2 transition duration-300 transform hover:scale-105"
            onClick={handleClick}
          >
            Back to Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
