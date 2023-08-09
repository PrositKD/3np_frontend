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
  window.location.href = '/'
      
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
    <div>
      <h2>Delivery Man Registration</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleRegistration}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Charge per Unit:</label>
          <input
            type="text"
            value={tk}
            onChange={(e) => setChargePerUnit(e.target.value)}
          />
        </div>
        <div>
          <label>Vehicle:</label>
          <select value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
            <option value="">Select Vehicle</option>
            <option value="bike">Bike</option>
            <option value="cycle">Cycle</option>
            <option value="truck">Truck</option>
          </select>
        </div>
        <div>
          <label>Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Photo:</label>
          <input
            type="file"
            accept="image/*"
            id="fileInput" 
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>
        <button type="submit">Register</button>
        <h5>Already account?<Link href='/'>Login</Link></h5>
      </form>
    </div>
  );
};

export default DelivaryManRegistrationPage;
