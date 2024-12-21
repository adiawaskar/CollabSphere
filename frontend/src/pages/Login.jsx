import React, { useEffect, useState } from "react";
import axios from 'axios';

const LoginPage = () => {
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
    } catch (error) {
      console.error("Login/Register error:", error);
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
    <div
      className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url('/landing_bg.jpg')` }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isRegistering ? "Create an account" : "Sign in to your account"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
          >
            {isRegistering ? "sign in to your account" : "create a new account"}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {isRegistering && (
              <>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      onChange={handleChange}
                      value={formData.name}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="employeeId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Employee ID
                  </label>
                  <div className="mt-1">
                    <input
                      id="employeeId"
                      name="employeeId"
                      type="text"
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      onChange={handleChange}
                      value={formData.employeeId}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                {isRegistering ? "Create Password" : "Password"}
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder={isRegistering ? "Create Password" : "Password"}
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
            </div>

            {!isRegistering && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isRegistering ? "Create Account" : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;