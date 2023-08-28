import Link from 'next/link';
import Image from 'next/image';
import Layout from '../layout/layout';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAuth } from '../Uits/authContext';

export default function About() {
  const [profileData, setProfileData] = useState(null);
  const { user, logout, checkUser } = useAuth();
var  storedUser;
  useEffect(() => {
    storedUser = JSON.parse(localStorage.getItem('user'));
    fetchProfileData();
  }, []); // Empty dependency array ensures that this effect runs only once

  async function fetchProfileData() {
    try {
      const phoneNo = storedUser.email;
      const response = await axios.get(`${process.env.NEXT_PUBLIC_DELIVERY}` + phoneNo);

      console.log(response.data);

      setProfileData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Layout page="About">
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-semibold mb-4">About You</h1>

    {profileData && (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <img
            src={`${process.env.NEXT_PUBLIC_DELIVERY}getimage/${profileData.delivaryDEntity.photo}`}
            alt="Profile"
            className="w-20 h-20 rounded-full mr-4"
          />
          <div>
            <label className="font-semibold">Name</label>
            <p>{profileData.delivaryDEntity.name}</p>
          </div>
        </div>

        <div className="mb-4">
          <label className="font-semibold">Email</label>
          <p>{profileData.email}</p>
        </div>

        <div className="mb-4">
          <label className="font-semibold">Phone</label>
          <p>{profileData.delivaryDEntity.phone}</p>
        </div>

        <div className="mb-4">
          <label className="font-semibold">Gender</label>
          <p>{profileData.delivaryDEntity.gender}</p>
        </div>

        <h2 className="mt-4">
          <Link href="../Home/update" className="text-blue-500 hover:underline">
            Update Profile
          </Link>
        </h2>
      </div>
    )}
  </div>
</Layout>

    </>
  );
}
