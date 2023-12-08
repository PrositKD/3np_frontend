import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "./auth";
import Header from "./layout/header";
import Footer from "./layout/footer";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    
    if (!username || !password) {
      setValidationErrors({
        username: username ? "" : "Username is required",
        password: password ? "" : "Password is required",
      });
      return;
    }

    
    if (!emailRegex.test(username)) {
      setValidationErrors({
        ...validationErrors,
        username: "Enter a valid email address",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SELLER}auth/login`,
        {
          username,
          password,
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );

      if (response.data.message === "Password matched") {
        login(username, document.cookie);

        router.push("/seller/Home");
      } else if (
        response.data.message ===
        "there is no existing account using this email.Please sign up fist."
      ) {
        setErrorMessage(
          "There is no existing account using this email. Please sign up first."
        );
      } else {
        setErrorMessage("Password did not match. Please try again with the right password.");
      }
    } catch (error) {
      setErrorMessage("Login failed, please try again later. " + error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <Header />
      <div className="max-w-md w-full bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Login
        </h2>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username :
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className={`p-2 w-full border ${validationErrors.username ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setValidationErrors({ ...validationErrors, username: "" });
            }}
          />
          {validationErrors.username && (
            <p className="text-red-500 text-sm">{validationErrors.username}</p>
          )}

          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="p-2 w-full border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link href="/seller/SignUp" className="font-medium text-indigo-600 hover:text-indigo-500">
            Go to Sign Up
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
