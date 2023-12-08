import React, { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import Layout from "../Layout/layout";
import axios from 'axios';

const RegistrationPage = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [house, setHouseName] = useState("");
  const [road, setRoadName] = useState("");
  const [city, setCityName] = useState("");
  const [district, setDistrictName] = useState("");
  const [myfile, setMyfile] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{11}$/; // Assuming phone numbers are 10 digits long
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage("Both First Name and Last Name are required");
    } else if (!phoneRegex.test(phoneNumber)) {
      setErrorMessage("Invalid phone number");
    } else if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email address");
    } else if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long and contain at least one letter and one number"
      );
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else if (!gender) {
      setErrorMessage("Please select a gender");
    } else if (!dateOfBirth) {
      setErrorMessage("Date of birth is required");
    } else if (!house.trim() || !road.trim() || !city.trim() || !district.trim() || !myfile) {
      setErrorMessage("Please fill in all address details and provide a customer photo");
    } else {
      // Assuming the registration is successful, redirect to the home page

      try {
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);

        formData.append("phoneNumber", phoneNumber);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("gender", gender);
        formData.append("dateOfBirth", dateOfBirth);
        formData.append("house", house);
        formData.append("road", road);
        formData.append("city", city);
        formData.append("district", district);
        formData.append("myfile", myfile);
  

        //const apiUrl = process.env.API_URL;

        //const response = await axios.post(`${apiUrl}/create-profile`, data);

        const response = await axios.post(`${process.env.NEXT_PUBLIC_CUSTOMER}create-profile`, formData, {
  
        //const response = await axios.post("http://localhost:3000/customer/create-profile", formData, {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        });
console.log(response.data);
        if (response.status === 201) {
          console.log("res successful!");
          setErrorMessage("Registration successful!");
        
          window.location.href = '/Customer/LogIn';
        
        } 

          
      //  else if(response.statusText==="Not Found")
      //     {console.log("res unsuccessful!");
      //       setErrorMessage("Registration faild!");} 
          
      } catch (error) {
        // if (error.response && error.response.status === 404) {
        //   setErrorMessage("Registration failed. Email already registered."); 
        // } else {
          console.error(error);
          setErrorMessage("Error occurred Backend during registration."); 
        }
      // }
      }
      
    
  };

  return (
   
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Registration</h2>
          {errorMessage && (
            <p className="text-red-500 mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleRegistration} className="space-y-4">
            <div>
              <label className="block text-gray-700">First Name:</label>
              <input
                type="text"
                className="form-input mt-1 block w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name:</label>
              <input
                type="text"
                className="form-input mt-1 block w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number:</label>
              <input
                type="text"
                className="form-input mt-1 block w-full"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                className="form-input mt-1 block w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Password:</label>
              <input
                type="password"
                className="form-input mt-1 block w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Confirm Password:</label>
              <input
                type="password"
                className="form-input mt-1 block w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Gender:</label>
              <select
                className="form-select mt-1 block w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Date of Birth:</label>
              <input
                type="date"
                className="form-input mt-1 block w-full"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">House Name:</label>
              <input
                type="text"
                className="form-input mt-1 block w-full"
                value={house}
                onChange={(e) => setHouseName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Road Name:</label>
              <input
                type="text"
                className="form-input mt-1 block w-full"
                value={road}
                onChange={(e) => setRoadName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">City Name:</label>
              <input
                type="text"
                className="form-input mt-1 block w-full"
                value={city}
                onChange={(e) => setCityName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">District Name:</label>
              <input
                type="text"
                className="form-input mt-1 block w-full"
                value={district}
                onChange={(e) => setDistrictName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Customer Photo:</label>
              <input
                type="file"
                accept="image/*"
                className="form-input mt-1 block w-full"
                onChange={(e) => setMyfile(e.target.value)}
                />
                </div>
                <button
                  type="submit"
                  className="btn bg-blue-500 text-white hover:bg-blue-600 w-full"
                >
                  Register
                </button>
              </form>
              <p className="mt-4 text-center">
                <Link href="/Customer/LogIn" className="text-blue-500">
                  Already have an account? Go to Login page
                </Link>
              </p>
            </div>
          </div>
       
      );
    };
    
    export default RegistrationPage;