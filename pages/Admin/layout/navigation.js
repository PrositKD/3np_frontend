
import { useEffect, useState } from "react";

 

import axios from "axios";

 

import { useRouter } from 'next/router';

 

import { useAuth } from "../Uits/authContext";

 

import Link from 'next/link'
export default function Navigation(){

 

 

 

  const [profileData, setProfileData] =  useState('')

 

  const router = useRouter();

 

  const { user, logout, checkUser,logindata } = useAuth();

 

 

 

  useEffect(() => {

 

    checkSession();

 

    

 

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
  const handleCustomClick = () => {

    // Your custom logic here

 

    logout();

 

    router.push('/');

    console.log("Custom Link clicked!");

    // You can perform any action you want here

  };

 

    return(
        <>
       <h2> <Link href='Home'>Home  </Link>
       <Link href='about'>About  </Link>
        
         <Link href='seller'>Seller  </Link>
         <Link href='delivaryMan'>DelivaryMan </Link>
         <Link href='history'>History  </Link></h2>
         <button

    className="text-blue-500 underline hover:text-blue-700 focus:outline-none"

    onClick={handleCustomClick}

  >

    Logout

  </button>
        </>
    )
}