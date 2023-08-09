import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      if (response.data.email === username) {
        console.log("Login successful!");
        //localStorage.setItem("userEmail", username);
        const queryParams = new URLSearchParams({ email: username });
         window.location.href = './Home/home?' + queryParams.toString();
        // setErrorMessage("okk");
        // Redirect the user to the dashboard or home page after successful login
        // You can use Next.js router for this, or your backend can provide a token to store in the client for future authenticated requests.
       // window.location.href = './Home/home';
      } else {
        setErrorMessage("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Backend server not responding. Please try again.");
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>

        <h5>
          New User?
          <Link href="/profile/signup">SignUp</Link>
        </h5>
      </form>
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
