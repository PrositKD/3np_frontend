import React, { useState } from "react";
import Link from 'next/link'
import { useRouter } from "next/router";
import Header from "./layout/header";
import Footer from "./layout/footer";
import axios from 'axios';

const RegistrationPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopType, setShopType] = useState("");
  const [shopPhoto, setShopPhoto] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{11}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


  if (!name.trim()) {
    setErrorMessage("Name is required");
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
  } else if (!shopName.trim()) {
    setErrorMessage("Shop name is required");
  } else if (!shopType.trim()) {
    setErrorMessage("Shop type is required");
  } else if (!shopPhoto) {
    setErrorMessage("Shop photo is required");
  } else if (!shopAddress.trim()) {
    setErrorMessage("Shop address is required");
  } else {

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phoneNumber", phoneNumber);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("gender", gender);
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("shopName", shopName);
      formData.append("shopType", shopType);
      formData.append("shopPhoto", shopPhoto);
      formData.append("shopAddress", shopAddress);

      

      const response = await axios.post(`${process.env.NEXT_PUBLIC_SELLER}seller/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });

      
      if (response.data!==null) {
        let shopPath=shopPhoto.name;
          const queryParams = new URLSearchParams({
            name,
            phoneNumber,
            email,
            password,
            gender,
            dateOfBirth,
            shopName,
            shopType,
            shopPath,
            shopAddress,
          });
          
        
          router.push({
            pathname: "/seller/OtpPage",
            query: queryParams.toString(),
          });
          console.log("dukse");
       
        
      }
    } catch (error) {
      setErrorMessage("Error during registration:"+ error.message);
    }
    
    //router.push("/seller/OtpPage");
  
  }

  
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold mb-4">Registration</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form className="space-y-4" onSubmit={handleRegistration}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number:
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              className="mt-1 p-2 w-full border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password:
            </label>
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender:
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth:
            </label>
            <input
              type="date"
              className="mt-1 p-2 w-full border rounded-md"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          {/* Shop Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Shop Name:
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
          </div>
          {/* Shop Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Shop Type:
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={shopType}
              onChange={(e) => setShopType(e.target.value)}
            />
          </div>
          {/* Shop Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Shop Photo:
            </label>
            <input
              type="file"
              accept="image/*"
              className="mt-1 p-2 w-full border rounded-md"
              onChange={(e) => setShopPhoto(e.target.files[0])}
            />
          </div>
          {/* Shop Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Shop Address:
            </label>
            <textarea
              className="mt-1 p-2 w-full border rounded-md"
              value={shopAddress}
              onChange={(e) => setShopAddress(e.target.value)}
            />
          </div>
          {/* Register Button */}
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
        {/* Login Link */}
        <p className="mt-4">
          <Link
            href="/seller/LogIn"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Already have an account? Go to Login page
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default RegistrationPage;
