import Link from 'next/link';
import Image from 'next/image'
import Layout from '../layout/layout';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Uits/authContext';




export default function History(){
    const [orders, setOrders] = useState([]);
     const [errorMessage, setErrorMessage] = useState(''); 
     const { user, logout, checkUser } = useAuth();
    
     var  storedUser;

  useEffect(() => {
    storedUser = JSON.parse(localStorage.getItem('user'));
    ForView();
  }, []);

  async function ForView() {
    try {
      const searchArea =  storedUser.email;
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
   
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold success-content text-center">Here is your work history</h2>
      <p className="text-red-500">{errorMessage}</p>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="border-t mt-4 pt-4">
            <p className="text-lg">
              Order ID: {order.id} is {order.Status} by {order.Delivary_man.email}
              <Link href={`/Home/${order.id}`} className="text-blue-500 hover:underline ml-2">
                Details
              </Link>
              <button
                onClick={() => handleOrderDeletion(order.id)}
                className="text-red-500 ml-2 hover:underline focus:outline-none"
              >
                Delete
              </button>
            </p>
          </div>
        ))
      )}
    </div>
  </div>
</Layout>

     
        </>
    )
}