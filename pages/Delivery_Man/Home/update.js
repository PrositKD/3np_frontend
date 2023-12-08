import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../layout/layout';
import { useAuth } from '../Uits/authContext';

const UpdateProfile = () => {
  const { user, logout, checkUser } = useAuth();
  var  storedUser;
  const [profileData, setProfileData] = useState({
    id: 0,
    name: '',
    photo: '',
    phone: '',
    vechile: '',
    tk: 0,
    address: '',
    gender: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    storedUser = JSON.parse(localStorage.getItem('user'));
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const phoneNo =storedUser.email;
      const response = await axios.get(`${process.env.NEXT_PUBLIC_DELIVERY}` + phoneNo);
      console.log(response.data);
      setProfileData(response.data.delivaryDEntity);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    // Regular expressions for validation
    const phoneRegex = /^\d{11}$/;
    const nameRegex = /^[a-zA-Z- ]+$/;

    // Perform validation here
    if (!profileData.name.trim()) {
      setErrorMessage("Name is required");
    } else if (!nameRegex.test(profileData.name)) {
      setErrorMessage("Invalid name format. Only letters, hyphens, and spaces are allowed.");
    } else if (!phoneRegex.test(profileData.phone)) {
      setErrorMessage("Invalid mobile number format");
    } else if (!profileData.tk) {
      setErrorMessage("Tk is required");
    } else if (!profileData.vechile) {
      setErrorMessage("Please select a vehicle");  
    } else if (!profileData.gender) {
      setErrorMessage("Please select a gender");  
    } else if (!profileData.address.trim()) {
      setErrorMessage("Address is required");
    
    } else {
      // Reset error message
      setErrorMessage('');

      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_DELIVERY}updateprofile/${profileData.id}`,
          profileData,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        setErrorMessage('Profile updated successfully');

        console.log('Profile updated successfully', response.data);
      } catch (error) {
        console.error(error);
        console.log(error.message);
      }
    }
  };

  return (
    <div>
  <Layout>
    <h2 className="text-xl font-semibold text-primary text-center">Update Profile</h2>
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mt-4">
      <div className="mb-4">
        <label className="block font-medium">Name:</label>
        <input
          type="text"
          name="name"
          value={profileData.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-400"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium">Phone:</label>
        <input
          type="text"
          name="phone"
          value={profileData.phone}
          onChange={handleInputChange}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-400"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium">Vehicle:</label>
        <select
          name="vechile"
          value={profileData.vechile}
          onChange={handleInputChange}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-400"
        >
          <option value="">Select Vehicle</option>
          <option value="bike">Bike</option>
          <option value="cycle">Cycle</option>
          <option value="truck">Truck</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-medium">Tk:</label>
        <input
          type="number"
          name="tk"
          value={profileData.tk}
          onChange={handleInputChange}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-400"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium">Address:</label>
        <input
          type="text"
          name="address"
          value={profileData.address}
          onChange={handleInputChange}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-400"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium">Gender:</label>
        <select
          name="gender"
          value={profileData.gender}
          onChange={handleInputChange}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-400"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button
        type="submit"
        className="bg-blue-500 text-white rounded px-4 py-2 focus:outline-none hover:bg-blue-600"
      >
        Update Profile
      </button>
    </form>
  </Layout>
</div>

  );
};

export default UpdateProfile;
