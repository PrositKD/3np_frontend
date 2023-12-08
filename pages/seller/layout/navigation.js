import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../auth';
import axios from "axios";

export default function Navigation(){
  const { user, login, logout } = useAuth();
  const router = useRouter();
  const [storedUser, setStoredUser] = useState(null); 
  const [imageData, setImageData] = useState("");

  useEffect(() => {

    checkSession();
    const interval = setInterval(() => {
        checkSession();
    }, 1000);
      return () => {
        clearInterval(interval);
      };
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
        logout();
    }, 1500000);
  }, []);
  

    function checkSession()
    {
        var storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser)
        {    
            login(storedUser.email, storedUser.cookie);
            setStoredUser(storedUser);
        }
        else
        {
            router.push('/')
        }
        return storedUser;

    }

    const [showDropdown, setShowDropdown] = useState(false);
    
   
    /*const router = useRouter();
    const { user, checkUser } = useAuth();
  
    useEffect(() => {
      checkSession();
    }, []);
  
    function checkSession() {
      if (user !== null) {
        console.log("user:", user.email);
        console.log("user:", user.cookie);
      } else {
        router.push('/');
      }
    }*/

    
    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };
    const email = storedUser?.email;
    const url = `${process.env.NEXT_PUBLIC_SELLER}seller/${email}`;
    axios.get(url)
    .then(response => {
      
      setImageData(response.data);
   })
    .catch(error => {
    console.error('Error:', error.message);
    });
  
    return (
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          
          <div className="flex items-center space-x-6">
          <img src="/agriculture.png" width={50}height={50}/> 
            <h2 className="text-white font-semibold text-xl">
              <Link href="/seller/Home">Home</Link>
            </h2>
            <h2 className="text-white font-semibold text-xl">
              <Link href="/seller/PostProduct">Post Product</Link>
            </h2>
            <h2 className="text-white font-semibold text-xl">
              <Link href="/seller/About">About</Link>
            </h2>
          </div>
          <div className="ml-auto">
            <div className="relative">
              <button className="focus:outline-none" onClick={toggleDropdown}>
                <img
                  src={`${process.env.NEXT_PUBLIC_SELLER}product/getImage/${imageData}`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md z-10">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link href="/Profile">Profile</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link href="/EditProfile">Edit Profile</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link href="/" onClick={logout}>Logout</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
    
    
}