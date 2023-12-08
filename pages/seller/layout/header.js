import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../auth';



export default function Header(){
    const router = useRouter();

    const { user, login, logout } = useAuth();
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
        }, 1800000);
        return () => {
            clearInterval(interval);
          };
    }, []);

 

    function checkSession()
    {
        var storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser)
        {
            
            router.push('http://localhost:8000/seller/Home');
        }
        else
        {
            
        }
        return storedUser;
    }
    return(
        <>
       <Image src="/agriculture.png" width={50}height={50}/> 
        </>
    )
}