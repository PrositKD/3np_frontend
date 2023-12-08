import Link from 'next/link';
import Image from 'next/image';
import Layout from '../layout/layout';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Uits/authContext';


export default function Parcel() {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { user, logout, checkUser } = useAuth();
  var storedUser;
  //const searchArea = 'prosit.kdd@gmail.com';

  useEffect(() => {
    storedUser = JSON.parse(localStorage.getItem('user'));
    ForView();
  }, []);

  async function ForView() {
    try {
      const searchArea = storedUser.email;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DELIVERY}myorders/${searchArea}`
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
  
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const payload = {
        Status: newStatus
      };
      console.log('Request Payload:', payload);
  
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_DELIVERY}updatedelivary/${orderId}`,
        payload
      );
      console.log('Response:', response.data);
      if (response.data) {
        const confirmResult = window.confirm(
          'Order status updated and email send successfully. Do you want to refresh the order list?'
        );

        if (confirmResult) {
          ForView();
        }
    }
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  
   
  return (
    <Layout page="parcel">
  <div>
  <h2 className="text-xl font-semibold text-primary text-center">Order List</h2>
  <h1 className="text-red-500">{errorMessage}</h1>
  {orders.length === 0 ? (
    <p>You have no orders.</p>
  ) : (
    orders.map(order => (
      <div key={order.id} className="order-card bg-white p-4 rounded-lg shadow-md mt-4">
        <h3 className="text-lg font-semibold">Order ID: {order.id}</h3>
        <p>Seller: {order.Seller}</p>
        <p>Receiver: {order.Receiver}</p>
        <p>Product: {order.Product}</p>
        <p>Address: {order.Address}</p>
        <p>Area: {order.Area}</p>
        <p>Phone: {order.phone}</p>
        <p>Status: {order.Status}</p>
        <p>Delivery Man Email: {order.Delivary_man.email}</p>

        {/* Buttons for updating order status */}
        <button
          onClick={() => handleStatusUpdate(order.id, 'completed')}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded focus:outline-none hover:bg-green-600"
        >
          Mark Completed
        </button>
        <button
          onClick={() => handleStatusUpdate(order.id, 'rejected')}
          className="ml-2 px-4 py-2 bg-red-500 text-white rounded focus:outline-none hover:bg-red-600"
        >
          Mark Rejected
        </button>
      </div>
    ))
  )}
</div>

</Layout>

  );
}
