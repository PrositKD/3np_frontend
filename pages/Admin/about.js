import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "./layout/layout";

const ProfilePage = () => {
  const router = useRouter();
  const id = 1; // Get the ID from the route parameter

  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch profile data when the component mounts
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/admin/search/${id}`);
        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id]);

  return (
    <Layout page="profile">
      <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
        <div className="flex flex-col items-center justify-center min-h-screen py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-extrabold text-gray-800 text-center">
              Profile Page
            </h2>
            {loading ? (
              <p className="mt-4 text-center text-gray-600">Loading...</p>
            ) : (
              <div className="mt-4">
                <div className="mb-2">
                  <span className="font-semibold">ID:</span> {profileData.id}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Name:</span> {profileData.name}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Email:</span> {profileData.email}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Phone:</span> {profileData.phone}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Password:</span> {profileData.password}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Filename:</span> {profileData.filenames}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
