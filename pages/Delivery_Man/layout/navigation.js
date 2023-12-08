import Link from 'next/link'
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import { useAuth } from '../Uits/authContext';
export default function Navigation(){
    const [jsonData, setJsonData] = useState('')
    const router = useRouter();
    const { user, logout, checkUser } = useAuth();
  
    useEffect(() => {
  
      //checkSession();
  
    }, []);
  
    function checkSession()
    {
      if (user!=null) {
        
       // fetchData();
        console.log("user:  "+user.email)
        console.log("cookie:  "+user.cookie)
      }
      else {
        console.log("user:  "+user)
       // console.log("user:  "+user.cookie)
        router.push('/')
      }
    }
  
    return(
        <>
       
       <h2 > <Link href='home'>Home  </Link>
       <Link href='about'>Profile  </Link>
         <Link href='parcel'>Parcel  </Link>
         <Link href='history'>History  </Link>
         <Link href='/'>Logout</Link></h2>
        </>
    )
}