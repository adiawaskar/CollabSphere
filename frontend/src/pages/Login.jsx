import React, { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiUserPlus, FiLogIn } from "react-icons/fi";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setEmail } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isRegistering
        ? "http://localhost:3000/api/auth/signup"
        : "http://localhost:3000/api/auth/login";
      const response = await axios.post(url, formData);
      console.log("Login/Register response:", response.data);
      toast.success(
        isRegistering ? "Registration successful!" : "Login successful!"
      );
      setEmail(response.data.user.email);
      navigate("/home");
    } catch (error) {
      console.error("Login/Register error:", error);
      toast.error("Invalid Credentials. Please try again.");
      if (error.response) {
        toast.error(
          error.response.data.message ||
            error.response.data.msg ||
            "An error occurred."
        );
      } else if (error.request) {
        toast.error("No response from server.");
      } else {
        toast.error("An error occurred while making the request.");
      }
    }
  };

  useEffect(() => {
    document.title = isRegistering
      ? "Create an account"
      : "Sign in to your account";
    return () => {
      document.title = "React App";
    };
  }, [isRegistering]);

  useEffect(() => {
    document.title = 'Login | CollabSphere';
    return () => {
      document.title = 'Vite + React';
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8"
        >
          {/* Logo or Brand */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
              className="mx-auto bg-gradient-to-r from-purple-600 to-indigo-600 w-20 h-20 rounded-full flex items-center justify-center mb-4"
            >
              <FiUser className="text-3xl text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {isRegistering ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="mt-2 text-gray-600">
              {isRegistering ? "Join our community today" : "Sign in to continue"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isRegistering && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      name="name"
                      type="text"
                      required
                      className="pl-10 w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-white/50"
                      placeholder="Enter your name"
                      onChange={handleChange}
                      value={formData.name}
                    />
                  </div>
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                  <div className="relative">
                    <FiUserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      name="employeeId"
                      type="text"
                      required
                      className="pl-10 w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-white/50"
                      placeholder="Enter employee ID"
                      onChange={handleChange}
                      value={formData.employeeId}
                    />
                  </div>
                </div> */}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  required
                  className="pl-10 w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-white/50"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  name="password"
                  type="password"
                  required
                  className="pl-10 w-full px-4 py-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-white/50"
                  placeholder={isRegistering ? "Create password" : "Enter password"}
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
            </div>

            {!isRegistering && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-gray-600">Remember me</label>
                </div>
                <a href="#" className="text-purple-600 hover:text-purple-500 font-medium">
                  Forgot password?
                </a>
              </div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 font-medium shadow-lg shadow-purple-200/50 transition-all"
            >
              {isRegistering ? <FiUserPlus /> : <FiLogIn />}
              {isRegistering ? "Create Account" : "Sign In"}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-purple-600 hover:text-purple-500 font-medium transition-colors"
            >
              {isRegistering ? "Already have an account? Sign in" : "Need an account? Create one"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;