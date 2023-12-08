import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "./layout/header";
import Footer from "./layout/footer";

const OTPPage = () => {
  const [otp, setOTP] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const {
    query: {
      name,
      phoneNumber,
      email,
      password,
      gender,
      shopName,
      shopType,
      dateOfBirth,
      shopPath,
      shopAddress,
    },
  } = router;

  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    const formData = {
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
      otp,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SELLER}seller/otp`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "OTP verification successful") {
        setSuccessMessage("Registration successful!");
        router.push("/seller/LogIn");
      } else {
        setErrorMessage("Your OTP did not match. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error during registration: " + error.message);
    }
  };

  return (
    <div>
      <Header></Header>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-6 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-semibold text-center">Enter OTP</h2>
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
        <form onSubmit={handleOTPSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              OTP:
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default OTPPage;
