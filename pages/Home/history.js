import Link from 'next/link';
import Image from 'next/image'
import Layout from '../layout/layout';
import React, { useState, useEffect } from 'react';
import axios from 'axios';




export default function History(){
    const [orders, setOrders] = useState([]);
     const [errorMessage, setErrorMessage] = useState(''); 
     const searchArea = 'prosit.kdd@gmail.com';
     

  useEffect(() => {
    ForView();
  }, []);

  async function ForView() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DELIVERY}history/${searchArea}`
      );
      console.log(response.data);
      setOrders(response.data);

      setErrorMessage('');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('No data found at your id');
      } else {
        console.error(error);
        setErrorMessage('Error occurred Backend during registration.');
      }
    }
  }
  const handleOrderDeletion = async (orderId) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_DELIVERY}delete/${orderId}`
    );

    if (response.status === 200) {
       
        
              ForView();
            
    }
  } catch (error) {
    console.error(error);
   
  }
};
   
   
    return(
        <>
        <Layout page="history">
        
        <h1>Here is your work history</h1>
        <div>
    <h2>Order List</h2>
    <h1>{errorMessage}</h1>
    {orders.length === 0 ? (
      <p>You have no orders.</p>
    ) : (
      orders.map(order => (
        <div>
          <p>Order ID: {order.id} is {order.Status} by {order.Delivary_man.email}
          <Link href={`/Home/${order.id}`}>Details</Link> {/* Adding order.id to the link */}
          <Link href="#" onClick={() => handleOrderDeletion(order.id)}>Delete</Link>
            </p>
        </div>
      ))
    )}
  </div>
       </Layout>
        </>
    )
}