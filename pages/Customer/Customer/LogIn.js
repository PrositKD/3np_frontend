import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../Layout/layout";
import axios from "axios";
import { useAuth } from "../Uits/authContext";
import RegistrationPage from "./SignUp";




const Login = () => {

  

  
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const {logindata} = useAuth();
  useEffect(() => {

   

    checkSession(); // Example function call

    // ... any other function calls you want to execute

  }, []); // The empty dependency array means this effect runs only once

  function checkSession()

  {

      var storedUser = JSON.parse(localStorage.getItem('user'));

      if (storedUser)

      {

         

          router.push('http://localhost:8000/Customer/Home');

      }

      else

      {

         

      }

      return storedUser;

  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(username)) {
      setErrorMessage("Invalid email address");
      return;
    } else if (!password.trim()) {
      setErrorMessage("Password is required");
      return;
    }

    // Call the login function to perform the API request
    login();
  };

  async function login() {

    //const {logindata} = useAuth();


    try {




      const data = {
        email: username,
        password: password,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_CUSTOMER}logIn`,
        data,
        {
         
          


          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

          withCredentials: true

     


        }
      );

console.log(response.data);

      if (response.data.name === username) {

        console.log(document.cookie);

        logindata(username, document.cookie);


        window.location.href = "/Customer/Home";
      } else {
        setErrorMessage("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Backend server not responding. Please try again.");
    }
  }

  return (
    
    <div className="flex justify-center items-center h-screen">
      
        <div className="w-full max-w-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="block text-sm font-medium">Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sm w-full">
              Login
            </button>
          </form>
          <p className="mt-2 text-center">
            <Link href="./SignUp" className="text-blue-500 hover:underline">
              Don't have an account? Go to Sign Up
            </Link>
          </p>
        </div>
     
    </div>
    
  );
};

export default Login;
