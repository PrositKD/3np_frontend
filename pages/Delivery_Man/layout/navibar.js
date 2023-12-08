import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import { useAuth } from "../Uits/authContext";
import Link from "next/link";

export default function NavBar() {

  const [profileData, setProfileData] =  useState('')
  const router = useRouter();
  const { user, logout, checkUser,logindata } = useAuth();

  useEffect(() => {
    checkSession();
    fetchData();
    const interval = setInterval(() => {
        checkSession();
    }, 100000);
  
      return () => {
        clearInterval(interval);
      };
}, []);

useEffect(() => {
 
  const interval = setInterval(() => {

      console.log('hi i am logout');

      logout();

  }, 1500000);

}, []);
  
  function checkSession()
  {
      var storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) 
      {    
       
          logindata(storedUser.email, storedUser.cookie);
          console.log(storedUser.email);
          console.log(storedUser.cookie);
          console.log('i am locatl001');
      }
      else 
      {
          router.push('/')
      }
      return storedUser;
  }
  // function checkSession() {
  //   if (user && user.email && user.cookie) {
  //     fetchData();
  //     console.log("user:  ", user);
  //   } else {
  //     router.push('/');
  //     console.log("user:  ", user);
  //   }
  // }
  
  async function fetchData() {
    try {
      
      const phoneNo = checkSession().email;
      const response = await axios.get(`${process.env.NEXT_PUBLIC_DELIVERY}` + phoneNo); 
      console.log(response.data);

      setProfileData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogout = () => {
     logout();
    router.push('/');
  };

  return (
    <>
     
      
     <div className="custom-background navbar bg-base-100">
  <div className="flex-1">
  <img src="/agriculture.png" width={50}height={50}/> 
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-8">
  <Link href="home" className="btn btn-ghost normal-case text-xl">
    Home
  </Link>
  <Link href="parcel" className="btn btn-ghost normal-case text-xl">
    Parcel
  </Link>
  <Link href="history" className="btn btn-ghost normal-case text-xl">
    History
  </Link>
</div>

  </div>
  <div className="flex-none gap-2">
   
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
        {profileData &&
          <img src={`${process.env.NEXT_PUBLIC_DELIVERY}getimage/${profileData.delivaryDEntity.photo}`}></img>
        }
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <Link href='about'>
            Profile
            <span className="badge">About you</span>
          </Link>
        </li>
        <li> <Link href='update'>Settings</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
       
      </ul>
    </div>
  </div>
</div>
     
    </>
  );
}
