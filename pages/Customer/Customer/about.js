import React from 'react';
import Link from 'next/link';
import Layout from '../Layout/layout';
import Image from 'next/image'

export default function About(){

return (


    <>
    <Layout page="about">
    <h1>Customer</h1>
    <br></br>
   
    <Image src="/93.jpeg" alt="" width={500} height={300} />
    <br></br>
    <Link href="/">Home</Link>
    <br></br>
    </Layout>
    
    </>
);


}