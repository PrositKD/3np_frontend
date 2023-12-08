import React, { useState } from "react";
import Link from 'next/link'
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "./Uits/authContext";

const Login = () => {

  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const {  logindata } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
   
    try {
      const data = {
        email: username,
        password: password,
      };
      const response = await axios.post("http://localhost:3000/admin/login", data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

        withCredentials: true

  
      });

      if (response.data.email === username) {
       



  logindata(username, document.cookie);
        router.push("/Admin/about");
      }
    } catch (error) {
      setErrorMessage("Login failed, please try again later." + error);
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="py-10 px-8">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center">Login</h2>
          {errorMessage && <p className="mt-2 text-center text-red-600">{errorMessage}</p>}
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700">Username:</label>
              <input
                type="text"
                className="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Password:</label>
              <input
                type="password"
                className="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition hover:scale-105">
                Login
              </button>
            </div>
          </form>
          <p className="text-center mt-4 text-sm">
            <Link href="/Admin/signup" className="text-indigo-600 hover:text-indigo-800">
              Don't have an account? Go to Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
