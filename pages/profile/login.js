import React, { useState,useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "../Uits/authContext";
import { useRouter } from 'next/router';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const router = useRouter();
  const {  logindata } = useAuth();
  
  useEffect(() => {
   
    checkSession(); // Example function call
    // ... any other function calls you want to execute
  }, []); // The empty dependency array means this effect runs only once
  function checkSession()
  {
      var storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser)
      {
          
          router.push('http://localhost:8000/Home/home');
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
    try {
      const data = {
        email: username,
        password: password,
      };
      console.log(data);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_DELIVERY}login`, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true
      });
      console.log(response);
      if (response.data.email === username) {
        console.log("Login successful!");
        console.log("cookie: " + document.cookie);
        logindata(username, document.cookie);
       
        //localStorage.setItem("userEmail", username);
        const queryParams = new URLSearchParams({ email: username });
        // window.location.href = './Home/home?' + queryParams.toString();
        // setErrorMessage("okk");
        // Redirect the user to the dashboard or home page after successful login
        // You can use Next.js router for this, or your backend can provide a token to store in the client for future authenticated requests.
      // window.location.href = './Home/home';
      router.push('/Home/home');
      } else {
        setErrorMessage("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Backend server not responding. Please try again.");
    }
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-80 bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-semibold mb-4 text-center bg-blue">Login As Delivery Man</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block font-medium">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Email here" className="input input-bordered input-error w-full max-w-xs"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password here" className="input input-bordered input-error w-full max-w-xs"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">Login</button>
        <h5 className="mt-2 text-sm">
          New User? <Link href="/profile/signup" className="text-blue-500">SignUp</Link>
        </h5>
      </form>
    </div>
  </div>
  );
};

export default Login;
// let email;
//    function returnValue() {
//     return email;
//   }
  
//   function setValue(email) {
//     email = email;
//     console.log(email);
//     return email;
//   }
