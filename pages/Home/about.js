import Link from 'next/link';
import Image from 'next/image'
import Layout from '../layout/layout';
import axios from "axios";
import {  useState } from "react";

export default function About(){
    const [profileData, setProfileData] = useState("");
   
    async function ForViewProfile()
  {try {
    const phoneNo="prosit.kd@gmail.com";
    const response = await axios.get(`${process.env.NEXT_PUBLIC_DELIVERY}`+phoneNo);

      console.log(response.data);

      setProfileData(response.data);
    }
    catch(error)
    {console.log(error); }
}
ForViewProfile();
    return(
        <>
        <Layout page="About">
        
        <h1>About You</h1>
  

            <div>
            <img
              src={`${process.env.NEXT_PUBLIC_DELIVERY}getimage/${profileData && profileData.delivaryDEntity.photo}`}
              alt="Profile"
              style={{ width: '100px', height: '100px' }}
            />
              

            </div>

            <div>

              <label><b> Name : </b></label>

              <span><b>{profileData && profileData.delivaryDEntity.name}</b></span>

            </div>

            <div>

              <label><b>Email :</b></label>

              <span><b>{profileData && profileData.email}</b></span>

            </div>

            <div>

              <label><b>Phone :</b></label>

              <span><b>{profileData && profileData.delivaryDEntity.phone}</b></span>

            </div>

            <div>

              <label><b>Gender :</b></label>

              <span><b>{profileData && profileData.delivaryDEntity.gender}</b></span>

            </div>

       
       <h2> <Link href='../profile/update'>Update Profile </Link></h2>
       </Layout>
        </>
    )
}

 