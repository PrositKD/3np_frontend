import React, { useState, useEffect } from "react";
import axios from 'axios';
import Layout from '../Layout/layout';

const ProfilePage = () => {
  const [customerData, setCustomerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {



    
    fetchCustomerData();
  }, []);

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_CUSTOMER}get/12`); // Replace with your API endpoint
      setCustomerData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setCustomerData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_CUSTOMER}update/12`, customerData); // Replace with your API endpoint

      if (response.status === 200) {
        setMessage('Update successful');
      } else {
        setMessage('Update failed');
      }
    } catch (error) {
      console.error(error);
      console.log(customerData);
      setMessage('An error occurred while updating');
    }
  };

  if (loading) {
    return (
      <Layout page="about">
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout page="about">
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Customer Profile</h2>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium">First Name:</label>
            <input
              type="text"
              value={customerData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Last Name:</label>
            <input
              type="text"
              value={customerData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Phone Number:</label>
            <input
              type="text"
              value={customerData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          {/* Add more input fields for other customer data */}
        </form>
        <button onClick={handleUpdate} className="btn btn-primary w-full">
          Update
        </button>
      </div>
    </Layout>
  );
};

export default ProfilePage;
