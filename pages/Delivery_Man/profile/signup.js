import React, { useState } from "react";
import Link from "next/link";
import axios from 'axios';

const DelivaryManRegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tk, setChargePerUnit] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegistration = (e) => {
  e.preventDefault();

  // Regular expressions for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{11}$/; // Phone numbers are 11 digits long
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/; // Minimum four characters, at least one letter and one number
  const nameRegex = /^[a-zA-Z- ]+$/; // Only letters, hyphens, and spaces are allowed for the name

  // Perform validation here
  if (!name.trim()) {
    setErrorMessage("Name is required");
  } else if (!nameRegex.test(name)) {
    setErrorMessage("Invalid name format. Only letters, hyphens, and spaces are allowed.");
  } else if (!emailRegex.test(email)) {
    setErrorMessage("Invalid email address");
  } else if (!phoneRegex.test(phoneNumber)) {
    setErrorMessage("Invalid mobile number format");
  } else if (!tk) {
    setErrorMessage("Tk is required");
  } else if (!vehicle) {
    setErrorMessage("Please select a vehicle");  
  } else if (!gender) {
    setErrorMessage("Please select a gender");  
  } 
  else if (!address.trim()) {
    setErrorMessage("Address is required");
  } else if (!passwordRegex.test(password)) {
    setErrorMessage("Password must be at least 4 characters long and contain at least one letter and one number");
  } else if (password !== confirmPassword) {
    setErrorMessage("Passwords do not match");
  } else if (!photo) {
    setErrorMessage("Photo is required");
  } else {
    Registration();
   // setErrorMessage("Registration successful!");
  }
  

async function Registration() {
  try {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('phone', phoneNumber);
  formData.append('tk', tk);
  formData.append('vechile', vehicle);
  formData.append('address', address);
  formData.append('gender', gender);
  formData.append('password', password);
  formData.append('DPhoto', document.querySelector('#fileInput').files[0]);
  for (const entry of formData.entries()) {
    console.log(entry);}
  
    // Make a POST request to the backend API
    const response = await axios.post(`${process.env.NEXT_PUBLIC_DELIVERY}signup`, formData ,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response.data);
    if (response.status === 201) {
      console.log("res successful!");
      setErrorMessage("Registration successful!");} 
  //  else if(response.statusText==="Not Found")
  //     {console.log("res unsuccessful!");
  //       setErrorMessage("Registration faild!");} 
  window.location.href = '/';
      
  } catch (error) {
    if (error.response && error.response.status === 404) {
      setErrorMessage("Registration failed. Email already registered."); 
    } else {
      console.error(error);
      setErrorMessage("Error occurred Backend during registration."); 
    }
  }
}

};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-96 bg-white shadow p-6 rounded grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <h2 className="text-2xl font-semibold mb-4 " >Delivery Man Registration</h2>
          {errorMessage && (
            <div className="alert alert-error flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="ml-2">{errorMessage}</span>
            </div>
          )}
        </div>

        <div className="col-span-1">
          <label className="block font-medium">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-400"
          />

          <label className="block font-medium">Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-400"
          />

          <label className="block font-medium">Charge per Unit:</label>
          <input
            type="text"
            value={tk}
            onChange={(e) => setChargePerUnit(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-400"
          />

          <label className="block font-medium">Vehicle:</label>
          <select
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-400"
          >
            <option value="">Select Vehicle</option>
            <option value="bike">Bike</option>
            <option value="cycle">Cycle</option>
            <option value="truck">Truck</option>
          </select>

          <label className="block font-medium">Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="col-span-1">
          <label className="block font-medium">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-400"
          />

          <label className="block font-medium">Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-400"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label className="block font-medium">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-400"
          />

          <label className="block font-medium">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-400"
          />

          <label className="block font-medium">Photo:</label>
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-400"
          />
      
        </div>
        <div className="col-span-2">
        <button
            type="submit"
            onClick={handleRegistration}
            className="w-full p-2 bg-blue-500 text-white rounded focus:outline-none hover:bg-blue-600"
          >
            Register
          </button>
         
          <h5 className="mt-4">
            Already have an account? <Link href="/" className="text-blue-500">Login</Link>
          </h5></div>
      </div>
      
    </div>
  );
};

export default DelivaryManRegistrationPage;
