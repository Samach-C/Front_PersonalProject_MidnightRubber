import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorization = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-lg text-center space-y-6">
        <h1 className="text-3xl font-bold text-red-600">Unauthorized</h1>
        <p className="text-gray-600">
          You do not have the necessary permissions to view this page. Please contact the administrator or try logging in with a different account.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={handleGoHome}
          >
            Go to Home
          </button>
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorization;
