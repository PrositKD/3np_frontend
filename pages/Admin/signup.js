import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const DeliveryManRegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleRegistration = async (e) => {
    e.preventDefault();

    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{11}$/; // phone numbers are 11 digits long
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number

    // Perform validation here
    if (!name.trim()) {
      setErrorMessage("Name is required");
    } else if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email address");
    } else if (!phoneRegex.test(phoneNumber)) {
      setErrorMessage("Invalid phone number");
    } else if (!address.trim()) {
      setErrorMessage("Address is required");
    } else if (!gender) {
      setErrorMessage("Please select a gender");
    } else if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long and contain at least one letter and one number"
      );
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else if (!photo) {
      setErrorMessage("Photo is required");
    } else {
      try {
        const formData = new FormData();
        formData.append("fullname", name);
        formData.append("phone", phoneNumber);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("name", name);
        formData.append("image", photo);

        const response = await axios.post(
          "http://localhost:3000/admin/signup",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data !== null) {
          router.push("/Admin/login");
        }
      } catch (error) {
        setErrorMessage("Error during registration:" + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center">
          Delivery Man Registration
        </h2>
        {errorMessage && (
          <p className="mt-2 text-center text-red-600">{errorMessage}</p>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleRegistration}>
          <div>
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              className="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              className="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number:</label>
            <input
              type="text"
              className="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Address:</label>
            <textarea
              className="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Gender:</label>
            <select
              className="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              className="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Confirm Password:</label>
            <input
              type="password"
              className="mt-1 p-3 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Photo:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>
          <div className="flex items-center justify-center mt-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition hover:scale-105"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm">
          <Link href="/Admin/login">Already have an account? Go to Login page</Link>
        </p>
      </div>
    </div>
  );
};

export default DeliveryManRegistrationPage;
