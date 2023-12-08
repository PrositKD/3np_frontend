import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./layout/layout";

const AdminSellerPage = () => {
  const [managersData, setManagersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteSellerId, setDeleteSellerId] = useState(""); // State to store the seller ID for deletion

  useEffect(() => {
    fetchManagersData();
  }, []);

  const fetchManagersData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/seller/1");
      const adminData = response.data[0];
      setManagersData(adminData.managers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/admin/delete/${deleteSellerId}`);
      setDeleteSellerId(""); // Clear the input after deletion
      fetchManagersData(); // Fetch updated data
    } catch (error) {
      console.error("Error deleting seller:", error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
        <div className="flex flex-col items-center justify-center min-h-screen py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-extrabold text-gray-800 text-center">
              Admin Seller Page
            </h2>
            <div className="mt-4">
              <div className="flex space-x-4">
                <input
                  type="number"
                  placeholder="Enter Seller ID"
                  className="px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 flex-grow"
                  value={deleteSellerId}
                  onChange={(e) => setDeleteSellerId(e.target.value)}
                />
                <button
                  onClick={handleDelete}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Delete Seller
                </button>
              </div>
            </div>
            {loading ? (
              <p className="mt-4 text-center text-gray-600">Loading...</p>
            ) : (
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Sellers:</h3>
                <ul className="mt-2">
                  {managersData.map((manager) => (
                    <li key={manager.id} className="mb-4">
                      <p className="text-lg font-semibold">
                        Name: {manager.fname} {manager.lname}
                      </p>
                      <p className="text-gray-700">Email: {manager.email}</p>
                      <p className="text-gray-700">Phone: {manager.phone}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminSellerPage;
